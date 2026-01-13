import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Briefcase, 
  ShoppingBag, 
  Utensils, 
  Truck, 
  Calendar, 
  MapPin,
  ExternalLink,
  CheckCircle2,
  Users,
  Clock,
} from "lucide-react";
import { CityEmployer, formatPayRange } from "@/data/localized-content";

interface LocalEmployerCardProps {
  employer: CityEmployer;
  showVerificationBadge?: boolean;
}

const employerTypeIcons: Record<CityEmployer['employer_type'], React.ElementType> = {
  warehouse: Building2,
  retail: ShoppingBag,
  hospitality: Utensils,
  logistics: Truck,
  convention: Calendar,
  stadium: Building2,
  restaurant: Utensils,
  hotel: Building2,
  cleaning: Building2,
  other: Briefcase,
};

const employerTypeLabels: Record<CityEmployer['employer_type'], string> = {
  warehouse: 'Warehouse & Fulfillment',
  retail: 'Retail',
  hospitality: 'Hospitality',
  logistics: 'Logistics & Delivery',
  convention: 'Convention Center',
  stadium: 'Sports & Entertainment',
  restaurant: 'Restaurant',
  hotel: 'Hotel & Lodging',
  cleaning: 'Cleaning & Facilities',
  other: 'General',
};

export function LocalEmployerCard({ employer, showVerificationBadge = true }: LocalEmployerCardProps) {
  const Icon = employerTypeIcons[employer.employer_type] || Briefcase;
  const payRange = formatPayRange(employer.pay_range_min, employer.pay_range_max);
  
  const formatHiringWindow = () => {
    if (!employer.hiring_start_date) return null;
    const start = new Date(employer.hiring_start_date);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (!employer.hiring_end_date) return `Hiring from ${startStr}`;
    
    const end = new Date(employer.hiring_end_date);
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `Hiring ${startStr} - ${endStr}`;
  };

  const hiringWindow = formatHiringWindow();

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-foreground truncate">
                {employer.employer_name}
              </h3>
              {showVerificationBadge && employer.is_verified && (
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              )}
            </div>
            
            {employer.facility_name && (
              <p className="text-sm text-muted-foreground mb-1">
                {employer.facility_name}
              </p>
            )}
            
            <p className="text-xs text-muted-foreground">
              {employerTypeLabels[employer.employer_type]}
            </p>
          </div>
          
          {payRange && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 whitespace-nowrap">
              {payRange}
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="mt-3 space-y-1.5">
          {employer.facility_address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span className="text-xs">{employer.facility_address}</span>
            </div>
          )}
          
          {employer.estimated_seasonal_hires && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-xs">
                ~{employer.estimated_seasonal_hires.toLocaleString()} seasonal positions
              </span>
            </div>
          )}
          
          {hiringWindow && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-xs">{hiringWindow}</span>
            </div>
          )}
        </div>

        {/* Apply Button */}
        {employer.apply_url && (
          <div className="mt-3 pt-3 border-t">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full text-primary hover:bg-primary/5"
            >
              <a 
                href={employer.apply_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Apply Now
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </Button>
          </div>
        )}

        {/* Source citation */}
        {employer.is_verified && employer.verified_at && (
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            Verified {new Date(employer.verified_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            {employer.source_citation && ` • ${employer.source_citation}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
