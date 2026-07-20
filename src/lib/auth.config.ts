import type { NextAuthConfig } from "next-auth";

// This config must stay Edge Runtime-safe: no bcrypt, no Prisma, no Node-only APIs.
// It's used directly by middleware.ts. The full config (with the Credentials
// provider, which needs bcrypt + Prisma) lives in auth.ts and is only ever
// imported by Server Components, Server Actions, and Route Handlers — all of
// which run in the Node.js runtime, not the Edge Runtime.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
