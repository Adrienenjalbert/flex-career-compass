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
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Building2,
  GraduationCap,
  Users,
  ArrowRight,
  Calculator,
  Star,
  Target,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";
import {
  JobPostingSchema,
  OccupationSchema,
  FAQSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
  WebPageSchema,
} from "@/components/career-hub/seo";
import SEOMetaTags from "@/components/career-hub/seo/SEOMetaTags";
import { EmbeddedPayCalculator } from "@/components/career-hub/interactive";

const BASE_URL = "https://indeedflex.com";

// Helper to calculate local salary based on city cost of living
function getLocalSalary(role: Role, city: City) {
  const costAdjustment = city.costOfLiving.index / 100;
  const min = Math.round(role.avgHourlyRate.min * costAdjustment * 100) / 100;
  const max = Math.round(role.avgHourlyRate.max * costAdjustment * 100) / 100;
  return { min: Math.max(min, role.avgHourlyRate.min), max };
}

// Generate city+role specific FAQs
function generateCityRoleFAQs(city: City, role: Role, localSalary: { min: number; max: number }) {
  const industryInfo = industries.find(i => i.id === role.industry);
  
  return [
    {
      question: `How much do ${role.title}s make in ${city.city}, ${city.stateCode}?`,
      answer: `${role.title}s in ${city.city} typically earn between $${localSalary.min.toFixed(2)} and $${localSalary.max.toFixed(2)} per hour. Pay varies based on experience, employer, and shift timing. With Indeed Flex, you can see exact pay rates before accepting shifts.`
    },
    {
      question: `What are the requirements to work as a ${role.title} in ${city.city}?`,
      answer: `Requirements for ${role.title} positions in ${city.city} include: ${role.requirements.slice(0, 3).join(', ')}. Most employers provide on-the-job training for entry-level candidates.`
    },
    {
      question: `Are there ${role.title} jobs available in ${city.city} right now?`,
      answer: `Yes! ${city.city} has an active market for ${role.title} positions, especially in the ${city.topIndustries.slice(0, 2).join(' and ')} sectors. Download the Indeed Flex app to browse available shifts in your area.`
    },
    {
      question: `What skills do I need to become a ${role.title} in ${city.city}?`,
      answer: `Key skills for ${role.title}s in ${city.city} include: ${role.skills.slice(0, 4).join(', ')}. ${industryInfo ? `The ${industryInfo.name} industry in ${city.city} particularly values these competencies.` : ''}`
    },
    {
      question: `Is ${city.city} a good place to work as a ${role.title}?`,
      answer: `${city.city} offers ${city.costOfLiving.index < 100 ? 'below-average' : city.costOfLiving.index > 105 ? 'above-average' : 'average'} cost of living with strong demand for ${role.title}s. The city's ${city.topIndustries[0]} and ${city.topIndustries[1]} sectors provide consistent opportunities.`
    },
    {
      question: `What shifts are available for ${role.title}s in ${city.city}?`,
      answer: `${role.title} shifts in ${city.city} are available across morning, afternoon, evening, and overnight schedules. ${role.industry === 'hospitality' ? 'Weekend and evening shifts often offer higher pay.' : role.industry === 'industrial' ? 'Warehouse shifts are available 24/7, with night shifts often paying premiums.' : 'Shift availability varies by employer and season.'}`
    },
    {
      question: `How do I get started as a ${role.title} in ${city.city}?`,
      answer: `Getting started is easy: 1) Download the Indeed Flex app, 2) Complete your profile and any required training, 3) Browse ${role.title} shifts in ${city.city}, 4) Accept shifts that fit your schedule and start earning. Many workers complete their first shift within a week of signing up.`
    },
    {
      question: `What is the cost of living like in ${city.city} for ${role.title}s?`,
      answer: `${city.city}'s cost of living index is ${city.costOfLiving.index} (100 = national average). Average rent for a one-bedroom is $${city.costOfLiving.rent.oneBed}/month. At the average ${role.title} wage, you'd need to work approximately ${Math.ceil((city.costOfLiving.rent.oneBed / ((localSalary.min + localSalary.max) / 2)) / 4)} hours per week to cover rent.`
    },
    {
      question: `Can I work as a ${role.title} while studying in ${city.city}?`,
      answer: `Absolutely! Many ${role.title}s in ${city.city} work flexible schedules around their studies. Indeed Flex lets you pick shifts that work for you, with no minimum hours required. This makes it ideal for students at ${city.metroArea ? `colleges in the ${city.metroArea} area` : `${city.city} area schools`}.`
    },
    {
      question: `What are the busiest times for ${role.title} work in ${city.city}?`,
      answer: `${role.industry === 'hospitality' ? `Peak times include weekends, holidays, and special events. ${city.city}'s ${city.topIndustries.includes('Tourism') || city.topIndustries.includes('Entertainment') ? 'tourism season' : 'event calendar'} creates additional opportunities.` : role.industry === 'industrial' ? `Warehouse demand peaks during holiday seasons (October-December) and major sales events. ${city.city}'s logistics sector stays busy year-round.` : `Demand varies by season and employer needs. Check the Indeed Flex app for real-time availability in ${city.city}.`}`
    }
  ];
}

// Get nearby cities for internal linking
function getNearbyCities(currentCity: City, limit: number = 5): City[] {
  return cities
    .filter(c => c.slug !== currentCity.slug && c.region === currentCity.region)
    .slice(0, limit);
}

// Get related roles in same industry
function getRelatedRoles(currentRole: Role, limit: number = 5): Role[] {
  return roles
    .filter(r => r.slug !== currentRole.slug && r.industry === currentRole.industry)
    .slice(0, limit);
}

const CityRolePage = () => {
  const { citySlug, roleSlug } = useParams<{ citySlug: string; roleSlug: string }>();

  const city = cities.find((c) => c.slug === citySlug);
  const role = roles.find((r) => r.slug === roleSlug);

  if (!city || !role) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The city or role you're looking for doesn't exist.
          </p>
          <Link to="/career-hub/cities">
            <Button>Browse All Cities</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const localSalary = getLocalSalary(role, city);
  const faqs = generateCityRoleFAQs(city, role, localSalary);
  const nearbyCities = getNearbyCities(city);
  const relatedRoles = getRelatedRoles(role);
  const industryInfo = industries.find(i => i.id === role.industry);

  // SEO data
  const pageTitle = `${role.title} Jobs in ${city.city}, ${city.stateCode} | $${localSalary.min}-$${localSalary.max}/hr`;
  const pageDescription = `Find ${role.title} jobs in ${city.city}, ${city.stateCode}. Earn $${localSalary.min.toFixed(2)}-$${localSalary.max.toFixed(2)}/hr with flexible scheduling. ${role.shortDescription}. Apply today with Indeed Flex.`;
  const canonicalUrl = `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`;

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Career Hub", url: `${BASE_URL}/career-hub` },
    { name: "Cities", url: `${BASE_URL}/career-hub/cities` },
    { name: city.city, url: `${BASE_URL}/career-hub/cities/${city.slug}` },
    { name: role.title },
  ];

  // Calculate estimated earnings
  const weeklyEarnings = {
    partTime: Math.round(((localSalary.min + localSalary.max) / 2) * 20),
    fullTime: Math.round(((localSalary.min + localSalary.max) / 2) * 40),
  };

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
        keywords={[
          `${role.title} jobs ${city.city}`,
          `${role.title} ${city.stateCode}`,
          `temp ${role.title} ${city.city}`,
          `flexible ${role.title} work`,
          `${city.city} ${industryInfo?.name} jobs`,
          `part time ${role.title}`,
          `${role.title} pay ${city.city}`,
          ...role.skills.slice(0, 3),
        ]}
      />

      {/* GEO-specific meta tags */}
      <Helmet>
        <meta name="geo.region" content={`US-${city.stateCode}`} />
        <meta name="geo.placename" content={`${city.city}, ${city.state}`} />
        <meta name="ICBM" content={`${city.city}, ${city.stateCode}`} />
      </Helmet>

      {/* Schema Markup */}
      <JobPostingSchema
        title={`${role.title} - ${city.city}, ${city.stateCode}`}
        description={`${role.description} Now hiring in ${city.city}, ${city.stateCode}. Flexible scheduling available.`}
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
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR",
        }}
        skills={role.skills}
        qualifications={role.requirements}
        responsibilities={role.responsibilities}
        industry={industryInfo?.name}
        occupationalCategory={role.title}
      />

      <OccupationSchema
        name={role.title}
        description={role.description}
        estimatedSalary={{
          currency: "USD",
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR",
        }}
        occupationLocation={{
          type: "City",
          name: `${city.city}, ${city.stateCode}`,
        }}
        skills={role.skills}
        responsibilities={role.responsibilities}
        qualifications={role.requirements}
      />

      <FAQSchema questions={faqs} />

      <BreadcrumbSchema items={breadcrumbItems} />

      <LocalBusinessSchema
        name={`Indeed Flex - ${city.city}`}
        description={`Find flexible ${role.title} jobs in ${city.city}. Temporary and part-time positions available.`}
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
            { label: "Cities", href: "/career-hub/cities" },
            { label: city.city, href: `/career-hub/cities/${city.slug}` },
            { label: role.title },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className={industryInfo?.color}>
                  {industryInfo?.name}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city.city}, {city.stateCode}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {role.title} Jobs in {city.city}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {role.shortDescription}. Find flexible {role.title.toLowerCase()} positions
                in {city.city}, {city.stateCode} with competitive pay and scheduling that
                fits your life.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">
                      ${localSalary.min}-${localSalary.max}
                    </p>
                    <p className="text-sm text-muted-foreground">Per Hour</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">
                      ${weeklyEarnings.fullTime}
                    </p>
                    <p className="text-sm text-muted-foreground">Weekly (40hrs)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{city.costOfLiving.index}</p>
                    <p className="text-sm text-muted-foreground">Cost Index</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold">{city.timezone}</p>
                    <p className="text-sm text-muted-foreground">Time Zone</p>
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
                    Find {role.title} Shifts
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Top Industries in {city.city}</p>
                    <div className="flex flex-wrap gap-2">
                      {city.topIndustries.map((ind) => (
                        <Badge key={ind} variant="secondary">
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Cost of Living</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Index (100 = avg)</span>
                        <span className="font-medium">{city.costOfLiving.index}</span>
                      </div>
                      <Progress value={city.costOfLiving.index} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Monthly Costs</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>1-Bed Rent</span>
                        <span>${city.costOfLiving.rent.oneBed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Groceries</span>
                        <span>${city.costOfLiving.groceries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport</span>
                        <span>${city.costOfLiving.transport}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <Link
                      to={`/career-hub/cities/${city.slug}`}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      More about {city.city}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Role */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                About {role.title} Jobs in {city.city}
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <p className="text-muted-foreground">
                    In {city.city}, {role.title.toLowerCase()}s are in demand across the{" "}
                    {city.topIndustries.slice(0, 2).join(" and ")} sectors. The city's{" "}
                    {city.highlights[0].toLowerCase()} creates consistent opportunities
                    for flexible workers.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Key Responsibilities
              </h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {role.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Skills & Requirements */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Skills & Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Embedded Pay Calculator */}
            <section id="calculator">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Earnings Calculator for {city.city}
              </h2>
              <EmbeddedPayCalculator
                roleTitle={role.title}
                minRate={localSalary.min}
                maxRate={localSalary.max}
                location={city.city}
                tipsRange={
                  role.industry === "hospitality"
                    ? { min: 2, max: 10 }
                    : undefined
                }
              />
            </section>

            {/* Career Path */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Career Path from {role.title}
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    {role.careerPath.map((step, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            index === 0
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="font-medium">{step.role}</p>
                          <p className="text-xs opacity-80">{step.years}</p>
                        </div>
                        {index < role.careerPath.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                FAQs: {role.title} Jobs in {city.city}
              </h2>
              <FAQSection faqs={faqs} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Start Earning Today</h3>
                <p className="text-sm opacity-90 mb-4">
                  Join thousands of {role.title.toLowerCase()}s in {city.city} earning on
                  their own schedule
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

            {/* Related Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Related Roles in {city.city}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedRoles.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/career-hub/cities/${city.slug}/${r.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{r.title}</span>
                      <span className="text-sm text-muted-foreground">
                        ${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr
                      </span>
                    </Link>
                  ))}
                  <Link
                    to={`/career-hub/cities/${city.slug}`}
                    className="block text-sm text-primary hover:underline mt-3"
                  >
                    View all roles in {city.city} →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Cities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {role.title} in Nearby Cities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/career-hub/cities/${c.slug}/${role.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">
                        {c.city}, {c.stateCode}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    to="/career-hub/cities"
                    className="block text-sm text-primary hover:underline mt-3"
                  >
                    Browse all cities →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tools Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Helpful Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  to="/career-hub/tools/pay-calculator"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>Pay Calculator</span>
                </Link>
                <Link
                  to="/career-hub/tools/cost-of-living"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Cost of Living Comparison</span>
                </Link>
                <Link
                  to="/career-hub/tools/shift-planner"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Shift Planner</span>
                </Link>
                <Link
                  to={`/career-hub/roles/${role.slug}`}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{role.title} Career Guide</span>
                </Link>
              </CardContent>
            </Card>

            {/* City Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Work in {city.city}?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {city.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Internal Links Section */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Explore More Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Other Roles in City */}
            <div>
              <h3 className="font-semibold mb-3">More Jobs in {city.city}</h3>
              <ul className="space-y-2">
                {roles.slice(0, 6).map((r) => (
                  <li key={r.slug}>
                    <Link
                      to={`/career-hub/cities/${city.slug}/${r.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {r.title} in {city.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Same Role in Other Cities */}
            <div>
              <h3 className="font-semibold mb-3">{role.title} in Other Cities</h3>
              <ul className="space-y-2">
                {cities
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/career-hub/cities/${c.slug}/${role.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {role.title} in {c.city}, {c.stateCode}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Related Resources */}
            <div>
              <h3 className="font-semibold mb-3">Related Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={`/career-hub/industries/${role.industry}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {industryInfo?.name} Industry Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/career-hub/roles/${role.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Complete {role.title} Career Guide
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
                <li>
                  <Link
                    to="/career-hub/financial-tips"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Financial Tips for Flex Workers
                  </Link>
                </li>
              </ul>
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

export default CityRolePage;
