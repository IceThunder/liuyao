import { NextRequest } from 'next/server';
import { YaoValue } from '@/types';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/aiPrompt';

export const runtime = 'edge';

interface InterpretRequest {
  question: string;
  yaos: YaoValue[];
  upperTrigram: string;
  lowerTrigram: string;
  changedUpperTrigram?: string;
  changedLowerTrigram?: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.AI_API_KEY;
  const apiUrl = process.env.AI_API_URL;
  const model = process.env.AI_MODEL;

  if (!apiKey || !apiUrl || !model) {
    return new Response(
      JSON.stringify({ error: 'AI 服务未配置' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: InterpretRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: '请求格式错误' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { question, yaos, upperTrigram, lowerTrigram, changedUpperTrigram, changedLowerTrigram } = body;

  if (!yaos || yaos.length !== 6) {
    return new Response(
      JSON.stringify({ error: '爻值数据无效' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt({
    question,
    yaos,
    upperTrigram,
    lowerTrigram,
    changedUpperTrigram,
    changedLowerTrigram,
  });

  try {
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI 服务请求失败' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const upstream = response.body;
    if (!upstream) {
      return new Response(
        JSON.stringify({ error: 'AI 服务无响应' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;
              const data = trimmed.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch {
                // skip malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error('Stream processing error:', err);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('AI request error:', err);
    return new Response(
      JSON.stringify({ error: '网络错误，请稍后重试' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
