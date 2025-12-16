import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import { cities, City } from "@/data/cities";
import { roles, industries } from "@/data/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  Building2,
  ArrowRight,
  Calculator,
  Star,
  Zap,
  Download,
  UserCheck,
  Search,
  Calendar,
  Smartphone,
  FileCheck,
  Briefcase,
  Award,
  Target,
} from "lucide-react";
import {
  FAQSchema,
  BreadcrumbSchema,
  WebPageSchema,
  HowToSchema,
} from "@/components/career-hub/seo";
import SEOMetaTags from "@/components/career-hub/seo/SEOMetaTags";

const BASE_URL = "https://indeedflex.com";

// Parse URL slug to get city
function parseSlug(slug: string | undefined): string {
  if (!slug) return '';
  const prefix = 'how-to-find-temp-work-in-';
  if (slug.startsWith(prefix)) {
    return slug.substring(prefix.length);
  }
  return '';
}

// Generate how-to steps for the city
function generateHowToSteps(city: City) {
  return [
    {
      name: "Download the Indeed Flex App",
      text: `Start by downloading the Indeed Flex app from the App Store or Google Play. The app is free and available to anyone looking for flexible work in ${city.city}, ${city.stateCode}.`,
      duration: "PT2M",
    },
    {
      name: "Create Your Profile",
      text: `Set up your worker profile by entering your basic information, work experience, and availability. Be sure to add your skills relevant to jobs in ${city.city}'s top industries: ${city.topIndustries.slice(0, 2).join(' and ')}.`,
      duration: "PT10M",
    },
    {
      name: "Complete Required Training",
      text: `Complete any required online training modules. These cover workplace safety and industry basics. Most training takes 15-30 minutes and qualifies you for more shifts in ${city.city}.`,
      duration: "PT30M",
    },
    {
      name: "Verify Your Identity",
      text: `Upload your ID and complete the verification process. This is required by ${city.city} employers and typically takes 1-2 business days to process.`,
      duration: "P1D",
    },
    {
      name: "Browse Available Shifts",
      text: `Once verified, browse available shifts in ${city.city}. Filter by location, pay rate, schedule, and industry. You'll see exact pay rates and locations before accepting any shift.`,
      duration: "PT5M",
    },
    {
      name: "Accept Your First Shift",
      text: `Found a shift that works? Accept it directly in the app. You'll receive confirmation and details about where to report, what to wear, and what to bring.`,
      duration: "PT1M",
    },
    {
      name: "Complete the Shift and Get Paid",
      text: `Show up on time, complete your shift, and clock out through the app. Payment is processed automatically - many shifts offer same-day or next-day pay options in ${city.city}.`,
      duration: "PT8H",
    },
  ];
}

// Generate FAQs for how-to page
function generateHowToFAQs(city: City) {
  return [
    {
      question: `How long does it take to start working temp jobs in ${city.city}?`,
      answer: `Most workers in ${city.city} complete their first shift within 3-7 days of signing up. The process includes profile creation (10 min), training (30 min), and identity verification (1-2 days). Once verified, you can start accepting shifts immediately.`
    },
    {
      question: `Do I need experience to find temp work in ${city.city}?`,
      answer: `No prior experience is required for many temp positions in ${city.city}. Entry-level roles in warehouse, hospitality, and retail are available. Employers provide on-the-job training, and Indeed Flex offers free online training modules to help you qualify for more shifts.`
    },
    {
      question: `What documents do I need to work temp jobs in ${city.city}?`,
      answer: `You'll need a valid government-issued ID (driver's license, state ID, or passport) and proof of work authorization in the US. Some roles may require additional certifications like food handler permits or forklift licenses.`
    },
    {
      question: `How much can I earn doing temp work in ${city.city}?`,
      answer: `Temp workers in ${city.city} typically earn $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hr depending on the role and shift timing. Night and weekend shifts often pay premium rates. With ${city.costOfLiving.index < 100 ? 'below-average' : 'average'} cost of living, your earnings go further here.`
    },
    {
      question: `Can I choose my own schedule for temp work in ${city.city}?`,
      answer: `Yes! With Indeed Flex, you have complete control over your schedule. Browse available shifts, accept the ones that work for you, and decline the rest. There are no minimum hours required, and you can work as much or as little as you want.`
    },
    {
      question: `What types of temp jobs are available in ${city.city}?`,
      answer: `${city.city} offers temp work across ${city.topIndustries.join(', ')}. Popular roles include warehouse positions, hospitality jobs, retail shifts, and more. The ${city.metroArea || city.city} area has consistent demand for flexible workers.`
    },
    {
      question: `How do I get paid for temp work in ${city.city}?`,
      answer: `Payment is automatic through the Indeed Flex app. Most employers offer weekly pay, with many providing same-day or next-day pay options. Set up direct deposit in the app to receive payments directly to your bank account.`
    },
    {
      question: `Is temp work in ${city.city} worth it?`,
      answer: `Temp work offers flexibility, variety, and competitive pay. In ${city.city}, with wages of $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hr and a cost of living index of ${city.costOfLiving.index}, temp work can provide a solid income. Many workers appreciate the ability to try different industries and employers.`
    },
    {
      question: `What should I bring to my first temp shift in ${city.city}?`,
      answer: `Bring your phone (for clocking in/out), a valid ID, and any required safety gear mentioned in the job details. Wear comfortable, appropriate clothing for the role - usually closed-toe shoes and weather-appropriate attire.`
    },
    {
      question: `Can temp work lead to permanent jobs in ${city.city}?`,
      answer: `Absolutely! Many ${city.city} employers use temp positions to identify great candidates for permanent roles. By performing well on shifts, you build relationships with employers who may offer you full-time positions.`
    }
  ];
}

const HowToFindWorkPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Parse URL: how-to-find-temp-work-in-{city}
  const citySlug = slug?.startsWith('how-to-find-temp-work-in-') 
    ? slug.substring('how-to-find-temp-work-in-'.length) 
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

  const steps = generateHowToSteps(city);
  const faqs = generateHowToFAQs(city);

  // SEO data
  const pageTitle = `How to Find Temp Work in ${city.city}, ${city.stateCode} | Step-by-Step Guide`;
  const pageDescription = `Learn how to find temp jobs in ${city.city}, ${city.stateCode}. Step-by-step guide to getting started with flexible work. Earn $${city.avgHourlyWage.min}-$${city.avgHourlyWage.max}/hr. Start within days!`;
  const canonicalUrl = `${BASE_URL}/how-to-find-temp-work-in-${city.slug}`;

  const breadcrumbItems = [
    { name: "Career Hub", url: `${BASE_URL}/career-hub` },
    { name: "Guides", url: `${BASE_URL}/career-hub/guides` },
    { name: `Find Temp Work in ${city.city}` },
  ];

  const stepIcons = [Download, UserCheck, FileCheck, CheckCircle, Search, Calendar, DollarSign];

  return (
    <Layout>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        ogType="article"
        geoRegion={`US-${city.stateCode}`}
        geoPlacename={`${city.city}, ${city.state}`}
        keywords={[
          `how to find temp work ${city.city}`,
          `temp jobs ${city.city}`,
          `get started temp work ${city.stateCode}`,
          `flexible work ${city.city}`,
          `gig economy ${city.city}`,
          `indeed flex ${city.city}`,
          ...city.topIndustries.map(i => `${i.toLowerCase()} jobs ${city.city}`),
        ]}
      />

      <Helmet>
        <meta name="geo.region" content={`US-${city.stateCode}`} />
        <meta name="geo.placename" content={`${city.city}, ${city.state}`} />
      </Helmet>

      {/* Schema Markup */}
      <HowToSchema
        name={`How to Find Temp Work in ${city.city}, ${city.stateCode}`}
        description={`Complete guide to finding flexible temporary work in ${city.city}. Learn the steps to start earning with Indeed Flex.`}
        totalTime="P7D"
        steps={steps.map((step) => ({
          name: step.name,
          text: step.text,
        }))}
        tool={["Smartphone", "Indeed Flex App", "Government ID"]}
      />

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
            { label: "Guides", href: "/career-hub/guides" },
            { label: `Find Temp Work in ${city.city}` },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                <MapPin className="w-3 h-3 mr-1" />
                {city.city}, {city.stateCode}
              </Badge>
              <Badge variant="outline">Step-by-Step Guide</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to Find Temp Work in {city.city}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Your complete guide to finding flexible temporary work in {city.city}, {city.stateCode}. 
              Follow these {steps.length} simple steps to start earning ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr 
              on your own schedule.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>Start in 3-7 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>{city.topIndustries.length}+ Industries</span>
              </div>
            </div>

            <Button size="lg" asChild>
              <a
                href="https://indeedflex.com/worker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Started Now
              </a>
            </Button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            {steps.length} Steps to Start Working in {city.city}
          </h2>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] || CheckCircle;
              return (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Icon className="w-5 h-5 text-primary" />
                          {step.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-18 ml-14">
                    <p className="text-muted-foreground">{step.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Pro Tips for Success in {city.city}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Build Your Reputation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Show up on time, work hard, and complete shifts reliably. Positive ratings 
                  from {city.city} employers unlock access to premium shifts and higher-paying opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  Enable Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  Turn on app notifications to be first to know about new shifts in {city.city}. 
                  The best shifts fill up fast, especially during peak seasons.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Know Peak Seasons
                </h3>
                <p className="text-sm text-muted-foreground">
                  {city.city}'s {city.topIndustries[0]} sector peaks during holidays. 
                  Plan ahead to maximize your earnings during high-demand periods.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-500" />
                  Diversify Industries
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete training for multiple industries ({city.topIndustries.slice(0, 2).join(', ')}) 
                  to access more shifts and maintain consistent income in {city.city}.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Local Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Working in {city.city}
          </h2>

          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Top Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {city.topIndustries.map((ind) => (
                      <Badge key={ind} variant="secondary">{ind}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Average Pay</h3>
                  <p className="text-2xl font-bold text-primary">
                    ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cost of living: {city.costOfLiving.index}/100
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Why {city.city}?</h3>
                  <ul className="text-sm space-y-1">
                    {city.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            FAQs: Finding Temp Work in {city.city}
          </h2>
          <FAQSection faqs={faqs} />
        </section>

        {/* Internal Links */}
        <section className="mb-12 pt-8 border-t">
          <h2 className="text-xl font-bold mb-4">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Jobs by Industry</h3>
              <ul className="space-y-2">
                {['warehouse', 'hospitality', 'retail'].map((ind) => (
                  <li key={ind}>
                    <Link
                      to={`/${ind}-jobs-${city.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2" />
                      {ind.charAt(0).toUpperCase() + ind.slice(1)} Jobs in {city.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">More Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={`/best-paying-temp-jobs-${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    Best Paying Jobs in {city.city}
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
                    Cost of Living Comparison
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </Layout>
  );
};

export default HowToFindWorkPage;
