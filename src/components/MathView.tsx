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
        errorColor: '#94a3b8', // Subtle muted slate instead of harsh red #cc0000
        strict: false,
      });
      return { html, isError: false };
    } catch (err) {
      return { html: `<code class="math-fallback">${cleanMath}</code>`, isError: true };
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
