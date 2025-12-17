// Firecrawl API client for data verification
// Uses Supabase Edge Functions to securely access Firecrawl

type FirecrawlResponse<T = any> = {
  success: boolean;
  error?: string;
  data?: T;
};

type ScrapeOptions = {
  formats?: ('markdown' | 'html' | 'rawHtml' | 'links')[];
  onlyMainContent?: boolean;
  waitFor?: number;
  location?: { country?: string; languages?: string[] };
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// Check if Cloud is enabled
export const isCloudEnabled = (): boolean => {
  return Boolean(SUPABASE_URL);
};

export const firecrawlApi = {
  /**
   * Scrape a single URL and return its content
   */
  async scrape(url: string, options?: ScrapeOptions): Promise<FirecrawlResponse> {
    // Check if Cloud is enabled
    if (!SUPABASE_URL) {
      console.error('Supabase URL not configured. Please enable Lovable Cloud.');
      return { 
        success: false, 
        error: 'Lovable Cloud is not enabled. Please enable Cloud to use Firecrawl functionality.' 
      };
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/firecrawl-scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options }),
      });

      // Check if the function exists
      if (response.status === 404) {
        return {
          success: false,
          error: 'Edge function not found. The firecrawl-scrape function may not be deployed yet.'
        };
      }

      // Check for other HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText || 'Request failed'}`
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Firecrawl scrape error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape URL' 
      };
    }
  },

  /**
   * Scrape multiple URLs in sequence
   */
  async scrapeMultiple(urls: string[], options?: ScrapeOptions): Promise<FirecrawlResponse[]> {
    const results: FirecrawlResponse[] = [];
    
    for (const url of urls) {
      const result = await this.scrape(url, options);
      results.push(result);
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return results;
  }
};

// Data verification sources
export const verificationSources = {
  minimumWage: 'https://www.dol.gov/agencies/whd/minimum-wage/state',
  stateTaxes: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2024/',
  unemployment: 'https://oui.doleta.gov/unemploy/data_summary/DataSum.asp',
  federalTax: 'https://www.irs.gov/filing/federal-income-tax-rates-and-brackets',
};
