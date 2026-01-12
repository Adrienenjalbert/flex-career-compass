import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ArrowRight, 
  TrendingUp,
  Clock,
  DollarSign,
  MapPin
} from "lucide-react";
import { 
  seasons, 
  seasonalEvents, 
  contentCalendar,
  getCurrentSeason,
  getUpcomingSeasons,
  getCurrentCalendarMonth
} from "@/data/seasonal-hiring";
import { cities, activeMarketSlugs } from "@/data/cities";

const SeasonalHiringPage = () => {
  const currentSeason = getCurrentSeason();
  const upcomingSeasons = getUpcomingSeasons(3);
  const currentMonth = getCurrentCalendarMonth();
  
  // Top cities for quick links
  const topCities = cities
    .filter(city => activeMarketSlugs.includes(city.slug))
    .slice(0, 6);
  
  // Schema markup
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Seasonal & Event Hiring | Indeed Flex Career Hub",
    "description": "Find seasonal and event-based job opportunities. Holiday warehouse jobs, summer hospitality, Black Friday hiring, and more.",
    "url": "https://indeedflex.com/career-hub/seasonal-hiring",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": seasons.length + seasonalEvents.length
    }
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Career Hub",
        "item": "https://indeedflex.com/career-hub"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Seasonal Hiring",
        "item": "https://indeedflex.com/career-hub/seasonal-hiring"
      }
    ]
  };
  
  const getDemandBadge = (level: 'low' | 'medium' | 'high' | 'very-high') => {
    switch (level) {
      case 'very-high':
        return <Badge className="bg-red-500 text-white">🔥 Very High Demand</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white">📈 High Demand</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 text-black">📊 Medium Demand</Badge>;
      default:
        return <Badge variant="secondary">📉 Lower Demand</Badge>;
    }
  };
  
  return (
    <>
      <SEOMetaTags
        title="Seasonal & Event Hiring 2026 | Indeed Flex Career Hub"
        description="Find seasonal job opportunities: holiday warehouse jobs, summer hospitality, Black Friday hiring, Prime Day, and more. Learn when to apply and how much you can earn."
        canonical="https://indeedflex.com/career-hub/seasonal-hiring"
        keywords={[
          'seasonal jobs 2026',
          'holiday warehouse jobs',
          'summer hospitality jobs',
          'black friday hiring',
          'christmas temp work',
          'event staffing jobs'
        ]}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(collectionPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Seasonal Hiring" }]} />
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Seasonal & Event Hiring 2026
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
              Discover the best times to find work, which seasons pay the most, and how to prepare for peak hiring periods.
            </p>
            {currentMonth && (
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5" />
                <span>Current Focus: {currentMonth.focus}</span>
                {getDemandBadge(currentMonth.trafficPotential)}
              </div>
            )}
          </div>
        </section>
        
        {/* Current/Upcoming Season Alert */}
        {currentSeason && (
          <section className="py-8 bg-accent/10">
            <div className="container mx-auto px-4">
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent/20 rounded-full">
                        <currentSeason.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">It's {currentSeason.name}!</h3>
                        <p className="text-muted-foreground">{currentSeason.shortDescription}</p>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/holiday-warehouse-jobs-2026`}>
                        View Opportunities
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
        
        {/* Seasonal Hiring Opportunities */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Seasonal Opportunities</h2>
            <p className="text-muted-foreground mb-8">Major hiring periods throughout the year</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasons.map(season => {
                const SeasonIcon = season.icon;
                return (
                  <Card key={season.id} className="hover:border-primary/30 transition-colors group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <SeasonIcon className="h-6 w-6 text-primary" />
                        </div>
                        {getDemandBadge(season.demandLevel)}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {season.name}
                      </CardTitle>
                      <CardDescription>{season.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{season.months.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{season.avgPayIncrease} pay increase</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="line-clamp-1">{season.hiringTimeline.split('.')[0]}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {season.industries.slice(0, 3).map(industry => (
                          <Badge key={industry} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/${season.slug.replace('-2026', '-warehouse-jobs-2026')}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Major Hiring Events</h2>
            <p className="text-muted-foreground mb-8">Specific events that create surge hiring demand</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalEvents.map(event => {
                const EventIcon = event.icon;
                return (
                  <Card key={event.id} className="hover:border-primary/30 transition-colors group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <EventIcon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {event.date}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {event.name}
                      </CardTitle>
                      <CardDescription>{event.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{event.avgPayIncrease} pay increase</span>
                        </div>
                        {event.cities && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {event.cities.length === 1 
                                ? cities.find(c => c.slug === event.cities?.[0])?.city 
                                : `${event.cities.length} cities`}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.industries.slice(0, 3).map(industry => (
                          <Badge key={industry} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/${event.slug.replace('-2026', '-hiring-2026')}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Content Calendar */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">2026 Hiring Calendar</h2>
            <p className="text-muted-foreground mb-8">Plan your job search around peak hiring periods</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Month</th>
                    <th className="text-left py-3 px-4 font-semibold">Focus</th>
                    <th className="text-left py-3 px-4 font-semibold">Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {contentCalendar.map(month => (
                    <tr key={month.month} className="border-b hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{month.month}</td>
                      <td className="py-3 px-4 text-muted-foreground">{month.focus}</td>
                      <td className="py-3 px-4">{getDemandBadge(month.trafficPotential)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* Quick City Links */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Find Seasonal Jobs by City</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topCities.map(city => (
                <Link 
                  key={city.slug}
                  to={`/career-hub/cities/${city.slug}`}
                  className="p-4 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-secondary/50 transition-all text-center"
                >
                  <p className="font-medium">{city.city}</p>
                  <p className="text-sm text-muted-foreground">{city.stateCode}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Seasonal Guides */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Seasonal Career Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <Link to="/career-hub/guides/holiday-warehouse-guide" className="block">
                    <h3 className="font-semibold mb-2">Holiday Warehouse Jobs: Complete Guide</h3>
                    <p className="text-sm text-muted-foreground">Everything you need to know about holiday warehouse work.</p>
                  </Link>
                </CardContent>
              </Card>
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <Link to="/career-hub/guides/black-friday-hiring" className="block">
                    <h3 className="font-semibold mb-2">How to Get Hired for Black Friday</h3>
                    <p className="text-sm text-muted-foreground">Tips for landing the best Black Friday shifts.</p>
                  </Link>
                </CardContent>
              </Card>
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <Link to="/career-hub/guides/summer-hospitality-guide" className="block">
                    <h3 className="font-semibold mb-2">Summer Hospitality Jobs Guide</h3>
                    <p className="text-sm text-muted-foreground">Make the most of summer hospitality opportunities.</p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Internal Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" />
          </div>
        </section>
        
        <CTASection 
          title="Ready to Find Seasonal Work?"
          subtitle="Download Indeed Flex and start browsing available shifts in your area."
        />
      </Layout>
    </>
  );
};

export default SeasonalHiringPage;
