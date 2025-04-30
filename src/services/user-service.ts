
import { supabase } from "@/integrations/supabase/client";
import { User, NewUser } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
  try {
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
    
    return formattedUsers;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function addUser(newUser: NewUser): Promise<void> {
  try {
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
  } catch (error: any) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<void> {
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
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
