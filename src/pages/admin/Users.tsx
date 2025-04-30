
import { useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserList from "@/components/admin/users/UserList";
import AddUserDialog from "@/components/admin/users/AddUserDialog";
import { useUsers } from "@/hooks/use-users";

const UsersPage = () => {
  const { users, loading, isCreating, loadUsers, createUser, removeUser } = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage system users and their roles</p>
          </div>
          <AddUserDialog onAddUser={createUser} isCreating={isCreating} />
        </div>
        <UserList users={users} onDeleteUser={removeUser} loading={loading} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
