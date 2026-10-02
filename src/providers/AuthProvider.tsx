import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/services/profile";
import { LoginUser, SignUpUser } from "@/types/AuthType";
import { AuthError, Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthBootstrapping, setIsAuthBootstrapping] = useState(true);

  const user = session?.user ?? null;
  const userId = user?.id;
  const isLoggedIn = !!session;

  const {
    data: profile = null,
    error: profileQueryError,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
    retry: 1,
  });

  const isBootstrapping = isAuthBootstrapping || (!!userId && isProfileLoading);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);

      if (event === "SIGNED_OUT") queryClient.clear();
      if (event === "INITIAL_SESSION") setIsAuthBootstrapping(false);
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  const signIn = useCallback(
    async (userData: LoginUser): Promise<{ error: AuthError | null }> => {
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      return { error };
    },
    [],
  );

  const signUp = useCallback(async (userData: SignUpUser) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: { user_name: userData.user_name },
      },
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const refreshProfile = useCallback(() => {
    void refetchProfile();
  }, [refetchProfile]);

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      profileQueryError,
      isBootstrapping,
      isLoggedIn,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [
      user,
      session,
      profile,
      profileQueryError,
      isBootstrapping,
      isLoggedIn,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
