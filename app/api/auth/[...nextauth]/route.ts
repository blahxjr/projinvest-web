import NextAuth from "next-auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "@/lib/db";
import { findUserByEmail, verifyPassword } from "@/lib/auth";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "seu@email.com" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null;
      }

      const user = await findUserByEmail(credentials.email);
      if (!user) {
        return null;
      }

      const isValid = await verifyPassword(credentials.password, user.password_hash);
      if (!isValid) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.avatar_url ?? null,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

const authOptions = {
  providers,
  adapter: PostgresAdapter(pool) as Adapter,
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: {
    strategy: "database" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      const role = (user as { role?: string } | undefined)?.role;
      if (role) {
        return {
          ...token,
          role,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        const currentUser = session.user as Session["user"] & { role?: string; id?: string };
        const tokenWithRole = token as JWT & { role?: string; picture?: string | null };

        session.user = {
          ...currentUser,
          id: tokenWithRole.sub ?? currentUser.id,
          role: tokenWithRole.role ?? currentUser.role,
          image: tokenWithRole.picture ?? session.user.image,
        } as Session["user"];
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
