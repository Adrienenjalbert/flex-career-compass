import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Predefined research queries for the 11 job application articles
const articleResearchConfig: Record<string, { topic: string; queries: string[] }> = {
  'fresher-resume-guide': {
    topic: 'Resume writing for freshers and first-time job seekers',
    queries: [
      'What is the best resume format for freshers with no experience in 2026?',
      'What skills do employers look for in entry-level candidates 2026 statistics?',
      'How many freshers get rejected due to resume formatting issues 2026?',
    ]
  },
  'student-resume-template': {
    topic: 'Student resumes and part-time job applications',
    queries: [
      'Best practices for student resumes balancing work and school 2026',
      'What percentage of college students work part-time 2026 statistics?',
      'Should students include GPA on resume 2026 hiring manager preferences?',
    ]
  },
  'zero-experience-jobs': {
    topic: 'Entry-level jobs for candidates with no experience',
    queries: [
      'What jobs hire with no experience in 2026 top 10 roles?',
      'Entry-level job market statistics 2026 for first-time workers',
      'How to get hired with no work experience strategies 2026?',
    ]
  },
  'transferable-skills-guide': {
    topic: 'Identifying and showcasing transferable skills',
    queries: [
      'Most valuable transferable skills for 2026 job market',
      'How employers evaluate transferable skills from education 2026?',
      'Skills mapping from school to workplace examples 2026',
    ]
  },
  'best-resume-builders-2026': {
    topic: 'Resume builder tools comparison',
    queries: [
      'Best free resume builders 2026 comparison features and pricing',
      'Which resume builders are most ATS compatible 2026 rankings?',
      'Resume.io vs Canva vs Zety vs NovoResume comparison 2026',
      'What percentage of resumes pass ATS screening by builder 2026?',
    ]
  },
  'best-job-boards-2026': {
    topic: 'Job boards and employment websites by industry',
    queries: [
      'Best job boards for warehouse and logistics jobs 2026',
      'Top job sites for hospitality and restaurant jobs 2026',
      'Indeed Flex vs Wonolo vs Instawork market share 2026',
      'Most effective job boards by industry 2026 statistics',
    ]
  },
  'indeed-flex-vs-staffing-agencies': {
    topic: 'Comparing app-based staffing vs traditional temp agencies',
    queries: [
      'Indeed Flex worker reviews and satisfaction ratings 2026',
      'Traditional staffing agencies vs gig apps comparison 2026',
      'Same day pay apps comparison Indeed Flex alternatives 2026',
      'Temp agency conversion rates to permanent employment 2026',
    ]
  },
  'warehouse-interview-questions': {
    topic: 'Warehouse job interview preparation',
    queries: [
      'Top 20 warehouse interview questions and answers 2026',
      'STAR method examples for warehouse and logistics roles',
      'What to wear to a warehouse job interview 2026?',
      'Warehouse safety questions asked in interviews 2026',
    ]
  },
  'hospitality-interview-questions': {
    topic: 'Hospitality and restaurant job interview preparation',
    queries: [
      'Most common restaurant server interview questions 2026',
      'Bartender interview questions and best answers 2026',
      'How to answer customer service scenario questions hospitality?',
      'What do hiring managers look for in hospitality candidates 2026?',
    ]
  },
  'ats-resume-tips': {
    topic: 'Applicant Tracking System optimization',
    queries: [
      'How do ATS systems work in 2026 latest technology?',
      'What percentage of resumes are rejected by ATS 2026 statistics?',
      'Most common ATS rejection reasons 2026 and how to fix them',
      'ATS-friendly resume format guidelines 2026',
    ]
  },
  'temp-to-permanent-guide': {
    topic: 'Converting temporary jobs to permanent positions',
    queries: [
      'Temp to perm conversion rate statistics 2026 by industry',
      'Best strategies to turn temp job into permanent 2026',
      'When to ask about temp-to-perm conversion timing?',
      'What percentage of temp workers get hired permanently 2026?',
    ]
  },
};

interface ResearchRequest {
  articleSlug: string;
  topic?: string;
  researchQueries?: string[];
  usePreset?: boolean;
  saveToDatabase?: boolean;
}

interface PerplexityResult {
  query: string;
  content: string;
  citations: string[];
  error?: string;
}

interface ResearchResult {
  success: boolean;
  articleSlug: string;
  topic: string;
  perplexityResults: PerplexityResult[];
  totalCitations: number;
  timestamp: string;
  savedToDatabase?: boolean;
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json() as ResearchRequest;
    const { articleSlug, usePreset = true, saveToDatabase = false } = requestData;

    if (!articleSlug) {
      return new Response(
        JSON.stringify({ success: false, error: 'articleSlug is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use preset config or custom queries
    let topic: string;
    let researchQueries: string[];

    if (usePreset && articleResearchConfig[articleSlug]) {
      const preset = articleResearchConfig[articleSlug];
      topic = preset.topic;
      researchQueries = preset.queries;
    } else if (requestData.topic && requestData.researchQueries?.length) {
      topic = requestData.topic;
      researchQueries = requestData.researchQueries;
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `No preset found for "${articleSlug}" and no custom queries provided`,
          availablePresets: Object.keys(articleResearchConfig)
        }),
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

    console.log(`Researching article: ${articleSlug} | Topic: ${topic} | Queries: ${researchQueries.length}`);

    // Run all Perplexity queries in parallel
    const perplexityResults = await Promise.all(
      researchQueries.map(async (query): Promise<PerplexityResult> => {
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
                  content: `You are a career research expert providing accurate 2026 data for job seekers. Include:
- Specific statistics with sources (BLS, industry reports)
- Practical actionable advice
- Current trends and data points
- Format with bullet points for clarity
Focus area: ${topic}`
                },
                { role: 'user', content: query }
              ],
              search_recency_filter: 'year',
            }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            console.error(`Perplexity error for query "${query}":`, data);
            return { query, content: '', citations: [], error: data.error?.message || 'API error' };
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

    const successfulResults = perplexityResults.filter(r => r.content && !r.error);
    
    // Aggregate all citations and content
    const allCitations = successfulResults.flatMap(r => r.citations);
    const combinedContent = successfulResults.map(r => `## ${r.query}\n\n${r.content}`).join('\n\n---\n\n');
    
    // Extract key statistics from the content
    const statisticsPattern = /(\d+(?:\.\d+)?%|\$[\d,]+(?:\.\d+)?|\d+(?:,\d+)* (?:workers|jobs|people|resumes|applicants))/gi;
    const keyStatistics = [...new Set(combinedContent.match(statisticsPattern) || [])].slice(0, 20);

    let savedToDatabase = false;

    // Save to database if requested
    if (saveToDatabase && successfulResults.length > 0) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          const { error: dbError } = await supabase
            .from('article_research_results')
            .upsert({
              article_slug: articleSlug,
              research_query: topic,
              research_response: combinedContent,
              citations: allCitations,
              key_statistics: keyStatistics,
              researched_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'article_slug'
            });

          if (dbError) {
            console.error('Database save error:', dbError);
          } else {
            savedToDatabase = true;
            console.log(`Saved research results to database for: ${articleSlug}`);
          }
        }
      } catch (dbErr) {
        console.error('Database connection error:', dbErr);
      }
    }

    const result: ResearchResult = {
      success: successfulResults.length > 0,
      articleSlug,
      topic,
      perplexityResults: successfulResults,
      totalCitations: allCitations.length,
      timestamp: new Date().toISOString(),
      savedToDatabase,
    };

    console.log(`Research complete for ${articleSlug}: ${successfulResults.length}/${researchQueries.length} successful, ${allCitations.length} citations`);

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
