import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResearchInsightsPanelProps {
  response: string;
  title?: string;
  className?: string;
}

export function ResearchInsightsPanel({ response, title = "Research Insights", className }: ResearchInsightsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!response) return null;

  // Extract key insights from the response (first 500 chars for preview)
  const previewLength = 600;
  const preview = response.substring(0, previewLength);
  const hasMore = response.length > previewLength;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            AI-Researched 2026 Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h3 className="text-base font-semibold mt-4 mb-2 text-foreground">{children}</h3>
              ),
              h3: ({ children }) => (
                <h4 className="text-sm font-semibold mt-3 mb-1 text-foreground">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="text-sm text-muted-foreground space-y-1 mb-2">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2">
                  <Lightbulb className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">{children}</strong>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-3">
                  <table className="w-full text-xs border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border bg-muted/50 px-2 py-1 text-left font-medium">{children}</th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-2 py-1">{children}</td>
              ),
            }}
          >
            {isExpanded ? response : preview + (hasMore ? "..." : "")}
          </ReactMarkdown>
        </div>
        
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 w-full"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Full Research
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
