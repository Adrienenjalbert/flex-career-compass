import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Music, 
  Building2, 
  PartyPopper,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Users,
  Clock,
  Briefcase,
} from "lucide-react";
import { CityEvent, formatEventDate, formatPayRange } from "@/data/localized-content";

interface LocalEventCardProps {
  event: CityEvent;
  showVerificationBadge?: boolean;
}

const eventTypeIcons: Record<CityEvent['event_type'], React.ElementType> = {
  sports: Trophy,
  festival: Music,
  convention: Building2,
  concert: Music,
  holiday: PartyPopper,
  corporate: Briefcase,
  other: Calendar,
};

const eventTypeLabels: Record<CityEvent['event_type'], string> = {
  sports: 'Sports Event',
  festival: 'Festival',
  convention: 'Convention',
  concert: 'Concert',
  holiday: 'Holiday Event',
  corporate: 'Corporate Event',
  other: 'Special Event',
};

const eventTypeColors: Record<CityEvent['event_type'], string> = {
  sports: 'bg-orange-100 text-orange-800',
  festival: 'bg-purple-100 text-purple-800',
  convention: 'bg-blue-100 text-blue-800',
  concert: 'bg-pink-100 text-pink-800',
  holiday: 'bg-red-100 text-red-800',
  corporate: 'bg-gray-100 text-gray-800',
  other: 'bg-slate-100 text-slate-800',
};

export function LocalEventCard({ event, showVerificationBadge = true }: LocalEventCardProps) {
  const Icon = eventTypeIcons[event.event_type] || Calendar;
  const dateStr = formatEventDate(event.event_start_date, event.event_end_date);
  const payRange = formatPayRange(event.pay_range_min, event.pay_range_max);
  
  const formatApplicationDeadline = () => {
    if (!event.application_deadline) return null;
    const deadline = new Date(event.application_deadline);
    return `Apply by ${deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const applicationDeadline = formatApplicationDeadline();

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <div className={`h-1 ${eventTypeColors[event.event_type].split(' ')[0]}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-foreground truncate">
                {event.event_name}
              </h3>
              {showVerificationBadge && event.is_verified && (
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              )}
            </div>
            
            <Badge variant="secondary" className={`text-xs ${eventTypeColors[event.event_type]}`}>
              {eventTypeLabels[event.event_type]}
            </Badge>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-3 space-y-1.5">
          {dateStr && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span className="font-medium">{dateStr}</span>
            </div>
          )}
          
          {event.venue_name && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span className="text-xs">
                {event.venue_name}
                {event.venue_address && ` • ${event.venue_address}`}
              </span>
            </div>
          )}
          
          {event.estimated_staffing_needs && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-xs">
                ~{event.estimated_staffing_needs.toLocaleString()} staff needed
              </span>
            </div>
          )}
          
          {event.roles_needed && event.roles_needed.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {event.roles_needed.slice(0, 4).map((role) => (
                <Badge key={role} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
              {event.roles_needed.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{event.roles_needed.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Pay and Deadline */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between gap-2">
          <div className="space-y-1">
            {payRange && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {payRange}
              </Badge>
            )}
            {applicationDeadline && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {applicationDeadline}
              </p>
            )}
          </div>
          
          {event.apply_url && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="text-primary hover:bg-primary/5"
            >
              <a 
                href={event.apply_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Apply
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
        </div>

        {/* Source citation */}
        {event.is_verified && event.verified_at && (
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            Verified {new Date(event.verified_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
