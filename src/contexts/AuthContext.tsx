
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Initialize auth state from Supabase
  useEffect(() => {
    // First check localStorage for admin user (for our demo login)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
      setLoading(false);
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Initial session fetch
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // For testing purposes - hardcoded admin login
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      toast({
        title: 'Success',
        description: 'Logged in as admin successfully',
      });
      // Set logged in state in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        role: 'admin',
        id: 'admin-user-id'
      }));
      setUser({ email, role: 'admin', id: 'admin-user-id' } as unknown as User);
      return;
    }
    
    // Regular Supabase authentication
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    // Clear localStorage admin user
    localStorage.removeItem('user');
    setUser(null);
    
    // Sign out from Supabase if needed
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e) {
      console.error("Error signing out from Supabase:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
