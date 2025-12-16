import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Award, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SkillsAssessmentProps {
  roleTitle: string;
  skills: string[];
  requirements?: string[];
  certifications?: string[];
}

const SkillsAssessment = ({
  roleTitle,
  skills,
  requirements = [],
  certifications = []
}: SkillsAssessmentProps) => {
  const [checkedSkills, setCheckedSkills] = useState<Set<string>>(new Set());
  const [checkedRequirements, setCheckedRequirements] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggleSkill = (skill: string) => {
    const newChecked = new Set(checkedSkills);
    if (newChecked.has(skill)) {
      newChecked.delete(skill);
    } else {
      newChecked.add(skill);
    }
    setCheckedSkills(newChecked);
  };

  const toggleRequirement = (req: string) => {
    const newChecked = new Set(checkedRequirements);
    if (newChecked.has(req)) {
      newChecked.delete(req);
    } else {
      newChecked.add(req);
    }
    setCheckedRequirements(newChecked);
  };

  const score = useMemo(() => {
    const totalItems = skills.length + requirements.length;
    const checkedItems = checkedSkills.size + checkedRequirements.size;
    const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    
    return {
      checked: checkedItems,
      total: totalItems,
      percentage,
      level: percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : percentage >= 40 ? 'developing' : 'beginner'
    };
  }, [checkedSkills, checkedRequirements, skills.length, requirements.length]);

  const levelConfig = {
    excellent: { color: 'text-success', bg: 'bg-success', label: 'Excellent Match', message: "You're highly qualified for this role!" },
    good: { color: 'text-primary', bg: 'bg-primary', label: 'Good Match', message: "You have most skills needed. A few areas to develop." },
    developing: { color: 'text-warning', bg: 'bg-warning', label: 'Developing', message: "Building your skills. Keep learning!" },
    beginner: { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Getting Started', message: "Great time to start building these skills." }
  };

  const config = levelConfig[score.level];

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Skills Assessment: {roleTitle}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Check the skills and qualifications you already have
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={cn("font-semibold", config.color)}>{config.label}</span>
            <span className="text-lg font-bold">{score.checked}/{score.total}</span>
          </div>
          <Progress value={score.percentage} className="h-3" />
          <p className="text-sm text-muted-foreground">{config.message}</p>
        </div>

        {/* Skills Checklist */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Skills ({checkedSkills.size}/{skills.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skills.map((skill) => {
              const isChecked = checkedSkills.has(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg text-left transition-all text-sm",
                    isChecked 
                      ? "bg-success/10 border border-success/30 text-success" 
                      : "bg-secondary/50 border border-transparent hover:border-border"
                  )}
                >
                  {isChecked ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(!isChecked && "text-foreground")}>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Requirements Checklist */}
        {requirements.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Requirements ({checkedRequirements.size}/{requirements.length})
            </h4>
            <div className="space-y-2">
              {requirements.map((req) => {
                const isChecked = checkedRequirements.has(req);
                return (
                  <button
                    key={req}
                    onClick={() => toggleRequirement(req)}
                    className={cn(
                      "flex items-start gap-2 p-3 rounded-lg text-left transition-all text-sm w-full",
                      isChecked 
                        ? "bg-success/10 border border-success/30 text-success" 
                        : "bg-secondary/50 border border-transparent hover:border-border"
                    )}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                    )}
                    <span className={cn(!isChecked && "text-foreground")}>{req}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Certifications Info */}
        {certifications.length > 0 && (
          <div className="p-4 bg-accent/10 rounded-lg space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Helpful Certifications
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-accent rounded-full" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {score.percentage >= 50 && (
          <div className="pt-2">
            <Link
              to="/career-hub/tools/skills-analyzer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Personalized Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsAssessment;
