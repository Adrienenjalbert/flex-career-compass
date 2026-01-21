import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Research queries for each persona
const PERSONA_RESEARCH_CONFIG: Record<string, {
  displayName: string;
  perplexityQueries: string[];
  firecrawlUrls: string[];
}> = {
  'student': {
    displayName: 'Students',
    perplexityQueries: [
      'What are the best part-time jobs for college students in 2026? Include statistics on average hourly wages, popular industries, and job availability.',
      'How do students balance work and school successfully? Include 2026 statistics on working students, recommended hours per week, and academic impact.',
      'What flexible job opportunities are available for students with no prior work experience in 2026?',
    ],
    firecrawlUrls: [
      'https://www.bls.gov/cps/cpsaat07.htm', // Employment by age
    ],
  },
  'fresher': {
    displayName: 'Freshers (First-time Job Seekers)',
    perplexityQueries: [
      'How can someone get their first job with no experience in 2026? Include entry-level job market statistics and industries hiring freshers.',
      'What are the most in-demand entry-level jobs in 2026? Include average starting wages and growth potential.',
      'What resume and interview tips work best for first-time job seekers with no work history?',
    ],
    firecrawlUrls: [
      'https://www.bls.gov/emp/tables/employment-by-major-industry-sector.htm',
    ],
  },
  'immigrant': {
    displayName: 'Immigrants & New to US Workforce',
    perplexityQueries: [
      'What documents do immigrants need for I-9 employment verification in 2026? List acceptable documents and the verification process.',
      'What are the best first jobs in America for immigrants in 2026? Include industries that commonly hire immigrants and average wages.',
      'What workplace culture tips should immigrants know when starting work in the United States?',
    ],
    firecrawlUrls: [
      'https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents',
    ],
  },
  'career-changer': {
    displayName: 'Career Changers',
    perplexityQueries: [
      'What are the career change statistics and success rates in 2026? Include data on mid-career pivots and industries welcoming career changers.',
      'What transferable skills are most valuable for career changers in 2026? Include examples of skill translation across industries.',
      'What is the temp-to-permanent conversion rate in staffing agencies in 2026? Include success strategies.',
    ],
    firecrawlUrls: [
      'https://www.bls.gov/news.release/tenure.nr0.htm', // Job tenure
    ],
  },
  'parent': {
    displayName: 'Working Parents',
    perplexityQueries: [
      'What are the best flexible jobs for working parents in 2026? Include jobs with school-hour schedules and part-time options.',
      'What is the average childcare cost in the US in 2026 by state? Include comparison with median wages to determine work viability.',
      'How many parents work part-time or flexible jobs in 2026? Include statistics on work-life balance preferences.',
    ],
    firecrawlUrls: [
      'https://www.childcareaware.org/our-issues/research/ccdc/',
    ],
  },
  'seasonal': {
    displayName: 'Seasonal Workers',
    perplexityQueries: [
      'What are the holiday hiring trends for 2026? Include peak hiring months, top employers, and seasonal job statistics.',
      'What are the average pay rates for seasonal warehouse and retail jobs in 2026? Include overtime and bonus information.',
      'What percentage of seasonal workers get converted to permanent positions in 2026?',
    ],
    firecrawlUrls: [
      'https://www.bls.gov/news.release/empsit.nr0.htm', // Employment situation
    ],
  },
  'side-gig': {
    displayName: 'Side Gig Workers',
    perplexityQueries: [
      'What are the side gig income statistics in 2026? Include average monthly earnings and popular side job types.',
      'How do taxes work for second job and side gig income in 2026? Include W-2 vs 1099 implications.',
      'What are the best weekend and evening jobs for people with full-time employment in 2026?',
    ],
    firecrawlUrls: [
      'https://www.irs.gov/businesses/gig-economy-tax-center',
    ],
  },
};

interface PerplexityResult {
  query: string;
  content: string;
  citations: string[];
}

interface FirecrawlResult {
  url: string;
  markdown?: string;
  title?: string;
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personaSlug, runAll } = await req.json();

    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!perplexityKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Perplexity API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Supabase configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Determine which personas to research
    const personasToResearch = runAll 
      ? Object.keys(PERSONA_RESEARCH_CONFIG)
      : personaSlug ? [personaSlug] : [];

    if (personasToResearch.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No persona specified' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: Record<string, any> = {};

    for (const slug of personasToResearch) {
      const config = PERSONA_RESEARCH_CONFIG[slug];
      if (!config) {
        results[slug] = { error: `Unknown persona: ${slug}` };
        continue;
      }

      console.log(`Researching persona: ${slug} (${config.displayName})`);

      // Run Perplexity queries
      const perplexityResults: PerplexityResult[] = [];
      const allCitations: string[] = [];
      const statistics: Record<string, any> = {};
      const seoKeywords: string[] = [];

      for (const query of config.perplexityQueries) {
        try {
          console.log(`Running Perplexity query: ${query.substring(0, 50)}...`);
          
          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${perplexityKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'sonar',
              messages: [
                {
                  role: 'system',
                  content: `You are a career research assistant focused on the US job market. 
                  Provide accurate, factual information with specific 2026 statistics, numbers, and data points.
                  Always cite sources. Format responses with clear headings and bullet points.
                  Extract key SEO keywords and statistics that would be useful for a career resource website.`
                },
                { role: 'user', content: query }
              ],
            }),
          });

          const data = await response.json();
          
          if (data.choices?.[0]?.message?.content) {
            const content = data.choices[0].message.content;
            perplexityResults.push({
              query,
              content,
              citations: data.citations || [],
            });
            
            if (data.citations) {
              allCitations.push(...data.citations);
            }

            // Extract statistics from response (simple pattern matching)
            const percentMatch = content.match(/(\d+(?:\.\d+)?)\s*%/g);
            const dollarMatch = content.match(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
            const numberMatch = content.match(/(\d+(?:,\d{3})*)\s+(?:workers|employees|jobs|positions)/gi);
            
            if (percentMatch) statistics.percentages = percentMatch;
            if (dollarMatch) statistics.wages = dollarMatch;
            if (numberMatch) statistics.jobNumbers = numberMatch;

            // Extract potential SEO keywords
            const keywordPatterns = [
              /best\s+[\w\s]+jobs/gi,
              /[\w\s]+employment/gi,
              /[\w\s]+career/gi,
              /flexible\s+[\w\s]+/gi,
              /part-time\s+[\w\s]+/gi,
            ];
            
            keywordPatterns.forEach(pattern => {
              const matches = content.match(pattern);
              if (matches) {
                seoKeywords.push(...matches.map((m: string) => m.trim().toLowerCase()));
              }
            });
          }

          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.error(`Perplexity query error: ${err}`);
          perplexityResults.push({
            query,
            content: '',
            citations: [],
          });
        }
      }

      // Run Firecrawl scraping if API key is available
      const firecrawlResults: FirecrawlResult[] = [];
      
      if (firecrawlKey) {
        for (const url of config.firecrawlUrls) {
          try {
            console.log(`Scraping URL: ${url}`);
            
            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${firecrawlKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                url,
                formats: ['markdown'],
                onlyMainContent: true,
              }),
            });

            const data = await response.json();
            
            if (data.success && data.data) {
              firecrawlResults.push({
                url,
                markdown: data.data.markdown?.substring(0, 5000), // Limit size
                title: data.data.metadata?.title,
              });
            } else {
              firecrawlResults.push({
                url,
                error: data.error || 'Failed to scrape',
              });
            }

            // Rate limiting delay
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (err) {
            console.error(`Firecrawl error: ${err}`);
            firecrawlResults.push({
              url,
              error: String(err),
            });
          }
        }
      }

      // Compile full response
      const fullResponse = perplexityResults
        .map(r => `## ${r.query}\n\n${r.content}`)
        .join('\n\n---\n\n');

      // Dedupe citations and keywords
      const uniqueCitations = [...new Set(allCitations)];
      const uniqueKeywords = [...new Set(seoKeywords)].slice(0, 20);

      // Save to database
      const { error: upsertError } = await supabase
        .from('persona_research_results')
        .upsert({
          persona_slug: slug,
          seo_keywords: uniqueKeywords,
          statistics,
          external_resources: firecrawlResults.filter(r => !r.error).map(r => ({
            url: r.url,
            title: r.title,
          })),
          perplexity_response: fullResponse,
          firecrawl_data: firecrawlResults,
          citations: uniqueCitations,
          researched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'persona_slug',
        });

      if (upsertError) {
        console.error(`Database upsert error for ${slug}:`, upsertError);
        results[slug] = { 
          success: false, 
          error: upsertError.message,
          perplexityCount: perplexityResults.length,
          firecrawlCount: firecrawlResults.length,
        };
      } else {
        results[slug] = {
          success: true,
          displayName: config.displayName,
          perplexityCount: perplexityResults.length,
          firecrawlCount: firecrawlResults.length,
          citationsCount: uniqueCitations.length,
          keywordsCount: uniqueKeywords.length,
          statisticsFound: Object.keys(statistics).length > 0,
        };
      }

      console.log(`Completed research for ${slug}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        results,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Persona research error:', error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
