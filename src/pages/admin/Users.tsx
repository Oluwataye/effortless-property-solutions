import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import UserList from "@/components/admin/users/UserList";
import AddUserDialog from "@/components/admin/users/AddUserDialog";
import { User, NewUser } from "@/types/user";

const UsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: userRoles, error: userRolesError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles:user_id (
            id,
            username,
            created_at
          )
        `);

      if (userRolesError) throw userRolesError;

      const formattedUsers = userRoles.map((ur: any) => ({
        id: ur.user_id,
        email: ur.profiles.username,
        role: ur.role,
        created_at: ur.profiles.created_at,
      }));

      setUsers(formattedUsers);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (newUser: NewUser) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            { 
              user_id: data.user.id, 
              role: newUser.role 
            }
          ]);

        if (roleError) throw roleError;

        toast({
          title: "Success",
          description: "User added successfully",
        });

        fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage system users and their roles</p>
          </div>
          <AddUserDialog onAddUser={handleAddUser} />
        </div>
        <UserList users={users} onDeleteUser={handleDeleteUser} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;