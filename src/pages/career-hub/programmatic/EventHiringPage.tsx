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
  Clock, 
  MapPin, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Building2,
  AlertCircle
} from "lucide-react";
import { seasonalEvents, getEventBySlug, SeasonalEvent } from "@/data/seasonal-hiring";
import { cities, activeMarketSlugs } from "@/data/cities";
import { roles } from "@/data/roles";
import NotFound from "@/pages/NotFound";

interface EventHiringPageProps {
  eventSlug?: string;
}

const EventHiringPage = ({ eventSlug }: EventHiringPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = eventSlug || params.slug;
  
  // Parse event from slug (e.g., "prime-day-hiring-2026" -> "prime-day-2026")
  const parseEventFromSlug = (urlSlug: string): SeasonalEvent | undefined => {
    // Try direct match first
    let event = getEventBySlug(urlSlug);
    if (event) return event;
    
    // Try parsing from compound slugs
    if (urlSlug.includes('prime-day')) return getEventBySlug('prime-day-2026');
    if (urlSlug.includes('black-friday') && urlSlug.includes('hiring')) return getEventBySlug('black-friday-2026');
    if (urlSlug.includes('super-bowl')) return getEventBySlug('super-bowl-2026');
    if (urlSlug.includes('concert') || urlSlug.includes('festival')) return getEventBySlug('concert-season-2026');
    if (urlSlug.includes('new-year')) return getEventBySlug('new-years-2026');
    
    return undefined;
  };
  
  const event = slug ? parseEventFromSlug(slug) : undefined;
  
  if (!event) {
    return <NotFound />;
  }
  
  const EventIcon = event.icon;
  
  // Get relevant cities (event-specific or top markets)
  const relevantCities = event.cities 
    ? cities.filter(city => event.cities?.includes(city.slug))
    : cities.filter(city => activeMarketSlugs.includes(city.slug)).slice(0, 8);
  
  // Get relevant roles for this event's industries
  const relevantRoles = roles
    .filter(role => event.industries.includes(role.industry))
    .slice(0, 6);
  
  // Generate FAQs
  const faqs = [
    {
      question: `When is ${event.name}?`,
      answer: `${event.name} takes place on ${event.date}. ${event.hiringTimeline}`
    },
    {
      question: `What types of jobs are available for ${event.name}?`,
      answer: `${event.name} creates demand primarily in ${event.industries.join(', ')}. Common positions include ${relevantRoles.slice(0, 3).map(r => r.title).join(', ')}, and more.`
    },
    {
      question: `How much can I earn working ${event.name}?`,
      answer: `Workers typically see pay increases of ${event.avgPayIncrease} during ${event.name} compared to regular periods. Premium shifts and event bonuses can significantly boost earnings.`
    },
    {
      question: `When should I apply for ${event.name} jobs?`,
      answer: event.hiringTimeline
    },
    {
      question: `What should I know before working ${event.name}?`,
      answer: `Key tips: ${event.tips.slice(0, 2).join('. ')}. Reliability is crucial - showing up on time and performing well can lead to future event opportunities.`
    }
  ];
  
  // Schema markup
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "organizer": {
      "@type": "Organization",
      "name": "Indeed Flex",
      "url": "https://indeedflex.com"
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.name,
        "item": `https://indeedflex.com/${slug}`
      }
    ]
  };
  
  return (
    <>
      <SEOMetaTags
        title={`${event.name} Jobs | Event Hiring Guide | Indeed Flex`}
        description={`${event.shortDescription} ${event.hiringTimeline} Earn ${event.avgPayIncrease} more during this peak period.`}
        canonical={`https://indeedflex.com/${slug}`}
        keywords={event.searchKeywords}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Seasonal Hiring", href: "/career-hub/seasonal-hiring" },
              { label: event.name }
            ]} 
          />
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <EventIcon className="h-8 w-8 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {event.date}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {event.name} Jobs
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-6 max-w-3xl">
                {event.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                  <span>{event.avgPayIncrease} pay increase</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <Building2 className="h-5 w-5" />
                  <span>{event.industries.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}</span>
                </div>
                {event.cities && (
                  <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                    <MapPin className="h-5 w-5" />
                    <span>{event.cities.length === 1 ? cities.find(c => c.slug === event.cities?.[0])?.city : `${event.cities.length} cities`}</span>
                  </div>
                )}
              </div>
              
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Start Applying Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Hiring Timeline Alert */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Hiring Timeline</h3>
                      <p className="text-amber-700 dark:text-amber-300">{event.hiringTimeline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">About {event.name}</h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p>{event.description}</p>
              </div>
              
              {/* Tips Section */}
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {event.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Available Roles */}
              <h2 className="text-2xl font-bold mb-6">In-Demand Roles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {relevantRoles.map(role => (
                  <Card key={role.slug} className="hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <Link to={`/career-hub/roles/${role.slug}`} className="hover:text-primary transition-colors">
                          {role.title}
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
              
              {/* Hiring Cities */}
              <h2 className="text-2xl font-bold mb-6">
                <MapPin className="inline h-6 w-6 mr-2" />
                {event.cities ? 'Event Location' : 'Top Hiring Cities'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {relevantCities.map(city => (
                  <Link 
                    key={city.slug}
                    to={`/career-hub/cities/${city.slug}`}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-center"
                  >
                    <p className="font-medium">{city.city}</p>
                    <p className="text-sm text-muted-foreground">{city.stateCode}</p>
                  </Link>
                ))}
              </div>
              
              {/* Related Resources */}
              <h2 className="text-2xl font-bold mb-6">Helpful Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <Link to="/career-hub/tools/pay-calculator" className="flex flex-col items-center text-center">
                      <DollarSign className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Pay Calculator</span>
                      <span className="text-sm text-muted-foreground">Estimate event earnings</span>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <Link to="/career-hub/tools/shift-planner" className="flex flex-col items-center text-center">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Shift Planner</span>
                      <span className="text-sm text-muted-foreground">Plan your schedule</span>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <Link to="/career-hub/guides/first-flex-job" className="flex flex-col items-center text-center">
                      <Calendar className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Getting Started</span>
                      <span className="text-sm text-muted-foreground">New to Indeed Flex?</span>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQSection 
          faqs={faqs}
          title={`${event.name} FAQs`}
        />
        
        {/* Internal Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'programmatic' }} />
          </div>
        </section>
        
        <CTASection 
          title={`Ready for ${event.name}?`}
          subtitle="Download Indeed Flex and start browsing available shifts."
        />
      </Layout>
    </>
  );
};

export default EventHiringPage;
