// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** Les informations de l'utilisateur de votre API */
      bearer?: string;
      // Ajoutez d'autres propriétés ici si nécessaire
    } & DefaultSession["user"];
  }

  interface JWT {
    bearer?: string;
    // Ajoutez d'autres propriétés ici si nécessaire
  }
}
