import { TrendingUp, Users, DollarSign, Briefcase, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
  icon?: "trending" | "users" | "dollar" | "briefcase" | "clock" | "award";
  trend?: "up" | "down" | "neutral";
  description?: string;
}

interface ResearchStatsCardProps {
  stats: StatItem[];
  className?: string;
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  dollar: DollarSign,
  briefcase: Briefcase,
  clock: Clock,
  award: Award,
};

export function ResearchStatsCard({ stats, className }: ResearchStatsCardProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon ? iconMap[stat.icon] : TrendingUp;
        return (
          <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-muted-foreground/70 mt-1">
                  {stat.description}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
