import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, block = false }) => {
  if (!content) return null;

  // If block is explicitly true, render as display math
  if (block) {
    try {
      const html = katex.renderToString(content, {
        displayMode: true,
        throwOnError: false,
      });
      return <div className="formula-block" dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <pre className="formula-fallback">{content}</pre>;
    }
  }

  // Parse mixed text with $inline$ and $$block$$ math
  const parts: React.ReactNode[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }

    const matchedStr = match[0];
    if (matchedStr.startsWith('$$') && matchedStr.endsWith('$$')) {
      const formula = matchedStr.slice(2, -2).trim();
      try {
        const html = katex.renderToString(formula, { displayMode: true, throwOnError: false });
        parts.push(<div key={match.index} className="formula-block" dangerouslySetInnerHTML={{ __html: html }} />);
      } catch {
        parts.push(<code key={match.index}>{matchedStr}</code>);
      }
    } else if (matchedStr.startsWith('$') && matchedStr.endsWith('$')) {
      const formula = matchedStr.slice(1, -1).trim();
      try {
        const html = katex.renderToString(formula, { displayMode: false, throwOnError: false });
        parts.push(<span key={match.index} dangerouslySetInnerHTML={{ __html: html }} />);
      } catch {
        parts.push(<code key={match.index}>{matchedStr}</code>);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return <span>{parts}</span>;
};

