import { Info, AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type DisclaimerType = 'calculator' | 'comparison' | 'educational' | 'planning';

interface ToolDisclaimerProps {
  type: DisclaimerType;
  sources?: string[];
  lastUpdated?: string;
  customText?: string;
}

const disclaimerContent: Record<DisclaimerType, { title: string; description: string }> = {
  calculator: {
    title: "Educational Estimate Only",
    description: "This calculator provides estimates for educational and planning purposes only. Results are based on general data and may not reflect your specific situation. Tax laws, rates, and regulations change frequently. Always consult a qualified tax professional or financial advisor before making financial decisions."
  },
  comparison: {
    title: "General Comparison Data",
    description: "Cost of living and salary data are estimates based on publicly available sources and averages. Actual costs vary significantly by specific location, lifestyle, and time of year. Housing costs, in particular, can fluctuate rapidly. Use this as a general guide, not a definitive assessment."
  },
  educational: {
    title: "Career Guidance Information",
    description: "Salary ranges, career timelines, and skill requirements shown are general industry estimates. Actual compensation and advancement opportunities vary significantly by employer, location, experience, and individual performance. Use as a starting point for career exploration."
  },
  planning: {
    title: "Planning Tool Estimates",
    description: "This tool provides projections for planning purposes only. Actual earnings depend on shift availability, employer rates, tips, overtime, and other factors beyond this tool's scope. Check Indeed Flex for current available shifts and actual pay rates."
  }
};

const ToolDisclaimer = ({ type, sources, lastUpdated, customText }: ToolDisclaimerProps) => {
  const content = disclaimerContent[type];
  
  return (
    <Alert className="bg-muted/50 border-muted-foreground/20">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm">
        <div className="space-y-2">
          <p className="font-medium">{content.title}</p>
          <p className="text-muted-foreground">
            {customText || content.description}
          </p>
          
          {sources && sources.length > 0 && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Data Sources:</span>{" "}
                {sources.join(" • ")}
              </p>
            </div>
          )}
          
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

// Compact inline disclaimer for smaller spaces
export const InlineDisclaimer = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

// Source citation component
export const SourceCitation = ({ 
  sources, 
  lastVerified 
}: { 
  sources: Array<{ name: string; url?: string }>; 
  lastVerified?: string 
}) => (
  <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/20 rounded-lg">
    <p className="font-medium">Data Sources:</p>
    <ul className="space-y-0.5">
      {sources.map((source, i) => (
        <li key={i} className="flex items-center gap-1">
          {source.url ? (
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              {source.name}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span>{source.name}</span>
          )}
        </li>
      ))}
    </ul>
    {lastVerified && (
      <p className="pt-1 border-t border-border/30">Last verified: {lastVerified}</p>
    )}
  </div>
);

export default ToolDisclaimer;
