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
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {roleCount} roles available
            </span>
            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IndustryCard;
