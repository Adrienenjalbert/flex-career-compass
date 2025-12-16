import { useParams } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import RoleCard from "@/components/career-hub/RoleCard";
import KeyFacts from "@/components/career-hub/KeyFacts";
import RelatedContent from "@/components/career-hub/RelatedContent";
import { 
  SEOMetaTags, 
  generateKeywords,
  LocalBusinessSchema,
  WebPageSchema,
  FAQSchema
} from "@/components/career-hub/seo";
import { getLocationBySlug, usLocations } from "@/data/locations";
import { roles } from "@/data/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, DollarSign, Home, ShoppingCart, Car, Users, Clock, CheckCircle } from "lucide-react";

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = getLocationBySlug(locationSlug || "");

  if (!location) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Location not found</h1>
        </div>
      </Layout>
    );
  }

  // Get top roles for this location (just show a sample)
  const topRoles = roles.slice(0, 6);

  const pageUrl = `https://indeedflex.com/career-hub/locations/${location.slug}`;
  const pageTitle = `Find Flexible Work in ${location.city}, ${location.stateCode}`;
  const pageDescription = `Find flexible hourly jobs in ${location.city}, ${location.state}. Average pay $${location.avgHourlyWage.min}-$${location.avgHourlyWage.max}/hr. ${location.description}`;

  // Generate FAQ data for location
  const faqData = [
    {
      question: `What is the average hourly wage in ${location.city}?`,
      answer: `The average hourly wage for flexible work in ${location.city}, ${location.stateCode} ranges from $${location.avgHourlyWage.min} to $${location.avgHourlyWage.max} per hour, depending on the role and experience level.`
    },
    {
      question: `What industries are hiring in ${location.city}?`,
      answer: `The top industries hiring flexible workers in ${location.city} include ${location.topIndustries.join(', ')}.`
    },
    {
      question: `What is the cost of living in ${location.city}?`,
      answer: `A studio apartment in ${location.city} averages $${location.costOfLiving.rent.studio}/month. Groceries average $${location.costOfLiving.groceries}/month and transportation costs about $${location.costOfLiving.transport}/month.`
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        keywords={generateKeywords(
          ["flexible work", "temp jobs", "hourly jobs"],
          location.city,
          undefined,
          location.topIndustries[0]
        )}
        geoRegion={`US-${location.stateCode}`}
        geoPlacename={location.city}
      />

      {/* Location Schema */}
      <LocalBusinessSchema
        name={`Indeed Flex - ${location.city}`}
        description={`Find flexible work opportunities in ${location.city}, ${location.state}. ${location.description}`}
        address={{
          addressLocality: location.city,
          addressRegion: location.stateCode,
          addressCountry: location.country
        }}
        url={pageUrl}
      />

      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: `${location.city}, ${location.stateCode}` }
        ]}
      />

      <FAQSchema questions={faqData} />

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Locations", href: "/career-hub" },
            { label: `${location.city}, ${location.stateCode}` }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-accent" />
                <span className="text-xl font-medium">{location.state}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible Work in {location.city}, {location.stateCode}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6">
                {location.description}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-accent" />
                  <div>
                    <div className="text-2xl font-bold">${location.avgHourlyWage.min}-${location.avgHourlyWage.max}</div>
                    <div className="text-sm text-primary-foreground/70">avg hourly pay</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-accent" />
                  <div>
                    <div className="text-2xl font-bold">{location.population}</div>
                    <div className="text-sm text-primary-foreground/70">population</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-accent" />
                  <div>
                    <div className="text-2xl font-bold">{location.timezone}</div>
                    <div className="text-sm text-primary-foreground/70">timezone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts - GEO Optimized */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <KeyFacts
              title={`Key Facts: Working in ${location.city}`}
              facts={[
                { label: "Average Pay", value: `$${location.avgHourlyWage.min}-$${location.avgHourlyWage.max} per hour` },
                { label: "Studio Rent", value: `$${location.costOfLiving.rent.studio}/month` },
                { label: "Top Industries", value: location.topIndustries.slice(0, 3).join(", ") },
                { label: "Timezone", value: location.timezone },
              ]}
              summary={`Indeed Flex offers flexible work opportunities in ${location.city}, ${location.stateCode} paying $${location.avgHourlyWage.min}-$${location.avgHourlyWage.max}/hr. Popular industries include ${location.topIndustries.slice(0, 2).join(" and ")}. Download the Indeed Flex app to find shifts near you.`}
            />
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      Rent (Monthly)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Studio</span>
                        <span className="font-semibold">${location.costOfLiving.rent.studio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1-Bedroom</span>
                        <span className="font-semibold">${location.costOfLiving.rent.oneBed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      Groceries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${location.costOfLiving.groceries}</div>
                    <div className="text-sm text-muted-foreground">per month average</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Transport
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${location.costOfLiving.transport}</div>
                    <div className="text-sm text-muted-foreground">per month average</div>
                  </CardContent>
                </Card>
              </div>

              {/* Highlights & Industries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Why Work in {location.city}?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {location.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Industries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {location.topIndustries.map((industry) => (
                        <span 
                          key={industry}
                          className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Roles */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  Popular Roles in {location.city}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topRoles.map((role) => (
                    <RoleCard key={role.id} role={role} linkPrefix={`/career-hub/locations/${location.slug}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Linking Section */}
        <RelatedContent
          currentLocation={location.city}
          roles={topRoles.slice(0, 4).map(r => ({ title: r.title, slug: r.slug, pay: `$${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr` }))}
          locations={usLocations.filter(l => l.slug !== location.slug).slice(0, 4).map(l => ({ name: `${l.city}, ${l.stateCode}`, slug: l.slug }))}
          tools={[
            { title: "Cost of Living Comparison", slug: "cost-of-living", description: `Compare ${location.city} expenses` },
            { title: "Pay Calculator", slug: "pay-calculator", description: "Calculate your earnings" },
          ]}
          guides={[
            { title: "Complete Guide to Indeed Flex", slug: "complete-guide", readTime: "8 min" },
            { title: "What to Expect on Your First Shift", slug: "first-shift", readTime: "4 min" },
          ]}
          variant="full"
        />
        <RelatedContent
          currentLocation={location.city}
          roles={topRoles.slice(0, 4).map(r => ({ title: r.title, slug: r.slug, pay: `$${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr` }))}
          locations={usLocations.filter(l => l.slug !== location.slug).slice(0, 4).map(l => ({ name: `${l.city}, ${l.stateCode}`, slug: l.slug }))}
          tools={[
            { title: "Cost of Living Comparison", slug: "cost-of-living", description: `Compare ${location.city} expenses` },
            { title: "Pay Calculator", slug: "pay-calculator", description: "Calculate your earnings" },
          ]}
          guides={[
            { title: "Complete Guide to Indeed Flex", slug: "complete-guide", readTime: "8 min" },
            { title: "What to Expect on Your First Shift", slug: "first-shift", readTime: "4 min" },
          ]}
          variant="full"
        />

        <CTASection 
          title={`Find Shifts in ${location.city} Today`}
          subtitle={`Join thousands of flexible workers in ${location.city}. Download Indeed Flex to get started.`}
        />
      </Layout>
    </>
  );
};

export default LocationPage;
