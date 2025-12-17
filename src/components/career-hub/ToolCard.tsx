import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  PiggyBank, 
  Target, 
  ShieldCheck, 
  Baby, 
  Car,
  Clock,
  Calendar,
  Languages
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: 'Calculator' | 'TrendingUp' | 'MapPin' | 'DollarSign' | 'PiggyBank' | 'Target' | 'ShieldCheck' | 'Baby' | 'Car' | 'Languages';
  href: string;
  featured?: boolean;
  answersQuestion?: string;
  dataYear?: string;
  estimatedTime?: string;
  compact?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  TrendingUp,
  MapPin,
  DollarSign,
  PiggyBank,
  Target,
  ShieldCheck,
  Baby,
  Car,
  Languages,
};

const ToolCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  featured,
  answersQuestion,
  dataYear,
  estimatedTime,
  compact = false
}: ToolCardProps) => {
  const Icon = iconMap[icon];

  if (compact) {
    return (
      <Link
        to={href}
        className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {title}
          </h3>
          {answersQuestion && (
            <p className="text-sm text-muted-foreground truncate">{answersQuestion}</p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className="group relative flex flex-col h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Badges Row */}
      {(dataYear || estimatedTime) && (
        <div className="flex items-center gap-2 mb-4">
          {dataYear && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/50 text-accent-foreground text-xs font-medium rounded-full">
              <Calendar className="w-3 h-3" />
              {dataYear} Data
            </span>
          )}
          {estimatedTime && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
              <Clock className="w-3 h-3" />
              {estimatedTime}
            </span>
          )}
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {answersQuestion && (
        <p className="text-sm font-medium text-primary/80 mb-2">
          Answers: "{answersQuestion}"
        </p>
      )}

      <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50 text-primary font-medium text-sm group-hover:gap-3 transition-all">
        Use tool
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default ToolCard;
