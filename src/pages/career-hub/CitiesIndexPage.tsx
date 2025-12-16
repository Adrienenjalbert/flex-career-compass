import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import CTASection from '@/components/career-hub/CTASection';
import { cities, getUniqueStates, getUniqueRegions } from '@/data/cities';
import { MapPin, DollarSign, TrendingUp, Search, Star, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SEOMetaTags from '@/components/career-hub/seo/SEOMetaTags';
import { BreadcrumbSchema, WebPageSchema } from '@/components/career-hub/seo/EnhancedSchema';

const CitiesIndexPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'wage' | 'cost'>('name');

  const states = getUniqueStates();
  const regions = getUniqueRegions();

  const filteredCities = useMemo(() => {
    let result = [...cities];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(city => 
        city.city.toLowerCase().includes(query) ||
        city.state.toLowerCase().includes(query) ||
        city.stateCode.toLowerCase().includes(query)
      );
    }

    // State filter
    if (selectedState !== 'all') {
      result = result.filter(city => city.stateCode === selectedState);
    }

    // Region filter
    if (selectedRegion !== 'all') {
      result = result.filter(city => city.region === selectedRegion);
    }

    // Sort
    switch (sortBy) {
      case 'wage':
        result.sort((a, b) => b.avgHourlyWage.max - a.avgHourlyWage.max);
        break;
      case 'cost':
        result.sort((a, b) => a.costOfLiving.index - b.costOfLiving.index);
        break;
      default:
        result.sort((a, b) => a.city.localeCompare(b.city));
    }

    return result;
  }, [searchQuery, selectedState, selectedRegion, sortBy]);

  const highVolumeCities = cities.filter(c => c.searchVolume === 'high');

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Cities' }
  ];

  return (
    <Layout>
      <SEOMetaTags
        title="Find Temp Jobs by City | 50+ US Cities | Career Hub"
        description="Explore temp job opportunities in 50+ US cities. Compare hourly wages, cost of living, and top industries. Find flexible work near you."
        canonical="https://workhustle.com/career-hub/cities"
        keywords={[
          'temp jobs by city',
          'flexible work near me',
          'gig jobs by location',
          'hourly work by city',
          'temp jobs USA',
          'warehouse jobs near me'
        ]}
      />
      
      <BreadcrumbSchema items={breadcrumbs.map(b => ({ name: b.label, url: b.href }))} />
      <WebPageSchema
        name="Find Temp Jobs by City"
        description="Explore temp job opportunities in 50+ US cities. Compare wages, cost of living, and industries."
        url="https://workhustle.com/career-hub/cities"
      />

      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Temp Jobs by City
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Explore flexible work opportunities across 50+ US cities. Compare wages, cost of living, and find the best markets for temp workers.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {cities.length} Cities
              </span>
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {states.length} States
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured High-Demand Cities */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            High-Demand Markets
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highVolumeCities.slice(0, 8).map(city => (
              <Link 
                key={city.slug}
                to={`/career-hub/cities/${city.slug}`}
                className="group"
              >
                <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {city.city}
                        </h3>
                      </div>
                      <Badge variant="outline" className="text-xs">{city.stateCode}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {city.topIndustries.slice(0, 2).map(ind => (
                        <Badge key={ind} variant="secondary" className="text-xs">
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

      {/* Filters and Search */}
      <section className="py-8 bg-muted/30 sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.code} - {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="wage">Highest Wage</SelectItem>
                  <SelectItem value="cost">Lowest Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredCities.length} of {cities.length} cities
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map(city => (
              <Link 
                key={city.slug}
                to={`/career-hub/cities/${city.slug}`}
                className="group"
              >
                <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {city.city}
                          </h3>
                          {city.searchVolume === 'high' && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {city.state}
                        </p>
                      </div>
                      <Badge variant="outline">{city.stateCode}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Hourly
                        </span>
                        <span className="font-medium">${city.avgHourlyWage.min}-${city.avgHourlyWage.max}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Cost Index
                        </span>
                        <span className={`font-medium ${city.costOfLiving.index < 95 ? 'text-green-600' : city.costOfLiving.index > 105 ? 'text-red-500' : ''}`}>
                          {city.costOfLiving.index}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {city.topIndustries.slice(0, 2).map(ind => (
                        <Badge key={ind} variant="secondary" className="text-xs">
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

      {/* CTA */}
      <CTASection
        title="Ready to Find Work?"
        subtitle="Join thousands of workers finding flexible shifts across the country."
      />
    </Layout>
  );
};

export default CitiesIndexPage;
