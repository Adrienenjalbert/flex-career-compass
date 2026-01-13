import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  LocalizedCityData, 
  CityEmployer, 
  CityEvent, 
  CityWageData, 
  CityTransportInfo,
  calculateDataTier,
  articleSlugToSeasonType,
} from "@/data/localized-content";

interface UseLocalizedCityDataParams {
  citySlug: string;
  seasonType?: string;
  articleSlug?: string;
}

export function useLocalizedCityData({ citySlug, seasonType, articleSlug }: UseLocalizedCityDataParams) {
  // Resolve season type from article slug if provided
  const resolvedSeasonType = seasonType || (articleSlug ? articleSlugToSeasonType[articleSlug] : undefined);

  return useQuery({
    queryKey: ['localizedCityData', citySlug, resolvedSeasonType],
    queryFn: async (): Promise<LocalizedCityData> => {
      // Fetch employers (filtered by season if provided)
      let employersQuery = supabase
        .from('city_employers')
        .select('*')
        .eq('city_slug', citySlug)
        .order('is_verified', { ascending: false })
        .order('estimated_seasonal_hires', { ascending: false, nullsFirst: false });
      
      if (resolvedSeasonType) {
        employersQuery = employersQuery.eq('season_type', resolvedSeasonType);
      }
      
      const { data: employers, error: employersError } = await employersQuery;
      if (employersError) console.error('Error fetching employers:', employersError);

      // Fetch events
      const { data: events, error: eventsError } = await supabase
        .from('city_events')
        .select('*')
        .eq('city_slug', citySlug)
        .order('event_start_date', { ascending: true });
      if (eventsError) console.error('Error fetching events:', eventsError);

      // Fetch wage data
      const { data: wageData, error: wageError } = await supabase
        .from('city_wage_data')
        .select('*')
        .eq('city_slug', citySlug);
      if (wageError) console.error('Error fetching wage data:', wageError);

      // Fetch transport info
      const { data: transportInfo, error: transportError } = await supabase
        .from('city_transport_info')
        .select('*')
        .eq('city_slug', citySlug)
        .maybeSingle();
      if (transportError) console.error('Error fetching transport info:', transportError);

      const baseData = {
        employers: (employers as CityEmployer[]) || [],
        events: (events as CityEvent[]) || [],
        wageData: (wageData as CityWageData[]) || [],
        transportInfo: (transportInfo as CityTransportInfo) || null,
      };

      return {
        ...baseData,
        dataCompleteness: calculateDataTier(baseData),
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useAllCityDataStats() {
  return useQuery({
    queryKey: ['cityDataStats'],
    queryFn: async () => {
      // Get count of cities with data
      const { count: employerCities } = await supabase
        .from('city_employers')
        .select('city_slug', { count: 'exact', head: true });
      
      const { count: totalEmployers } = await supabase
        .from('city_employers')
        .select('*', { count: 'exact', head: true });

      const { count: totalEvents } = await supabase
        .from('city_events')
        .select('*', { count: 'exact', head: true });

      const { count: citiesWithTransport } = await supabase
        .from('city_transport_info')
        .select('*', { count: 'exact', head: true });

      return {
        totalEmployers: totalEmployers || 0,
        totalEvents: totalEvents || 0,
        citiesWithTransport: citiesWithTransport || 0,
        employerCities: employerCities || 0,
      };
    },
    staleTime: 60 * 1000,
  });
}
