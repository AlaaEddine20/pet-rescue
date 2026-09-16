import type { LoginUser, Profile, SignUpUser } from "@/types/Auth";
import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;

  signUp: (data: SignUpUser) => Promise<{
    error: Error | null;
  }>;

  signIn: (data: LoginUser) => Promise<{
    error: Error | null;
  }>;

  signOut: () => Promise<{
    error: Error | null;
  }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
