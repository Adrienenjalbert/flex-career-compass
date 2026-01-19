import { useState } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ExperienceLevel,
  IndustryTag,
  UserSituation,
  tagLabels,
} from "@/data/taxonomy";
import { cn } from "@/lib/utils";

export interface ActiveFilters {
  experienceLevel: ExperienceLevel[];
  industries: IndustryTag[];
  situations: UserSituation[];
}

interface ContentFilterProps {
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  availableTags?: {
    experienceLevel?: ExperienceLevel[];
    industries?: IndustryTag[];
    situations?: UserSituation[];
  };
  className?: string;
}

const defaultAvailableTags = {
  experienceLevel: ['beginner', 'intermediate', 'advanced'] as ExperienceLevel[],
  industries: ['warehouse', 'hospitality', 'retail', 'facilities', 'general'] as IndustryTag[],
  situations: ['first-job', 'side-gig', 'career-change', 'student', 'parent', 'immigrant', 'returning-worker'] as UserSituation[],
};

export function ContentFilter({
  activeFilters,
  onFilterChange,
  availableTags = defaultAvailableTags,
  className,
}: ContentFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = <T extends string>(
    category: keyof ActiveFilters,
    value: T
  ) => {
    const currentValues = activeFilters[category] as T[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...activeFilters,
      [category]: newValues,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      experienceLevel: [],
      industries: [],
      situations: [],
    });
  };

  const totalActiveFilters =
    activeFilters.experienceLevel.length +
    activeFilters.industries.length +
    activeFilters.situations.length;

  const FilterSection = ({
    title,
    category,
    tags,
  }: {
    title: string;
    category: keyof ActiveFilters;
    tags: string[];
  }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = (activeFilters[category] as string[]).includes(tag);
          return (
            <Badge
              key={tag}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105",
                isActive
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:border-primary/50"
              )}
              onClick={() => toggleFilter(category, tag)}
            >
              {tagLabels[category]?.[tag] || tag}
              {isActive && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: Collapsible */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Content
                {totalActiveFilters > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {totalActiveFilters}
                  </Badge>
                )}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4 rounded-lg border border-border bg-card p-4">
            {availableTags.experienceLevel && availableTags.experienceLevel.length > 0 && (
              <FilterSection
                title="Experience Level"
                category="experienceLevel"
                tags={availableTags.experienceLevel}
              />
            )}
            {availableTags.industries && availableTags.industries.length > 0 && (
              <FilterSection
                title="Industry"
                category="industries"
                tags={availableTags.industries}
              />
            )}
            {availableTags.situations && availableTags.situations.length > 0 && (
              <FilterSection
                title="Your Situation"
                category="situations"
                tags={availableTags.situations}
              />
            )}
            {totalActiveFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Content
            </h3>
            {totalActiveFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground h-8"
              >
                Clear all ({totalActiveFilters})
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {availableTags.experienceLevel && availableTags.experienceLevel.length > 0 && (
              <FilterSection
                title="Experience Level"
                category="experienceLevel"
                tags={availableTags.experienceLevel}
              />
            )}
            {availableTags.industries && availableTags.industries.length > 0 && (
              <FilterSection
                title="Industry"
                category="industries"
                tags={availableTags.industries}
              />
            )}
            {availableTags.situations && availableTags.situations.length > 0 && (
              <FilterSection
                title="Your Situation"
                category="situations"
                tags={availableTags.situations}
              />
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Summary (shown below filter on both mobile/desktop) */}
      {totalActiveFilters > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Showing:</span>
          {activeFilters.experienceLevel.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleFilter("experienceLevel", tag)}
            >
              {tagLabels.experienceLevel[tag]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          {activeFilters.industries.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleFilter("industries", tag)}
            >
              {tagLabels.industries[tag]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          {activeFilters.situations.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleFilter("situations", tag)}
            >
              {tagLabels.situations[tag]}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentFilter;
