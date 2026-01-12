import { useParams, Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import FAQSection from "@/components/career-hub/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Building2,
  Briefcase
} from "lucide-react";
import { seasons, getSeasonBySlug, Season } from "@/data/seasonal-hiring";
import { cities, City, isActiveMarket } from "@/data/cities";
import { roles } from "@/data/roles";
import NotFound from "@/pages/NotFound";

interface SeasonalLocationPageProps {
  seasonSlug?: string;
  citySlug?: string;
}

const SeasonalLocationPage = ({ seasonSlug, citySlug }: SeasonalLocationPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = seasonSlug ? `${seasonSlug}-${citySlug}` : params.slug;
  
  // Parse season and city from slug (e.g., "christmas-temp-jobs-dallas")
  const parseFromSlug = (urlSlug: string): { season: Season | undefined; city: City | undefined } => {
    // Common patterns: 
    // christmas-temp-jobs-{city}
    // holiday-warehouse-jobs-{city}
    // summer-hospitality-jobs-{city}
    // fall-retail-jobs-{city}
    // black-friday-jobs-{city}
    
    let season: Season | undefined;
    let citySlugParsed: string | undefined;
    
    if (urlSlug.startsWith('christmas-temp-jobs-')) {
      season = getSeasonBySlug('holiday-2026');
      citySlugParsed = urlSlug.replace('christmas-temp-jobs-', '');
    } else if (urlSlug.startsWith('holiday-warehouse-jobs-')) {
      season = getSeasonBySlug('holiday-2026');
      citySlugParsed = urlSlug.replace('holiday-warehouse-jobs-', '');
    } else if (urlSlug.startsWith('summer-hospitality-jobs-')) {
      season = getSeasonBySlug('summer-2026');
      citySlugParsed = urlSlug.replace('summer-hospitality-jobs-', '');
    } else if (urlSlug.startsWith('fall-retail-jobs-')) {
      season = getSeasonBySlug('back-to-school-2026');
      citySlugParsed = urlSlug.replace('fall-retail-jobs-', '');
    } else if (urlSlug.startsWith('black-friday-jobs-')) {
      season = getSeasonBySlug('holiday-2026');
      citySlugParsed = urlSlug.replace('black-friday-jobs-', '');
    }
    
    const city = citySlugParsed ? cities.find(c => c.slug === citySlugParsed) : undefined;
    
    return { season, city };
  };
  
  const { season, city } = slug ? parseFromSlug(slug) : { season: undefined, city: undefined };
  
  if (!season || !city) {
    return <NotFound />;
  }
  
  const SeasonIcon = season.icon;
  const isActive = isActiveMarket(city.slug);
  
  // Get relevant roles for this season's industries
  const relevantRoles = roles
    .filter(role => season.industries.includes(role.industry))
    .slice(0, 6);
  
  // Get nearby cities
  const nearbyCities = cities
    .filter(c => c.slug !== city.slug && c.region === city.region)
    .slice(0, 4);
  
  // Page title based on URL pattern
  const getPageTitle = (): string => {
    if (slug?.includes('christmas')) return `Christmas Temp Jobs in ${city.city}`;
    if (slug?.includes('summer-hospitality')) return `Summer Hospitality Jobs in ${city.city}`;
    if (slug?.includes('fall-retail')) return `Fall Retail Jobs in ${city.city}`;
    if (slug?.includes('black-friday')) return `Black Friday Jobs in ${city.city}`;
    return `${season.name} Jobs in ${city.city}`;
  };
  
  const pageTitle = getPageTitle();
  
  // Generate FAQs
  const faqs = [
    {
      question: `What seasonal jobs are available in ${city.city} during ${season.name}?`,
      answer: `During ${season.name}, ${city.city} sees increased hiring in ${season.industries.join(', ')}. Common positions include ${relevantRoles.slice(0, 3).map(r => r.title).join(', ')}, and more. Pay typically ranges from $${city.avgHourlyWage.min} to $${city.avgHourlyWage.max} per hour.`
    },
    {
      question: `When should I apply for ${season.name} jobs in ${city.city}?`,
      answer: season.hiringTimeline
    },
    {
      question: `How much can I earn during ${season.name} in ${city.city}?`,
      answer: `Base pay in ${city.city} averages $${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr, with seasonal premiums adding ${season.avgPayIncrease}. Night shifts, weekends, and holiday pay can further increase earnings.`
    },
    {
      question: `Is Indeed Flex available in ${city.city}?`,
      answer: isActive 
        ? `Yes! ${city.city} is an active Indeed Flex market. Download the app to browse and book shifts in your area.`
        : `${city.city} is not currently an active Indeed Flex market, but we're expanding. Check back soon or explore nearby active markets.`
    }
  ];
  
  // Schema markup
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": `https://indeedflex.com/${slug}`
      }
    ]
  };
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "Indeed Flex",
    "description": `Find ${season.name.toLowerCase()} jobs in ${city.city}, ${city.state}`,
    "areaServed": {
      "@type": "City",
      "name": city.city,
      "containedIn": {
        "@type": "State",
        "name": city.state
      }
    }
  };
  
  return (
    <>
      <SEOMetaTags
        title={`${pageTitle} | ${season.name} Hiring | Indeed Flex`}
        description={`Find ${season.name.toLowerCase()} jobs in ${city.city}, ${city.stateCode}. ${season.shortDescription} Average pay: $${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr.`}
        canonical={`https://indeedflex.com/${slug}`}
        keywords={[
          `${season.name.toLowerCase()} jobs ${city.city}`,
          `seasonal work ${city.city}`,
          `temp jobs ${city.city} ${city.stateCode}`,
          ...season.searchKeywords.slice(0, 3)
        ]}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Seasonal Hiring", href: "/career-hub/seasonal-hiring" },
              { label: city.city, href: `/career-hub/cities/${city.slug}` },
              { label: season.name }
            ]} 
          />
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <SeasonIcon className="h-8 w-8 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {city.city}, {city.stateCode}
                </Badge>
                {isActive && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-100">
                    ✓ Active Market
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {pageTitle}
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-6 max-w-3xl">
                {season.shortDescription} Find opportunities in {city.city}'s {season.industries.join(', ')} sectors.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                  <span>${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5" />
                  <span>{season.months.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <Building2 className="h-5 w-5" />
                  <span>{season.avgPayIncrease} seasonal premium</span>
                </div>
              </div>
              
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Find Jobs in {city.city}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                {season.name} in {city.city}
              </h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p>
                  {city.city}, {city.state} experiences strong seasonal hiring demand during {season.name}. 
                  With a cost of living index of {city.costOfLivingIndex} and average wages of ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr, 
                  {city.city} offers solid earning opportunities for flexible workers.
                </p>
                <p>
                  {season.description}
                </p>
              </div>
              
              {/* Tips Section */}
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Tips for {city.city} Workers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {season.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Available Roles */}
              <h2 className="text-2xl font-bold mb-6">
                <Briefcase className="inline h-6 w-6 mr-2" />
                Popular Roles in {city.city}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {relevantRoles.map(role => (
                  <Card key={role.slug} className="hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <Link to={`/career-hub/cities/${city.slug}/${role.slug}`} className="hover:text-primary transition-colors">
                          {role.title} in {city.city}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{role.shortDescription}</p>
                      <p className="text-sm font-medium text-primary">
                        ${role.payRange.min}-${role.payRange.max}/hr
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Nearby Cities */}
              {nearbyCities.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    <MapPin className="inline h-6 w-6 mr-2" />
                    Nearby Cities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {nearbyCities.map(nearbyCity => (
                      <Link 
                        key={nearbyCity.slug}
                        to={`/career-hub/cities/${nearbyCity.slug}`}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-center"
                      >
                        <p className="font-medium">{nearbyCity.city}</p>
                        <p className="text-sm text-muted-foreground">{nearbyCity.stateCode}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQSection 
          faqs={faqs}
          title={`${pageTitle} FAQs`}
        />
        
        {/* Internal Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'programmatic', city: city.slug }} />
          </div>
        </section>
        
        <CTASection 
          title={`Start Working in ${city.city}`}
          subtitle="Download Indeed Flex and browse seasonal opportunities in your area."
        />
      </Layout>
    </>
  );
};

export default SeasonalLocationPage;
