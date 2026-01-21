import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Clock, 
  DollarSign, 
  BookOpen, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface Tip {
  title: string;
  description: string;
  link?: { path: string; label: string };
  warning?: boolean;
}

interface StudentSuccessTipsProps {
  className?: string;
}

export function StudentSuccessTips({ className }: StudentSuccessTipsProps) {
  // Tips derived from research insights
  const balanceTips: Tip[] = [
    {
      title: "Keep Work Under 20 Hours/Week",
      description: "Research shows working beyond 20 hours significantly impacts GPA. Students who work 15-20 hours maintain better academic performance.",
      link: { path: "/career-hub/guides/multiple-gigs", label: "Learn to balance work" },
    },
    {
      title: "Prioritize Evening & Weekend Shifts",
      description: "Warehouse evening shifts (4pm-midnight) and weekend hospitality events don't conflict with classes. Use the Shift Planner to map your schedule.",
      link: { path: "/career-hub/tools/shift-planner", label: "Plan your schedule" },
    },
    {
      title: "Avoid Missing Classes for Work",
      description: "25% of working students report missing classes due to job conflicts. Choose flexible platforms that let you decline shifts during exams.",
      warning: true,
    },
  ];

  const earningsTips: Tip[] = [
    {
      title: "Consider Specialized Skills",
      description: "Tutoring in STEM subjects pays $17-25/hr. If you're strong in math, science, or languages, tutoring can be your highest-paying option.",
      link: { path: "/career-hub/guides/skill-boost", label: "Boost your pay" },
    },
    {
      title: "Stack Campus + Gig Work",
      description: "Combine a 10-hour campus job for stability with flexible app-based shifts during peak demand periods like holidays.",
      link: { path: "/career-hub/tools/pay-calculator", label: "Calculate earnings" },
    },
    {
      title: "Leverage Same Day Pay",
      description: "Access up to 50% of your earnings within 1 hour after shifts. This helps manage cash flow during tight weeks without credit card debt.",
      link: { path: "/career-hub/guides/first-flex-job", label: "Get started" },
    },
  ];

  const renderTip = (tip: Tip, index: number) => (
    <div key={index} className="flex gap-4 p-4 bg-background rounded-lg border hover:border-primary/30 transition-colors">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${tip.warning ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'}`}>
        {tip.warning ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{tip.title}</h4>
        <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
        {tip.link && (
          <Link 
            to={tip.link.path}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            {tip.link.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <section className={`py-16 bg-background ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-accent text-accent-foreground border-accent/50">
            <Lightbulb className="w-3 h-3 mr-1" />
            Research-Backed Tips
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            How Students Succeed at Work + School
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on studies of 10,000+ working students, here's what actually works.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Work-Life Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Balancing Work & Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {balanceTips.map(renderTip)}
            </CardContent>
          </Card>

          {/* Maximizing Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-primary" />
                Maximizing Your Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {earningsTips.map(renderTip)}
            </CardContent>
          </Card>
        </div>

        {/* Related Guides CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to dive deeper into balancing work and school?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/guides/multiple-gigs">
                <BookOpen className="w-4 h-4 mr-2" />
                Balancing Multiple Gigs
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/guides/resume-tips">
                <BookOpen className="w-4 h-4 mr-2" />
                Resume Tips for Students
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/guides/first-flex-job">
                <BookOpen className="w-4 h-4 mr-2" />
                Getting Your First Flex Job
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
