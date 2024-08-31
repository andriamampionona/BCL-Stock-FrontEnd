import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: AuthOptions = {
   providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email", placeholder: "betsilodge@ooay.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(apiUrl +"/connexion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user.bearer) {
          return user;
        } else {
          console.log(user)
         
          return null;
 
        }
      },
    }),
  ],
    pages: {
    signIn: '/sing-in', // Page de connexion personnalisée
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log({ account });

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
     async redirect({ url, baseUrl }) {

      // Rediriger vers /dashboard après une connexion réussie
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`

    }
  },
};

export default NextAuth(authOptions);
