import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ExternalLink, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  TrendingUp,
  CheckCircle2,
  Youtube
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillRecommendation } from "@/data/skill-recommendations";

interface SkillRecommendationCardProps {
  recommendation: SkillRecommendation;
  isCompleted?: boolean;
  onToggleComplete?: (skillId: string) => void;
  compact?: boolean;
}

const SkillRecommendationCard = ({ 
  recommendation, 
  isCompleted = false,
  onToggleComplete,
  compact = false 
}: SkillRecommendationCardProps) => {
  const [isOpen, setIsOpen] = useState(!compact);

  const categoryConfig = {
    certification: { label: "Certification", color: "bg-accent text-accent-foreground" },
    technical: { label: "Technical Skill", color: "bg-primary text-primary-foreground" },
    soft: { label: "Soft Skill", color: "bg-secondary text-secondary-foreground" }
  };

  const config = categoryConfig[recommendation.category];

  if (compact) {
    return (
      <Card className={cn(
        "transition-all",
        isCompleted && "opacity-60 border-success/30 bg-success/5"
      )}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {onToggleComplete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(recommendation.skillId);
                      }}
                      className={cn(
                        "mt-1 rounded-full p-0.5 transition-colors",
                        isCompleted ? "text-success" : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <CheckCircle2 className={cn("h-5 w-5", !isCompleted && "opacity-40")} />
                    </button>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className={cn(
                        "text-base",
                        isCompleted && "line-through text-muted-foreground"
                      )}>
                        {recommendation.skillName}
                      </CardTitle>
                      <Badge variant="secondary" className={cn("text-xs", config.color)}>
                        {config.label}
                      </Badge>
                      {recommendation.quickWin && !isCompleted && (
                        <Badge variant="outline" className="text-xs border-warning text-warning">
                          <Zap className="h-3 w-3 mr-1" />
                          Quick Win
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {recommendation.whyItMatters}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs">{recommendation.timeEstimate}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4 space-y-4">
              {/* How to Achieve */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  How to Achieve This
                </h4>
                <ol className="space-y-1.5 text-sm text-muted-foreground">
                  {recommendation.howToAchieve.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-medium text-foreground shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-medium text-sm mb-2">Resources</h4>
                <div className="space-y-2">
                  {recommendation.resources.slice(0, 3).map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {resource.name}
                        </span>
                        {resource.highlight && (
                          <Badge variant="secondary" className="text-xs">
                            {resource.highlight}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xs">{resource.cost}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Time & Cost */}
              <div className="flex items-center gap-4 text-sm pt-2 border-t">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{recommendation.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{recommendation.costRange}</span>
                </div>
              </div>

              {/* ROI */}
              {recommendation.roi && (
                <div className="p-3 bg-success/10 rounded-lg text-sm">
                  <span className="font-medium text-success">💰 ROI: </span>
                  <span className="text-muted-foreground">{recommendation.roi}</span>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  }

  // Full card view
  return (
    <Card className={cn(
      "transition-all",
      isCompleted && "opacity-60 border-success/30 bg-success/5"
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {onToggleComplete && (
              <button
                onClick={() => onToggleComplete(recommendation.skillId)}
                className={cn(
                  "mt-1 rounded-full p-0.5 transition-colors",
                  isCompleted ? "text-success" : "text-muted-foreground hover:text-primary"
                )}
              >
                <CheckCircle2 className={cn("h-6 w-6", !isCompleted && "opacity-40")} />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CardTitle className={cn(
                  "text-lg",
                  isCompleted && "line-through text-muted-foreground"
                )}>
                  {recommendation.skillName}
                </CardTitle>
                <Badge variant="secondary" className={config.color}>
                  {config.label}
                </Badge>
                {recommendation.quickWin && !isCompleted && (
                  <Badge variant="outline" className="border-warning text-warning">
                    <Zap className="h-3 w-3 mr-1" />
                    Quick Win
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{recommendation.whyItMatters}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* How to Achieve */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How to Achieve This
          </h4>
          <ol className="space-y-2 text-muted-foreground">
            {recommendation.howToAchieve.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-semibold text-foreground bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3">Get Started</h4>
          <div className="grid gap-2">
            {recommendation.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {resource.name}
                    </span>
                    {resource.highlight && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {resource.highlight}
                      </Badge>
                    )}
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {resource.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{resource.cost}</div>
                </div>
              </a>
            ))}
          </div>

          {recommendation.youtubeSearch && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="mt-3 w-full"
            >
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(recommendation.youtubeSearch)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-4 w-4 mr-2 text-red-500" />
                Watch Free Tutorials on YouTube
              </a>
            </Button>
          )}
        </div>

        {/* Time & Cost Summary */}
        <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Time</div>
              <div className="font-medium">{recommendation.timeEstimate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Cost</div>
              <div className="font-medium">{recommendation.costRange}</div>
            </div>
          </div>
        </div>

        {/* ROI */}
        {recommendation.roi && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-success mb-1">Return on Investment</div>
                <p className="text-sm text-muted-foreground">{recommendation.roi}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillRecommendationCard;
