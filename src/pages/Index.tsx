import { useState } from "react";
import Navigation from "@/components/Navigation";
import AIChat from "@/components/AIChat";
import ChatHistory from "@/components/ChatHistory";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadConversationMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const messages: Message[] = (data || []).map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));
      
      setConversationMessages(messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSelectConversation = async (conversationId: string | null) => {
    setCurrentConversationId(conversationId);
    if (conversationId) {
      await loadConversationMessages(conversationId);
    } else {
      setConversationMessages([]);
    }
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setConversationMessages([]);
  };

  const handleConversationCreated = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[hsl(210,100%,20%)] via-[hsl(210,100%,30%)] to-[hsl(210,100%,40%)]">
      <Navigation />
      
      <div className="flex-1 flex">
        {/* Chat History Sidebar */}
        <div className={`${showHistory ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <ChatHistory
            currentConversationId={currentConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Main Chat Area */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative">
          {/* Toggle History Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showHistory ? 'Skjul Historik' : 'Vis Historik'}
          </button>

          {/* Main Heading */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              TDC Erhverv AI
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl">
            Suveræn AI-kraft. Med fuld kontrol og indbygget compliance.
          </p>
          
          {/* AI Chat Interface */}
          <AIChat 
            conversationId={currentConversationId}
            onConversationCreated={handleConversationCreated}
            initialMessages={conversationMessages}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;
