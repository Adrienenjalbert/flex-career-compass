/**
 * URL-Based Filter State Management Hook
 * Syncs filter state with URL query parameters for SEO and shareability
 */

import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { 
  Industry, 
  ExperienceLevel, 
  UserSituation, 
  ContentIntent,
  ResumeFormat 
} from '@/data/taxonomy';

// Extended filter types supporting all taxonomy categories
export interface UrlFilters {
  industry: Industry[];
  experienceLevel: ExperienceLevel[];
  userSituation: UserSituation[];
  contentIntent: ContentIntent[];
  format: ResumeFormat[];
  documentType: string[];
  language: string[];
  search: string;
  sort: 'relevance' | 'newest' | 'popular' | 'alphabetical';
}

export type FilterCategory = keyof Omit<UrlFilters, 'search' | 'sort'>;

const defaultFilters: UrlFilters = {
  industry: [],
  experienceLevel: [],
  userSituation: [],
  contentIntent: [],
  format: [],
  documentType: [],
  language: [],
  search: '',
  sort: 'relevance'
};

// Map URL param names to filter categories
const paramToCategory: Record<string, FilterCategory> = {
  'industry': 'industry',
  'level': 'experienceLevel',
  'situation': 'userSituation',
  'intent': 'contentIntent',
  'format': 'format',
  'type': 'documentType',
  'lang': 'language'
};

const categoryToParam: Record<FilterCategory, string> = {
  'industry': 'industry',
  'experienceLevel': 'level',
  'userSituation': 'situation',
  'contentIntent': 'intent',
  'format': 'format',
  'documentType': 'type',
  'language': 'lang'
};

/**
 * Hook for managing URL-synced filter state
 * Enables bookmarkable, shareable, and SEO-indexable filtered views
 */
export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse current URL params into filter state
  const activeFilters = useMemo((): UrlFilters => {
    const filters = { ...defaultFilters };
    
    // Parse array params
    Object.entries(paramToCategory).forEach(([param, category]) => {
      const values = searchParams.getAll(param);
      if (values.length > 0) {
        (filters[category] as string[]) = values;
      }
    });
    
    // Parse single-value params
    filters.search = searchParams.get('q') || '';
    filters.sort = (searchParams.get('sort') as UrlFilters['sort']) || 'relevance';
    
    return filters;
  }, [searchParams]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return (
      activeFilters.industry.length +
      activeFilters.experienceLevel.length +
      activeFilters.userSituation.length +
      activeFilters.contentIntent.length +
      activeFilters.format.length +
      activeFilters.documentType.length +
      activeFilters.language.length +
      (activeFilters.search ? 1 : 0)
    );
  }, [activeFilters]);

  // Update filters and sync to URL
  const updateFilters = useCallback((newFilters: Partial<UrlFilters>) => {
    const merged = { ...activeFilters, ...newFilters };
    const params = new URLSearchParams();
    
    // Add array params
    Object.entries(categoryToParam).forEach(([category, param]) => {
      const values = merged[category as FilterCategory];
      if (Array.isArray(values)) {
        values.forEach(value => params.append(param, value));
      }
    });
    
    // Add single-value params
    if (merged.search) {
      params.set('q', merged.search);
    }
    if (merged.sort && merged.sort !== 'relevance') {
      params.set('sort', merged.sort);
    }
    
    setSearchParams(params, { replace: true });
  }, [activeFilters, setSearchParams]);

  // Toggle a single filter value
  const toggleFilter = useCallback((category: FilterCategory, value: string) => {
    const currentValues = activeFilters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateFilters({ [category]: newValues });
  }, [activeFilters, updateFilters]);

  // Set search query
  const setSearch = useCallback((query: string) => {
    updateFilters({ search: query });
  }, [updateFilters]);

  // Set sort option
  const setSort = useCallback((sort: UrlFilters['sort']) => {
    updateFilters({ sort });
  }, [updateFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Clear a single filter category
  const clearCategory = useCallback((category: FilterCategory) => {
    updateFilters({ [category]: [] });
  }, [updateFilters]);

  // Remove a specific filter value
  const removeFilter = useCallback((category: FilterCategory, value: string) => {
    const currentValues = activeFilters[category] as string[];
    const newValues = currentValues.filter(v => v !== value);
    updateFilters({ [category]: newValues });
  }, [activeFilters, updateFilters]);

  // Check if a filter is active
  const isFilterActive = useCallback((category: FilterCategory, value: string): boolean => {
    const values = activeFilters[category] as string[];
    return values.includes(value);
  }, [activeFilters]);

  // Get URL for pre-filtered landing page
  const getFilteredUrl = useCallback((filters: Partial<UrlFilters>, basePath?: string): string => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'search' && value) {
        params.set('q', value as string);
      } else if (key === 'sort' && value && value !== 'relevance') {
        params.set('sort', value as string);
      } else if (Array.isArray(value) && value.length > 0) {
        const param = categoryToParam[key as FilterCategory];
        if (param) {
          value.forEach(v => params.append(param, v));
        }
      }
    });
    
    const base = basePath || location.pathname;
    const queryString = params.toString();
    return queryString ? `${base}?${queryString}` : base;
  }, [location.pathname]);

  // Navigate to a pre-filtered view
  const navigateToFiltered = useCallback((filters: Partial<UrlFilters>, basePath?: string) => {
    const url = getFilteredUrl(filters, basePath);
    navigate(url);
  }, [getFilteredUrl, navigate]);

  return {
    // State
    activeFilters,
    activeFilterCount,
    
    // Actions
    updateFilters,
    toggleFilter,
    setSearch,
    setSort,
    clearAllFilters,
    clearCategory,
    removeFilter,
    
    // Utilities
    isFilterActive,
    getFilteredUrl,
    navigateToFiltered
  };
};

/**
 * Presets for common persona-based filters
 * Used for pre-filtered landing pages
 */
export const FILTER_PRESETS: Record<string, Partial<UrlFilters>> = {
  'for-students': {
    userSituation: ['student']
  },
  'for-freshers': {
    userSituation: ['fresher'],
    experienceLevel: ['no-experience']
  },
  'for-immigrants': {
    userSituation: ['immigrant', 'visa-holder']
  },
  'for-parents': {
    userSituation: ['parent']
  },
  'for-career-changers': {
    userSituation: ['career-changer'],
    experienceLevel: ['career-change']
  },
  'for-teens': {
    userSituation: ['teen'],
    experienceLevel: ['no-experience']
  },
  'for-seasonal': {
    userSituation: ['seasonal']
  },
  'warehouse': {
    industry: ['industrial']
  },
  'hospitality': {
    industry: ['hospitality']
  },
  'retail': {
    industry: ['retail']
  },
  'functional-format': {
    format: ['functional']
  },
  'chronological-format': {
    format: ['chronological']
  },
  'ats-optimized': {
    format: ['ats-optimized']
  }
};

export default useUrlFilters;
