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
  AlertTriangle,
  Calendar,
  Baby,
  Shield
} from "lucide-react";

interface Tip {
  title: string;
  description: string;
  link?: { path: string; label: string };
  warning?: boolean;
}

interface ParentSuccessTipsProps {
  className?: string;
}

export function ParentSuccessTips({ className }: ParentSuccessTipsProps) {
  const schedulingTips: Tip[] = [
    {
      title: "Match School Hours with Shift Times",
      description: "Many Indeed Flex warehouse and cleaning shifts run 8am-2pm or 9am-3pm—perfect for school pickup. Filter by time to find these golden shifts.",
      link: { path: "/career-hub/tools/shift-planner", label: "Plan around school" },
    },
    {
      title: "Build a Backup Childcare Plan",
      description: "Have 2-3 backup options (family, neighbors, drop-in daycare) for unexpected shift opportunities or schedule changes. This flexibility helps you earn more.",
      link: { path: "/career-hub/tools/childcare-calculator", label: "Calculate costs" },
    },
    {
      title: "Use School Breaks Strategically",
      description: "Summer and winter breaks mean less childcare juggling. Many parents ramp up hours during breaks and scale back during the school year.",
      warning: true,
    },
  ];

  const financialTips: Tip[] = [
    {
      title: "Know Your Break-Even Hourly Rate",
      description: "Calculate: (Childcare Cost ÷ Work Hours) + Commute Costs. If your pay exceeds this, you're earning money. If not, consider different arrangements.",
      link: { path: "/career-hub/tools/childcare-calculator", label: "Find your break-even" },
    },
    {
      title: "Claim the Child Care Tax Credit",
      description: "The CDCTC provides 20-35% credit on up to $3,000/child ($6,000 for 2+ kids) in childcare expenses. This can save you $1,050-$2,100 annually.",
      link: { path: "/career-hub/tools/tax-calculator", label: "Estimate tax savings" },
    },
    {
      title: "Use Same Day Pay for Emergencies",
      description: "Access 50% of your earnings within 1 hour after shifts. This eliminates the need for payday loans or credit cards for unexpected expenses.",
      link: { path: "/career-hub/guides/same-day-pay-explained", label: "Learn about Same Day Pay" },
    },
  ];

  const wellbeingTips: Tip[] = [
    {
      title: "Don't Feel Guilty About Working",
      description: "Research shows children of working parents develop strong work ethic and independence. Quality time matters more than quantity.",
    },
    {
      title: "Set Work-Free Zones",
      description: "Designate specific times as sacred family time—dinner, bedtime routine, weekends. This boundary prevents burnout and maintains family connection.",
    },
    {
      title: "Use Medical Benefits",
      description: "Indeed Flex offers medical, dental, and vision insurance through Essential StaffCARE. This coverage can save thousands compared to marketplace plans.",
      link: { path: "/career-hub/guides/complete-guide", label: "View benefits" },
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
            Parent Success Strategies
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            How Working Parents Make It Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proven strategies from parents who balance flexible work with family life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Scheduling */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Smart Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedulingTips.map(renderTip)}
            </CardContent>
          </Card>

          {/* Financial */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-primary" />
                Financial Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {financialTips.map(renderTip)}
            </CardContent>
          </Card>

          {/* Wellbeing */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Family Wellbeing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wellbeingTips.map(renderTip)}
            </CardContent>
          </Card>
        </div>

        {/* Related Guides CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want more guidance on balancing work and family?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/guides/working-parent-guide">
                <BookOpen className="w-4 h-4 mr-2" />
                Complete Working Parent Guide
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/tools/childcare-calculator">
                <Baby className="w-4 h-4 mr-2" />
                Childcare Calculator
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/career-hub/guides/multiple-gigs">
                <Clock className="w-4 h-4 mr-2" />
                Balancing Multiple Gigs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
