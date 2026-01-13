import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { reviewMilestones, type ReviewMilestone } from "@/data/presentation-templates";

const statusIcons = {
  pending: Circle,
  "in-progress": Clock,
  complete: CheckCircle2,
};

const statusColors = {
  pending: "text-muted-foreground",
  "in-progress": "text-yellow-600",
  complete: "text-green-600",
};

const phaseColors = {
  Foundation: "bg-blue-500",
  Content: "bg-purple-500",
  Tools: "bg-orange-500",
  Programmatic: "bg-green-500",
  Launch: "bg-primary",
};

interface MilestoneCardProps {
  milestone: ReviewMilestone;
  isLast: boolean;
}

const MilestoneCard = ({ milestone, isLast }: MilestoneCardProps) => {
  const StatusIcon = statusIcons[milestone.status];

  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
      )}

      <div className="flex gap-4">
        {/* Week indicator */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
          <span className="text-sm font-bold text-foreground">W{milestone.week}</span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card border border-border rounded-xl p-5 mb-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  className={`${phaseColors[milestone.phase as keyof typeof phaseColors]} text-white`}
                >
                  {milestone.phase}
                </Badge>
                <StatusIcon className={`h-4 w-4 ${statusColors[milestone.status]}`} />
              </div>
              <h3 className="font-semibold text-lg text-foreground">{milestone.focus}</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              Week {milestone.week}
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Deliverables */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Deliverables:</p>
              <ul className="space-y-1">
                {milestone.deliverables.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages to review */}
            {milestone.pages.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Pages to Review:</p>
                <div className="flex flex-wrap gap-2">
                  {milestone.pages.map((page, i) => (
                    <Link
                      key={i}
                      to={page}
                      className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-accent px-2 py-1 rounded transition-colors"
                    >
                      {page.split("/").pop()}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineVisualization = () => {
  // Group by phase for summary
  const phases = [
    { name: "Foundation", weeks: "1-2", color: "bg-blue-500" },
    { name: "Content", weeks: "3-4", color: "bg-purple-500" },
    { name: "Tools", weeks: "5-6", color: "bg-orange-500" },
    { name: "Programmatic", weeks: "7", color: "bg-green-500" },
    { name: "Launch", weeks: "8", color: "bg-primary" },
  ];

  return (
    <div className="space-y-8">
      {/* Phase overview bar */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">8-Week Review Timeline</h3>
        <div className="flex gap-1 mb-4">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className={`flex-1 h-3 ${phase.color} first:rounded-l-full last:rounded-r-full`}
              title={`${phase.name}: Weeks ${phase.weeks}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {phases.map((phase) => (
            <div key={phase.name} className="text-center">
              <div className="font-medium text-foreground">{phase.name}</div>
              <div>Weeks {phase.weeks}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed timeline */}
      <div className="space-y-0">
        {reviewMilestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.week}
            milestone={milestone}
            isLast={index === reviewMilestones.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineVisualization;
