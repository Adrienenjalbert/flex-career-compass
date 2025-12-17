import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, Warehouse, ShoppingBag, Building2 } from "lucide-react";

interface IndustryCardProps {
  id: string;
  name: string;
  description: string;
  roleCount: number;
  icon: 'UtensilsCrossed' | 'Warehouse' | 'ShoppingBag' | 'Building2';
}

const iconMap = {
  UtensilsCrossed,
  Warehouse,
  ShoppingBag,
  Building2,
};

const IndustryCard = ({ id, name, description, roleCount, icon }: IndustryCardProps) => {
  const Icon = iconMap[icon];

  return (
    <Link 
      to={`/career-hub/industries/${id}`}
      className="group bg-card border border-border rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start gap-5">
        <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground mt-2 mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {roleCount} roles available
            </span>
            <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IndustryCard;
