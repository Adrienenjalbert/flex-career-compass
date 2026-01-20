import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronDown,
  Database,
  Zap,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

const JOB_APPLICATION_ARTICLES = [
  { slug: 'fresher-resume-guide', title: 'Fresher Resume Guide' },
  { slug: 'student-resume-template', title: 'Student Resume Template' },
  { slug: 'zero-experience-jobs', title: 'Zero Experience Jobs' },
  { slug: 'transferable-skills-guide', title: 'Transferable Skills Guide' },
  { slug: 'best-resume-builders-2026', title: 'Best Resume Builders 2026' },
  { slug: 'best-job-boards-2026', title: 'Best Job Boards 2026' },
  { slug: 'indeed-flex-vs-staffing-agencies', title: 'Indeed Flex vs Staffing Agencies' },
  { slug: 'warehouse-interview-questions', title: 'Warehouse Interview Questions' },
  { slug: 'hospitality-interview-questions', title: 'Hospitality Interview Questions' },
  { slug: 'ats-resume-tips', title: 'ATS Resume Tips' },
  { slug: 'temp-to-permanent-guide', title: 'Temp to Permanent Guide' },
] as const;

interface ResearchResult {
  id: string;
  article_slug: string;
  research_query: string;
  research_response: string | null;
  citations: unknown;
  key_statistics: unknown;
  researched_at: string;
}

interface ArticleStatus {
  slug: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  lastResearched?: string;
  citationCount?: number;
  error?: string;
}

export function ArticleResearchAdmin() {
  const [articleStatuses, setArticleStatuses] = useState<Map<string, ArticleStatus>>(new Map());
  const [savedResults, setSavedResults] = useState<Map<string, ResearchResult>>(new Map());
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Load existing research results on mount
  useEffect(() => {
    loadExistingResults();
  }, []);

  const loadExistingResults = async () => {
    try {
      const { data, error } = await supabase
        .from('article_research_results')
        .select('*');

      if (error) throw error;

      const resultsMap = new Map<string, ResearchResult>();
      const statusMap = new Map<string, ArticleStatus>();

      // Initialize all articles as idle
      JOB_APPLICATION_ARTICLES.forEach(article => {
        statusMap.set(article.slug, { slug: article.slug, status: 'idle' });
      });

      // Update with saved results
      data?.forEach((result) => {
        resultsMap.set(result.article_slug, result as ResearchResult);
        const citations = Array.isArray(result.citations) ? result.citations : [];
        statusMap.set(result.article_slug, {
          slug: result.article_slug,
          status: 'success',
          lastResearched: result.researched_at,
          citationCount: citations.length,
        });
      });

      setSavedResults(resultsMap);
      setArticleStatuses(statusMap);
    } catch (err) {
      console.error('Error loading results:', err);
      toast.error('Failed to load existing research results');
    }
  };

  const researchSingleArticle = async (slug: string) => {
    setArticleStatuses(prev => {
      const updated = new Map(prev);
      updated.set(slug, { slug, status: 'loading' });
      return updated;
    });

    try {
      const { data, error } = await supabase.functions.invoke('article-research', {
        body: { articleSlug: slug, usePreset: true, saveToDatabase: true }
      });

      if (error) throw error;

      if (data?.success) {
        setArticleStatuses(prev => {
          const updated = new Map(prev);
          updated.set(slug, {
            slug,
            status: 'success',
            lastResearched: new Date().toISOString(),
            citationCount: data.totalCitations || 0,
          });
          return updated;
        });
        
        // Reload to get the saved result
        await loadExistingResults();
        toast.success(`Research complete: ${slug}`);
      } else {
        throw new Error(data?.error || 'Research failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setArticleStatuses(prev => {
        const updated = new Map(prev);
        updated.set(slug, { slug, status: 'error', error: message });
        return updated;
      });
      toast.error(`Failed: ${slug}`);
    }
  };

  const runBatchResearch = async () => {
    setIsBatchRunning(true);
    setBatchProgress(0);
    
    const totalArticles = JOB_APPLICATION_ARTICLES.length;
    let completed = 0;

    for (const article of JOB_APPLICATION_ARTICLES) {
      await researchSingleArticle(article.slug);
      completed++;
      setBatchProgress((completed / totalArticles) * 100);
      
      // Delay between requests to avoid rate limiting
      if (completed < totalArticles) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    setIsBatchRunning(false);
    toast.success('Batch research complete!');
    await loadExistingResults();
  };

  const getStatusIcon = (status: ArticleStatus['status']) => {
    switch (status) {
      case 'loading':
        return <RefreshCw className="h-4 w-4 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ArticleStatus['status']) => {
    switch (status) {
      case 'loading':
        return <Badge variant="outline" className="bg-primary/10 text-primary">Researching...</Badge>;
      case 'success':
        return <Badge variant="outline" className="bg-primary/10 text-primary">Complete</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Not researched</Badge>;
    }
  };

  const completedCount = Array.from(articleStatuses.values()).filter(s => s.status === 'success').length;
  
  const getTotalCitations = () => {
    return Array.from(savedResults.values()).reduce((acc, r) => {
      const citations = Array.isArray(r.citations) ? r.citations : [];
      return acc + citations.length;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{JOB_APPLICATION_ARTICLES.length}</p>
                <p className="text-sm text-muted-foreground">Total Articles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Researched</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-lg">
                <Zap className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTotalCitations()}</p>
                <p className="text-sm text-muted-foreground">Total Citations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batch Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Batch Research Control
          </CardTitle>
          <CardDescription>
            Run Perplexity research for all 11 job application articles and save results to the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={runBatchResearch} 
              disabled={isBatchRunning}
              size="lg"
            >
              {isBatchRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running Batch...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run All Research
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={loadExistingResults}
              disabled={isBatchRunning}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Results
            </Button>
          </div>
          
          {isBatchRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(batchProgress)}%</span>
              </div>
              <Progress value={batchProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Article List */}
      <Card>
        <CardHeader>
          <CardTitle>Article Research Status</CardTitle>
          <CardDescription>
            Click on an article to view research details or run individual research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {JOB_APPLICATION_ARTICLES.map((article) => {
                const status = articleStatuses.get(article.slug) || { slug: article.slug, status: 'idle' as const };
                const result = savedResults.get(article.slug);
                const isExpanded = expandedArticle === article.slug;

                return (
                  <Collapsible 
                    key={article.slug}
                    open={isExpanded}
                    onOpenChange={() => setExpandedArticle(isExpanded ? null : article.slug)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(status.status)}
                            <div className="text-left">
                              <p className="font-medium">{article.title}</p>
                              <p className="text-sm text-muted-foreground">{article.slug}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {status.lastResearched && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(status.lastResearched).toLocaleDateString()}
                              </span>
                            )}
                            {getStatusBadge(status.status)}
                            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 pt-2 border-t bg-muted/30">
                          <div className="flex items-center gap-2 mb-4">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                researchSingleArticle(article.slug);
                              }}
                              disabled={status.status === 'loading' || isBatchRunning}
                            >
                              {status.status === 'loading' ? (
                                <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                              ) : (
                                <Play className="mr-2 h-3 w-3" />
                              )}
                              {result ? 'Re-run Research' : 'Run Research'}
                            </Button>
                          </div>
                          
                          {result && (
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-1">Research Query:</p>
                                <p className="text-sm text-muted-foreground bg-background p-2 rounded">
                                  {result.research_query}
                                </p>
                              </div>
                              
                              {Array.isArray(result.citations) && result.citations.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    Citations ({result.citations.length}):
                                  </p>
                                  <ul className="text-xs text-muted-foreground space-y-1">
                                    {result.citations.slice(0, 5).map((citation, i) => (
                                      <li key={i} className="truncate">
                                        <a 
                                          href={String(citation)} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline"
                                        >
                                          {String(citation)}
                                        </a>
                                      </li>
                                    ))}
                                    {result.citations.length > 5 && (
                                      <li className="text-muted-foreground">
                                        +{result.citations.length - 5} more...
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              )}
                              
                              {result.research_response && (
                                <div>
                                  <p className="text-sm font-medium mb-1">Research Summary:</p>
                                  <p className="text-sm text-muted-foreground bg-background p-2 rounded max-h-32 overflow-y-auto">
                                    {result.research_response.slice(0, 500)}
                                    {result.research_response.length > 500 && '...'}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {status.error && (
                            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                              Error: {status.error}
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}