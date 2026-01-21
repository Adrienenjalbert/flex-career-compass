import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface KeywordsCloudProps {
  keywords: string[];
  maxDisplay?: number;
  className?: string;
}

export function KeywordsCloud({ keywords, maxDisplay = 12, className }: KeywordsCloudProps) {
  if (!keywords || keywords.length === 0) return null;

  const displayKeywords = keywords.slice(0, maxDisplay);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Related Searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayKeywords.map((keyword, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="text-xs font-normal hover:bg-muted/50 cursor-default capitalize"
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
