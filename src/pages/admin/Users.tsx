
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
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // First, get all auth users to ensure we have the most up-to-date list
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      // Then fetch user roles to combine with user data
      const { data: userRoles, error: userRolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (userRolesError) throw userRolesError;
      
      // Get profile data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Map roles to users
      const userRolesMap = new Map();
      userRoles.forEach((ur: any) => {
        userRolesMap.set(ur.user_id, ur.role);
      });
      
      // Map profiles to users
      const profilesMap = new Map();
      profiles.forEach((profile: any) => {
        profilesMap.set(profile.id, profile);
      });
      
      // Combine data
      const formattedUsers = authUsers.users.map((user: any) => {
        const profile = profilesMap.get(user.id);
        return {
          id: user.id,
          email: user.email || (profile?.username || "No email"),
          role: userRolesMap.get(user.id) || "No role",
          created_at: user.created_at,
        };
      });
      
      setUsers(formattedUsers);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch users: ${error.message}`,
        variant: "destructive",
      });
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (newUser: NewUser) => {
    try {
      setIsCreating(true);
      
      // First check if the user already exists
      // Use a different approach than filter to check if user exists
      const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers();
      
      if (searchError) throw searchError;
      
      // Find user with matching email manually
      // Properly type the users array and use type assertion to fix the TS error
      const existingUser = existingUsers.users.find((user: { email?: string }) => 
        user.email === newUser.email
      );
      
      let userId;
      
      // If user exists, use their ID
      if (existingUser) {
        userId = existingUser.id;
        
        // Check if this user already has a role
        const { data: existingRole } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .single();
          
        if (existingRole) {
          throw new Error(`User with email ${newUser.email} already has the role: ${existingRole.role}`);
        }
        
        toast({
          title: "User exists",
          description: "User already exists in the system. Adding role only.",
        });
      } else {
        // Create a new user
        const { data, error } = await supabase.auth.admin.createUser({
          email: newUser.email,
          password: newUser.password,
          email_confirm: true,
        });

        if (error) throw error;
        
        if (data.user) {
          userId = data.user.id;
        } else {
          throw new Error("Failed to create user");
        }
      }

      // Add role for the user
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ 
          user_id: userId, 
          role: newUser.role 
        }]);

      if (roleError) throw roleError;

      toast({
        title: "Success",
        description: "User added successfully",
      });

      // Refresh the user list
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error adding user:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // First remove user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
        
      if (roleError) throw roleError;
      
      // Then delete the user
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      // Update local state to remove the user
      setUsers(users.filter(user => user.id !== userId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error deleting user:', error);
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
          <AddUserDialog onAddUser={handleAddUser} isCreating={isCreating} />
        </div>
        <UserList users={users} onDeleteUser={handleDeleteUser} loading={loading} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
