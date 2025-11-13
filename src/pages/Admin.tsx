import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, UserPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

const Admin = () => {
  const { isAdmin, isLoading: isCheckingAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    if (!isCheckingAdmin && !isAdmin) {
      toast.error("Du har ikke adgang til denne side");
      navigate("/");
    }
  }, [isAdmin, isCheckingAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsersAndRoles();
    }
  }, [isAdmin]);

  const fetchUsersAndRoles = async () => {
    try {
      setIsLoading(true);

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
      toast.error("Kunne ikke hente brugerdata");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRole = async () => {
    if (!selectedUserId || !selectedRole) {
      toast.error("Vælg både bruger og rolle");
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
          toast.error("Brugeren har allerede denne rolle");
        } else {
          throw error;
        }
        return;
      }

      toast.success("Rolle tilføjet");
      fetchUsersAndRoles();
      setSelectedUserId("");
      setSelectedRole("");
    } catch (error) {
      console.error("Error adding role:", error);
      toast.error("Kunne ikke tilføje rolle");
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

      toast.success("Rolle fjernet");
      fetchUsersAndRoles();
    } catch (error) {
      console.error("Error removing role:", error);
      toast.error("Kunne ikke fjerne rolle");
    }
  };

  const getUserRoles = (userId: string) => {
    return userRoles.filter(ur => ur.user_id === userId);
  };

  if (isCheckingAdmin || isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-[hsl(210,100%,60%)]" />
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
        </div>

        {/* Add Role Section */}
        <Card className="bg-white/10 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Tildel Rolle
            </CardTitle>
            <CardDescription className="text-white/70">
              Vælg en bruger og tildel en rolle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
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
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Vælg rolle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleAddRole}
                className="bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)] text-white"
              >
                Tilføj Rolle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Alle Brugere</CardTitle>
            <CardDescription className="text-white/70">
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
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white">{user.email}</div>
                      <div className="text-sm text-white/60">
                        Oprettet: {new Date(user.created_at).toLocaleDateString('da-DK')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {roles.length === 0 ? (
                        <Badge variant="outline" className="bg-white/5 text-white/60 border-white/20">
                          Ingen roller
                        </Badge>
                      ) : (
                        roles.map((roleData) => (
                          <div key={`${user.id}-${roleData.role}`} className="flex items-center gap-1">
                            <Badge 
                              variant={roleData.role === 'admin' ? 'default' : 'secondary'}
                              className={roleData.role === 'admin' 
                                ? 'bg-[hsl(210,100%,50%)] text-white' 
                                : 'bg-white/10 text-white'}
                            >
                              {roleData.role}
                            </Badge>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-[hsl(230,45%,12%)] border-white/20">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">
                                    Fjern rolle?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-white/70">
                                    Er du sikker på at du vil fjerne rollen "{roleData.role}" fra {user.email}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                    Annuller
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRemoveRole(user.id, roleData.role as 'admin' | 'user')}
                                    className="bg-red-500 hover:bg-red-600 text-white"
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
      </main>
    </div>
  );
};

export default Admin;
