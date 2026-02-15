import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { D1Adapter } from '@auth/d1-adapter';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { D1Database } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
  }
}

async function getD1() {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

export const { handlers, signIn, signOut, auth } = NextAuth(async () => {
  const db = await getD1();
  return {
    adapter: D1Adapter(db as never),
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
    session: {
      strategy: 'jwt' as const,
    },
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      jwt({ token, user }) {
        if (user?.id) {
          token.userId = user.id;
        }
        return token;
      },
      session({ session, token }) {
        if (token.userId && session.user) {
          session.user.id = token.userId as string;
        }
        return session;
      },
    },
  };
});
