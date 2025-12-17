import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, Warehouse, ShoppingBag, Building2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link 
        to={`/career-hub/industries/${id}`}
        className="group block bg-card border border-border rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:border-primary/30"
      >
        <div className="flex items-start gap-5">
          <motion.div 
            className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-7 w-7 text-primary" />
          </motion.div>
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
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="text-primary"
              >
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default IndustryCard;
