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
        try {
          const res = await fetch(apiUrl + "/connexion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            // Gérer les erreurs de réponse (4xx ou 5xx)
            console.error("Erreur de réponse", res.status, res.statusText);
            return null;
          }

          const user = await res.json();

          if (user.bearer) {
            return user;
          } else {
            console.log("Erreur de connexion", user);
            return null;
          }
        } catch (error) {
          // Gérer les erreurs de réseau ou d'autres erreurs
          console.error("Erreur de réseau ou autre", error);
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
    console.log({ token, user, account });
    return { ...token, ...user };
  },
  async session({ session, token, user }) {
    console.log({ session, token, user });
    session.user = token as any;
    return session;
  },
  async redirect({ url, baseUrl }) {
    console.log("Redirection:", { url, baseUrl });
    return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
  },
},
};

export default NextAuth(authOptions);
