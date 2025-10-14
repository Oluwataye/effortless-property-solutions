import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import LoadingFallback from '@/components/LoadingFallback';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = false, 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const { session, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [roleLoading, setRoleLoading] = useState(requireAdmin);
  const location = useLocation();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!requireAdmin || !session) {
        setRoleLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', { 
          _user_id: session.user.id,
          _role: 'admin' 
        });
        if (error) throw error;
        setIsAdmin(data);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setRoleLoading(false);
      }
    };

    checkAdminRole();
  }, [session, requireAdmin]);

  if (authLoading || roleLoading) {
    return <LoadingFallback />;
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If admin is required but user is not admin
  if (requireAdmin && (!session || !isAdmin)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;