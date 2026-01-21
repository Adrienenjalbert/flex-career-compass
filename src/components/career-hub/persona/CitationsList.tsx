import { ExternalLink, BookOpen, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CitationsListProps {
  citations: string[];
  maxDisplay?: number;
  className?: string;
}

// Categorize sources by authority level
function categorizeSource(url: string): { category: string; priority: number } {
  const domain = new URL(url).hostname.toLowerCase();
  
  if (domain.includes('.gov') || domain.includes('bls.gov') || domain.includes('uscis.gov') || domain.includes('irs.gov')) {
    return { category: "Government", priority: 1 };
  }
  if (domain.includes('.edu')) {
    return { category: "Academic", priority: 2 };
  }
  if (domain.includes('indeed.com') || domain.includes('linkedin.com') || domain.includes('glassdoor.com')) {
    return { category: "Industry", priority: 3 };
  }
  if (domain.includes('forbes.com') || domain.includes('bloomberg.com') || domain.includes('wsj.com')) {
    return { category: "Business Media", priority: 4 };
  }
  return { category: "Research", priority: 5 };
}

function getDomainName(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return url;
  }
}

export function CitationsList({ citations, maxDisplay = 6, className }: CitationsListProps) {
  if (!citations || citations.length === 0) return null;

  // Sort citations by authority priority
  const sortedCitations = [...citations]
    .map(url => ({ url, ...categorizeSource(url) }))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxDisplay);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Verified Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {sortedCitations.map((citation, index) => (
            <a
              key={index}
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {getDomainName(citation.url)}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    citation.category === "Government" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                    citation.category === "Academic" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                    "bg-muted"
                  }`}
                >
                  {citation.category}
                </Badge>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
        {citations.length > maxDisplay && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            +{citations.length - maxDisplay} more sources researched
          </p>
        )}
      </CardContent>
    </Card>
  );
}
