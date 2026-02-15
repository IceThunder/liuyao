import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: '未登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  const result = await db
    .prepare('SELECT id, question, yaos, timestamp FROM divinations WHERE userId = ? ORDER BY timestamp DESC')
    .bind(session.user.id)
    .all();

  const records = result.results.map((row: Record<string, unknown>) => ({
    id: row.id,
    question: row.question || '',
    yaos: JSON.parse(row.yaos as string),
    timestamp: row.timestamp,
  }));

  return Response.json(records);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: '未登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { id, question, yaos, timestamp } = body;

  if (!id || !yaos || !timestamp) {
    return new Response(JSON.stringify({ error: '数据不完整' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  await db
    .prepare('INSERT OR IGNORE INTO divinations (id, userId, question, yaos, timestamp) VALUES (?, ?, ?, ?, ?)')
    .bind(id, session.user.id, question || '', JSON.stringify(yaos), timestamp)
    .run();

  return Response.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: '未登录' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: '缺少 ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  await db
    .prepare('DELETE FROM divinations WHERE id = ? AND userId = ?')
    .bind(id, session.user.id)
    .run();

  return Response.json({ ok: true });
}
