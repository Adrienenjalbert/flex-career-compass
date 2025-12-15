import { Link } from "react-router-dom";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import type { Location } from "@/data/locations";

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <Link 
      to={`/career-hub/locations/${location.slug}`}
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start gap-3 mb-4">
        <MapPin className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {location.city}, {location.stateCode}
          </h3>
          <p className="text-sm text-muted-foreground">
            {location.state}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-4 w-4 text-success" />
        <span className="text-sm text-card-foreground">
          ${location.avgHourlyWage.min}-${location.avgHourlyWage.max}/hr avg
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {location.topIndustries.slice(0, 3).map((industry) => (
          <span 
            key={industry}
            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
          >
            {industry}
          </span>
        ))}
      </div>

      <div className="flex items-center text-primary text-sm font-medium">
        Explore jobs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default LocationCard;
