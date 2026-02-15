import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: '未登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const records = body.records as Array<{
    id: string;
    question: string;
    yaos: number[];
    timestamp: number;
  }>;

  if (!Array.isArray(records)) {
    return new Response(JSON.stringify({ error: '数据格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  let synced = 0;
  for (const record of records) {
    try {
      await db
        .prepare('INSERT OR IGNORE INTO divinations (id, userId, question, yaos, timestamp) VALUES (?, ?, ?, ?, ?)')
        .bind(record.id, session.user.id, record.question || '', JSON.stringify(record.yaos), record.timestamp)
        .run();
      synced++;
    } catch {
      // Skip duplicate records
    }
  }

  return Response.json({ synced });
}
