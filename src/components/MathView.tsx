import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, displayMode = false, className = '' }) => {
  const rendered = useMemo(() => {
    if (!math || !math.trim()) return null;

    // Clean delimiters if passed redundantly
    let cleanMath = math.trim();
    if (cleanMath.startsWith('$$') && cleanMath.endsWith('$$') && cleanMath.length >= 4) {
      cleanMath = cleanMath.slice(2, -2).trim();
    } else if (cleanMath.startsWith('$') && cleanMath.endsWith('$') && cleanMath.length >= 2) {
      cleanMath = cleanMath.slice(1, -1).trim();
    } else if (cleanMath.startsWith('\\[') && cleanMath.endsWith('\\]') && cleanMath.length >= 4) {
      cleanMath = cleanMath.slice(2, -2).trim();
    } else if (cleanMath.startsWith('\\(') && cleanMath.endsWith('\\)') && cleanMath.length >= 4) {
      cleanMath = cleanMath.slice(2, -2).trim();
    }

    try {
      const html = katex.renderToString(cleanMath, {
        displayMode,
        throwOnError: false,
        errorColor: '#ef4444',
        strict: 'warn',
      });
      if (html.includes('katex-error')) {
        console.error(`[MathView KaTeX Error]: Malformed LaTeX detected: "${cleanMath}"`);
      }
      return { html, isError: html.includes('katex-error') };
    } catch (err) {
      console.error(`[MathView Fatal Error]: Failed to parse "${cleanMath}":`, err);
      return { html: `<code class="math-fallback" style="color:#ef4444; border:1px solid #f87171; padding:2px 4px; border-radius:3px;">${cleanMath}</code>`, isError: true };
    }
  }, [math, displayMode]);

  if (!rendered) return null;

  return (
    <span
      className={`math-rendered ${displayMode ? 'block my-3 text-center overflow-x-auto py-1' : 'inline-block px-0.5'} ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered.html }}
    />
  );
};
