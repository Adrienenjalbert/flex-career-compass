import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Minus,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { CityWageData } from "@/data/localized-content";

interface WageContextCardProps {
  wageData: CityWageData[];
  cityName: string;
  stateCode: string;
}

export function WageContextCard({ wageData, cityName, stateCode }: WageContextCardProps) {
  if (wageData.length === 0) return null;

  // Group by industry
  const byIndustry = wageData.reduce((acc, item) => {
    if (!acc[item.industry]) acc[item.industry] = [];
    acc[item.industry].push(item);
    return acc;
  }, {} as Record<string, CityWageData[]>);

  const getComparisonIcon = (cityWage: number, comparison: number | null) => {
    if (!comparison) return null;
    const diff = cityWage - comparison;
    const percentDiff = (diff / comparison) * 100;
    
    if (percentDiff > 5) {
      return <TrendingUp className="h-3 w-3 text-green-600" />;
    } else if (percentDiff < -5) {
      return <TrendingDown className="h-3 w-3 text-red-600" />;
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getComparisonText = (cityWage: number, comparison: number | null, label: string) => {
    if (!comparison) return null;
    const diff = cityWage - comparison;
    const percentDiff = Math.abs((diff / comparison) * 100).toFixed(0);
    
    if (diff > 0) {
      return `${percentDiff}% above ${label}`;
    } else if (diff < 0) {
      return `${percentDiff}% below ${label}`;
    }
    return `Same as ${label}`;
  };

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          {cityName} Pay Rates 2026
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(byIndustry).map(([industry, data]) => {
          const primary = data[0];
          const avgWage = primary.median_wage || ((primary.min_wage + primary.max_wage) / 2);
          
          return (
            <div key={industry} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm capitalize flex items-center gap-1">
                  {industry.replace('-', ' ')}
                  {primary.is_verified && (
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                  )}
                </h4>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ${primary.min_wage.toFixed(2)} - ${primary.max_wage.toFixed(2)}/hr
                </Badge>
              </div>
              
              {/* Comparisons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {primary.state_average && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getComparisonIcon(avgWage, primary.state_average)}
                    <span>{getComparisonText(avgWage, primary.state_average, `${stateCode} avg`)}</span>
                  </div>
                )}
                {primary.national_average && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getComparisonIcon(avgWage, primary.national_average)}
                    <span>{getComparisonText(avgWage, primary.national_average, 'US avg')}</span>
                  </div>
                )}
              </div>
              
              {/* Context */}
              {primary.wage_context && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {primary.wage_context}
                </p>
              )}
              
              {/* Role breakdown if available */}
              {data.length > 1 && (
                <div className="mt-2 pt-2 border-t space-y-1">
                  {data.slice(1).map((role) => (
                    <div key={role.id} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground capitalize">
                        {role.role_type?.replace('-', ' ')}
                      </span>
                      <span>${role.min_wage.toFixed(2)} - ${role.max_wage.toFixed(2)}/hr</span>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-[10px] text-muted-foreground/60 mt-2">
                Source: {primary.data_source} • {new Date(primary.effective_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
