import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Clock, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface EmbeddedPayCalculatorProps {
  roleTitle: string;
  minRate: number;
  maxRate: number;
  defaultHoursPerWeek?: number;
  tipsRange?: { min: number; max: number };
  location?: string;
}

const EmbeddedPayCalculator = ({
  roleTitle,
  minRate,
  maxRate,
  defaultHoursPerWeek = 25,
  tipsRange,
  location
}: EmbeddedPayCalculatorProps) => {
  const [hourlyRate, setHourlyRate] = useState(Math.round((minRate + maxRate) / 2));
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHoursPerWeek);
  const [includeTips, setIncludeTips] = useState(!!tipsRange);

  const earnings = useMemo(() => {
    const baseWeekly = hourlyRate * hoursPerWeek;
    const avgTips = tipsRange && includeTips 
      ? ((tipsRange.min + tipsRange.max) / 2) * hoursPerWeek 
      : 0;
    
    const weekly = baseWeekly + avgTips;
    const monthly = weekly * 4.33;
    const yearly = weekly * 52;

    return {
      weekly: Math.round(weekly),
      monthly: Math.round(monthly),
      yearly: Math.round(yearly),
      tipsWeekly: Math.round(avgTips)
    };
  }, [hourlyRate, hoursPerWeek, tipsRange, includeTips]);

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-accent" />
          Calculate Your {roleTitle} Earnings
          {location && <span className="text-sm font-normal text-muted-foreground">in {location}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hourly Rate Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Hourly Rate
            </label>
            <span className="text-xl font-bold text-primary">${hourlyRate}/hr</span>
          </div>
          <Slider
            value={[hourlyRate]}
            onValueChange={([value]) => setHourlyRate(value)}
            min={minRate}
            max={maxRate}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${minRate}/hr</span>
            <span>${maxRate}/hr</span>
          </div>
        </div>

        {/* Hours Per Week Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Hours per Week
            </label>
            <span className="text-xl font-bold text-primary">{hoursPerWeek} hrs</span>
          </div>
          <Slider
            value={[hoursPerWeek]}
            onValueChange={([value]) => setHoursPerWeek(value)}
            min={5}
            max={50}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 hrs (Part-time)</span>
            <span>50 hrs (Full-time+)</span>
          </div>
        </div>

        {/* Tips Toggle */}
        {tipsRange && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeTips}
              onChange={(e) => setIncludeTips(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">
              Include tips (${tipsRange.min}-${tipsRange.max}/hr average)
            </span>
          </label>
        )}

        {/* Earnings Display */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Weekly</div>
            <div className="text-lg font-bold text-foreground">${earnings.weekly.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Monthly</div>
            <div className="text-xl font-bold text-primary">${earnings.monthly.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Yearly</div>
            <div className="text-lg font-bold text-foreground">${earnings.yearly.toLocaleString()}</div>
          </div>
        </div>

        {includeTips && tipsRange && earnings.tipsWeekly > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Includes ~${earnings.tipsWeekly}/week in estimated tips
          </p>
        )}

        {/* Link to Full Calculator */}
        <Link 
          to="/career-hub/tools/pay-calculator"
          className="flex items-center justify-center gap-2 text-sm text-primary hover:underline pt-2"
        >
          <TrendingUp className="h-4 w-4" />
          Open Full Pay Calculator
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmbeddedPayCalculator;
