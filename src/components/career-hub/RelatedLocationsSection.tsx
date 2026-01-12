import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { cities, City, isActiveMarket } from '@/data/cities';
import { SeasonalArticleSlug, getSeasonalLocationUrl } from '@/data/articles/seasonal-location-data';

interface RelatedLocationsSectionProps {
  articleSlug: SeasonalArticleSlug;
  currentCitySlug: string;
  limit?: number;
}

// Get article display name for UI
const getArticleDisplayName = (slug: SeasonalArticleSlug): string => {
  const names: Record<SeasonalArticleSlug, string> = {
    'holiday-warehouse-guide': 'Holiday Warehouse Jobs',
    'black-friday-hiring': 'Black Friday Jobs',
    'summer-hospitality-guide': 'Summer Hospitality Jobs',
    'event-staffing-guide': 'Event Staffing Jobs',
    'tax-season-jobs': 'Tax Season Jobs',
    'student-jobs-fall': 'Fall Student Jobs',
  };
  return names[slug] || 'Seasonal Jobs';
};

export const RelatedLocationsSection = ({
  articleSlug,
  currentCitySlug,
  limit = 6,
}: RelatedLocationsSectionProps) => {
  const currentCity = cities.find(c => c.slug === currentCitySlug);
  
  // Get related cities: same region first, then high volume
  const relatedCities = cities
    .filter(c => c.slug !== currentCitySlug)
    .sort((a, b) => {
      // Prioritize same region
      if (currentCity) {
        if (a.region === currentCity.region && b.region !== currentCity.region) return -1;
        if (b.region === currentCity.region && a.region !== currentCity.region) return 1;
      }
      // Then by active market status
      if (isActiveMarket(a.slug) && !isActiveMarket(b.slug)) return -1;
      if (isActiveMarket(b.slug) && !isActiveMarket(a.slug)) return 1;
      // Then by search volume
      const volumeOrder = { high: 0, medium: 1, low: 2 };
      return volumeOrder[a.searchVolume] - volumeOrder[b.searchVolume];
    })
    .slice(0, limit);

  if (relatedCities.length === 0) return null;

  const articleName = getArticleDisplayName(articleSlug);

  return (
    <section className="py-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          {articleName} in Other Cities
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedCities.map((city) => (
          <Link
            key={city.slug}
            to={getSeasonalLocationUrl(articleSlug, city.slug)}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {city.city}, {city.stateCode}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {city.region}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr
                  </Badge>
                  {isActiveMarket(city.slug) && (
                    <Badge variant="outline" className="text-xs text-primary border-primary/50">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Active Market
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* View all cities link */}
      <div className="mt-6 text-center">
        <Link
          to="/career-hub/cities"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          View all cities
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedLocationsSection;
