import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  DollarSign, 
  TrendingUp,
  Briefcase,
  AlertCircle,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ElementType;
  source?: string;
  highlight?: boolean;
}

interface ImmigrantMarketStatsProps {
  className?: string;
}

export function ImmigrantMarketStats({ className }: ImmigrantMarketStatsProps) {
  const stats: StatItem[] = [
    {
      label: "Immigrant Workforce",
      value: "28%",
      subtext: "of US workforce are immigrants",
      icon: Globe,
      source: "BLS 2024",
      highlight: true
    },
    {
      label: "STEM Workers",
      value: "18%",
      subtext: "of STEM jobs held by immigrants",
      icon: TrendingUp,
      source: "Pew Research 2024"
    },
    {
      label: "Construction",
      value: "12.5%",
      subtext: "of construction workers",
      icon: Briefcase,
      source: "BLS 2024"
    },
    {
      label: "Warehouse Pay",
      value: "$16-24",
      subtext: "per hour for warehouse roles",
      icon: DollarSign,
      source: "Indeed 2025"
    },
    {
      label: "Hospitality",
      value: "$14-20",
      subtext: "per hour for entry roles",
      icon: Briefcase,
      source: "Indeed 2025"
    },
    {
      label: "Flexer Community",
      value: "165K+",
      subtext: "diverse workers nationwide",
      icon: Users,
      source: "Indeed Flex 2025"
    },
  ];

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">
            2026 Employment Data
          </Badge>
          <h2 className="text-3xl font-bold mb-3">
            Immigrants in the US Workforce
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Research-backed data on immigrant employment and opportunities
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50",
                stat.highlight && "ring-2 ring-primary/20 bg-primary/5"
              )}
            >
              <CardContent className="p-5 lg:p-6">
                {/* Icon Badge - Top right */}
                <div className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center",
                  stat.highlight ? "bg-primary/20" : "bg-muted"
                )}>
                  <stat.icon className={cn(
                    "w-5 h-5",
                    stat.highlight ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                
                {/* Value */}
                <div className="mb-3 pr-12">
                  <span className={cn(
                    "text-3xl lg:text-4xl font-bold tracking-tight",
                    stat.highlight ? "text-primary" : "text-foreground"
                  )}>
                    {stat.value}
                  </span>
                </div>
                
                {/* Label and subtext */}
                <h3 className="font-semibold text-sm lg:text-base mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">
                  {stat.subtext}
                </p>
                
                {/* Source citation */}
                {stat.source && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <span className="text-[10px] lg:text-xs text-muted-foreground/70 uppercase tracking-wide">
                      Source: {stat.source}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <AlertCircle className="w-3 h-3" />
            Wages vary by location, role, and authorization status.
          </p>
        </div>
      </div>
    </section>
  );
}
