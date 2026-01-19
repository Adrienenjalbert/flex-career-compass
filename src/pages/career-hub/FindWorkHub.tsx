import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building2, Calendar, FileText, Briefcase } from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import { SEOMetaTags } from "@/components/career-hub/seo";
import CTASection from "@/components/career-hub/CTASection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hubs, pillars } from "@/data/taxonomy";

const FindWorkHub = () => {
  const pillar = pillars['find-work'];
  const pillarHubs = Object.values(hubs).filter(h => h.pillar === 'find-work');

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Find Work - Indeed Flex Career Hub",
    "description": "Discover flexible job opportunities across 19 US markets. Browse by location, industry, or season.",
    "url": "https://indeedflex.com/career-hub/find-work",
    "hasPart": pillarHubs.map(hub => ({
      "@type": "WebPage",
      "name": hub.name,
      "url": `https://indeedflex.com${hub.href}`
    }))
  };

  return (
    <>
      <SEOMetaTags
        title="Find Flexible Work | Indeed Flex Career Hub"
        description="Discover flexible job opportunities in hospitality, warehouse, retail & facilities across 19 US cities. Browse by location, industry, or season. Apply today."
        canonical="/career-hub/find-work"
        keywords={["flexible jobs", "temp work", "Indeed Flex jobs", "gig work", "hourly jobs"]}
      />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Briefcase className="h-3 w-3 mr-1" />
                Find Work
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Jobs That Fit Your Life
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Browse flexible opportunities across 19 US markets. Choose by location, industry, or season—then apply and start earning.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/career-hub/active-markets"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Browse Active Markets
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/career-hub/job-application-toolkit"
                  className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Job Application Toolkit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hub Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {pillarHubs.map((hub) => {
                const Icon = hub.icon;
                return (
                  <Link key={hub.id} to={hub.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {hub.name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{hub.description}</p>
                        <span className="text-primary font-medium inline-flex items-center gap-1">
                          Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">19</div>
                <div className="text-sm text-muted-foreground">Active Markets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Role Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">165K+</div>
                <div className="text-sm text-muted-foreground">Flexers Nationwide</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Popular Markets</h2>
                <p className="text-muted-foreground">Top cities for flexible work opportunities</p>
              </div>
              <Link to="/career-hub/active-markets" className="text-primary font-medium hover:underline hidden md:block">
                View all 19 markets →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Austin', 'Dallas', 'Chicago', 'Atlanta', 'Las Vegas', 'Nashville'].map((city) => (
                <Link
                  key={city}
                  to={`/career-hub/locations/${city.toLowerCase().replace(' ', '-')}`}
                  className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group text-center"
                >
                  <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                  <span className="font-medium group-hover:text-primary transition-colors">{city}</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link to="/career-hub/active-markets" className="text-primary font-medium hover:underline">
                View all 19 markets →
              </Link>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Browse by Industry</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Hospitality', slug: 'hospitality', icon: '🍽️', roles: '8 roles' },
                { name: 'Warehouse & Industrial', slug: 'industrial', icon: '📦', roles: '6 roles' },
                { name: 'Retail', slug: 'retail', icon: '🛍️', roles: '4 roles' },
                { name: 'Facilities', slug: 'facilities', icon: '🧹', roles: '2 roles' },
              ].map((industry) => (
                <Link
                  key={industry.slug}
                  to={`/career-hub/industries/${industry.slug}`}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="text-3xl mb-3">{industry.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.roles}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default FindWorkHub;
