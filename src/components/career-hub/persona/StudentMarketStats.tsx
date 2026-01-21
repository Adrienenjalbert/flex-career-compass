import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Briefcase, Clock, GraduationCap } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
  source?: string;
}

interface StudentMarketStatsProps {
  className?: string;
}

export function StudentMarketStats({ className }: StudentMarketStatsProps) {
  // Stats derived from Perplexity research data for students
  const stats: StatItem[] = [
    {
      label: "Working Students",
      value: "75%",
      subtext: "of undergrads work while enrolled",
      icon: <GraduationCap className="w-5 h-5" />,
      source: "2026 BLS"
    },
    {
      label: "Tutoring Pay",
      value: "$17-25",
      subtext: "per hour for specialized subjects",
      icon: <DollarSign className="w-5 h-5" />,
      source: "Indeed 2026"
    },
    {
      label: "Delivery Driver",
      value: "$17.64",
      subtext: "average hourly + tips",
      icon: <TrendingUp className="w-5 h-5" />,
      source: "BLS 2026"
    },
    {
      label: "Fitness Instruction",
      value: "$24-32",
      subtext: "per hour (yoga, swim, fitness)",
      icon: <Users className="w-5 h-5" />,
      source: "PayScale"
    },
    {
      label: "Campus Jobs",
      value: "$12-25",
      subtext: "library, lab, peer teaching",
      icon: <Briefcase className="w-5 h-5" />,
      source: "NACE 2026"
    },
    {
      label: "Safe Work Hours",
      value: "<20",
      subtext: "hours/week to protect grades",
      icon: <Clock className="w-5 h-5" />,
      source: "Georgetown CEW"
    },
  ];

  return (
    <section className={`py-16 bg-muted/30 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            2026 Student Job Market
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            What Students Earn in 2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real wage data from BLS, Indeed, and university research to help you find the best-paying flexible jobs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow border-2 hover:border-primary/20">
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
      </div>
    </section>
  );
}
