import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import CTASection from '@/components/career-hub/CTASection';
import FAQSection from '@/components/career-hub/FAQSection';
import { InternalLinkHub } from '@/components/career-hub/InternalLinkHub';
import { getCityBySlug, getCitiesNearMajorCity, cities } from '@/data/cities';
import { roles } from '@/data/roles';
import { MapPin, DollarSign, TrendingUp, Building, Clock, Users, Home, Bus, ShoppingCart, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema, LocalBusinessSchema, FAQSchema, WebPageSchema } from '@/components/career-hub/seo/EnhancedSchema';
import SEOMetaTags from '@/components/career-hub/seo/SEOMetaTags';
const CityPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = getCityBySlug(citySlug || '');

  if (!city) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <p className="text-muted-foreground mb-8">The city you're looking for doesn't exist in our database.</p>
          <Button asChild>
            <Link to="/career-hub">Back to Career Hub</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const nearbyCities = getCitiesNearMajorCity(city.slug).slice(0, 4);
  const relatedCities = cities
    .filter(c => c.stateCode === city.stateCode && c.slug !== city.slug)
    .slice(0, 4);

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Cities', href: '/career-hub/cities' },
    { label: city.city }
  ];

  const keyFacts = [
    { icon: DollarSign, label: 'Avg Hourly Wage', value: `$${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}` },
    { icon: Home, label: 'Avg Rent (1BR)', value: `$${city.costOfLiving.rent.oneBed.toLocaleString()}/mo` },
    { icon: Users, label: 'Population', value: city.population },
    { icon: TrendingUp, label: 'Cost Index', value: `${city.costOfLiving.index} (US avg: 100)` },
    { icon: Clock, label: 'Timezone', value: city.timezone },
    { icon: MapPin, label: 'Region', value: city.region }
  ];

  // Generate city-specific FAQs
  const faqs = [
    {
      question: `What is the average hourly wage for temp jobs in ${city.city}?`,
      answer: `In ${city.city}, ${city.state}, the average hourly wage for temp and flexible jobs ranges from $${city.avgHourlyWage.min} to $${city.avgHourlyWage.max}. Wages vary by industry and experience level, with ${city.topIndustries[0]} typically offering competitive rates.`
    },
    {
      question: `What are the best industries for temp work in ${city.city}?`,
      answer: `The top industries for temp and flexible work in ${city.city} are ${city.topIndustries.join(', ')}. These sectors regularly hire temporary workers and offer various shift options.`
    },
    {
      question: `How much does it cost to live in ${city.city}?`,
      answer: `${city.city} has a cost of living index of ${city.costOfLiving.index} (US average is 100). Average monthly costs include: 1-bedroom rent $${city.costOfLiving.rent.oneBed.toLocaleString()}, groceries ~$${city.costOfLiving.groceries}, and transportation ~$${city.costOfLiving.transport}.`
    },
    {
      question: `What is the job market like in ${city.city}?`,
      answer: `${city.city} has a ${city.searchVolume === 'high' ? 'strong' : 'growing'} job market with major employers in ${city.topIndustries.slice(0, 2).join(' and ')}. ${city.metroArea ? `As part of the ${city.metroArea} metro area, workers have access to opportunities across the region.` : ''}`
    },
    {
      question: `Are there warehouse jobs available in ${city.city}?`,
      answer: `Yes, ${city.city} offers warehouse and logistics opportunities, especially given its position in the ${city.metroArea || city.region} area. Major distribution centers and fulfillment operations hire for various shifts.`
    },
    {
      question: `What is the best time to find temp work in ${city.city}?`,
      answer: `In ${city.city}, demand for temp workers typically increases during holiday seasons and summer months. ${city.topIndustries.includes('Tourism') || city.topIndustries.includes('Hospitality') ? 'The hospitality and tourism sectors see year-round demand.' : 'Logistics and retail sectors peak during Q4.'}`
    },
    {
      question: `How does ${city.city} compare to other cities for temp work?`,
      answer: `${city.city} offers ${city.costOfLiving.index < 100 ? 'lower costs than the national average' : 'competitive wages'} with average hourly rates of $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}. ${city.highlights[0]} makes it attractive for flexible workers.`
    },
    {
      question: `What skills are most in demand in ${city.city}?`,
      answer: `In ${city.city}, employers seek workers with reliability, flexibility, and basic skills for ${city.topIndustries[0]} and ${city.topIndustries[1]}. Forklift certification, customer service experience, and food handling certifications are valuable.`
    },
    {
      question: `Is ${city.city} a good place for gig workers?`,
      answer: `${city.city} is ${city.searchVolume === 'high' ? 'excellent' : 'good'} for gig workers. ${city.highlights.slice(0, 2).join(' and ')} create diverse opportunities. ${city.stateCode === 'TX' || city.stateCode === 'NV' || city.stateCode === 'FL' ? 'No state income tax helps maximize earnings.' : ''}`
    },
    {
      question: `What transportation options are available for workers in ${city.city}?`,
      answer: `In ${city.city}, monthly transportation costs average around $${city.costOfLiving.transport}. ${city.metroArea ? `The ${city.metroArea} metro area has various transit options.` : 'Most workers rely on personal vehicles, though some employers provide shuttle services.'}`
    }
  ];

  const pageTitle = `Temp Jobs in ${city.city}, ${city.stateCode} | Flexible Work Opportunities`;
  const pageDescription = `Find temp jobs and flexible work in ${city.city}, ${city.state}. Earn $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hour in ${city.topIndustries.slice(0, 3).join(', ')}. ${city.highlights[0]}.`;

  return (
    <Layout>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={`https://workhustle.com/career-hub/cities/${city.slug}`}
        keywords={[
          `temp jobs ${city.city}`,
          `${city.city} flexible work`,
          `gig work ${city.city} ${city.stateCode}`,
          `warehouse jobs ${city.city}`,
          `${city.city} hourly work`,
          ...city.topIndustries.map(ind => `${ind.toLowerCase()} jobs ${city.city}`)
        ]}
        geoRegion={`US-${city.stateCode}`}
        geoPlacename={`${city.city}, ${city.state}`}
      />
      
      <BreadcrumbSchema items={breadcrumbs.map(b => ({ name: b.label, url: b.href }))} />
      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={`https://workhustle.com/career-hub/cities/${city.slug}`}
      />
      <LocalBusinessSchema
        name={`Temp Work Opportunities in ${city.city}`}
        description={city.description}
        address={{
          addressLocality: city.city,
          addressRegion: city.stateCode,
          addressCountry: 'US'
        }}
        priceRange={`$${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hr`}
      />
      <FAQSchema questions={faqs} />

      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>{city.city}, {city.state}</span>
              <span>•</span>
              <span>{city.region}</span>
              {city.searchVolume === 'high' && (
                <>
                  <span>•</span>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    High Demand
                  </Badge>
                </>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Temp Jobs in {city.city}, {city.stateCode}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              {city.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {city.topIndustries.map(industry => (
                <Badge key={industry} variant="outline" className="text-sm">
                  {industry}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="https://www.workhustle.com/workers" target="_blank" rel="noopener noreferrer">
                  Find Jobs in {city.city}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/career-hub/tools/pay-calculator">
                  Calculate Your Earnings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{city.city} at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyFacts.map((fact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <fact.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                  <p className="font-bold text-lg">{fact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of Living Details */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Cost of Living in {city.city}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Home className="h-5 w-5 text-primary" />
                  Rent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Studio</span>
                    <span className="font-semibold">${city.costOfLiving.rent.studio.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 Bedroom</span>
                    <span className="font-semibold">${city.costOfLiving.rent.oneBed.toLocaleString()}/mo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Groceries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${city.costOfLiving.groceries}/mo</p>
                <p className="text-sm text-muted-foreground">Average monthly cost</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bus className="h-5 w-5 text-primary" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${city.costOfLiving.transport}/mo</p>
                <p className="text-sm text-muted-foreground">Average monthly cost</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Cost Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{city.costOfLiving.index}</p>
                <p className="text-sm text-muted-foreground">
                  {city.costOfLiving.index < 100 ? 'Below' : city.costOfLiving.index > 100 ? 'Above' : 'At'} US average (100)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Why Work in {city.city}?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {city.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
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
                <ul className="space-y-3">
                  {city.topIndustries.map((industry, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <span>{industry}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Roles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Roles in {city.city}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.slice(0, 8).map(role => (
              <Link 
                key={role.slug}
                to={`/career-hub/cities/${city.slug}/${role.slug}`}
                className="group"
              >
                <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {role.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/career-hub">View All Roles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {(nearbyCities.length > 0 || relatedCities.length > 0) && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {nearbyCities.length > 0 ? 'Nearby Cities' : `More Cities in ${city.state}`}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(nearbyCities.length > 0 ? nearbyCities : relatedCities).map(nearbyCity => (
                <Link 
                  key={nearbyCity.slug}
                  to={`/career-hub/cities/${nearbyCity.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {nearbyCity.city}, {nearbyCity.stateCode}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        ${nearbyCity.avgHourlyWage.min}-${nearbyCity.avgHourlyWage.max}/hr avg
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {nearbyCity.topIndustries.slice(0, 2).map(ind => (
                          <Badge key={ind} variant="outline" className="text-xs">
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <div className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FAQSection 
            faqs={faqs} 
            title={`FAQs About Working in ${city.city}`}
          />
        </div>
      </div>

      {/* Internal Link Hub for SEO */}
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="footer" 
          currentPage={{ type: 'city', city: city.slug }}
        />
      </div>

      {/* CTA */}
      <CTASection
        title={`Ready to Start Working in ${city.city}?`}
        subtitle={`Join thousands of workers finding flexible shifts in ${city.city}, ${city.state}. Start earning today.`}
      />
    </Layout>
  );
};

export default CityPage;
