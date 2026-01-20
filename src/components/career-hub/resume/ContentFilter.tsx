import React, { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Briefcase,
  GraduationCap,
  FileText,
  Building2,
  Users,
  Globe,
  Target,
  Sparkles
} from 'lucide-react';
import { 
  INDUSTRIES, 
  EXPERIENCE_LEVELS, 
  USER_SITUATIONS, 
  RESUME_FORMATS,
  LANGUAGES,
  INDUSTRY_LABELS,
  EXPERIENCE_LABELS,
  SITUATION_LABELS,
  FORMAT_LABELS,
  INTENT_LABELS,
  type Industry,
  type ExperienceLevel,
  type UserSituation,
  type ResumeFormat,
  type Language,
  type ContentIntent
} from '@/data/taxonomy';
import { useUrlFilters, type UrlFilters, FILTER_PRESETS } from '@/hooks/useUrlFilters';

export type FilterCategory = 'industry' | 'experienceLevel' | 'userSituation' | 'documentType' | 'format' | 'language' | 'contentIntent';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface FilterConfig {
  category: FilterCategory;
  label: string;
  icon: React.ReactNode;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface ActiveFilters {
  industry: string[];
  experienceLevel: string[];
  userSituation: string[];
  documentType: string[];
  format: string[];
  language: string[];
  contentIntent: string[];
  search: string;
}

interface ContentFilterProps {
  filters: FilterConfig[];
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  totalResults?: number;
  className?: string;
  showPresets?: boolean;
  syncWithUrl?: boolean;
}

// Convert UrlFilters to ActiveFilters for backward compatibility
const urlFiltersToActiveFilters = (state: UrlFilters): ActiveFilters => ({
  industry: state.industry,
  experienceLevel: state.experienceLevel,
  userSituation: state.userSituation,
  documentType: state.documentType,
  format: state.format,
  language: state.language,
  contentIntent: state.contentIntent,
  search: state.search
});

// Convert ActiveFilters to partial UrlFilters
const activeFiltersToUrlFilters = (filters: ActiveFilters): Partial<UrlFilters> => ({
  industry: filters.industry as Industry[],
  experienceLevel: filters.experienceLevel as ExperienceLevel[],
  userSituation: filters.userSituation as UserSituation[],
  documentType: filters.documentType,
  format: filters.format as ResumeFormat[],
  language: filters.language,
  contentIntent: filters.contentIntent as ContentIntent[],
  search: filters.search
});

export const ContentFilter: React.FC<ContentFilterProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  totalResults,
  className = '',
  showPresets = false,
  syncWithUrl = false
}) => {
  const [searchValue, setSearchValue] = useState(activeFilters.search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    return (
      activeFilters.industry.length +
      activeFilters.experienceLevel.length +
      (activeFilters.userSituation?.length || 0) +
      activeFilters.documentType.length +
      activeFilters.format.length +
      (activeFilters.language?.length || 0) +
      (activeFilters.contentIntent?.length || 0) +
      (activeFilters.search ? 1 : 0)
    );
  }, [activeFilters]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    onFilterChange({ ...activeFilters, search: value });
  }, [activeFilters, onFilterChange]);

  const handleFilterToggle = useCallback((category: FilterCategory, value: string) => {
    const currentValues = activeFilters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...activeFilters,
      [category]: newValues
    });
  }, [activeFilters, onFilterChange]);

  const clearAllFilters = useCallback(() => {
    setSearchValue('');
    onFilterChange({
      industry: [],
      experienceLevel: [],
      userSituation: [],
      documentType: [],
      format: [],
      language: [],
      contentIntent: [],
      search: ''
    });
  }, [onFilterChange]);

  const removeFilter = useCallback((category: FilterCategory, value: string) => {
    onFilterChange({
      ...activeFilters,
      [category]: (activeFilters[category] || []).filter(v => v !== value)
    });
  }, [activeFilters, onFilterChange]);

  const applyPreset = useCallback((presetKey: string) => {
    const preset = FILTER_PRESETS[presetKey];
    if (preset) {
      onFilterChange({
        ...activeFilters,
        industry: (preset.industry || []) as string[],
        experienceLevel: (preset.experienceLevel || []) as string[],
        userSituation: (preset.userSituation || []) as string[],
        format: (preset.format || []) as string[],
      });
    }
  }, [activeFilters, onFilterChange]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preset Quick Filters */}
      {showPresets && (
        <div className="flex flex-wrap gap-2 pb-2">
          <span className="text-sm text-muted-foreground mr-2 self-center">Quick filters:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('for-students')}
            className="gap-1"
          >
            <GraduationCap className="h-3 w-3" />
            Students
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('for-freshers')}
            className="gap-1"
          >
            <Sparkles className="h-3 w-3" />
            First Job
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('for-immigrants')}
            className="gap-1"
          >
            <Globe className="h-3 w-3" />
            New to US
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('for-parents')}
            className="gap-1"
          >
            <Users className="h-3 w-3" />
            Parents
          </Button>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes, templates, keywords..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Dropdown */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-popover border shadow-lg z-50" align="end">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between sticky top-0 bg-popover pb-2">
                <h4 className="font-semibold">Filters</h4>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {filters.map((filter) => (
                <div key={filter.category} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {filter.icon}
                    {filter.label}
                  </div>
                  <div className="grid gap-2">
                    {filter.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`${filter.category}-${option.value}`}
                          checked={(activeFilters[filter.category] || []).includes(option.value)}
                          onCheckedChange={() => handleFilterToggle(filter.category, option.value)}
                        />
                        <Label
                          htmlFor={`${filter.category}-${option.value}`}
                          className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            {option.icon}
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="text-muted-foreground text-xs">
                              ({option.count})
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Quick Sort */}
        <Select defaultValue="relevance">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-lg z-50">
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {activeFilters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{activeFilters.search}"
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          
          {Object.entries(activeFilters).map(([category, values]) => {
            if (category === 'search' || !Array.isArray(values)) return null;
            return values.map(value => {
              const filterConfig = filters.find(f => f.category === category);
              const option = filterConfig?.options.find(o => o.value === value);
              return (
                <Badge key={`${category}-${value}`} variant="secondary" className="gap-1">
                  {option?.label || value}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeFilter(category as FilterCategory, value)}
                  />
                </Badge>
              );
            });
          })}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-6 px-2"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      {totalResults !== undefined && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{totalResults}</span> results
        </div>
      )}
    </div>
  );
};

// URL-synced version of ContentFilter
export const ContentFilterWithUrl: React.FC<{
  filters: FilterConfig[];
  totalResults?: number;
  className?: string;
  showPresets?: boolean;
  onFiltersChange?: (filters: ActiveFilters) => void;
}> = ({ filters, totalResults, className, showPresets = true, onFiltersChange }) => {
  const { activeFilters: urlFilters, updateFilters, clearAllFilters } = useUrlFilters();
  
  const activeFilters = urlFiltersToActiveFilters(urlFilters);
  
  const handleFilterChange = useCallback((newFilters: ActiveFilters) => {
    updateFilters(activeFiltersToUrlFilters(newFilters));
    onFiltersChange?.(newFilters);
  }, [updateFilters, onFiltersChange]);

  return (
    <ContentFilter
      filters={filters}
      activeFilters={activeFilters}
      onFilterChange={handleFilterChange}
      totalResults={totalResults}
      className={className}
      showPresets={showPresets}
    />
  );
};

// Quick filter bar for mobile
export const QuickFilterBar: React.FC<{
  options: { value: string; label: string; icon?: React.ReactNode }[];
  selected: string[];
  onSelect: (value: string) => void;
  className?: string;
}> = ({ options, selected, onSelect, className = '' }) => {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={selected.includes(option.value) ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(option.value)}
          className="whitespace-nowrap"
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
};

// Enhanced filter configurations using taxonomy
export const defaultFilterConfigs: FilterConfig[] = [
  {
    category: 'industry',
    label: 'Industry',
    icon: <Building2 className="h-4 w-4" />,
    options: INDUSTRIES.map(ind => ({
      value: ind,
      label: INDUSTRY_LABELS[ind].label
    })),
    multiSelect: true
  },
  {
    category: 'experienceLevel',
    label: 'Experience Level',
    icon: <GraduationCap className="h-4 w-4" />,
    options: EXPERIENCE_LEVELS.map(level => ({
      value: level,
      label: EXPERIENCE_LABELS[level].label
    })),
    multiSelect: true
  },
  {
    category: 'userSituation',
    label: 'Your Situation',
    icon: <Users className="h-4 w-4" />,
    options: USER_SITUATIONS.map(situation => ({
      value: situation,
      label: SITUATION_LABELS[situation].label
    })),
    multiSelect: true
  },
  {
    category: 'format',
    label: 'Resume Format',
    icon: <FileText className="h-4 w-4" />,
    options: RESUME_FORMATS.map(format => ({
      value: format,
      label: FORMAT_LABELS[format].label
    })),
    multiSelect: true
  },
  {
    category: 'language',
    label: 'Language',
    icon: <Globe className="h-4 w-4" />,
    options: LANGUAGES.map(lang => ({
      value: lang,
      label: lang === 'english' ? 'English' : lang === 'spanish' ? 'Español' : 'Bilingual'
    })),
    multiSelect: true
  },
  {
    category: 'contentIntent',
    label: 'What You Want',
    icon: <Target className="h-4 w-4" />,
    options: [
      { value: 'learn', label: 'Learn & Understand' },
      { value: 'create', label: 'Create Something' },
      { value: 'calculate', label: 'Calculate / Estimate' },
      { value: 'compare', label: 'Compare Options' },
      { value: 'find-work', label: 'Find Work' }
    ],
    multiSelect: true
  }
];

// Simplified filter configs for resume examples page
export const resumeFilterConfigs: FilterConfig[] = [
  defaultFilterConfigs[0], // industry
  defaultFilterConfigs[1], // experienceLevel
  defaultFilterConfigs[2], // userSituation
];

// Filter configs for tools page
export const toolsFilterConfigs: FilterConfig[] = [
  defaultFilterConfigs[0], // industry
  defaultFilterConfigs[2], // userSituation
  defaultFilterConfigs[5], // contentIntent
];

// Filter configs for guides page
export const guidesFilterConfigs: FilterConfig[] = [
  defaultFilterConfigs[0], // industry
  defaultFilterConfigs[1], // experienceLevel
  defaultFilterConfigs[2], // userSituation
  defaultFilterConfigs[4], // language
];

export default ContentFilter;
