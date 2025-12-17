import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import HeroSection from "@/components/career-hub/HeroSection";
import IndustryCard from "@/components/career-hub/IndustryCard";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import GuidesCategorySection from "@/components/career-hub/GuidesCategorySection";
import FinancialTipsSection from "@/components/career-hub/FinancialTipsSection";
import { usLocations } from "@/data/locations";
import { roles } from "@/data/roles";
import { MapPin, BadgeCheck, ChevronRight } from "lucide-react";

// Indeed Flex active markets (from official website)
const ACTIVE_MARKET_CITIES = [
  'Austin', 'Dallas', 'Houston', // Texas
  'Nashville', // Tennessee
  'Atlanta', 'Cartersville', // Georgia
  'Cincinnati', 'Cleveland', 'Columbus', // Ohio
  'Ontario', // California
  'Chicago', // Illinois
  'Washington', // DC
  'Las Vegas', 'Reno', // Nevada
  'Charlotte', // North Carolina
  'Bentonville', // Arkansas
  'Fort Mill', // South Carolina
  'Orlando', // Florida
  'Phoenix', // Arizona
];

const industries = [
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Bartending, serving, kitchen work, and more in restaurants, bars, and hotels.",
    roleCount: roles.filter(r => r.industry === 'hospitality').length,
    icon: "UtensilsCrossed" as const,
  },
  {
    id: "industrial",
    name: "Industrial & Warehouse",
    description: "Picking, packing, forklift operation, and delivery across distribution centers.",
    roleCount: roles.filter(r => r.industry === 'industrial').length,
    icon: "Warehouse" as const,
  },
  {
    id: "retail",
    name: "Retail",
    description: "Customer service, merchandising, and sales in stores and shopping centers.",
    roleCount: roles.filter(r => r.industry === 'retail').length,
    icon: "ShoppingBag" as const,
  },
  {
    id: "facilities",
    name: "Facilities Management",
    description: "Cleaning, housekeeping, and maintenance in commercial and hospitality venues.",
    roleCount: roles.filter(r => r.industry === 'facilities').length,
    icon: "Building2" as const,
  },
];

const tools = [
  {
    title: "Hourly Pay Calculator",
    description: "Calculate your weekly and monthly take-home pay after taxes for any US state.",
    icon: "Calculator" as const,
    href: "/career-hub/tools/pay-calculator",
    featured: true,
  },
  {
    title: "Shift Income Planner",
    description: "Plan your earnings based on shifts per week, hourly rate, and expected tips.",
    icon: "TrendingUp" as const,
    href: "/career-hub/tools/shift-planner",
  },
  {
    title: "Career Path Explorer",
    description: "Visualize your career progression from entry-level to management roles.",
    icon: "Target" as const,
    href: "/career-hub/tools/career-path",
  },
  {
    title: "Cost of Living Comparison",
    description: "Compare expenses between cities to find where your money goes furthest.",
    icon: "MapPin" as const,
    href: "/career-hub/tools/cost-of-living",
  },
];

const homeFAQs = [
  {
    question: "What is Indeed Flex?",
    answer: "Indeed Flex is a flexible staffing platform that connects workers with temporary and flexible shifts in hospitality, warehouse, retail, and facilities management. You choose when and where you work."
  },
  {
    question: "How do I get started with flexible work?",
    answer: "Download the Indeed Flex app (https://indeedflex.onelink.me/4jvh/x7l4jms3), create a profile, verify your identity, and browse available shifts in your area. You can start picking up shifts as soon as you're approved."
  },
  {
    question: "What types of jobs are available?",
    answer: "Indeed Flex offers roles across four main industries: hospitality (bartending, serving, kitchen work), industrial (warehouse, delivery), retail (sales, merchandising), and facilities management (cleaning, housekeeping)."
  },
  {
    question: "How much can I earn with flexible work?",
    answer: "Earnings vary by role and location. Hourly rates typically range from $12-25/hour, with many roles offering tips that can significantly increase total earnings. Use our Pay Calculator to estimate your potential income."
  },
  {
    question: "Do I need experience to get started?",
    answer: "Many entry-level roles require no prior experience. Employers provide on-the-job training. Having relevant experience or certifications can help you access higher-paying shifts."
  }
];

// Get active Indeed Flex markets from locations
const activeMarkets = usLocations.filter(loc => ACTIVE_MARKET_CITIES.includes(loc.city));

const CareerHubHome = () => {
  return (
    <>
      <Helmet>
        <title>Career Hub | Indeed Flex - Career Resources for Flexible Workers</title>
        <meta name="description" content="Discover career growth resources, salary guides, and financial tips for flexible workers. Find hourly jobs in hospitality, warehouse, retail, and more across the US." />
        <link rel="canonical" href="https://indeedflex.com/career-hub" />
      </Helmet>

      <Layout>
        <HeroSection />

        {/* Industries Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore Industries
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover flexible work opportunities across multiple industries. Find the right fit for your skills and schedule.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {industries.map((industry) => (
                <IndustryCard key={industry.id} {...industry} />
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Free Career Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use our interactive tools to plan your career, calculate earnings, and compare cities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Career Guides Section */}
        <GuidesCategorySection />

        {/* Financial Tips Section */}
        <FinancialTipsSection />

        {/* Active Markets Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Indeed Flex Active Markets
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find flexible work opportunities in these cities where Indeed Flex is currently operating.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {activeMarkets.slice(0, 8).map((location) => (
                <Link
                  key={location.id}
                  to={`/career-hub/locations/${location.slug}`}
                  className="group bg-card rounded-xl p-4 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {location.city}
                      </h3>
                      <p className="text-xs text-muted-foreground">{location.stateCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <BadgeCheck className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Active Market</span>
                  </div>
                </Link>
              ))}
            </div>
            {activeMarkets.length > 8 && (
              <div className="text-center mt-8">
                <Link
                  to="/career-hub/active-markets"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View all {activeMarkets.length} active markets
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <FAQSection faqs={homeFAQs} />
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default CareerHubHome;
