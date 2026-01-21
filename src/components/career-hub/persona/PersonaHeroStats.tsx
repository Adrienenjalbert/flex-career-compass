import { cn } from "@/lib/utils";
import { TrendingUp, Users, DollarSign, Briefcase, CheckCircle, Zap } from "lucide-react";

interface HeroStat {
  value: string;
  label: string;
  icon: "trending" | "users" | "dollar" | "briefcase" | "check" | "zap";
}

interface PersonaHeroStatsProps {
  stats: HeroStat[];
  className?: string;
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  dollar: DollarSign,
  briefcase: Briefcase,
  check: CheckCircle,
  zap: Zap,
};

export function PersonaHeroStats({ stats, className }: PersonaHeroStatsProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-6 md:gap-10", className)}>
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div 
            key={index} 
            className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
