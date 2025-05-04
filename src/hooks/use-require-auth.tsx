
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';

// Hook to require authentication for protected routes
export const useRequireAuth = (redirectTo: string = '/login') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo, toast]);

  return { user, loading };
};

// Hook to require admin authentication
export const useRequireAdmin = (redirectTo: string = '/') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate('/login');
      } else if (user.role !== 'admin') {
        toast({
          title: "Access denied",
          description: "You do not have permission to access this page",
          variant: "destructive",
        });
        navigate(redirectTo);
      }
    }
  }, [user, loading, navigate, redirectTo, toast]);

  return { user, loading, isAdmin: user?.role === 'admin' };
};

export default useRequireAuth;
