import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  Car, 
  MapPin, 
  Lightbulb,
  Building2,
  Utensils,
  CheckCircle2,
} from "lucide-react";
import { CityTransportInfo } from "@/data/localized-content";

interface CommuteGuideProps {
  transportInfo: CityTransportInfo;
  cityName: string;
}

export function CommuteGuide({ transportInfo, cityName }: CommuteGuideProps) {
  const hasTransitInfo = transportInfo.major_transit_lines && transportInfo.major_transit_lines.length > 0;
  const hasTips = transportInfo.commute_tips && transportInfo.commute_tips.length > 0;
  
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Getting to Work in {cityName}
          {transportInfo.is_verified && (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Transit Lines */}
        {hasTransitInfo && (
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Bus className="h-4 w-4 text-primary" />
              Public Transit
            </h4>
            <div className="flex flex-wrap gap-2">
              {transportInfo.major_transit_lines!.map((line) => (
                <Badge key={line} variant="outline" className="text-xs">
                  {line}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Warehouse Districts */}
        {transportInfo.transit_to_warehouse_districts && (
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
              <Building2 className="h-4 w-4 text-primary" />
              To Warehouse Areas
            </h4>
            <p className="text-sm text-muted-foreground">
              {transportInfo.transit_to_warehouse_districts}
            </p>
          </div>
        )}

        {/* Hospitality Areas */}
        {transportInfo.transit_to_hospitality_areas && (
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
              <Utensils className="h-4 w-4 text-primary" />
              To Hospitality Areas
            </h4>
            <p className="text-sm text-muted-foreground">
              {transportInfo.transit_to_hospitality_areas}
            </p>
          </div>
        )}

        {/* Parking */}
        {transportInfo.parking_notes && (
          <div>
            <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
              <Car className="h-4 w-4 text-primary" />
              Parking
            </h4>
            <p className="text-sm text-muted-foreground">
              {transportInfo.parking_notes}
            </p>
          </div>
        )}

        {/* Rideshare */}
        {transportInfo.rideshare_notes && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
            <span className="font-medium">Rideshare tip:</span> {transportInfo.rideshare_notes}
          </div>
        )}

        {/* Commute Tips */}
        {hasTips && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Pro Tips
            </h4>
            <ul className="space-y-1.5">
              {transportInfo.commute_tips!.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Verification */}
        {transportInfo.verified_at && (
          <p className="text-[10px] text-muted-foreground/60 pt-2 border-t">
            Last updated: {new Date(transportInfo.verified_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            {transportInfo.source_citation && ` • Source: ${transportInfo.source_citation}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
