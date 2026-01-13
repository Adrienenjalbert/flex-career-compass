import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { seoChecklist, type SEOChecklistItem } from "@/data/presentation-templates";

const categoryLabels = {
  meta: "Meta & Schema",
  technical: "Technical SEO",
  content: "Content & Structure",
  performance: "Performance",
};

const categoryColors = {
  meta: "bg-blue-100 text-blue-700",
  technical: "bg-purple-100 text-purple-700",
  content: "bg-green-100 text-green-700",
  performance: "bg-orange-100 text-orange-700",
};

interface ChecklistItemProps {
  item: SEOChecklistItem;
}

const ChecklistItem = ({ item }: ChecklistItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      {item.implemented ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${item.implemented ? "text-foreground" : "text-muted-foreground"}`}>
            {item.label}
          </span>
          {!item.implemented && (
            <Badge variant="outline" className="text-xs text-yellow-700 bg-yellow-50">
              Planned
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
};

const SEOChecklist = () => {
  const categories = ["meta", "technical", "content", "performance"] as const;

  const implementedCount = seoChecklist.filter((item) => item.implemented).length;
  const totalCount = seoChecklist.length;
  const percentage = Math.round((implementedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Progress summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">SEO Implementation Status</h3>
            <p className="text-sm text-muted-foreground">
              {implementedCount} of {totalCount} items implemented
            </p>
          </div>
          <div className="text-3xl font-bold text-primary">{percentage}%</div>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const items = seoChecklist.filter((item) => item.category === category);
          const categoryImplemented = items.filter((item) => item.implemented).length;

          return (
            <div key={category} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <Badge className={categoryColors[category]}>
                  {categoryLabels[category]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {categoryImplemented}/{items.length}
                </span>
              </div>
              <div className="p-2">
                {items.map((item) => (
                  <ChecklistItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Implemented</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="h-4 w-4 text-muted-foreground" />
          <span>Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span>In Progress</span>
        </div>
      </div>
    </div>
  );
};

export default SEOChecklist;
