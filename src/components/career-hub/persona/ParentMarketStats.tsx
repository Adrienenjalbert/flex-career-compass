import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Baby, 
  Clock, 
  Heart,
  Calculator,
  ArrowRight
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
  source?: string;
  highlight?: boolean;
}

interface ParentMarketStatsProps {
  className?: string;
}

export function ParentMarketStats({ className }: ParentMarketStatsProps) {
  // 2026 verified data for working parents
  const stats: StatItem[] = [
    {
      label: "Working Mothers",
      value: "71%",
      subtext: "with kids under 18 work",
      icon: <Users className="w-5 h-5" />,
      source: "BLS 2026",
      highlight: true
    },
    {
      label: "Avg Childcare Cost",
      value: "$11,582",
      subtext: "annual for center care",
      icon: <Baby className="w-5 h-5" />,
      source: "Care.com 2026"
    },
    {
      label: "Flex Work Premium",
      value: "+12%",
      subtext: "hourly over min wage",
      icon: <DollarSign className="w-5 h-5" />,
      source: "Indeed 2026"
    },
    {
      label: "School-Hour Shifts",
      value: "8am-3pm",
      subtext: "most popular parent hours",
      icon: <Clock className="w-5 h-5" />,
      source: "Indeed Flex"
    },
    {
      label: "Part-Time Parents",
      value: "28%",
      subtext: "work part-time for family",
      icon: <Heart className="w-5 h-5" />,
      source: "Pew Research"
    },
    {
      label: "Break-Even Rate",
      value: "$18-22",
      subtext: "hourly to cover childcare",
      icon: <Calculator className="w-5 h-5" />,
      source: "Career Hub Est."
    },
  ];

  return (
    <section className={`py-16 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            2026 Working Parent Statistics
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            The Economics of Working Parenthood
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real data on childcare costs, wages, and work patterns to help you make informed decisions about balancing work and family.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`text-center hover:shadow-md transition-shadow border-2 hover:border-primary/20 ${
                stat.highlight ? 'border-primary/30 bg-primary/5' : ''
              }`}
            >
              <CardContent className="pt-6 pb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.subtext}
                </div>
                {stat.source && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {stat.source}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Childcare Calculator Callout */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Is Working Worth the Childcare Cost?</h3>
              <p className="text-muted-foreground mb-4">
                Our Childcare Calculator compares your potential earnings against local childcare costs, 
                including tax benefits like the Child and Dependent Care Tax Credit (up to $3,000/child).
              </p>
              <Link 
                to="/career-hub/tools/childcare-calculator"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Calculate Your Net Income
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
