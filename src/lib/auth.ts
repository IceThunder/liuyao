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
    AI_API_KEY: string;
    AI_API_URL: string;
    AI_MODEL: string;
  }
}

async function getCfEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}

export const { handlers, signIn, signOut, auth } = NextAuth(async () => {
  const env = await getCfEnv();
  return {
    secret: env.AUTH_SECRET,
    trustHost: true,
    adapter: D1Adapter(env.DB as never),
    providers: [
      Google({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
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
