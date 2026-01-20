import React, { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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
  Building2
} from 'lucide-react';

export type FilterCategory = 'industry' | 'experienceLevel' | 'documentType' | 'format';

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
  documentType: string[];
  format: string[];
  search: string;
}

interface ContentFilterProps {
  filters: FilterConfig[];
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  totalResults?: number;
  className?: string;
}

export const ContentFilter: React.FC<ContentFilterProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  totalResults,
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState(activeFilters.search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    return (
      activeFilters.industry.length +
      activeFilters.experienceLevel.length +
      activeFilters.documentType.length +
      activeFilters.format.length +
      (activeFilters.search ? 1 : 0)
    );
  }, [activeFilters]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    onFilterChange({ ...activeFilters, search: value });
  }, [activeFilters, onFilterChange]);

  const handleFilterToggle = useCallback((category: FilterCategory, value: string) => {
    const currentValues = activeFilters[category];
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
      documentType: [],
      format: [],
      search: ''
    });
  }, [onFilterChange]);

  const removeFilter = useCallback((category: FilterCategory, value: string) => {
    onFilterChange({
      ...activeFilters,
      [category]: activeFilters[category].filter(v => v !== value)
    });
  }, [activeFilters, onFilterChange]);

  return (
    <div className={`space-y-4 ${className}`}>
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
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
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
                          checked={activeFilters[filter.category].includes(option.value)}
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
          <SelectContent>
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

// Default filter configurations
export const defaultFilterConfigs: FilterConfig[] = [
  {
    category: 'industry',
    label: 'Industry',
    icon: <Building2 className="h-4 w-4" />,
    options: [
      { value: 'hospitality', label: 'Hospitality', count: 11 },
      { value: 'industrial', label: 'Industrial & Warehouse', count: 7 },
      { value: 'retail', label: 'Retail', count: 3 },
      { value: 'facilities', label: 'Facilities', count: 2 },
    ],
    multiSelect: true
  },
  {
    category: 'experienceLevel',
    label: 'Experience Level',
    icon: <GraduationCap className="h-4 w-4" />,
    options: [
      { value: 'no-experience', label: 'No Experience' },
      { value: 'entry-level', label: 'Entry Level (0-2 years)' },
      { value: 'experienced', label: 'Experienced (2+ years)' },
      { value: 'career-change', label: 'Career Change' },
    ],
    multiSelect: true
  },
  {
    category: 'documentType',
    label: 'Document Type',
    icon: <FileText className="h-4 w-4" />,
    options: [
      { value: 'resume', label: 'Resume Examples' },
      { value: 'template', label: 'Templates' },
      { value: 'cover-letter', label: 'Cover Letters' },
      { value: 'skills', label: 'Skills & Keywords' },
      { value: 'components', label: 'Copy-Paste Components' },
    ],
    multiSelect: true
  },
  {
    category: 'format',
    label: 'Resume Format',
    icon: <Briefcase className="h-4 w-4" />,
    options: [
      { value: 'chronological', label: 'Chronological' },
      { value: 'functional', label: 'Functional' },
      { value: 'combination', label: 'Combination' },
      { value: 'one-page', label: 'One-Page' },
    ],
    multiSelect: true
  }
];

export default ContentFilter;
