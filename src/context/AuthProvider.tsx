import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { NewUser, RegisteredUser } from "../lib/validators";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  signIn: (userData: RegisteredUser) => Promise<{
    error: Error | null;
  }>;

  signUp: (userData: NewUser) => Promise<{
    error: Error | null;
  }>;

  signOut: () => Promise<{
    error: Error | null;
  }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the existing session when the app starts.
    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    initializeAuth();

    // Listen for authentication changes.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (userData: RegisteredUser) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    return { error };
  };

  const signUp = async (userData: NewUser) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
