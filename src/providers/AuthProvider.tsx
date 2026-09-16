import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { LoginUser, SignUpUser } from "@/lib/validators";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import type { Session, User } from "@supabase/supabase-js";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
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
        profile: null,
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
