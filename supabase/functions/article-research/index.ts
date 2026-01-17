const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResearchRequest {
  articleSlug: string;
  topic: string;
  researchQueries: string[];
}

interface ResearchResult {
  success: boolean;
  articleSlug: string;
  perplexityResults: Array<{
    query: string;
    content: string;
    citations: string[];
  }>;
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { articleSlug, topic, researchQueries } = await req.json() as ResearchRequest;

    if (!articleSlug || !researchQueries?.length) {
      return new Response(
        JSON.stringify({ success: false, error: 'articleSlug and researchQueries are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Perplexity API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Researching article: ${articleSlug} with ${researchQueries.length} queries`);

    // Run all Perplexity queries in parallel
    const perplexityResults = await Promise.all(
      researchQueries.map(async (query) => {
        try {
          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${perplexityKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'sonar-pro',
              messages: [
                {
                  role: 'system',
                  content: `You are a career research expert. Provide accurate, actionable information for temp workers and job seekers. Include specific statistics, data from 2024-2026, and practical examples. Format with bullet points where helpful. Focus on: ${topic}`
                },
                { role: 'user', content: query }
              ],
              search_recency_filter: 'year',
            }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            console.error(`Perplexity error for query "${query}":`, data);
            return { query, content: '', citations: [], error: data.error };
          }

          return {
            query,
            content: data.choices?.[0]?.message?.content || '',
            citations: data.citations || []
          };
        } catch (error) {
          console.error(`Error for query "${query}":`, error);
          return { query, content: '', citations: [], error: String(error) };
        }
      })
    );

    const result: ResearchResult = {
      success: true,
      articleSlug,
      perplexityResults: perplexityResults.filter(r => r.content)
    };

    console.log(`Research complete for ${articleSlug}: ${result.perplexityResults.length} successful queries`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in article research:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
