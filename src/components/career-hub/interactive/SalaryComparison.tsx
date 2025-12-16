import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MapPin, Briefcase, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  name: string;
  minRate: number;
  maxRate: number;
  slug?: string;
}

interface SalaryComparisonProps {
  title: string;
  currentItem: string;
  items: ComparisonItem[];
  type: "location" | "role";
}

const SalaryComparison = ({
  title,
  currentItem,
  items,
  type
}: SalaryComparisonProps) => {
  const [showMax, setShowMax] = useState(false);

  const chartData = useMemo(() => {
    return items.map(item => ({
      name: item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name,
      fullName: item.name,
      min: item.minRate,
      max: item.maxRate,
      avg: Math.round((item.minRate + item.maxRate) / 2),
      isCurrent: item.name === currentItem,
      slug: item.slug
    })).sort((a, b) => b.avg - a.avg);
  }, [items, currentItem]);

  const maxValue = useMemo(() => 
    Math.max(...chartData.map(d => d.max)) + 5
  , [chartData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-semibold mb-1">{data.fullName}</p>
          <div className="space-y-1 text-muted-foreground">
            <p>Min: <span className="text-foreground font-medium">${data.min}/hr</span></p>
            <p>Avg: <span className="text-primary font-medium">${data.avg}/hr</span></p>
            <p>Max: <span className="text-foreground font-medium">${data.max}/hr</span></p>
          </div>
          {data.isCurrent && (
            <p className="text-xs text-primary mt-2 pt-2 border-t">Current selection</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {type === "location" ? (
              <MapPin className="h-5 w-5 text-primary" />
            ) : (
              <Briefcase className="h-5 w-5 text-primary" />
            )}
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMax(false)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-colors",
                !showMax ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Average
            </button>
            <button
              onClick={() => setShowMax(true)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-colors",
                showMax ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Range
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                domain={[0, maxValue]}
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              {showMax ? (
                <>
                  <Bar dataKey="min" stackId="salary" fill="hsl(var(--secondary))" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="max" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      />
                    ))}
                  </Bar>
                </>
              ) : (
                <Bar dataKey="avg" radius={4}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.isCurrent ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-muted-foreground">Other {type === "location" ? "locations" : "roles"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-accent" />
            <span className="text-muted-foreground">Current</span>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-4 p-3 bg-secondary/50 rounded-lg flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            {type === "location" 
              ? "Pay rates vary by location based on cost of living and local demand."
              : "Different roles offer varying pay based on skill requirements and demand."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComparison;
