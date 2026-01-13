import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertCircle,
  Info,
} from "lucide-react";
import { LocalizedCityData } from "@/data/localized-content";

interface DataCompletenessIndicatorProps {
  completeness: LocalizedCityData['dataCompleteness'];
  cityName: string;
  showDetails?: boolean;
}

export function DataCompletenessIndicator({ 
  completeness, 
  cityName, 
  showDetails = false 
}: DataCompletenessIndicatorProps) {
  const tierConfig = {
    tier1: {
      label: 'Comprehensive Data',
      description: 'Verified local employers, events, wages, and transit info',
      icon: CheckCircle2,
      color: 'bg-green-100 text-green-800 border-green-300',
      iconColor: 'text-green-600',
    },
    tier2: {
      label: 'Partial Data',
      description: 'Some local data available, more coming soon',
      icon: Info,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      iconColor: 'text-blue-600',
    },
    tier3: {
      label: 'Regional Data',
      description: 'Using regional averages, local data in progress',
      icon: AlertCircle,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      iconColor: 'text-amber-600',
    },
  };

  const config = tierConfig[completeness.tier];
  const Icon = config.icon;

  if (!showDetails) {
    return (
      <Badge variant="outline" className={config.color}>
        <Icon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
        {config.label}
      </Badge>
    );
  }

  return (
    <div className={`p-3 rounded-lg border ${config.color}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${config.iconColor}`} />
        <span className="font-medium text-sm">{config.label} for {cityName}</span>
      </div>
      <p className="text-xs opacity-80">{config.description}</p>
      
      <div className="mt-2 flex flex-wrap gap-2">
        {completeness.hasEmployers && (
          <Badge variant="secondary" className="text-xs bg-white/50">
            ✓ Local Employers
          </Badge>
        )}
        {completeness.hasEvents && (
          <Badge variant="secondary" className="text-xs bg-white/50">
            ✓ Events
          </Badge>
        )}
        {completeness.hasWageData && (
          <Badge variant="secondary" className="text-xs bg-white/50">
            ✓ Wage Data
          </Badge>
        )}
        {completeness.hasTransportInfo && (
          <Badge variant="secondary" className="text-xs bg-white/50">
            ✓ Transit Guide
          </Badge>
        )}
      </div>
      
      <p className="text-[10px] opacity-60 mt-2">
        {completeness.totalDataPoints} verified data points
      </p>
    </div>
  );
}
