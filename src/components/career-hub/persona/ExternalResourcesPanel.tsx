import { ExternalLink, Building2, GraduationCap, Landmark, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExternalResource {
  url: string;
  title?: string;
}

interface ExternalResourcesPanelProps {
  resources: ExternalResource[];
  className?: string;
}

function getResourceIcon(url: string) {
  const domain = url.toLowerCase();
  if (domain.includes('.gov')) return Landmark;
  if (domain.includes('.edu')) return GraduationCap;
  if (domain.includes('bls.gov') || domain.includes('irs.gov')) return Building2;
  return Newspaper;
}

function getResourceCategory(url: string): string {
  const domain = url.toLowerCase();
  if (domain.includes('bls.gov')) return "Bureau of Labor Statistics";
  if (domain.includes('irs.gov')) return "IRS";
  if (domain.includes('uscis.gov')) return "USCIS";
  if (domain.includes('dol.gov')) return "Dept. of Labor";
  if (domain.includes('.gov')) return "Government";
  if (domain.includes('.edu')) return "Academic";
  return "Research";
}

export function ExternalResourcesPanel({ resources, className }: ExternalResourcesPanelProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Landmark className="w-5 h-5 text-primary" />
          Official Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource, index) => {
            const Icon = getResourceIcon(resource.url);
            const category = getResourceCategory(resource.url);
            
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {resource.title || category}
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {new URL(resource.url).hostname}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Official
                </Badge>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
