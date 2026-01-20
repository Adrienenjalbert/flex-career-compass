import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerplexityResult {
  query: string;
  content: string;
  citations: string[];
}

interface ResearchResult {
  success: boolean;
  articleSlug: string;
  topic: string;
  perplexityResults: PerplexityResult[];
  timestamp: string;
  error?: string;
}

// All 11 job application article slugs with preset research queries
export const JOB_APPLICATION_ARTICLES = [
  'fresher-resume-guide',
  'student-resume-template',
  'zero-experience-jobs',
  'transferable-skills-guide',
  'best-resume-builders-2026',
  'best-job-boards-2026',
  'indeed-flex-vs-staffing-agencies',
  'warehouse-interview-questions',
  'hospitality-interview-questions',
  'ats-resume-tips',
  'temp-to-permanent-guide',
] as const;

export type JobApplicationArticleSlug = typeof JOB_APPLICATION_ARTICLES[number];

export function useArticleResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Map<string, ResearchResult>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const researchArticle = useCallback(async (articleSlug: string): Promise<ResearchResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('article-research', {
        body: { articleSlug, usePreset: true }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data && data.success) {
        setResults(prev => new Map(prev).set(articleSlug, data));
        return data as ResearchResult;
      } else {
        throw new Error(data?.error || 'Research failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Article research error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const researchAllArticles = useCallback(async (): Promise<ResearchResult[]> => {
    setIsLoading(true);
    setError(null);
    const allResults: ResearchResult[] = [];

    try {
      // Process articles sequentially to avoid rate limiting
      for (const slug of JOB_APPLICATION_ARTICLES) {
        console.log(`Researching: ${slug}`);
        const result = await researchArticle(slug);
        if (result) {
          allResults.push(result);
        }
        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      return allResults;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Batch research failed';
      setError(message);
      return allResults;
    } finally {
      setIsLoading(false);
    }
  }, [researchArticle]);

  const getResultForArticle = useCallback((articleSlug: string): ResearchResult | undefined => {
    return results.get(articleSlug);
  }, [results]);

  return {
    isLoading,
    error,
    results,
    researchArticle,
    researchAllArticles,
    getResultForArticle,
  };
}
