
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, NewUser } from "@/types/user";
import { fetchUsers, addUser, deleteUser } from "@/services/user-service";

export function useUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch users: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser: NewUser) => {
    try {
      setIsCreating(true);
      await addUser(newUser);
      
      toast({
        title: "Success",
        description: "User added successfully",
      });

      // Refresh the user list
      await loadUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const removeUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      
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
    }
  };

  return {
    users,
    loading,
    isCreating,
    loadUsers,
    createUser,
    removeUser
  };
}
