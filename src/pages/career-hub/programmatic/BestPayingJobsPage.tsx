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
  TrendingUp,
  CheckCircle,
  Building2,
  ArrowRight,
  Calculator,
  Star,
  Zap,
  Award,
  ChevronRight,
  Trophy,
  Target,
  Clock,
} from "lucide-react";
import {
  FAQSchema,
  BreadcrumbSchema,
  WebPageSchema,
} from "@/components/career-hub/seo";
import SEOMetaTags from "@/components/career-hub/seo/SEOMetaTags";

const BASE_URL = "https://indeedflex.com";

// ItemList Schema component for best paying jobs
const ItemListSchema = ({ items, city }: { items: { name: string; salary: string; position: number }[], city: City }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best Paying Temp Jobs in ${city.city}, ${city.stateCode}`,
    "description": `Top ${items.length} highest paying temporary jobs in ${city.city}`,
    "numberOfItems": items.length,
    "itemListElement": items.map((item) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "description": `${item.name} - ${item.salary} in ${city.city}, ${city.stateCode}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Parse URL slug
function parseSlug(slug: string | undefined): string {
  if (!slug) return '';
  const prefix = 'best-paying-temp-jobs-';
  if (slug.startsWith(prefix)) {
    return slug.substring(prefix.length);
  }
  return '';
}

// Get local salary for a role in a city
function getLocalSalary(role: Role, city: City) {
  const costAdjustment = city.costOfLiving.index / 100;
  const min = Math.round(role.avgHourlyRate.min * costAdjustment * 100) / 100;
  const max = Math.round(role.avgHourlyRate.max * costAdjustment * 100) / 100;
  return { min: Math.max(min, role.avgHourlyRate.min), max };
}

// Get top paying roles sorted by max salary
function getTopPayingRoles(city: City, limit: number = 15) {
  return roles
    .map(role => ({
      ...role,
      localSalary: getLocalSalary(role, city),
    }))
    .sort((a, b) => b.localSalary.max - a.localSalary.max)
    .slice(0, limit);
}

// Generate FAQs for best paying jobs page
function generateBestPayingFAQs(city: City, topRoles: ReturnType<typeof getTopPayingRoles>) {
  const topRole = topRoles[0];
  const avgTop5 = topRoles.slice(0, 5).reduce((sum, r) => sum + r.localSalary.max, 0) / 5;
  
  return [
    {
      question: `What is the highest paying temp job in ${city.city}?`,
      answer: `The highest paying temp job in ${city.city} is ${topRole.title}, earning up to $${topRole.localSalary.max.toFixed(2)}/hr. This role requires ${topRole.requirements[0]?.toLowerCase() || 'relevant experience'} and offers excellent earning potential.`
    },
    {
      question: `How much can I make doing temp work in ${city.city}?`,
      answer: `Temp workers in ${city.city} can earn $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hr on average. The top 5 highest paying roles average $${avgTop5.toFixed(2)}/hr. Night shifts and weekends often pay 10-20% more.`
    },
    {
      question: `Which temp jobs pay the most without experience in ${city.city}?`,
      answer: `Entry-level temp jobs in ${city.city} that pay well include Warehouse Operative ($${getLocalSalary(roles.find(r => r.id === 'warehouse-operative') || roles[0], city).max.toFixed(2)}/hr max) and Kitchen Porter roles. These positions offer on-the-job training.`
    },
    {
      question: `Do temp jobs in ${city.city} pay more than minimum wage?`,
      answer: `Yes! Most temp jobs in ${city.city} pay significantly above minimum wage. The average temp wage is $${((city.avgHourlyWage.min + city.avgHourlyWage.max) / 2).toFixed(2)}/hr, with top roles paying up to $${topRole.localSalary.max.toFixed(2)}/hr.`
    },
    {
      question: `What skills increase pay for temp jobs in ${city.city}?`,
      answer: `Skills that boost temp job pay in ${city.city} include: forklift certification (+$2-4/hr), bartending experience (+$3-5/hr), commercial driving license (+$4-6/hr), and food safety certifications. Specialized skills are in high demand.`
    },
    {
      question: `When do temp jobs pay the most in ${city.city}?`,
      answer: `Temp jobs in ${city.city} pay premium rates during: holiday seasons (Oct-Dec), overnight shifts (typically +15-25%), weekends (+10-20%), and peak demand periods. The ${city.topIndustries[0]} sector often has the highest surge pricing.`
    },
    {
      question: `Are tips included in temp job pay in ${city.city}?`,
      answer: `Yes, many hospitality temp jobs in ${city.city} include tips. Bartenders and servers can earn an additional $10-30/hr in tips depending on the venue. Base pay rates shown don't include tip potential.`
    },
    {
      question: `How does ${city.city}'s temp job pay compare to other cities?`,
      answer: `${city.city}'s temp job wages are ${city.costOfLiving.index < 100 ? 'competitive relative to the lower cost of living' : city.costOfLiving.index > 105 ? 'higher to match the cost of living' : 'comparable to the national average'}. With a cost of living index of ${city.costOfLiving.index}, your earnings ${city.costOfLiving.index < 100 ? 'go further here' : 'keep pace with expenses'}.`
    },
    {
      question: `Can I negotiate pay for temp jobs in ${city.city}?`,
      answer: `Temp job pay rates are typically set by employers, but you can increase your earnings by: building a strong rating history, accepting premium-pay shifts, getting certifications, and working during peak demand times.`
    },
    {
      question: `What's the fastest way to get high-paying temp work in ${city.city}?`,
      answer: `To quickly access high-paying shifts in ${city.city}: 1) Download Indeed Flex, 2) Complete all available training modules, 3) Get relevant certifications, 4) Maintain a high rating by showing up on time and working hard. Top performers unlock access to premium shifts.`
    }
  ];
}

const BestPayingJobsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Parse URL: best-paying-temp-jobs-{city}
  const citySlug = slug?.startsWith('best-paying-temp-jobs-') 
    ? slug.substring('best-paying-temp-jobs-'.length) 
    : '';
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The city you're looking for doesn't exist.
          </p>
          <Link to="/career-hub/cities">
            <Button>Browse All Cities</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const topRoles = getTopPayingRoles(city);
  const faqs = generateBestPayingFAQs(city, topRoles);
  
  // Prepare data for ItemList schema
  const itemListData = topRoles.map((role, index) => ({
    name: role.title,
    salary: `$${role.localSalary.min.toFixed(2)}-$${role.localSalary.max.toFixed(2)}/hr`,
    position: index + 1,
  }));

  // SEO data
  const pageTitle = `Best Paying Temp Jobs in ${city.city}, ${city.stateCode} | Up to $${topRoles[0]?.localSalary.max.toFixed(0)}/hr`;
  const pageDescription = `Discover the ${topRoles.length} highest paying temp jobs in ${city.city}, ${city.stateCode}. Top role: ${topRoles[0]?.title} at $${topRoles[0]?.localSalary.max.toFixed(2)}/hr. Find flexible work that pays well.`;
  const canonicalUrl = `${BASE_URL}/best-paying-temp-jobs-${city.slug}`;

  const breadcrumbItems = [
    { name: "Career Hub", url: `${BASE_URL}/career-hub` },
    { name: "Cities", url: `${BASE_URL}/career-hub/cities` },
    { name: `Best Paying Jobs in ${city.city}` },
  ];

  return (
    <Layout>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        ogType="website"
        geoRegion={`US-${city.stateCode}`}
        geoPlacename={`${city.city}, ${city.state}`}
        keywords={[
          `best paying temp jobs ${city.city}`,
          `highest paying temp work ${city.stateCode}`,
          `top paying flexible jobs`,
          `high paying gig work ${city.city}`,
          ...topRoles.slice(0, 5).map(r => `${r.title} salary ${city.city}`),
        ]}
      />

      <Helmet>
        <meta name="geo.region" content={`US-${city.stateCode}`} />
        <meta name="geo.placename" content={`${city.city}, ${city.state}`} />
      </Helmet>

      {/* Schema Markup */}
      <ItemListSchema items={itemListData} city={city} />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
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
            { label: `Best Paying Jobs in ${city.city}` },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-amber-500 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Top Paying
              </Badge>
              <Badge variant="outline">
                <MapPin className="w-3 h-3 mr-1" />
                {city.city}, {city.stateCode}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Paying Temp Jobs in {city.city}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Discover the {topRoles.length} highest paying temporary positions in {city.city}, {city.stateCode}. 
              Top earners make up to ${topRoles[0]?.localSalary.max.toFixed(2)}/hr with flexible scheduling.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Card className="bg-primary/5 border-primary/20 inline-flex">
                <CardContent className="p-4 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Highest Pay</p>
                    <p className="text-xl font-bold text-primary">
                      ${topRoles[0]?.localSalary.max.toFixed(2)}/hr
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="inline-flex">
                <CardContent className="p-4 flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Top 5</p>
                    <p className="text-xl font-bold">
                      ${(topRoles.slice(0, 5).reduce((sum, r) => sum + r.localSalary.max, 0) / 5).toFixed(2)}/hr
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="inline-flex">
                <CardContent className="p-4 flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cost Index</p>
                    <p className="text-xl font-bold">{city.costOfLiving.index}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" asChild>
              <a
                href="https://indeedflex.com/worker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Earning Today
              </a>
            </Button>
          </div>
        </section>

        {/* Rankings Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            Top {topRoles.length} Highest Paying Jobs
          </h2>

          <div className="space-y-4">
            {topRoles.map((role, index) => {
              const industryInfo = industries.find(i => i.id === role.industry);
              const isTop3 = index < 3;
              
              return (
                <Link
                  key={role.slug}
                  to={`/career-hub/cities/${city.slug}/${role.slug}`}
                >
                  <Card className={`hover:shadow-lg transition-all ${isTop3 ? 'border-l-4 border-l-amber-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-amber-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          #{index + 1}
                        </div>

                        {/* Role Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{role.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {industryInfo?.name}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {role.shortDescription}
                          </p>
                        </div>

                        {/* Pay */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-xl font-bold text-primary">
                            ${role.localSalary.max.toFixed(2)}/hr
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${role.localSalary.min.toFixed(2)} - ${role.localSalary.max.toFixed(2)}
                          </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tips to Maximize Pay */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            How to Maximize Your Earnings in {city.city}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Work Premium Shifts</h3>
                <p className="text-sm text-muted-foreground">
                  Night shifts and weekends typically pay 10-25% more. Holiday periods 
                  offer surge pricing in {city.city}.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-amber-500 mb-3" />
                <h3 className="font-semibold mb-2">Get Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Forklift certification, food handler permits, and TIPS certification 
                  unlock higher-paying roles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-yellow-500 mb-3" />
                <h3 className="font-semibold mb-2">Build Your Rating</h3>
                <p className="text-sm text-muted-foreground">
                  High-rated workers get first access to premium shifts. Show up on time 
                  and deliver quality work.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            FAQs: Best Paying Jobs in {city.city}
          </h2>
          <FAQSection faqs={faqs} />
        </section>

        {/* Internal Links */}
        <section className="mb-12 pt-8 border-t">
          <h2 className="text-xl font-bold mb-4">Related Pages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">By Industry</h3>
              <ul className="space-y-2">
                {['warehouse', 'hospitality', 'retail'].map((ind) => (
                  <li key={ind}>
                    <Link
                      to={`/${ind}-jobs-${city.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2" />
                      {ind.charAt(0).toUpperCase() + ind.slice(1)} Jobs
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={`/how-to-find-temp-work-in-${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    How to Find Work in {city.city}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/career-hub/cities/${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    All Jobs in {city.city}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/career-hub/tools/pay-calculator"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <Calculator className="w-3 h-3 mr-2" />
                    Pay Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-hub/tools/cost-of-living"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <Building2 className="w-3 h-3 mr-2" />
                    Cost of Living
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Best Paying Jobs in Other Cities</h2>
          <div className="flex flex-wrap gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .slice(0, 15)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/best-paying-temp-jobs-${c.slug}`}
                  className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  {c.city}
                </Link>
              ))}
          </div>
        </section>

        <CTASection />
      </div>
    </Layout>
  );
};

export default BestPayingJobsPage;
