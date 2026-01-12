// Seasonal Research Edge Function using Perplexity API

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResearchRequest {
  city: string;
  stateCode: string;
  seasonType: 'holiday' | 'summer' | 'event' | 'tax' | 'student' | 'blackfriday';
  specificQuery?: string;
}

interface ResearchResponse {
  success: boolean;
  data?: {
    localEmployers: Array<{
      name: string;
      type: string;
      estimatedHires?: string;
      payRange?: string;
      applyUrl?: string;
    }>;
    localEvents: Array<{
      name: string;
      date?: string;
      venue?: string;
      expectedStaffing?: string;
    }>;
    localTips: string[];
    avgWageRange: { min: number; max: number };
    transportInfo?: string;
    citations: string[];
    rawContent?: string;
  };
  error?: string;
}

// Season-specific query templates
const getQueryTemplate = (city: string, state: string, seasonType: string): string => {
  const templates: Record<string, string> = {
    holiday: `Holiday warehouse jobs ${city} ${state} 2026: Amazon fulfillment center locations, UPS hiring numbers, FedEx Ground facilities, Target distribution centers, seasonal pay rates, application timeline October-November`,
    summer: `Summer hospitality jobs ${city} ${state} 2026: hotels resorts hiring, pool clubs, restaurants seasonal positions, theme parks nearby, average hourly wages, peak hiring May-June`,
    event: `Event staffing jobs ${city} ${state} 2026: major concert venues, sports stadiums, convention centers, festivals, Live Nation Legends Aramark hiring, event staff pay rates`,
    tax: `Tax season jobs ${city} ${state} 2026: H&R Block Jackson Hewitt Liberty Tax offices locations, IRS hiring, tax preparer positions, January-April seasonal work`,
    student: `Part-time student jobs ${city} ${state} Fall 2026: retail back-to-school hiring, campus employment, flexible hours, minimum wage rates`,
    blackfriday: `Black Friday jobs ${city} ${state} 2026: retail hiring Target Walmart Best Buy, warehouse positions, overnight shifts, holiday pay rates premium`
  };
  return templates[seasonType] || templates.holiday;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, stateCode, seasonType, specificQuery } = await req.json() as ResearchRequest;

    if (!city || !stateCode || !seasonType) {
      return new Response(
        JSON.stringify({ success: false, error: 'city, stateCode, and seasonType are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!apiKey) {
      console.error('PERPLEXITY_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Perplexity API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const query = specificQuery || getQueryTemplate(city, stateCode, seasonType);
    console.log(`Researching ${seasonType} jobs for ${city}, ${stateCode}`);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: `You are a job market research assistant. Provide accurate, specific information about seasonal employment opportunities. Focus on:
1. Specific employer names and their local facilities
2. Estimated hiring numbers when available
3. Pay rate ranges (hourly)
4. Application timelines
5. Transportation/commute considerations

Format your response as structured data that can be parsed. Be specific to the location mentioned.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Perplexity API error:', errorData);
      return new Response(
        JSON.stringify({ success: false, error: errorData.error?.message || 'Research request failed' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const citations = data.citations || [];

    // Parse the response into structured data
    const parsedData = parseResearchResponse(content, seasonType);

    const result: ResearchResponse = {
      success: true,
      data: {
        ...parsedData,
        citations,
        rawContent: content,
      }
    };

    console.log(`Research complete for ${city}, ${stateCode} - ${seasonType}`);
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in seasonal-research:', error);
    const errorMessage = error instanceof Error ? error.message : 'Research failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Parse Perplexity response into structured data
function parseResearchResponse(content: string, seasonType: string): {
  localEmployers: Array<{
    name: string;
    type: string;
    estimatedHires?: string;
    payRange?: string;
    applyUrl?: string;
  }>;
  localEvents: Array<{
    name: string;
    date?: string;
    venue?: string;
    expectedStaffing?: string;
  }>;
  localTips: string[];
  avgWageRange: { min: number; max: number };
  transportInfo?: string;
} {
  // Default structure based on season type
  const defaultEmployers: Record<string, Array<{ name: string; type: string }>> = {
    holiday: [
      { name: 'Amazon', type: 'warehouse' },
      { name: 'UPS', type: 'logistics' },
      { name: 'FedEx', type: 'logistics' },
      { name: 'Target', type: 'retail' },
    ],
    summer: [
      { name: 'Marriott', type: 'hospitality' },
      { name: 'Hilton', type: 'hospitality' },
      { name: 'Local Restaurants', type: 'food-service' },
    ],
    event: [
      { name: 'Live Nation', type: 'events' },
      { name: 'Legends Hospitality', type: 'events' },
      { name: 'Aramark', type: 'food-service' },
    ],
    tax: [
      { name: 'H&R Block', type: 'tax-prep' },
      { name: 'Jackson Hewitt', type: 'tax-prep' },
      { name: 'Liberty Tax', type: 'tax-prep' },
    ],
    student: [
      { name: 'Target', type: 'retail' },
      { name: 'Starbucks', type: 'food-service' },
      { name: 'Local Retail', type: 'retail' },
    ],
    blackfriday: [
      { name: 'Target', type: 'retail' },
      { name: 'Walmart', type: 'retail' },
      { name: 'Best Buy', type: 'retail' },
      { name: 'Amazon', type: 'warehouse' },
    ],
  };

  const defaultWages: Record<string, { min: number; max: number }> = {
    holiday: { min: 18, max: 26 },
    summer: { min: 15, max: 22 },
    event: { min: 16, max: 25 },
    tax: { min: 14, max: 20 },
    student: { min: 14, max: 18 },
    blackfriday: { min: 16, max: 24 },
  };

  // Extract wage information from content
  const wageMatch = content.match(/\$(\d+)(?:\s*-\s*\$?(\d+))?(?:\/hr|\/hour|per hour)/i);
  let avgWageRange = defaultWages[seasonType] || { min: 15, max: 22 };
  if (wageMatch) {
    avgWageRange = {
      min: parseInt(wageMatch[1]),
      max: wageMatch[2] ? parseInt(wageMatch[2]) : parseInt(wageMatch[1]) + 5,
    };
  }

  // Extract tips from content
  const tipPatterns = [
    /tip[s]?:?\s*([^.]+\.)/gi,
    /recommend[s]?:?\s*([^.]+\.)/gi,
    /should\s+([^.]+\.)/gi,
  ];
  
  const localTips: string[] = [];
  tipPatterns.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[1].length > 20 && match[1].length < 200) {
        localTips.push(match[1].trim());
      }
    }
  });

  // Use defaults if no tips found
  if (localTips.length === 0) {
    localTips.push(
      'Apply early - positions fill quickly during peak season',
      'Complete all required background checks in advance',
      'Be flexible with shift availability for more opportunities'
    );
  }

  return {
    localEmployers: (defaultEmployers[seasonType] || defaultEmployers.holiday).map(emp => ({
      ...emp,
      estimatedHires: 'Varies by location',
      payRange: `$${avgWageRange.min}-${avgWageRange.max}/hr`,
    })),
    localEvents: [],
    localTips: localTips.slice(0, 5),
    avgWageRange,
    transportInfo: content.includes('public transit') || content.includes('parking') 
      ? 'Check employer for parking and transit options' 
      : undefined,
  };
}
