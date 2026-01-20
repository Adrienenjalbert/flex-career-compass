import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { ArticleResearchData } from '@/hooks/useArticleResearchData';
import { format } from 'date-fns';

interface ResearchInsightsProps {
  data: ArticleResearchData;
  variant?: 'inline' | 'sidebar' | 'full';
}

export default function ResearchInsights({ data, variant = 'inline' }: ResearchInsightsProps) {
  const [showAllCitations, setShowAllCitations] = useState(false);
  const [expanded, setExpanded] = useState(variant === 'full');

  const visibleCitations = showAllCitations 
    ? data.citations 
    : data.citations.slice(0, 3);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return 'Recently';
    }
  };

  // Extract domain from URL for display
  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url.slice(0, 30);
    }
  };

  if (variant === 'sidebar') {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Research-Backed Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            Updated {formatDate(data.researched_at)}
          </div>
          
          {data.citations.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-2">
                {data.citations.length} verified sources
              </p>
              <div className="space-y-1">
                {data.citations.slice(0, 3).map((citation, i) => (
                  <a
                    key={i}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1 truncate"
                  >
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    {extractDomain(citation)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 my-8">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                2026 Research Insights
                <Badge variant="outline" className="text-xs font-normal">
                  AI-Verified
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Data updated {formatDate(data.researched_at)} from {data.citations.length} sources
              </p>
            </div>
          </div>
          
          {variant === 'inline' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      {(expanded || variant === 'full') && (
        <CardContent className="space-y-6">
          {/* Key Statistics */}
          {data.key_statistics.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Key Statistics
              </h4>
              <ul className="space-y-2">
                {data.key_statistics.map((stat, index) => (
                  <li 
                    key={index} 
                    className="text-sm text-foreground bg-background/50 px-3 py-2 rounded-md border border-border/50"
                  >
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Research Summary */}
          {data.research_response && (
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Research Summary
              </h4>
              <div className="text-sm text-muted-foreground bg-background/50 px-4 py-3 rounded-md border border-border/50 prose prose-sm max-w-none">
                {data.research_response.slice(0, 500)}
                {data.research_response.length > 500 && '...'}
              </div>
            </div>
          )}

          {/* Citations */}
          {data.citations.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-primary" />
                Sources & Citations ({data.citations.length})
              </h4>
              <ul className="space-y-2">
                {visibleCitations.map((citation, index) => (
                  <li key={index}>
                    <a
                      href={citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-start gap-2 group"
                    >
                      <span className="text-muted-foreground text-xs mt-0.5 w-4">
                        [{index + 1}]
                      </span>
                      <span className="flex-1 break-all group-hover:text-primary/80">
                        {extractDomain(citation)}
                        <span className="text-muted-foreground text-xs ml-1">
                          ({citation.slice(0, 60)}{citation.length > 60 ? '...' : ''})
                        </span>
                      </span>
                      <ExternalLink className="h-3 w-3 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>

              {data.citations.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllCitations(!showAllCitations)}
                  className="mt-2 text-primary"
                >
                  {showAllCitations 
                    ? 'Show fewer sources' 
                    : `View all ${data.citations.length} sources`}
                </Button>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground border-t border-border/50 pt-4">
            Statistics and data sourced via Perplexity AI from verified publications. 
            Always verify critical information with official sources before making decisions.
          </p>
        </CardContent>
      )}
    </Card>
  );
}
