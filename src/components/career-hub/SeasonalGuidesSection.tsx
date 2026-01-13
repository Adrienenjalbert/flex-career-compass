import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Snowflake, Sun, Ticket, Receipt, GraduationCap, ShoppingBag, ChevronRight } from 'lucide-react';
import { seasonalArticleSlugs, getSeasonalLocationUrl, type SeasonalArticleSlug } from '@/data/articles/seasonal-location-data';
import { cities } from '@/data/cities';

interface SeasonalGuidesSectionProps {
  citySlug: string;
  cityName: string;
}

// Map article slugs to display info
const seasonalGuideInfo: Record<SeasonalArticleSlug, { 
  title: string; 
  shortTitle: string;
  icon: typeof Calendar; 
  color: string;
  description: string;
}> = {
  'holiday-warehouse-guide': {
    title: 'Holiday Warehouse Jobs',
    shortTitle: 'Holiday Warehouse',
    icon: Snowflake,
    color: 'text-blue-500',
    description: 'Oct-Dec peak hiring'
  },
  'black-friday-hiring': {
    title: 'Black Friday Hiring',
    shortTitle: 'Black Friday',
    icon: ShoppingBag,
    color: 'text-orange-500',
    description: 'Retail rush jobs'
  },
  'summer-hospitality-guide': {
    title: 'Summer Hospitality Jobs',
    shortTitle: 'Summer Hospitality',
    icon: Sun,
    color: 'text-yellow-500',
    description: 'May-Sep opportunities'
  },
  'event-staffing-guide': {
    title: 'Event Staffing Jobs',
    shortTitle: 'Event Staffing',
    icon: Ticket,
    color: 'text-purple-500',
    description: 'Concerts, sports & more'
  },
  'tax-season-jobs': {
    title: 'Tax Season Jobs',
    shortTitle: 'Tax Season',
    icon: Receipt,
    color: 'text-green-500',
    description: 'Jan-Apr tax prep work'
  },
  'student-jobs-fall': {
    title: 'Student Jobs',
    shortTitle: 'Student Jobs',
    icon: GraduationCap,
    color: 'text-indigo-500',
    description: 'Flexible student work'
  }
};

const SeasonalGuidesSection = ({ citySlug, cityName }: SeasonalGuidesSectionProps) => {
  // Verify city exists in our data
  const cityExists = cities.some(c => c.slug === citySlug);
  if (!cityExists) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Seasonal Hiring Guides for {cityName}</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Find the best times to apply for flexible work in {cityName}. Each guide includes local employers, pay rates, and application timelines.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seasonalArticleSlugs.map((slug) => {
              const info = seasonalGuideInfo[slug];
              const IconComponent = info.icon;
              const url = getSeasonalLocationUrl(slug, citySlug);

              return (
                <Link key={slug} to={url} className="group">
                  <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-muted ${info.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {info.shortTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {info.description}
                          </p>
                          <Badge variant="secondary" className="mt-3 text-xs">
                            {cityName} Guide
                          </Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalGuidesSection;
