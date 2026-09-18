import type { LoginUser, Profile, SignUpUser } from "@/types/Auth";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isLoggedIn: boolean;

  signUp: (data: SignUpUser) => Promise<{
    error: AuthError | null;
  }>;

  signIn: (data: LoginUser) => Promise<{
    error: AuthError | null;
  }>;

  signOut: () => Promise<{
    error: AuthError | null;
  }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
