import { NextRequest } from 'next/server';
import { YaoValue } from '@/types';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/aiPrompt';
import { getCloudflareContext } from '@opennextjs/cloudflare';

interface InterpretRequest {
  question: string;
  yaos: YaoValue[];
  upperTrigram: string;
  lowerTrigram: string;
  changedUpperTrigram?: string;
  changedLowerTrigram?: string;
  language?: string;
}

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const apiKey = env.AI_API_KEY;
  const apiUrl = env.AI_API_URL;
  const model = env.AI_MODEL;

  if (!apiKey || !apiUrl || !model) {
    return new Response(
      JSON.stringify({ error: 'AI service not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: InterpretRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request format' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { question, yaos, upperTrigram, lowerTrigram, changedUpperTrigram, changedLowerTrigram, language } = body;

  if (!yaos || yaos.length !== 6) {
    return new Response(
      JSON.stringify({ error: 'Invalid yao data' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const systemPrompt = buildSystemPrompt(language);
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
        JSON.stringify({ error: 'AI service request failed' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const upstream = response.body;
    if (!upstream) {
      return new Response(
        JSON.stringify({ error: 'No response from AI service' }),
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
      JSON.stringify({ error: 'Network error, please retry' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
