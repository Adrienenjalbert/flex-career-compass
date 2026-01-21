import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PersonaResearchData {
  id: string;
  persona_slug: string;
  seo_keywords: string[];
  statistics: Record<string, any>;
  external_resources: Array<{ url: string; title?: string }>;
  perplexity_response: string | null;
  firecrawl_data: any;
  citations: string[];
  content_gaps: any[];
  researched_at: string;
}

export function usePersonaResearchData(personaSlug: string | undefined) {
  const [data, setData] = useState<PersonaResearchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personaSlug) {
      setData(null);
      return;
    }

    const fetchResearchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
          .from('persona_research_results')
          .select('*')
          .eq('persona_slug', personaSlug)
          .maybeSingle();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (result) {
          setData({
            id: result.id,
            persona_slug: result.persona_slug,
            seo_keywords: Array.isArray(result.seo_keywords) ? result.seo_keywords.map(String) : [],
            statistics: (typeof result.statistics === 'object' && result.statistics !== null && !Array.isArray(result.statistics)) 
              ? result.statistics as Record<string, any> 
              : {},
            external_resources: Array.isArray(result.external_resources) 
              ? result.external_resources.map((r: any) => ({ url: String(r?.url || ''), title: r?.title ? String(r.title) : undefined }))
              : [],
            perplexity_response: result.perplexity_response,
            firecrawl_data: result.firecrawl_data || {},
            citations: Array.isArray(result.citations) ? result.citations.map(String) : [],
            content_gaps: Array.isArray(result.content_gaps) ? result.content_gaps : [],
            researched_at: result.researched_at,
          });
        } else {
          setData(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch research data';
        setError(message);
        console.error('Persona research data fetch error:', message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResearchData();
  }, [personaSlug]);

  return {
    data,
    isLoading,
    error,
    hasResearch: !!data,
  };
}

export function usePersonaResearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});

  const researchPersona = useCallback(async (personaSlug: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('persona-research', {
        body: { personaSlug }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.success) {
        setResults(prev => ({ ...prev, ...data.results }));
        return data;
      } else {
        throw new Error(data?.error || 'Research failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Persona research error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const researchAllPersonas = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('persona-research', {
        body: { runAll: true }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.success) {
        setResults(data.results);
        return data;
      } else {
        throw new Error(data?.error || 'Batch research failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Batch persona research error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    results,
    researchPersona,
    researchAllPersonas,
  };
}
