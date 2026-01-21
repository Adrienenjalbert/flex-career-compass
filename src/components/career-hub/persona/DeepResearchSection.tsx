import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  BarChart3,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PersonaResearchData } from "@/hooks/usePersonaResearch";

interface DeepResearchSectionProps {
  data: PersonaResearchData;
  personaName: string;
}

export function DeepResearchSection({ data, personaName }: DeepResearchSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data?.perplexity_response) return null;

  const researchDate = data.researched_at ? new Date(data.researched_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : null;

  // Parse sections from the research response
  const fullResponse = data.perplexity_response;
  const previewLength = 1500;
  const preview = fullResponse.substring(0, previewLength);
  const hasMore = fullResponse.length > previewLength;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            2026 Market Research
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            {personaName} Job Market Insights
          </h2>
          {researchDate && (
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: {researchDate}
            </p>
          )}
        </div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="insights" className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Keywords</span>
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sources</span>
            </TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Market Analysis & Wage Data
                  </CardTitle>
                  <Badge variant="secondary">AI-Researched</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h2 className="text-xl font-bold mt-6 mb-3 text-foreground border-b pb-2">{children}</h2>
                      ),
                      h2: ({ children }) => (
                        <h3 className="text-lg font-semibold mt-5 mb-2 text-foreground">{children}</h3>
                      ),
                      h3: ({ children }) => (
                        <h4 className="text-base font-semibold mt-4 mb-2 text-foreground">{children}</h4>
                      ),
                      p: ({ children }) => (
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="text-sm text-muted-foreground space-y-2 mb-4 pl-4">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{children}</span>
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-foreground font-semibold">{children}</strong>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4 rounded-lg border">
                          <table className="w-full text-sm">{children}</table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-muted/50">{children}</thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-2 text-left font-medium text-foreground">{children}</th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-2 border-t">{children}</td>
                      ),
                    }}
                  >
                    {isExpanded ? fullResponse : preview + (hasMore ? "..." : "")}
                  </ReactMarkdown>
                </div>

                {hasMore && (
                  <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 w-full"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Read Full Research ({Math.round(fullResponse.length / 1000)}k chars)
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  SEO Keywords & Search Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  These keywords represent what {personaName.toLowerCase()} are actively searching for in 2026.
                </p>
                <div className="flex flex-wrap gap-2">
                  {(data.seo_keywords || []).map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant={index < 5 ? "default" : "secondary"}
                      className={index < 5 ? "bg-primary/80" : ""}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
                
                {data.seo_keywords && data.seo_keywords.length > 0 && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Why These Keywords Matter</h4>
                    <p className="text-sm text-muted-foreground">
                      This page targets {data.seo_keywords.length} high-intent keywords that {personaName.toLowerCase()} use 
                      when searching for flexible work opportunities. The primary keywords (highlighted) have the highest 
                      search volume and conversion potential.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Research Sources & Citations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Data sourced from {data.citations?.length || 0} authoritative sources including BLS, NACE, and industry publications.
                </p>
                
                <div className="grid gap-2">
                  {(data.citations || []).slice(0, 15).map((citation, index) => {
                    const domain = new URL(citation).hostname.replace('www.', '');
                    return (
                      <a 
                        key={index}
                        href={citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                      >
                        <span className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-xs font-mono text-primary">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-sm text-muted-foreground truncate">
                          {domain}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </a>
                    );
                  })}
                </div>

                {data.citations && data.citations.length > 15 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    + {data.citations.length - 15} more sources
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
