import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LoginUser, Profile, SignUpUser } from "@/types/Auth";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import type { Session, User } from "@supabase/supabase-js";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsProfileLoading(false);
      return;
    }

    setIsProfileLoading(true);

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, user_name, role, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        setProfile(null);
        setIsProfileLoading(false);
        return;
      }

      setProfile(data);
      setIsProfileLoading(false);
    };

    loadProfile();
  }, [user]);

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
        profile,
        isLoading: isAuthLoading || isProfileLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
