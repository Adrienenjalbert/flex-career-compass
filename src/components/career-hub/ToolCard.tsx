import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingUp, MapPin, DollarSign, PiggyBank, Target, ShieldCheck } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: 'Calculator' | 'TrendingUp' | 'MapPin' | 'DollarSign' | 'PiggyBank' | 'Target' | 'ShieldCheck';
  href: string;
  featured?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  TrendingUp,
  MapPin,
  DollarSign,
  PiggyBank,
  Target,
  ShieldCheck,
};

const ToolCard = ({ title, description, icon, href, featured }: ToolCardProps) => {
  const Icon = iconMap[icon];

  return (
    <Link 
      to={href}
      className={`group bg-card border rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 ${
        featured 
          ? 'border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 hover:border-accent/50' 
          : 'border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-5">
        <div className={`p-4 rounded-xl transition-colors ${
          featured 
            ? 'bg-accent/20 group-hover:bg-accent/30' 
            : 'bg-primary/10 group-hover:bg-primary/20'
        }`}>
          <Icon className={`h-7 w-7 ${featured ? 'text-accent' : 'text-primary'}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-semibold transition-colors ${
            featured 
              ? 'text-accent group-hover:text-accent' 
              : 'text-card-foreground group-hover:text-primary'
          }`}>
            {title}
          </h3>
          <p className="text-muted-foreground mt-2 mb-4 leading-relaxed">
            {description}
          </p>
          <div className={`flex items-center font-medium ${
            featured ? 'text-accent' : 'text-primary'
          }`}>
            Use tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      {featured && (
        <div className="mt-6 pt-6 border-t border-accent/20">
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}
    </Link>
  );
};

export default ToolCard;
