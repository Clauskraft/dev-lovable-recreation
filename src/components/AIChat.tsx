import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

type AIChatProps = {
  conversationId: string | null;
  onConversationCreated?: (conversationId: string) => void;
  initialMessages?: Message[];
  enableHistory?: boolean;
};

const MODELS = [
  { id: "mistralai/mistral-7b-instruct", name: "Mistral 7B (Hurtig & Effektiv)" },
  { id: "mistralai/mixtral-8x7b-instruct", name: "Mixtral 8x7B (Kraftfuld)" },
  { id: "mistralai/mistral-large", name: "Mistral Large (Mest Avanceret)" },
  { id: "meta-llama/llama-3-8b-instruct", name: "Llama 3 8B (Hurtig)" },
  { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B (Kraftfuld)" },
  { id: "meta-llama/llama-3.1-405b-instruct", name: "Llama 3.1 405B (Mest Kraftfuld)" },
  { id: "google/gemma-7b-it", name: "Gemma 7B (Google)" },
  { id: "openchat/openchat-7b", name: "OpenChat 7B" },
];

const AIChat = ({ conversationId, onConversationCreated, initialMessages = [], enableHistory = false }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId);

  // Update messages when initialMessages changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Update conversation ID when prop changes
  useEffect(() => {
    setCurrentConversationId(conversationId);
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  const streamChat = async (userMessage: Message, convId: string | null) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
    
    try {
      // Get user's session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Ikke godkendt",
          description: "Du skal være logget ind for at bruge AI chatten.",
          variant: "destructive",
        });
        throw new Error("No session");
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          model: selectedModel 
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast({
            title: "Rate limit nået",
            description: "For mange anmodninger. Prøv igen om lidt.",
            variant: "destructive",
          });
        } else if (resp.status === 402) {
          toast({
            title: "Betalingskrævet",
            description: "Tilføj midler til din workspace.",
            variant: "destructive",
          });
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg?.role === "assistant") {
                  newMessages[newMessages.length - 1] = { ...lastMsg, content: assistantContent };
                } else {
                  newMessages.push({ role: "assistant", content: assistantContent });
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Save assistant message to database after streaming is complete (only if history is enabled)
      if (assistantContent && convId) {
        await saveMessageToDb(convId, { role: "assistant", content: assistantContent });
      }
    } catch (error) {
      console.error("Stream error:", error);
      toast({
        title: "Fejl",
        description: "Kunne ikke forbinde til AI. Prøv igen.",
        variant: "destructive",
      });
    }
  };

  const saveMessageToDb = async (conversationId: string, message: Message) => {
    if (!enableHistory) return;
    
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: message.role,
          content: message.content
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const createOrGetConversation = async (firstMessage: string): Promise<string | null> => {
    if (!enableHistory) return null;
    
    // If we already have a conversation ID, use it
    if (currentConversationId) return currentConversationId;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      // Create conversation with first message as title (truncated)
      const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');
      
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title
        })
        .select()
        .single();

      if (error) throw error;
      
      const newConversationId = data.id;
      setCurrentConversationId(newConversationId);
      onConversationCreated?.(newConversationId);
      
      return newConversationId;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create or get conversation (only if history is enabled)
      const convId = await createOrGetConversation(userMessage.content);
      
      // Save user message to database (only if history is enabled)
      if (convId) {
        await saveMessageToDb(convId, userMessage);
      }

      // Stream AI response
      await streamChat(userMessage, convId);
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
      {/* Messages Area */}
      {messages.length > 0 && (
        <div className="glass-effect rounded-2xl mb-4 flex flex-col overflow-hidden" style={{ height: '500px' }}>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <div className="space-y-4 flex-grow">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-md ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground max-w-[75%]"
                        : "bg-white text-foreground max-w-[85%]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="glass-effect rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Spørg TDC AI om at skabe en løsning til..."
            className="flex-1 border-0 bg-white text-tdc-digital-blue placeholder:text-gray-500 text-base py-6 shadow-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md transition-all hover:scale-105"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowUp className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="text-white/80 hover:text-white border-0 bg-transparent w-auto gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(230,45%,15%)] border-white/10">
              {MODELS.map((model) => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  className="text-white/90 hover:text-white hover:bg-white/10"
                >
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
