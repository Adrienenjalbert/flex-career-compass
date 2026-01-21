import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  FileCheck,
  Languages,
  ArrowRight,
  Lightbulb,
  Globe,
  AlertTriangle,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  title: string;
  description: string;
  link?: string;
  warning?: boolean;
}

interface ImmigrantSuccessTipsProps {
  className?: string;
}

export function ImmigrantSuccessTips({ className }: ImmigrantSuccessTipsProps) {
  const documentTips: Tip[] = [
    {
      title: "Prepare I-9 documents early",
      description: "Gather your documents before the interview. You must present originals—copies are not accepted.",
      link: "/career-hub/guides/i9-complete-guide"
    },
    {
      title: "Know your expiration dates",
      description: "Work authorization documents expire. Set calendar reminders 6 months before to start renewal.",
    },
    {
      title: "Keep copies for yourself",
      description: "After showing originals, keep personal copies of all work documents in a safe place.",
    },
    {
      title: "Report changes promptly",
      description: "If your name or authorization status changes, notify Indeed Flex immediately.",
      warning: true
    },
  ];

  const workplaceTips: Tip[] = [
    {
      title: "Learn key safety phrases",
      description: "Words like 'stop,' 'danger,' 'help,' and 'fire exit' are essential for any workplace.",
      link: "/career-hub/tools/worktalk"
    },
    {
      title: "Ask questions when unsure",
      description: "It's better to ask than to guess. Good employers appreciate workers who want to do things right.",
    },
    {
      title: "Build your English gradually",
      description: "Each shift is practice. Listen, learn new words, and don't be afraid to speak.",
      link: "/career-hub/tools/worktalk"
    },
    {
      title: "Know your rights",
      description: "You have the same workplace rights as any worker. Report discrimination or unfair treatment.",
    },
  ];

  const renderTip = (tip: Tip) => (
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
            Essential Tips
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            Succeeding in the US Workforce
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practical advice for immigrant workers new to American workplaces
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Documents Card */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-primary" />
                </div>
                Work Authorization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentTips.map(renderTip)}
            </CardContent>
          </Card>

          {/* Workplace Card */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Languages className="w-4 h-4 text-primary" />
                </div>
                Workplace Success
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {workplaceTips.map(renderTip)}
            </CardContent>
          </Card>
        </div>

        {/* CTA Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/guides/i9-complete-guide">
              <FileCheck className="w-4 h-4 mr-2" />
              Complete I-9 Guide
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/tools/worktalk">
              <Languages className="w-4 h-4 mr-2" />
              WorkTalk Tool
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/career-hub/guides/work-authorization-types">
              <Shield className="w-4 h-4 mr-2" />
              Authorization Types
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
