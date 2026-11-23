import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  inline?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, inline = false }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm as any, remarkMath as any]}
      rehypePlugins={[rehypeKatex as any]}
      components={inline ? {
        p: ({ children }) => <span>{children}</span>
      } : undefined}
    >
      {content}
    </ReactMarkdown>
  );
};
