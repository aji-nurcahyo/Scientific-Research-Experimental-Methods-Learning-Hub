import React, { type ReactNode } from 'react';
import { MathView } from './MathView';

export function renderInlineText(text: string): ReactNode[] {
  if (!text) return [];

  const parts = text.split(
    /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$(?:\\\$|[^\$\n])+\$|\\\([\s\S]+?\\\)|\`[^\`\n]+\`|\[[^\]]+\]\([^\)]+\)|\*\*\*[^\*\n]+\*\*\*|\*\*[^\*\n]+\*\*|\*[^\*\n]+\*|__[^_\n]+__|(?<!\w)_[^_\n]+_(?!\w)|\[(?:concept|definition|warning|result|note):\s*[^\]]+\])/g
  );

  return parts.map((part, idx) => {
    if (!part) return null;

    // Display math
    if (
      (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) ||
      (part.startsWith('\\[') && part.endsWith('\\]') && part.length >= 4)
    ) {
      const math = part.slice(2, -2);
      return <MathView key={idx} math={math} displayMode={true} />;
    }

    // Inline math ($...$)
    if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
      return <MathView key={idx} math={part.slice(1, -1)} displayMode={false} />;
    }

    // Inline math (\(...\))
    if (part.startsWith('\\(') && part.endsWith('\\)') && part.length >= 4) {
      return <MathView key={idx} math={part.slice(2, -2)} displayMode={false} />;
    }

    // Semantic Highlights
    const highlightMatch = /^\[(concept|definition|warning|result|note):\s*([^\]]+)\]$/i.exec(part);
    if (highlightMatch) {
      const type = highlightMatch[1].toLowerCase();
      const content = highlightMatch[2];
      const classMap: Record<string, string> = {
        concept: 'slide-hl-concept',
        definition: 'slide-hl-definition',
        warning: 'slide-hl-warning',
        result: 'slide-hl-result',
        note: 'slide-hl-note',
      };
      return (
        <span key={idx} className={`slide-semantic-pill ${classMap[type] || 'slide-hl-concept'}`}>
          {renderInlineText(content)}
        </span>
      );
    }

    // Inline code (`...`)
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return <code key={idx} className="slide-inline-code">{part.slice(1, -1)}</code>;
    }

    // Bold + Italic
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      return (
        <strong key={idx}>
          <em>{renderInlineText(part.slice(3, -3))}</em>
        </strong>
      );
    }

    // Bold
    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      return <strong key={idx}>{renderInlineText(part.slice(2, -2))}</strong>;
    }

    // Italic
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      return <em key={idx}>{renderInlineText(part.slice(1, -1))}</em>;
    }

    // Link
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      return (
        <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
          {renderInlineText(linkMatch[1])}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

interface MathRendererProps {
  content: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, block = false }) => {
  if (!content) return null;

  if (block) {
    let math = content.trim();
    if (math.startsWith('$$') && math.endsWith('$$') && math.length >= 4) {
      math = math.slice(2, -2).trim();
      return <MathView math={math} displayMode={true} />;
    }
    if (math.includes('$') || math.includes('**') || math.includes('`')) {
      return <div className="formula-block">{renderInlineText(content)}</div>;
    }
    return <MathView math={math} displayMode={true} />;
  }

  return <span>{renderInlineText(content)}</span>;
};
