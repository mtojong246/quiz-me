import NextAuth from "next-auth/next";
import { Deck, Folder } from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
      refreshTokenExpires?: number;
      accessTokenExpires?: string;
      refreshToken?: string;
      token?: string;
      error?: string;
      user?: User;
    }
  
    interface User {
      username?: string;
      email?: string | null;
      decks?: Deck[],
      folders?: Folder[],
    }
  }
  
  declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      refreshTokenExpires?: number;
      accessTokenExpires?: number;
      accessToken?: string;
      refreshToken?: string;
      token: string;
      exp?: number;
      iat?: number;
      jti?: string;
    }
  }