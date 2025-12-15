import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Clock } from "lucide-react";
import type { Role } from "@/data/roles";

interface RoleCardProps {
  role: Role;
}

const RoleCard = ({ role }: RoleCardProps) => {
  return (
    <Link 
      to={`/career-hub/roles/${role.slug}`}
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
    >
      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
        {role.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {role.shortDescription}
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-card-foreground">
            ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground capitalize">
            {role.industry}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {role.skills.slice(0, 3).map((skill) => (
          <span 
            key={skill}
            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center text-primary text-sm font-medium">
        View career guide <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default RoleCard;
