import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { JOB_APPLICATION_ARTICLES } from './useArticleResearch';

export interface ArticleResearchData {
  id: string;
  article_slug: string;
  research_query: string;
  research_response: string | null;
  citations: string[];
  key_statistics: string[];
  researched_at: string;
}

export function useArticleResearchData(articleSlug: string | undefined) {
  const [data, setData] = useState<ArticleResearchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if this slug is a job application article that has research
  const isResearchableArticle = articleSlug && 
    JOB_APPLICATION_ARTICLES.includes(articleSlug as typeof JOB_APPLICATION_ARTICLES[number]);

  useEffect(() => {
    if (!articleSlug || !isResearchableArticle) {
      setData(null);
      return;
    }

    const fetchResearchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
          .from('article_research_results')
          .select('*')
          .eq('article_slug', articleSlug)
          .maybeSingle();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (result) {
          setData({
            id: result.id,
            article_slug: result.article_slug,
            research_query: result.research_query,
            research_response: result.research_response,
            citations: Array.isArray(result.citations) ? result.citations.map(String) : [],
            key_statistics: Array.isArray(result.key_statistics) ? result.key_statistics.map(String) : [],
            researched_at: result.researched_at,
          });
        } else {
          setData(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch research data';
        setError(message);
        console.error('Research data fetch error:', message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResearchData();
  }, [articleSlug, isResearchableArticle]);

  return {
    data,
    isLoading,
    error,
    hasResearch: !!data,
    isResearchableArticle,
  };
}
