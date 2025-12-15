import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";

const tools = [
  {
    title: "Hourly Pay Calculator",
    description: "Calculate your weekly and monthly take-home pay after taxes for any US state. See exactly what you'll earn.",
    icon: "Calculator" as const,
    href: "/career-hub/tools/pay-calculator",
    featured: true,
  },
  {
    title: "Shift Income Planner",
    description: "Plan your earnings based on shifts per week, hourly rate, and expected tips. Great for budgeting.",
    icon: "TrendingUp" as const,
    href: "/career-hub/tools/shift-planner",
  },
  {
    title: "Career Path Explorer",
    description: "Visualize your career progression from entry-level to management roles. See salary growth potential.",
    icon: "Target" as const,
    href: "/career-hub/tools/career-path",
  },
  {
    title: "Cost of Living Comparison",
    description: "Compare rent, groceries, and transport costs between cities to find where your money goes furthest.",
    icon: "MapPin" as const,
    href: "/career-hub/tools/cost-of-living",
  },
  {
    title: "Tax Savings Calculator",
    description: "Estimate quarterly tax payments and discover deductions available to gig and flexible workers.",
    icon: "PiggyBank" as const,
    href: "/career-hub/tools/tax-calculator",
  },
  {
    title: "Skills Gap Analyzer",
    description: "Identify skills you need to advance to higher-paying roles. Get personalized learning recommendations.",
    icon: "Target" as const,
    href: "/career-hub/tools/skills-analyzer",
  },
];

const ToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>Free Career Tools | Indeed Flex Career Hub</title>
        <meta name="description" content="Use our free career tools to calculate pay, plan shifts, compare cities, and explore career paths. Essential resources for flexible workers." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Tools" }]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Free Career Tools
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Plan your career, calculate earnings, and make informed decisions with our interactive tools designed for flexible workers.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Why Use Our Tools?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Free to use, no signup required</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">2025</div>
                  <div className="text-muted-foreground">Updated with latest tax rates</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">8</div>
                  <div className="text-muted-foreground">US cities with local data</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Ready to Put Your Plan into Action?"
          subtitle="Download Indeed Flex and start finding shifts that match your goals."
        />
      </Layout>
    </>
  );
};

export default ToolsPage;
