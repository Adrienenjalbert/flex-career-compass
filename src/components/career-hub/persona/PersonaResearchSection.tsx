import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { 
  ResearchStatsCard, 
  CitationsList, 
  KeywordsCloud, 
  ResearchInsightsPanel,
  ExternalResourcesPanel 
} from "@/components/career-hub/persona";
import { usePersonaResearchData, PersonaResearchData } from "@/hooks/usePersonaResearch";

interface PersonaResearchSectionProps {
  personaSlug: string;
  personaName: string;
}

// Extract key stats from research response
function extractStatsFromResponse(response: string | null, statistics: Record<string, any>): Array<{
  label: string;
  value: string;
  icon: "trending" | "users" | "dollar" | "briefcase" | "clock" | "award";
}> {
  const stats: Array<{ label: string; value: string; icon: "trending" | "users" | "dollar" | "briefcase" | "clock" | "award" }> = [];
  
  // Try to extract percentages from the research
  if (statistics.percentages && statistics.percentages.length > 0) {
    stats.push({
      label: "Key Statistic",
      value: statistics.percentages[0],
      icon: "trending"
    });
  }
  
  // Extract wage data
  if (statistics.wages && statistics.wages.length > 0) {
    stats.push({
      label: "Avg. Pay Range",
      value: statistics.wages[0],
      icon: "dollar"
    });
  }
  
  // Default stats if nothing extracted
  if (stats.length === 0 && response) {
    // Look for common patterns in the response
    const percentMatch = response.match(/(\d{1,3}(?:\.\d+)?)\s*%/);
    if (percentMatch) {
      stats.push({
        label: "Key Data Point",
        value: `${percentMatch[1]}%`,
        icon: "trending"
      });
    }
    
    const dollarMatch = response.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (dollarMatch) {
      stats.push({
        label: "Typical Earnings",
        value: `$${dollarMatch[1]}`,
        icon: "dollar"
      });
    }
  }
  
  return stats;
}

export function PersonaResearchSection({ personaSlug, personaName }: PersonaResearchSectionProps) {
  const { data, isLoading, hasResearch } = usePersonaResearchData(personaSlug);
  
  if (isLoading) {
    return (
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-muted-foreground">Loading research data...</span>
          </div>
        </div>
      </section>
    );
  }
  
  if (!hasResearch || !data) {
    return null;
  }
  
  const stats = extractStatsFromResponse(data.perplexity_response, data.statistics);
  const researchDate = data.researched_at ? new Date(data.researched_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  }) : null;
  
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            2026 {personaName} Job Market Insights
          </h2>
        </div>
        
        {researchDate && (
          <div className="flex items-center justify-center gap-1 mb-8">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last researched: {researchDate}
            </span>
          </div>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Research Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            {stats.length > 0 && (
              <ResearchStatsCard stats={stats} />
            )}
            
            {/* Research Insights */}
            {data.perplexity_response && (
              <ResearchInsightsPanel 
                response={data.perplexity_response}
                title={`${personaName} Research Summary`}
              />
            )}
            
            {/* Keywords */}
            {data.seo_keywords && data.seo_keywords.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <KeywordsCloud keywords={data.seo_keywords} maxDisplay={15} />
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Citations */}
            {data.citations && data.citations.length > 0 && (
              <CitationsList citations={data.citations} maxDisplay={5} />
            )}
            
            {/* External Resources */}
            {data.external_resources && data.external_resources.length > 0 && (
              <ExternalResourcesPanel resources={data.external_resources} />
            )}
            
            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Ready to Get Started?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join 165,000+ Flexers finding work that fits their life.
                </p>
                <Button asChild className="w-full">
                  <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                    Download App
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
