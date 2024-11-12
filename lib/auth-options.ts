import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your user name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          if (
            credentials.username === "info@loanscape.co.in" &&
            credentials.password === "loanscape1234"
          ) {
            return {
              id: "1",
              name: "User",
              email: "info@loanscape.co.in",
              isAuthenticated: true,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("An error occurred!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAuthenticated = user.isAuthenticated;
      }
      return token;
    },
    async session({ session, token }) {
      session.isAuthenticated = token.isAuthenticated;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
