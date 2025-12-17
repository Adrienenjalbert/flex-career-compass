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
      className="group bg-card border border-border rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {location.city}, {location.stateCode}
          </h3>
          <p className="text-sm text-muted-foreground">
            {location.state}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-5 bg-success/10 rounded-xl px-4 py-3">
        <DollarSign className="h-5 w-5 text-success" />
        <span className="font-medium text-card-foreground">
          ${location.avgHourlyWage.min}-${location.avgHourlyWage.max}/hr avg
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {location.topIndustries.slice(0, 3).map((industry) => (
          <span 
            key={industry}
            className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium"
          >
            {industry}
          </span>
        ))}
      </div>

      <div className="flex items-center text-primary font-medium">
        Explore jobs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default LocationCard;
