import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Calendar, TrendingUp, Shield, Users } from "lucide-react";

interface Benefit {
  icon: React.ElementType;
  title: string;
  stat: string;
  description: string;
}

interface WhyFlexSectionProps {
  personaName: string;
  benefits: Benefit[];
  headline?: string;
}

const defaultBenefits: Benefit[] = [
  { 
    icon: Clock, 
    title: "Flexible Scheduling", 
    stat: "100%",
    description: "Control over when you work" 
  },
  { 
    icon: DollarSign, 
    title: "Same Day Pay", 
    stat: "50%",
    description: "Access earnings within 1 hour" 
  },
  { 
    icon: Calendar, 
    title: "No Minimums", 
    stat: "0 hrs",
    description: "Work as much or little as needed" 
  },
  { 
    icon: TrendingUp, 
    title: "Skill Building", 
    stat: "20+",
    description: "Role types to develop experience" 
  },
];

export function WhyFlexSection({ 
  personaName, 
  benefits = defaultBenefits,
  headline 
}: WhyFlexSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {headline || `Why ${personaName} Choose Flexible Work`}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join 165,000+ Flexers who've discovered the freedom of working on your own terms.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title} 
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50"
            >
              <CardContent className="pt-6">
                {/* Stat Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
