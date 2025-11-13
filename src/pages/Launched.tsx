import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Folder, Search, Download, Trash2, Shield, UserPlus, Users, UserCheck, Clock, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import Navigation from "@/components/Navigation";
import SystemPromptEditor from "@/components/SystemPromptEditor";
import ContextFileUpload from "@/components/ContextFileUpload";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import AIChat from "@/components/AIChat";
import ChatHistory from "@/components/ChatHistory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const Launched = () => {
  const { toast } = useToast();
  const { isAdmin } = useIsAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Admin state
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  
  // Chat history state
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);

  const categories = [
    { name: "Alle produkter", count: products.length },
    { name: "AI Løsninger", count: products.filter(p => p.category === "AI Løsninger").length },
    { name: "Netværk", count: products.filter(p => p.category === "Netværk").length },
    { name: "Sikkerhed", count: products.filter(p => p.category === "Sikkerhed").length },
    { name: "Cloud Services", count: products.filter(p => p.category === "Cloud Services").length },
  ];

  useEffect(() => {
    fetchContextFiles();
    
    // Listen for file updates from ContextFileUpload component
    const handleFileUpdate = () => {
      fetchContextFiles();
    };
    
    window.addEventListener('context-files-updated', handleFileUpdate);
    
    return () => {
      window.removeEventListener('context-files-updated', handleFileUpdate);
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsersAndRoles();
    }
  }, [isAdmin]);

  const fetchContextFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('context_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform context files to product format for display
      const transformedProducts = data?.map((file, index) => ({
        id: file.id,
        name: file.file_name,
        category: file.file_type.includes('pdf') ? 'AI Løsninger' : 
                 file.file_type.includes('json') ? 'Cloud Services' :
                 file.file_type.includes('text') ? 'Netværk' : 'Sikkerhed',
        description: `Uploadet kontekstfil: ${file.file_name}`,
        fileType: file.file_type.split('/')[1]?.toUpperCase() || 'FILE',
        uploadDate: new Date(file.created_at).toLocaleDateString('da-DK'),
        fileSize: formatFileSize(file.file_size),
        file_path: file.file_path,
      })) || [];

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke hente filer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const deleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('product-context')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('context_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      // Refresh the list
      fetchContextFiles();

      toast({
        title: "Fil slettet",
        description: "Filen er blevet fjernet",
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke slette fil",
        variant: "destructive",
      });
    }
  };

  const fetchUsersAndRoles = async () => {
    try {
      setIsLoadingUsers(true);

      // Fetch all users via edge function
      const { data: usersResponse, error: usersError } = await supabase.functions.invoke('list-users');
      
      if (usersError) throw usersError;

      // Fetch all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      setUsers(usersResponse.users || []);
      setUserRoles(rolesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      sonnerToast.error("Kunne ikke hente brugerdata");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleAddRole = async () => {
    if (!selectedUserId || !selectedRole) {
      sonnerToast.error("Vælg både bruger og rolle");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_roles")
        .insert([{ 
          user_id: selectedUserId, 
          role: selectedRole as 'admin' | 'user'
        }]);

      if (error) {
        if (error.code === "23505") {
          sonnerToast.error("Brugeren har allerede denne rolle");
        } else {
          throw error;
        }
        return;
      }

      sonnerToast.success("Rolle tilføjet");
      fetchUsersAndRoles();
      setSelectedUserId("");
      setSelectedRole("");
    } catch (error) {
      console.error("Error adding role:", error);
      sonnerToast.error("Kunne ikke tilføje rolle");
    }
  };

  const handleRemoveRole = async (userId: string, role: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);

      if (error) throw error;

      sonnerToast.success("Rolle fjernet");
      fetchUsersAndRoles();
    } catch (error) {
      console.error("Error removing role:", error);
      sonnerToast.error("Kunne ikke fjerne rolle");
    }
  };

  const loadConversationMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const messages = (data || []).map(msg => ({
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

  const getUserRoles = (userId: string) => {
    return userRoles.filter(ur => ur.user_id === userId);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Inside <span className="text-accent">Produktbibliotek</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Centralt bibliotek for al produktinformation. Upload, organiser og del produktdokumentation til AI-chatten.
          </p>
        </div>

        {/* System Prompt Editor */}
        <SystemPromptEditor />

        {/* Context File Upload */}
        <ContextFileUpload />

        {/* Admin Section - Only visible for admins */}
        {isAdmin && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[hsl(210,100%,60%)]" />
              <h2 className="text-3xl font-bold text-primary-foreground">Admin Panel</h2>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Brugere</p>
                      <p className="text-3xl font-bold text-card-foreground">{users.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Admins</p>
                      <p className="text-3xl font-bold text-card-foreground">
                        {userRoles.filter(r => r.role === 'admin').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[hsl(210,100%,50%)]/10 flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-[hsl(210,100%,50%)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Seneste Bruger</p>
                      <p className="text-sm font-medium text-card-foreground">
                        {users.length > 0 
                          ? new Date(users[0].created_at).toLocaleDateString('da-DK', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })
                          : 'Ingen brugere'}
                      </p>
                      {users.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">{users[0].email}</p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Role Section */}
            <Card className="bg-card border-0 mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Tildel Rolle
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Vælg en bruger og tildel en rolle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Vælg bruger" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Vælg rolle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={handleAddRole}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Tilføj Rolle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <CardTitle className="text-card-foreground">Alle Brugere</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Administrer brugerroller
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => {
                    const roles = getUserRoles(user.id);
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-accent/50 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-card-foreground">{user.email}</div>
                          <div className="text-sm text-muted-foreground">
                            Oprettet: {new Date(user.created_at).toLocaleDateString('da-DK')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {roles.length === 0 ? (
                            <Badge variant="outline" className="bg-background/50 text-muted-foreground border-border">
                              Ingen roller
                            </Badge>
                          ) : (
                            roles.map((roleData) => (
                              <div key={`${user.id}-${roleData.role}`} className="flex items-center gap-1">
                                <Badge 
                                  variant={roleData.role === 'admin' ? 'default' : 'secondary'}
                                  className={roleData.role === 'admin' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary text-secondary-foreground'}
                                >
                                  {roleData.role}
                                </Badge>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-card border-border">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-card-foreground">
                                        Fjern rolle?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="text-muted-foreground">
                                        Er du sikker på at du vil fjerne rollen "{roleData.role}" fra {user.email}?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-background text-foreground border-border hover:bg-accent">
                                        Annuller
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleRemoveRole(user.id, roleData.role as 'admin' | 'user')}
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                      >
                                        Fjern
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Chat History Section */}
            <Card className="bg-card border-0 mt-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat Historik
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Se og administrer alle brugersamtaler med AI'en
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setShowChatHistory(!showChatHistory)}
                  variant="outline"
                  className="mb-4"
                >
                  {showChatHistory ? 'Skjul Chat Historik' : 'Vis Chat Historik'}
                </Button>

                {showChatHistory && (
                  <div className="grid lg:grid-cols-3 gap-6 mt-4">
                    {/* Chat History Sidebar */}
                    <div className="lg:col-span-1">
                      <ChatHistory
                        currentConversationId={currentConversationId}
                        onSelectConversation={handleSelectConversation}
                        onNewConversation={handleNewConversation}
                      />
                    </div>

                    {/* Chat Display */}
                    <div className="lg:col-span-2">
                      {currentConversationId ? (
                        <div className="bg-background rounded-lg p-4">
                          <AIChat
                            conversationId={currentConversationId}
                            onConversationCreated={handleConversationCreated}
                            initialMessages={conversationMessages}
                            enableHistory={true}
                          />
                        </div>
                      ) : (
                        <div className="bg-muted/50 rounded-lg p-8 text-center text-muted-foreground">
                          Vælg en samtale for at se beskeder
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Kategorier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-all duration-200 text-left"
                  >
                    <span className="text-sm font-medium text-card-foreground">{category.name}</span>
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-0">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Søg i produkter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-0 text-card-foreground"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="bg-card border-0 transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground border-0">
                          {product.fileType}
                        </Badge>
                      </div>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                        {product.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 text-card-foreground">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Uploadet:</span>
                        <span className="font-medium text-card-foreground">{product.uploadDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Størrelse:</span>
                        <span className="font-medium text-card-foreground">{product.fileSize}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                          style={{ boxShadow: 'var(--shadow-button)' }}
                          disabled
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteFile(product.id, product.file_path)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-primary-foreground/30 mx-auto mb-4" />
                <p className="text-primary-foreground/70">Ingen produkter fundet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launched;
