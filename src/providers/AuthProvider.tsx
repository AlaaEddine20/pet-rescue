import { AuthContext } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LoginUser, Profile, SignUpUser } from "@/types/Auth";
import { AuthError, Session, User } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const isLoading = isAuthLoading || isProfileLoading;
  const isLoggedIn = !!session;

  const latestUserId = useRef<string | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    latestUserId.current = userId;
    setIsProfileLoading(true);
    setProfileError(null);

    const { data, error } = await supabase
      .from("users")
      .select("id, user_name, role, avatar_url")
      .eq("id", userId)
      .maybeSingle();

    // Se nel frattempo l'utente è cambiato, scarta questa risposta "stale"
    if (latestUserId.current !== userId) return;

    if (error) {
      console.error("Errore nel caricamento del profilo:", error);
      setProfile(null);
      setProfileError(error.message);
    } else {
      setProfile(data);
    }
    setIsProfileLoading(false);
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (event === "SIGNED_OUT") {
        setProfile(null);
        setProfileError(null);
      }
      if (event === "INITIAL_SESSION") {
        setIsAuthLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Aspetta di conoscere lo stato iniziale dell'auth prima di "chiudere" il loading
    if (isAuthLoading) return;

    if (!user) {
      latestUserId.current = null;
      setProfile(null);
      setProfileError(null);
      setIsProfileLoading(false);
      return;
    }

    loadProfile(user.id);
  }, [user?.id, isAuthLoading, loadProfile]);

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
    if (user) loadProfile(user.id);
  }, [user, loadProfile]);

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      profileError,
      isLoading,
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
      profileError,
      isLoading,
      isLoggedIn,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
