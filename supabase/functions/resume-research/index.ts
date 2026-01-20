import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResumeResearchRequest {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  researchType: 'full' | 'keywords' | 'bullets' | 'salary';
}

interface ResearchResult {
  success: boolean;
  roleSlug: string;
  data: {
    blsData?: {
      medianHourly: number;
      annualMean: number;
      employment: number;
      growthRate: string;
      sourceYear: number;
    };
    atsKeywords?: {
      keyword: string;
      category: string;
      importance: number;
    }[];
    achievementBullets?: {
      action: string;
      metric: string;
      result: string;
      fullBullet: string;
    }[];
    professionalSummaries?: {
      level: string;
      text: string;
    }[];
    certifications?: {
      name: string;
      provider: string;
      cost: string;
      payBoost: string;
    }[];
    industryTrends?: string[];
    hiringOutlook?: string;
  };
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { roleSlug, roleTitle, industry, researchType = 'full' }: ResumeResearchRequest = await req.json();

    if (!roleSlug || !roleTitle) {
      return new Response(
        JSON.stringify({ success: false, error: 'roleSlug and roleTitle are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      console.error('PERPLEXITY_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Researching resume content for: ${roleTitle} (${roleSlug})`);

    // Build comprehensive research query
    const researchQueries = {
      salary: `What is the current 2025-2026 median hourly wage, annual salary, total US employment, and projected job growth rate for ${roleTitle} positions? Include BLS data if available. Return specific numbers.`,
      
      keywords: `List the top 30 most important ATS keywords for a ${roleTitle} resume in ${industry}. Categorize them as: hard-skill, soft-skill, certification, action-verb, or industry-term. Rank by importance (1-100). Focus on keywords that help pass applicant tracking systems.`,
      
      bullets: `Generate 10 strong achievement bullet points for a ${roleTitle} resume. Use the formula: Action Verb + Task + Result with metrics. Include specific numbers and percentages. Focus on ${industry} industry achievements.`,
      
      summaries: `Write 4 professional summary paragraphs for a ${roleTitle} resume: 1) Entry-level (0-2 years), 2) Experienced (3+ years), 3) Career changer transitioning to this role, 4) No prior experience. Each should be 2-3 sentences and highlight key value propositions.`,
      
      certifications: `List the top 5 certifications or training programs that boost a ${roleTitle} resume. Include: certification name, provider, approximate cost, time to complete, and typical pay increase percentage.`,
      
      trends: `What are the top 5 hiring trends and in-demand skills for ${roleTitle} positions in 2025-2026? What should job seekers focus on?`
    };

    const results: ResearchResult['data'] = {};
    
    // Determine which queries to run based on researchType
    const queriesToRun = researchType === 'full' 
      ? Object.entries(researchQueries)
      : [[researchType, researchQueries[researchType as keyof typeof researchQueries]]];

    // Run queries in parallel
    const queryPromises = queriesToRun.map(async ([queryType, query]) => {
      try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${perplexityApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'sonar',
            messages: [
              {
                role: 'system',
                content: `You are a career research assistant specializing in resume optimization and job market data. Provide accurate, specific, and actionable information. When providing salary data, use the most recent BLS or industry sources. Format responses clearly with specific data points.`
              },
              {
                role: 'user',
                content: query
              }
            ],
            temperature: 0.1,
            max_tokens: 1500
          }),
        });

        if (!response.ok) {
          console.error(`Perplexity error for ${queryType}:`, response.status);
          return { queryType, success: false };
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';
        
        return { 
          queryType, 
          success: true, 
          content,
          citations: data.citations || []
        };
      } catch (error) {
        console.error(`Error in ${queryType} query:`, error);
        return { queryType, success: false };
      }
    });

    const queryResults = await Promise.all(queryPromises);

    // Process results
    for (const result of queryResults) {
      if (!result.success) continue;

      switch (result.queryType) {
        case 'salary':
          // Parse salary data from response
          const salaryMatch = result.content?.match(/\$(\d+\.?\d*)\s*(?:per hour|hourly|\/hour)/i);
          const annualMatch = result.content?.match(/\$(\d+,?\d*)\s*(?:per year|annually|annual)/i);
          const employmentMatch = result.content?.match(/(\d+,?\d*)\s*(?:employed|employment|jobs)/i);
          const growthMatch = result.content?.match(/(\d+\.?\d*)\s*%?\s*(?:growth|increase|projected)/i);
          
          results.blsData = {
            medianHourly: salaryMatch ? parseFloat(salaryMatch[1]) : 17.50,
            annualMean: annualMatch ? parseInt(annualMatch[1].replace(',', '')) : 36400,
            employment: employmentMatch ? parseInt(employmentMatch[1].replace(',', '')) : 50000,
            growthRate: growthMatch ? `${growthMatch[1]}%` : '5%',
            sourceYear: 2025
          };
          results.hiringOutlook = result.content?.substring(0, 500);
          break;

        case 'keywords':
          // Parse keywords from response
          const keywordLines = result.content?.split('\n').filter((line: string) => line.trim());
          results.atsKeywords = keywordLines?.slice(0, 30).map((line: string, index: number) => {
            const keyword = line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').split('-')[0].trim();
            return {
              keyword: keyword.substring(0, 50),
              category: line.toLowerCase().includes('soft') ? 'soft-skill' : 
                       line.toLowerCase().includes('cert') ? 'certification' :
                       line.toLowerCase().includes('action') ? 'action-verb' : 'hard-skill',
              importance: Math.max(100 - (index * 3), 40)
            };
          }).filter((k: { keyword: string }) => k.keyword.length > 2);
          break;

        case 'bullets':
          // Parse achievement bullets
          const bulletLines = result.content?.split('\n').filter((line: string) => 
            line.trim() && (line.includes('•') || line.includes('-') || /^\d+\./.test(line.trim()))
          );
          results.achievementBullets = bulletLines?.slice(0, 12).map((line: string) => {
            const bullet = line.replace(/^[\d\.\-\•\*]+\s*/, '').replace(/\*\*/g, '').trim();
            const parts = bullet.split(/,\s*|\s+by\s+|\s+resulting\s+in\s+/i);
            return {
              action: parts[0]?.split(' ')[0] || 'Achieved',
              metric: parts[1] || 'measurable results',
              result: parts[2] || 'improved outcomes',
              fullBullet: bullet
            };
          }).filter((b: { fullBullet: string }) => b.fullBullet.length > 20);
          break;

        case 'summaries':
          // Parse professional summaries
          const summaryBlocks = result.content?.split(/\d+\)|\d+\.|\*\*/).filter((s: string) => s.trim().length > 50);
          const levels = ['entry-level', 'experienced', 'career-change', 'no-experience'];
          results.professionalSummaries = levels.map((level, i) => ({
            level,
            text: summaryBlocks?.[i]?.trim().substring(0, 400) || 
              `Motivated ${roleTitle} professional with a strong work ethic and dedication to excellence in ${industry}.`
          }));
          break;

        case 'certifications':
          // Parse certifications
          const certLines = result.content?.split('\n').filter((line: string) => 
            line.trim() && line.length > 20
          );
          results.certifications = certLines?.slice(0, 6).map((line: string) => {
            const cleanLine = line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
            const name = cleanLine.split(/[-–:]/)[0]?.trim() || 'Industry Certification';
            return {
              name: name.substring(0, 60),
              provider: 'Various Providers',
              cost: line.match(/\$(\d+)/)?.[0] || '$50-200',
              payBoost: line.match(/(\d+)%/)?.[0] || '5-10%'
            };
          }).filter((c: { name: string }) => c.name.length > 3);
          break;

        case 'trends':
          // Parse trends
          const trendLines = result.content?.split('\n').filter((line: string) => 
            line.trim() && line.length > 20
          );
          results.industryTrends = trendLines?.slice(0, 6).map((line: string) => 
            line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim().substring(0, 200)
          );
          break;
      }
    }

    console.log(`Research completed for ${roleTitle}`);

    return new Response(
      JSON.stringify({
        success: true,
        roleSlug,
        data: results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in resume-research:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
