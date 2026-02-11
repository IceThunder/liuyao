'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { YaoValue } from '@/types';

interface AiInterpretationProps {
  question: string;
  yaos: YaoValue[];
  upperTrigram: string;
  lowerTrigram: string;
  changedUpperTrigram?: string;
  changedLowerTrigram?: string;
  divinationId: string;
}

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={key++} className="font-serif-cn text-gold text-lg mt-6 mb-3 glow-gold-text">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h4 key={key++} className="font-serif-cn text-gold/80 text-base mt-4 mb-2">
          {line.slice(4)}
        </h4>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-foreground/70 leading-relaxed mb-1">
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="text-gold/90">{match[1]}</strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function AiInterpretation({
  question,
  yaos,
  upperTrigram,
  lowerTrigram,
  changedUpperTrigram,
  changedLowerTrigram,
  divinationId,
}: AiInterpretationProps) {
  const [interpretation, setInterpretation] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const cacheKey = `liuyao-interpret-${divinationId}`;

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setInterpretation(cached);
      setStatus('done');
    }
  }, [cacheKey]);

  const startInterpretation = useCallback(async () => {
    setStatus('loading');
    setInterpretation('');
    setErrorMsg('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          yaos,
          upperTrigram,
          lowerTrigram,
          changedUpperTrigram,
          changedLowerTrigram,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `请求失败 (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('无法读取响应流');

      const decoder = new TextDecoder();
      let full = '';
      let buffer = '';

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
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              full += parsed.content;
              setInterpretation(full);
            }
          } catch {
            // skip
          }
        }
      }

      setStatus('done');
      localStorage.setItem(cacheKey, full);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setStatus('done');
        if (interpretation) {
          localStorage.setItem(cacheKey, interpretation);
        }
        return;
      }
      setErrorMsg(err instanceof Error ? err.message : '未知错误');
      setStatus('error');
    }
  }, [question, yaos, upperTrigram, lowerTrigram, changedUpperTrigram, changedLowerTrigram, cacheKey, interpretation]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status === 'loading' && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [interpretation, status]);

  // Idle state
  if (status === 'idle' && !interpretation) {
    return (
      <div className="bg-ink-light/30 border border-gold/10 rounded-lg p-6">
        <h2 className="font-serif-cn text-gold text-lg mb-4">AI 解卦</h2>
        <div className="text-center py-6">
          <p className="text-foreground/40 font-serif-cn mb-4 text-sm">
            结合卦象、爻辞、五行生克，为您提供智能解读
          </p>
          <button
            onClick={startInterpretation}
            className="px-6 py-2.5 bg-gold/10 border border-gold/30 rounded-lg text-gold font-serif-cn
                       hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 glow-gold"
          >
            开始解卦
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="bg-ink-light/30 border border-gold/10 rounded-lg p-6">
        <h2 className="font-serif-cn text-gold text-lg mb-4">AI 解卦</h2>
        <div className="text-center py-6">
          <p className="text-vermilion font-serif-cn mb-4">{errorMsg}</p>
          <button
            onClick={startInterpretation}
            className="px-6 py-2.5 bg-gold/10 border border-gold/30 rounded-lg text-gold font-serif-cn
                       hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // Loading / Done state with content
  return (
    <div className="bg-ink-light/30 border border-gold/10 rounded-lg p-6">
      <h2 className="font-serif-cn text-gold text-lg mb-4">AI 解卦</h2>
      <div ref={contentRef} className="max-h-[600px] overflow-y-auto pr-2">
        <div className="font-serif-cn text-sm">
          {renderMarkdown(interpretation)}
          {status === 'loading' && (
            <span className="inline-block w-2 h-4 bg-gold/60 animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        {status === 'loading' ? (
          <button
            onClick={stopGeneration}
            className="px-5 py-2 bg-vermilion/10 border border-vermilion/30 rounded-lg text-vermilion text-sm
                       font-serif-cn hover:bg-vermilion/20 transition-all duration-300"
          >
            停止生成
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem(cacheKey);
              startInterpretation();
            }}
            className="px-5 py-2 bg-gold/10 border border-gold/30 rounded-lg text-gold text-sm
                       font-serif-cn hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
          >
            重新解卦
          </button>
        )}
      </div>
    </div>
  );
}
