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
  TrendingUp, 
  MapPin, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Building2
} from "lucide-react";
import { seasons, getSeasonBySlug, Season } from "@/data/seasonal-hiring";
import { cities, activeMarketSlugs } from "@/data/cities";
import { roles } from "@/data/roles";
import NotFound from "@/pages/NotFound";

interface SeasonalHubPageProps {
  seasonSlug?: string;
}

const SeasonalHubPage = ({ seasonSlug }: SeasonalHubPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = seasonSlug || params.slug;
  
  // Parse season from slug (e.g., "holiday-warehouse-jobs-2026" -> "holiday-2026")
  const parseSeasonFromSlug = (urlSlug: string): Season | undefined => {
    // Try direct match first
    let season = getSeasonBySlug(urlSlug);
    if (season) return season;
    
    // Try parsing from compound slugs
    if (urlSlug.includes('holiday')) return getSeasonBySlug('holiday-2026');
    if (urlSlug.includes('summer')) return getSeasonBySlug('summer-2026');
    if (urlSlug.includes('back-to-school') || urlSlug.includes('fall')) return getSeasonBySlug('back-to-school-2026');
    if (urlSlug.includes('tax-season')) return getSeasonBySlug('tax-season-2026');
    if (urlSlug.includes('spring')) return getSeasonBySlug('spring-2026');
    
    return undefined;
  };
  
  const season = slug ? parseSeasonFromSlug(slug) : undefined;
  
  if (!season) {
    return <NotFound />;
  }
  
  const SeasonIcon = season.icon;
  
  // Get top cities for this season's industries
  const topCities = cities
    .filter(city => activeMarketSlugs.includes(city.slug))
    .slice(0, 8);
  
  // Get relevant roles for this season's industries
  const relevantRoles = roles
    .filter(role => season.industries.includes(role.industry))
    .slice(0, 8);
  
  // Generate FAQs
  const faqs = [
    {
      question: `When should I start applying for ${season.name} jobs?`,
      answer: season.hiringTimeline
    },
    {
      question: `What industries hire most during ${season.name}?`,
      answer: `The top hiring industries during ${season.name} are ${season.industries.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}. These sectors see significant demand increases and often offer premium pay rates.`
    },
    {
      question: `How much more can I earn during ${season.name}?`,
      answer: `Workers typically see pay increases of ${season.avgPayIncrease} during ${season.name} compared to regular periods. Premium shifts, overtime, and holiday pay can significantly boost earnings.`
    },
    {
      question: `What skills are most valuable for ${season.name} jobs?`,
      answer: `For ${season.industries.join('/')} roles, employers value reliability, flexibility with scheduling, physical stamina, and a positive attitude. Certifications like forklift operation or food handling can increase your pay by $3-5/hr.`
    },
    {
      question: `Can seasonal work lead to permanent employment?`,
      answer: `Yes! Many employers use seasonal hiring as a pipeline for permanent positions. Perform well, express interest, and you may be offered ongoing work after the season ends.`
    }
  ];
  
  // Schema markup
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${season.name} Jobs`,
    "description": season.description,
    "numberOfItems": relevantRoles.length,
    "itemListElement": relevantRoles.map((role, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": role.title,
        "description": role.shortDescription,
        "employmentType": "TEMPORARY",
        "datePosted": new Date().toISOString().split('T')[0]
      }
    }))
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
        "name": season.name,
        "item": `https://indeedflex.com/${slug}`
      }
    ]
  };
  
  return (
    <>
      <SEOMetaTags
        title={`${season.name} Jobs | Seasonal Hiring Guide | Indeed Flex`}
        description={`${season.shortDescription} Apply now for ${season.industries.join(', ')} positions. ${season.hiringTimeline}`}
        canonical={`https://indeedflex.com/${slug}`}
        keywords={season.searchKeywords}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(jobPostingSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Seasonal Hiring", href: "/career-hub/seasonal-hiring" },
              { label: season.name }
            ]} 
          />
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <SeasonIcon className="h-8 w-8 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                  {season.demandLevel === 'very-high' ? '🔥 Very High Demand' : season.demandLevel === 'high' ? '📈 High Demand' : '📊 Medium Demand'}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {season.name} Jobs
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-6 max-w-3xl">
                {season.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5" />
                  <span>{season.months.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                  <span>{season.avgPayIncrease} pay increase</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                  <Building2 className="h-5 w-5" />
                  <span>{season.industries.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}</span>
                </div>
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
        
        {/* Hiring Timeline */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    When to Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{season.hiringTimeline}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">About {season.name}</h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p>{season.description}</p>
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
              <h2 className="text-2xl font-bold mb-6">Popular Roles</h2>
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
              
              {/* Top Cities */}
              <h2 className="text-2xl font-bold mb-6">
                <MapPin className="inline h-6 w-6 mr-2" />
                Top Hiring Cities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {topCities.map(city => (
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
                      <span className="text-sm text-muted-foreground">Estimate your earnings</span>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <Link to="/career-hub/tools/shift-planner" className="flex flex-col items-center text-center">
                      <Calendar className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Shift Planner</span>
                      <span className="text-sm text-muted-foreground">Plan your schedule</span>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <Link to="/career-hub/guides/first-flex-job" className="flex flex-col items-center text-center">
                      <TrendingUp className="h-8 w-8 text-primary mb-2" />
                      <span className="font-medium">Getting Started</span>
                      <span className="text-sm text-muted-foreground">Your first flexible job</span>
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
          title={`${season.name} FAQs`}
        />
        
        {/* Internal Links */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'programmatic' }} />
          </div>
        </section>
        
        <CTASection 
          title={`Ready for ${season.name}?`}
          subtitle="Download Indeed Flex and start browsing available shifts in your area."
        />
      </Layout>
    </>
  );
};

export default SeasonalHubPage;
