import { Clock, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface WhyFlexSectionProps {
  personaName: string;
  benefits?: Benefit[];
  headline?: string;
  className?: string;
}

const defaultBenefits: Benefit[] = [
  { 
    icon: Clock, 
    title: "Flexible Scheduling", 
    description: "Control over when you work" 
  },
  { 
    icon: DollarSign, 
    title: "Same Day Pay", 
    description: "Access earnings within 1 hour" 
  },
  { 
    icon: Calendar, 
    title: "No Minimums", 
    description: "Work as much or little as needed" 
  },
  { 
    icon: TrendingUp, 
    title: "Skill Building", 
    description: "20+ role types to develop experience" 
  },
];

export function WhyFlexSection({ 
  personaName, 
  benefits = defaultBenefits,
  headline,
  className 
}: WhyFlexSectionProps) {
  return (
    <section className={cn("py-10 border-b border-border/50", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Headline - Left side on desktop */}
          <div className="lg:max-w-xs flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">
              {headline || `Why ${personaName} Choose Flex`}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              165,000+ Flexers nationwide
            </p>
          </div>
          
          {/* Benefits - Horizontal strip */}
          <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title} 
                className="flex items-center gap-3 bg-muted/40 rounded-full px-4 py-2.5 hover:bg-muted/60 transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium text-sm text-foreground block">
                    {benefit.title}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {benefit.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
