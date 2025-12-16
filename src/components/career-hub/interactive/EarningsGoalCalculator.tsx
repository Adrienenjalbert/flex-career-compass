import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Target, Clock, Calendar, DollarSign, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EarningsGoalCalculatorProps {
  roleTitle: string;
  minRate: number;
  maxRate: number;
  tipsRange?: { min: number; max: number };
  location?: string;
}

const EarningsGoalCalculator = ({
  roleTitle,
  minRate,
  maxRate,
  tipsRange,
  location
}: EarningsGoalCalculatorProps) => {
  const [monthlyGoal, setMonthlyGoal] = useState(3000);
  const [hourlyRate, setHourlyRate] = useState(Math.round((minRate + maxRate) / 2));
  const [includeTips, setIncludeTips] = useState(!!tipsRange);

  const calculations = useMemo(() => {
    const effectiveRate = includeTips && tipsRange 
      ? hourlyRate + ((tipsRange.min + tipsRange.max) / 2)
      : hourlyRate;

    const weeklyGoal = monthlyGoal / 4.33;
    const hoursNeededWeekly = weeklyGoal / effectiveRate;
    const shiftsPerWeek = hoursNeededWeekly / 6; // Assuming 6-hour average shifts
    const daysPerWeek = Math.ceil(shiftsPerWeek);

    // Calculate if goal is achievable
    const maxWeeklyHours = 50;
    const isAchievable = hoursNeededWeekly <= maxWeeklyHours;
    const maxEarningsAtRate = effectiveRate * maxWeeklyHours * 4.33;

    return {
      hoursPerWeek: Math.round(hoursNeededWeekly * 10) / 10,
      shiftsPerWeek: Math.round(shiftsPerWeek * 10) / 10,
      daysPerWeek,
      hoursPerDay: Math.round((hoursNeededWeekly / Math.max(daysPerWeek, 1)) * 10) / 10,
      isAchievable,
      maxEarnings: Math.round(maxEarningsAtRate),
      effectiveRate: Math.round(effectiveRate * 100) / 100
    };
  }, [monthlyGoal, hourlyRate, tipsRange, includeTips]);

  const presetGoals = [2000, 3000, 4000, 5000];

  return (
    <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-success" />
          Earnings Goal Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          How many hours do you need to work as a {roleTitle}
          {location && ` in ${location}`} to reach your income goal?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Goal Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Monthly Income Goal</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              value={monthlyGoal}
              onChange={(e) => setMonthlyGoal(Number(e.target.value) || 0)}
              className="pl-9 text-lg font-semibold"
              min={500}
              max={15000}
              step={100}
            />
          </div>
          <div className="flex gap-2">
            {presetGoals.map((goal) => (
              <button
                key={goal}
                onClick={() => setMonthlyGoal(goal)}
                className={cn(
                  "flex-1 py-2 text-sm rounded-lg transition-colors",
                  monthlyGoal === goal
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                ${goal.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Hourly Rate Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Your Hourly Rate</label>
            <span className="font-bold text-primary">${hourlyRate}/hr</span>
          </div>
          <Slider
            value={[hourlyRate]}
            onValueChange={([value]) => setHourlyRate(value)}
            min={minRate}
            max={maxRate}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Entry: ${minRate}</span>
            <span>Experienced: ${maxRate}</span>
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
              Include tips (+${tipsRange.min}-${tipsRange.max}/hr)
            </span>
          </label>
        )}

        {/* Results */}
        <div className={cn(
          "rounded-xl p-4 space-y-4",
          calculations.isAchievable ? "bg-success/10" : "bg-warning/10"
        )}>
          <div className="flex items-center gap-2">
            {calculations.isAchievable ? (
              <Zap className="h-5 w-5 text-success" />
            ) : (
              <TrendingUp className="h-5 w-5 text-warning" />
            )}
            <span className={cn(
              "font-semibold",
              calculations.isAchievable ? "text-success" : "text-warning"
            )}>
              {calculations.isAchievable 
                ? "Goal is achievable!" 
                : `Max earnings at this rate: $${calculations.maxEarnings.toLocaleString()}/mo`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold">{calculations.hoursPerWeek}</div>
              <div className="text-xs text-muted-foreground">hours/week</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold">{calculations.shiftsPerWeek}</div>
              <div className="text-xs text-muted-foreground">shifts/week</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            At ${calculations.effectiveRate}/hr{includeTips && tipsRange ? " (including tips)" : ""}, 
            work ~{calculations.hoursPerDay} hours across {calculations.daysPerWeek} days/week
          </p>
        </div>

        {/* Pro Tips */}
        <div className="p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-accent">Pro tip:</strong> Pick up shifts during peak hours 
            (evenings, weekends) to earn more per hour and reach your goal faster.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsGoalCalculator;
