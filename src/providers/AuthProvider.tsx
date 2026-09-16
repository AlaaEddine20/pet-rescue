import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { LoginUser, SignUpUser } from "@/types/Auth";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { Profile } from "@/types/Auth";
import type { Session, User } from "@supabase/supabase-js";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const {
        data: { session: initialSession },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Error getting session:", error);
      }

      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setProfile(null);
      setIsLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setProfile(null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (userData: LoginUser) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    return { error };
  };

  const signUp = async (userData: SignUpUser) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          user_name: userData.user_name,
        },
      },
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
        profile,
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
