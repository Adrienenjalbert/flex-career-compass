import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import { cities, City } from "@/data/cities";
import { roles, Role, industries } from "@/data/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Building2,
  Users,
  ArrowRight,
  Calculator,
  Star,
  Zap,
  Calendar,
  ChevronRight,
  Warehouse,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
} from "lucide-react";
import {
  JobPostingSchema,
  FAQSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
  WebPageSchema,
} from "@/components/career-hub/seo";
import SEOMetaTags from "@/components/career-hub/seo/SEOMetaTags";

const BASE_URL = "https://indeedflex.com";

// Industry URL slug mapping
const industrySlugMap: Record<string, string> = {
  'warehouse': 'industrial',
  'hospitality': 'hospitality',
  'retail': 'retail',
  'facilities': 'facilities',
  'industrial': 'industrial',
};

const industryDisplayNames: Record<string, string> = {
  'warehouse': 'Warehouse',
  'hospitality': 'Hospitality',
  'retail': 'Retail',
  'facilities': 'Facilities',
  'industrial': 'Industrial & Warehouse',
};

const industryKeywords: Record<string, string[]> = {
  'warehouse': ['warehouse jobs', 'picker packer', 'forklift operator', 'warehouse associate', 'distribution center', 'fulfillment center', 'logistics jobs'],
  'hospitality': ['hospitality jobs', 'server jobs', 'bartender', 'hotel jobs', 'restaurant work', 'catering', 'event staff'],
  'retail': ['retail jobs', 'sales associate', 'cashier', 'stock associate', 'customer service', 'store associate'],
  'facilities': ['facilities jobs', 'cleaning jobs', 'janitorial', 'maintenance', 'building services', 'custodian'],
  'industrial': ['warehouse jobs', 'industrial jobs', 'manufacturing', 'production', 'assembly', 'machine operator'],
};

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'warehouse': Warehouse,
  'hospitality': UtensilsCrossed,
  'retail': ShoppingBag,
  'facilities': Building2,
  'industrial': Factory,
};

// Peak seasons by industry
const peakSeasons: Record<string, { season: string; months: string; description: string }[]> = {
  'warehouse': [
    { season: 'Holiday Rush', months: 'Oct - Dec', description: 'E-commerce peak with highest demand for warehouse workers' },
    { season: 'Prime Day', months: 'July', description: 'Major online sales events drive temporary hiring' },
    { season: 'Back to School', months: 'Aug - Sep', description: 'Increased shipping volume for school supplies' },
  ],
  'hospitality': [
    { season: 'Summer Tourism', months: 'Jun - Aug', description: 'Peak vacation season drives hospitality hiring' },
    { season: 'Holiday Events', months: 'Nov - Dec', description: 'Corporate events and holiday parties' },
    { season: 'Spring Break', months: 'Mar - Apr', description: 'Travel surge increases staffing needs' },
  ],
  'retail': [
    { season: 'Black Friday', months: 'Nov', description: 'Highest retail demand of the year' },
    { season: 'Holiday Shopping', months: 'Dec', description: 'Extended hours require more staff' },
    { season: 'Back to School', months: 'Aug - Sep', description: 'Increased foot traffic for school shopping' },
  ],
  'facilities': [
    { season: 'Event Season', months: 'May - Sep', description: 'Outdoor events require additional cleaning staff' },
    { season: 'Year-End Deep Clean', months: 'Dec - Jan', description: 'Annual facility refreshes drive demand' },
    { season: 'Spring Cleaning', months: 'Mar - Apr', description: 'Commercial deep cleaning surge' },
  ],
  'industrial': [
    { season: 'Holiday Rush', months: 'Oct - Dec', description: 'Manufacturing ramps up for holiday demand' },
    { season: 'Summer Production', months: 'Jun - Aug', description: 'Some industries peak in summer' },
    { season: 'Q1 Planning', months: 'Jan - Feb', description: 'New year inventory builds' },
  ],
};

// Get roles for an industry
function getRolesForIndustry(industrySlug: string): Role[] {
  const industryId = industrySlugMap[industrySlug];
  return roles.filter(role => role.industry === industryId);
}

// Calculate industry salary range for a city
function getIndustrySalaryRange(industrySlug: string, city: City) {
  const industryRoles = getRolesForIndustry(industrySlug);
  if (industryRoles.length === 0) return { min: 13, max: 22 };
  
  const costAdjustment = city.costOfLiving.index / 100;
  const allMins = industryRoles.map(r => r.avgHourlyRate.min * costAdjustment);
  const allMaxs = industryRoles.map(r => r.avgHourlyRate.max * costAdjustment);
  
  return {
    min: Math.round(Math.min(...allMins) * 100) / 100,
    max: Math.round(Math.max(...allMaxs) * 100) / 100,
  };
}

// Generate FAQs for industry + location
function generateIndustryLocationFAQs(industrySlug: string, city: City, salaryRange: { min: number; max: number }) {
  const displayName = industryDisplayNames[industrySlug] || industrySlug;
  const industryRoles = getRolesForIndustry(industrySlug);
  const roleNames = industryRoles.slice(0, 3).map(r => r.title).join(', ');
  
  return [
    {
      question: `How much do ${displayName.toLowerCase()} workers make in ${city.city}?`,
      answer: `${displayName} workers in ${city.city}, ${city.stateCode} typically earn between $${salaryRange.min.toFixed(2)} and $${salaryRange.max.toFixed(2)} per hour. Pay varies by role, experience, and shift timing. Popular positions include ${roleNames}.`
    },
    {
      question: `What ${displayName.toLowerCase()} jobs are available in ${city.city}?`,
      answer: `${city.city} offers various ${displayName.toLowerCase()} positions including ${roleNames}, and more. Indeed Flex connects you with employers across the ${city.metroArea || city.city} area looking for flexible workers.`
    },
    {
      question: `Do I need experience for ${displayName.toLowerCase()} jobs in ${city.city}?`,
      answer: `Many entry-level ${displayName.toLowerCase()} positions in ${city.city} require no prior experience. Employers provide on-the-job training. Some specialized roles may require certifications or previous experience.`
    },
    {
      question: `When is the best time to find ${displayName.toLowerCase()} work in ${city.city}?`,
      answer: `${displayName} work in ${city.city} is available year-round, with peak demand during ${peakSeasons[industrySlug]?.[0]?.months || 'holiday seasons'}. The ${peakSeasons[industrySlug]?.[0]?.season || 'busy season'} typically offers the most shifts and sometimes premium pay.`
    },
    {
      question: `How do I apply for ${displayName.toLowerCase()} jobs in ${city.city}?`,
      answer: `Download the Indeed Flex app (https://indeedflex.onelink.me/4jvh/x7l4jms3), create your profile, and browse available ${displayName.toLowerCase()} shifts in ${city.city}. You can see exact pay rates, locations, and schedules before accepting any shift. Most workers complete their first shift within a week.`
    },
    {
      question: `What are the typical hours for ${displayName.toLowerCase()} work in ${city.city}?`,
      answer: `${displayName} shifts in ${city.city} are available across all schedules - morning, afternoon, evening, and overnight. ${industrySlug === 'warehouse' ? 'Many warehouses operate 24/7 with flexible shift options.' : industrySlug === 'hospitality' ? 'Evening and weekend shifts are common, often with higher pay.' : 'Shift availability varies by employer needs.'}`
    },
    {
      question: `Is ${city.city} a good place for ${displayName.toLowerCase()} work?`,
      answer: `Yes! ${city.city} has a ${city.topIndustries.includes(displayName) ? 'strong' : 'growing'} ${displayName.toLowerCase()} sector. With a cost of living index of ${city.costOfLiving.index} and average wages of $${salaryRange.min}-$${salaryRange.max}/hr, workers can earn a competitive income.`
    },
    {
      question: `What should I wear to a ${displayName.toLowerCase()} job in ${city.city}?`,
      answer: `${industrySlug === 'warehouse' ? 'Wear closed-toe shoes, comfortable clothing, and bring any required safety gear. Some employers provide uniforms.' : industrySlug === 'hospitality' ? 'Most employers have dress codes - typically black pants and non-slip shoes. Restaurants may provide aprons or shirts.' : industrySlug === 'retail' ? 'Business casual is common. Check specific employer requirements in the job details.' : 'Comfortable, professional attire appropriate for physical work. Check employer requirements.'}`
    },
    {
      question: `Can I work multiple ${displayName.toLowerCase()} jobs in ${city.city}?`,
      answer: `Absolutely! Indeed Flex lets you work with multiple employers across ${city.city}. You have full control over your schedule and can accept shifts that fit your availability without any exclusivity requirements.`
    },
    {
      question: `What benefits do ${displayName.toLowerCase()} workers get in ${city.city}?`,
      answer: `Indeed Flex workers in ${city.city} enjoy flexible scheduling, same-day pay options, no minimum hours, and the ability to build experience with top employers. Some long-term assignments may offer additional benefits.`
    }
  ];
}

// Get nearby cities for internal linking
function getNearbyCities(currentCity: City, limit: number = 5): City[] {
  return cities
    .filter(c => c.slug !== currentCity.slug && c.region === currentCity.region)
    .slice(0, limit);
}

const IndustryLocationPage = () => {
  const { industryLocationSlug } = useParams<{ industryLocationSlug: string }>();
  
  // Parse the URL pattern: {industry}-jobs-{city}
  const parseSlug = (slug: string | undefined) => {
    if (!slug) return { industrySlug: '', locationSlug: '' };
    
    const jobsIndex = slug.indexOf('-jobs-');
    if (jobsIndex === -1) return { industrySlug: '', locationSlug: '' };
    
    return {
      industrySlug: slug.substring(0, jobsIndex),
      locationSlug: slug.substring(jobsIndex + 6), // "-jobs-" is 6 characters
    };
  };
  
  const { industrySlug, locationSlug } = parseSlug(industryLocationSlug);

  const city = cities.find((c) => c.slug === locationSlug);
  const normalizedIndustry = industrySlug?.toLowerCase() || '';
  const industryId = industrySlugMap[normalizedIndustry];
  const industryInfo = industries.find(i => i.id === industryId);

  if (!city || !industryInfo) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The industry or location you're looking for doesn't exist.
          </p>
          <Link to="/career-hub/cities">
            <Button>Browse All Cities</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const displayName = industryDisplayNames[normalizedIndustry] || industryInfo.name;
  const industryRoles = getRolesForIndustry(normalizedIndustry);
  const salaryRange = getIndustrySalaryRange(normalizedIndustry, city);
  const faqs = generateIndustryLocationFAQs(normalizedIndustry, city, salaryRange);
  const nearbyCities = getNearbyCities(city);
  const seasons = peakSeasons[normalizedIndustry] || peakSeasons['warehouse'];
  const IndustryIcon = industryIcons[normalizedIndustry] || Warehouse;

  // SEO data
  const pageTitle = `${displayName} Jobs in ${city.city}, ${city.stateCode} | $${salaryRange.min}-$${salaryRange.max}/hr`;
  const pageDescription = `Find ${displayName.toLowerCase()} jobs in ${city.city}, ${city.stateCode}. Earn $${salaryRange.min.toFixed(2)}-$${salaryRange.max.toFixed(2)}/hr with flexible scheduling. Browse ${industryRoles.length}+ roles including ${industryRoles.slice(0, 2).map(r => r.title).join(', ')}. Apply today!`;
  const canonicalUrl = `${BASE_URL}/${normalizedIndustry}-jobs-${city.slug}`;

  // Keywords for this page
  const keywords = [
    `${displayName.toLowerCase()} jobs ${city.city}`,
    `${displayName.toLowerCase()} work ${city.stateCode}`,
    `temp ${displayName.toLowerCase()} jobs`,
    `flexible ${displayName.toLowerCase()} work`,
    ...industryKeywords[normalizedIndustry]?.map(k => `${k} ${city.city}`) || [],
    ...industryRoles.slice(0, 3).map(r => `${r.title} jobs ${city.city}`),
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Career Hub", url: `${BASE_URL}/career-hub` },
    { name: displayName, url: `${BASE_URL}/career-hub/industries/${industryId}` },
    { name: `${city.city}, ${city.stateCode}` },
  ];

  // Estimate job count based on city size and industry match
  const estimatedJobCount = city.topIndustries.some(i => 
    i.toLowerCase().includes(displayName.toLowerCase()) || 
    displayName.toLowerCase().includes(i.toLowerCase())
  ) ? Math.floor(Math.random() * 50) + 100 : Math.floor(Math.random() * 30) + 40;

  return (
    <Layout>
      {/* Enhanced SEO Meta Tags */}
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        ogType="website"
        geoRegion={`US-${city.stateCode}`}
        geoPlacename={`${city.city}, ${city.state}`}
        keywords={keywords}
      />

      {/* GEO-specific meta tags */}
      <Helmet>
        <meta name="geo.region" content={`US-${city.stateCode}`} />
        <meta name="geo.placename" content={`${city.city}, ${city.state}`} />
        <meta name="ICBM" content={`${city.city}, ${city.stateCode}`} />
      </Helmet>

      {/* Schema Markup */}
      <JobPostingSchema
        title={`${displayName} Jobs in ${city.city}, ${city.stateCode}`}
        description={`Multiple ${displayName.toLowerCase()} positions available in ${city.city}, ${city.stateCode}. Flexible scheduling, competitive pay. Roles include ${industryRoles.slice(0, 3).map(r => r.title).join(', ')}.`}
        employmentType={["TEMPORARY", "PART_TIME", "FULL_TIME"]}
        hiringOrganization={{
          name: "Indeed Flex",
          url: "https://indeedflex.com",
          logo: "https://indeedflex.com/logo.png",
        }}
        jobLocation={{
          city: city.city,
          state: city.state,
          stateCode: city.stateCode,
          country: "US",
        }}
        baseSalary={{
          currency: "USD",
          minValue: salaryRange.min,
          maxValue: salaryRange.max,
          unitText: "HOUR",
        }}
        skills={industryRoles.flatMap(r => r.skills).slice(0, 10)}
        industry={displayName}
        occupationalCategory={displayName}
      />

      <FAQSchema questions={faqs} />

      <BreadcrumbSchema items={breadcrumbItems} />

      <LocalBusinessSchema
        name={`Indeed Flex - ${displayName} Jobs in ${city.city}`}
        description={`Find flexible ${displayName.toLowerCase()} jobs in ${city.city}. Temporary and part-time positions available.`}
        address={{
          addressLocality: city.city,
          addressRegion: city.stateCode,
          addressCountry: "US",
        }}
        url={canonicalUrl}
        priceRange="$$"
      />

      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        breadcrumb={breadcrumbItems}
      />

      {/* Page Content */}
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: displayName, href: `/career-hub/industries/${industryId}` },
            { label: `${city.city}, ${city.stateCode}` },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={industryInfo.color + " text-white"}>
                  <IndustryIcon className="w-3 h-3 mr-1" />
                  {displayName}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city.city}, {city.stateCode}
                </Badge>
                <Badge variant="secondary">
                  {estimatedJobCount}+ Jobs
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {displayName} Jobs in {city.city}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                Find flexible {displayName.toLowerCase()} work in {city.city}, {city.stateCode}. 
                Browse {industryRoles.length}+ roles with competitive pay starting at ${salaryRange.min}/hr. 
                Pick your shifts, set your schedule, and start earning.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">
                      ${salaryRange.min}-${salaryRange.max}
                    </p>
                    <p className="text-sm text-muted-foreground">Per Hour</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Briefcase className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{industryRoles.length}+</p>
                    <p className="text-sm text-muted-foreground">Job Types</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{city.costOfLiving.index}</p>
                    <p className="text-sm text-muted-foreground">Cost Index</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold">{estimatedJobCount}+</p>
                    <p className="text-sm text-muted-foreground">Open Shifts</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a
                    href="https://indeedflex.com/worker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Find {displayName} Shifts
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={`/career-hub/tools/pay-calculator`}>
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Earnings
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="lg:w-96">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Start Earning Today</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Join thousands of {displayName.toLowerCase()} workers in {city.city} 
                    finding shifts on their own schedule
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    asChild
                  >
                    <a
                      href="https://indeedflex.com/worker"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started Free
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Available Roles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            {displayName} Roles in {city.city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryRoles.map((role) => {
              const localRate = {
                min: Math.round(role.avgHourlyRate.min * (city.costOfLiving.index / 100) * 100) / 100,
                max: Math.round(role.avgHourlyRate.max * (city.costOfLiving.index / 100) * 100) / 100,
              };
              return (
                <Link
                  key={role.slug}
                  to={`/career-hub/cities/${city.slug}/${role.slug}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {role.title}
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {role.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          <DollarSign className="w-3 h-3 mr-1" />
                          ${localRate.min}-${localRate.max}/hr
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Peak Seasons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Peak Seasons for {displayName} in {city.city}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {seasons.map((season, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {season.season}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2">{season.months}</Badge>
                  <p className="text-sm text-muted-foreground">{season.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Work in This Industry in This City */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Why Work in {displayName} in {city.city}?
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">City Advantages</h3>
                  <ul className="space-y-2">
                    {city.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Industry Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Flexible scheduling - pick shifts that work for you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Competitive pay from ${salaryRange.min}-${salaryRange.max}/hr</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">No minimum hours or long-term commitment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Build experience with top {city.city} employers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            FAQs: {displayName} Jobs in {city.city}
          </h2>
          <FAQSection faqs={faqs} />
        </section>

        {/* Internal Links Section */}
        <section className="mb-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Explore More Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Same Industry, Other Cities */}
            <div>
              <h3 className="font-semibold mb-3">{displayName} in Nearby Cities</h3>
              <ul className="space-y-2">
                {nearbyCities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/${normalizedIndustry}-jobs-${c.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <MapPin className="w-3 h-3 mr-2" />
                      {displayName} Jobs in {c.city}, {c.stateCode}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Industries in Same City */}
            <div>
              <h3 className="font-semibold mb-3">Other Industries in {city.city}</h3>
              <ul className="space-y-2">
                {Object.entries(industrySlugMap)
                  .filter(([slug]) => slug !== normalizedIndustry && slug !== 'industrial')
                  .slice(0, 4)
                  .map(([slug]) => (
                    <li key={slug}>
                      <Link
                        to={`/${slug}-jobs-${city.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                      >
                        <Briefcase className="w-3 h-3 mr-2" />
                        {industryDisplayNames[slug]} Jobs in {city.city}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Related Resources */}
            <div>
              <h3 className="font-semibold mb-3">Helpful Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={`/career-hub/cities/${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    All Jobs in {city.city}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/career-hub/industries/${industryId}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {displayName} Career Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-hub/tools/pay-calculator"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pay Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-hub/tools/cost-of-living"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cost of Living Comparison
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-hub/guides"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Getting Started Guides
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* All Cities for This Industry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">{displayName} Jobs in All Cities</h2>
          <div className="flex flex-wrap gap-2">
            {cities.slice(0, 20).map((c) => (
              <Link
                key={c.slug}
                to={`/${normalizedIndustry}-jobs-${c.slug}`}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  c.slug === city.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {c.city}
              </Link>
            ))}
            <Link
              to="/career-hub/cities"
              className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 flex items-center"
            >
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </section>

        <CTASection />
      </div>
    </Layout>
  );
};

export default IndustryLocationPage;
