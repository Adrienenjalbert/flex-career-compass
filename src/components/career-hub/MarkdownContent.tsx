import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Preprocess content to convert bullet characters to proper markdown
const preprocessContent = (content: string): string => {
  // Split content into lines
  const lines = content.split('\n');
  const processedLines: string[] = [];
  
  for (const line of lines) {
    // Check if line contains inline bullets (• or - followed by text, multiple on same line)
    if (line.includes('• ') || line.includes(' • ')) {
      // Check if it's a line with multiple inline bullets (like "• item1 • item2 • item3")
      const bulletCount = (line.match(/•/g) || []).length;
      
      if (bulletCount > 1 && !line.trim().startsWith('•')) {
        // This is a line with inline bullets after text like "Features: • item1 • item2"
        const parts = line.split(/\s*•\s*/);
        const prefix = parts[0];
        const items = parts.slice(1).filter(item => item.trim());
        
        if (prefix.trim()) {
          processedLines.push(`**${prefix.trim()}**`);
          processedLines.push('');
        }
        items.forEach(item => {
          processedLines.push(`- ${item.trim()}`);
        });
      } else if (bulletCount > 1 && line.trim().startsWith('•')) {
        // Multiple bullets starting with • like "• item1 • item2"
        const items = line.split(/\s*•\s*/).filter(item => item.trim());
        items.forEach(item => {
          processedLines.push(`- ${item.trim()}`);
        });
      } else {
        // Single bullet - convert to markdown list
        processedLines.push(line.replace(/^(\s*)•\s*/, '$1- '));
      }
    } else {
      processedLines.push(line);
    }
  }
  
  return processedLines.join('\n');
};

const MarkdownContent = ({ content, className = '' }: MarkdownContentProps) => {
  const processedContent = preprocessContent(content);
  
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-foreground mb-3 mt-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">{children}</h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
          ),
          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),
          // Links
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-primary hover:text-primary/80 underline underline-offset-2 inline-flex items-center gap-1"
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3 inline" />}
              </a>
            );
          },
          // Unordered lists
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4 ml-1">{children}</ul>
          ),
          // Ordered lists
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-muted-foreground">{children}</ol>
          ),
          // List items with custom bullet styling
          li: ({ children }) => (
            <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span>{children}</span>
            </li>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-secondary/50 rounded-r-lg">
              {children}
            </blockquote>
          ),
          // Code blocks
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-secondary p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          // Horizontal rules
          hr: () => <hr className="border-border my-8" />,
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-border">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-secondary px-4 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2 text-muted-foreground">{children}</td>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
