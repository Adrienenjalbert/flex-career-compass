import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import CTASection from '@/components/career-hub/CTASection';
import SEOMetaTags from '@/components/career-hub/seo/SEOMetaTags';
import { WebPageSchema, BreadcrumbSchema } from '@/components/career-hub/seo/EnhancedSchema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Search, 
  DollarSign, 
  Building2, 
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { usLocations, Location } from '@/data/locations';

// Active Indeed Flex markets organized by state/region
const activeMarketsByState = {
  'Texas': ['austin', 'dallas', 'houston'],
  'Tennessee': ['nashville'],
  'Georgia': ['atlanta', 'cartersville'],
  'Ohio': ['cincinnati', 'cleveland', 'columbus'],
  'California': ['ontario'],
  'Illinois': ['chicago'],
  'Washington D.C.': ['washington-dc'],
  'Nevada': ['las-vegas', 'reno'],
  'North Carolina': ['charlotte'],
  'Arkansas': ['bentonville'],
  'South Carolina': ['fort-mill'],
  'Florida': ['orlando'],
  'Arizona': ['phoenix'],
};

const regions = {
  'Southwest': ['Texas', 'Arizona'],
  'Southeast': ['Tennessee', 'Georgia', 'North Carolina', 'South Carolina', 'Florida'],
  'Midwest': ['Ohio', 'Illinois'],
  'West': ['California', 'Nevada'],
  'Mid-Atlantic': ['Washington D.C.'],
  'South': ['Arkansas'],
};

const getRegionForState = (state: string): string => {
  for (const [region, states] of Object.entries(regions)) {
    if (states.includes(state)) return region;
  }
  return 'Other';
};

const ActiveMarketsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Get all active markets from locations data
  const activeMarkets = useMemo(() => {
    const activeSlugSet = new Set(Object.values(activeMarketsByState).flat());
    return usLocations.filter(loc => activeSlugSet.has(loc.slug));
  }, []);

  // Filter markets based on search, state, and region
  const filteredMarkets = useMemo(() => {
    return activeMarkets.filter(market => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          market.city.toLowerCase().includes(query) ||
          market.state.toLowerCase().includes(query) ||
          market.topIndustries.some(ind => ind.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // State filter
      if (selectedState !== 'all') {
        const stateKey = selectedState === 'Washington D.C.' ? 'Washington D.C.' : market.state;
        if (stateKey !== selectedState && market.stateCode !== selectedState) return false;
      }

      // Region filter
      if (selectedRegion !== 'all') {
        const marketRegion = getRegionForState(market.state === 'District of Columbia' ? 'Washington D.C.' : market.state);
        if (marketRegion !== selectedRegion) return false;
      }

      return true;
    });
  }, [activeMarkets, searchQuery, selectedState, selectedRegion]);

  // Group markets by state for display
  const marketsByState = useMemo(() => {
    const grouped: Record<string, Location[]> = {};
    filteredMarkets.forEach(market => {
      const stateKey = market.state === 'District of Columbia' ? 'Washington D.C.' : market.state;
      if (!grouped[stateKey]) grouped[stateKey] = [];
      grouped[stateKey].push(market);
    });
    return grouped;
  }, [filteredMarkets]);

  const uniqueStates = Object.keys(activeMarketsByState).sort();
  const uniqueRegions = Object.keys(regions).sort();

  const breadcrumbs = [
    { name: 'Career Hub', url: '/career-hub' },
    { name: 'Active Markets', url: '/career-hub/locations' },
  ];

  const breadcrumbsDisplay = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Active Markets', href: '/career-hub/locations' },
  ];

  const pageTitle = 'Indeed Flex Active Markets | Find Flexible Work Near You';
  const pageDescription = 'Explore all 19 active Indeed Flex markets across the US. Find flexible temp jobs in Texas, Ohio, Georgia, Nevada, and more. Same-day pay available.';

  return (
    <Layout>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical="https://indeedflex.com/career-hub/locations"
        keywords={['indeed flex locations', 'indeed flex markets', 'temp jobs near me', 'flexible work cities', 'same day pay jobs']}
      />
      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url="https://indeedflex.com/career-hub/locations"
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbsDisplay} />

        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
              <CheckCircle className="h-3 w-3 mr-1" />
              19 Active Markets
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Indeed Flex Active Markets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            Find flexible work opportunities in your city. Indeed Flex is actively hiring across 19 markets in the United States, with same-day pay and medical benefits available.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                Download the App
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/career-hub/tools/pay-calculator">
                <DollarSign className="mr-2 h-4 w-4" />
                Calculate Your Pay
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">19</div>
              <div className="text-sm text-muted-foreground">Active Markets</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">13</div>
              <div className="text-sm text-muted-foreground">States + D.C.</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">165K+</div>
              <div className="text-sm text-muted-foreground">Flexers Nationwide</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">App Access</div>
            </CardContent>
          </Card>
        </section>

        {/* Filter Section */}
        <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 border-b border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by city, state, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {uniqueRegions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {uniqueStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredMarkets.length}</span> markets
            {selectedState !== 'all' && ` in ${selectedState}`}
            {selectedRegion !== 'all' && ` (${selectedRegion})`}
          </p>
        </div>

        {/* Markets Grid - Grouped by State */}
        <section className="space-y-10">
          {Object.entries(marketsByState).sort().map(([state, markets]) => (
            <div key={state}>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {state}
                <Badge variant="outline" className="ml-2 font-normal">
                  {markets.length} {markets.length === 1 ? 'city' : 'cities'}
                </Badge>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {markets.map(market => (
                  <Link
                    key={market.slug}
                    to={`/career-hub/locations/${market.slug}`}
                    className="group"
                  >
                    <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {market.city}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {market.state === 'District of Columbia' ? 'Washington D.C.' : `${market.city}, ${market.stateCode}`}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>${market.avgHourlyWage.min}-${market.avgHourlyWage.max}/hr</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{market.population}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {market.topIndustries.slice(0, 3).map(industry => (
                            <Badge key={industry} variant="outline" className="text-xs font-normal">
                              {industry}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {market.description}
                        </p>

                        <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:underline">
                          View market details
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No markets found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find available markets.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedState('all');
              setSelectedRegion('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Expansion Notice */}
        <section className="mt-12 bg-muted/50 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Growing Nationwide</h3>
              <p className="text-muted-foreground mb-4">
                Indeed Flex is continuously expanding into new markets. Our community of 165,000+ Flexers continues to grow as we bring flexible work opportunities to more cities across the United States.
              </p>
              <Button asChild variant="outline">
                <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                  Get Notified About New Markets
                </a>
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default ActiveMarketsPage;