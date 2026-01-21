import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Star, 
  Clock,
  Users,
  FileText,
  ArrowRight,
  Lightbulb,
  Target,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  title: string;
  description: string;
  link?: string;
  warning?: boolean;
}

interface FresherSuccessTipsProps {
  className?: string;
}

export function FresherSuccessTips({ className }: FresherSuccessTipsProps) {
  const standOutTips: Tip[] = [
    {
      title: "Show up 10 minutes early",
      description: "First impressions matter. Early arrivals signal reliability—your most valuable trait with no experience.",
    },
    {
      title: "Ask smart questions",
      description: "Don't pretend to know everything. Asking questions shows you care about doing the job right.",
    },
    {
      title: "Build your ratings fast",
      description: "5-star ratings unlock premium shifts. Focus on your first 10 shifts to establish your reputation.",
      link: "/career-hub/guides/first-flex-job"
    },
    {
      title: "Avoid no-shows at all costs",
      description: "One no-show can tank your rating. If you can't make a shift, cancel 24+ hours ahead.",
      warning: true
    },
  ];

  const resumeTips: Tip[] = [
    {
      title: "Lead with transferable skills",
      description: "School projects, volunteering, sports, or family responsibilities all demonstrate work-ready skills.",
      link: "/career-hub/guides/transferable-skills-guide"
    },
    {
      title: "Use action verbs",
      description: "Start bullets with words like 'organized,' 'managed,' 'coordinated,' or 'completed.'",
      link: "/career-hub/resources/action-verbs"
    },
    {
      title: "Include certifications",
      description: "Food handler's permit, forklift license, or safety certifications can set you apart.",
    },
    {
      title: "Keep it to one page",
      description: "With no experience, one focused page beats two sparse ones. Quality over quantity.",
      link: "/career-hub/guides/fresher-resume-guide"
    },
  ];

  const renderTip = (tip: Tip, index: number) => (
    <div 
      key={tip.title}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-colors",
        tip.warning ? "bg-warning/10" : "hover:bg-muted/50"
      )}
    >
      {tip.warning ? (
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{tip.title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{tip.description}</p>
        {tip.link && (
          <Link 
            to={tip.link} 
            className="text-sm text-primary hover:underline inline-flex items-center mt-1"
          >
            Learn more <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">
            <Lightbulb className="w-3 h-3 mr-1" />
            Pro Tips
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            How to Succeed With Zero Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proven strategies from workers who started with no work history
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Standing Out Card */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                Standing Out at Work
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {standOutTips.map(renderTip)}
            </CardContent>
          </Card>

          {/* Resume Building Card */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                Building Your First Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeTips.map(renderTip)}
            </CardContent>
          </Card>
        </div>

        {/* CTA Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/guides/fresher-resume-guide">
              <FileText className="w-4 h-4 mr-2" />
              Resume for Freshers Guide
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/guides/first-flex-job">
              <Target className="w-4 h-4 mr-2" />
              Your First Job Guide
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/guides/transferable-skills-guide">
              <Users className="w-4 h-4 mr-2" />
              Transferable Skills
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
