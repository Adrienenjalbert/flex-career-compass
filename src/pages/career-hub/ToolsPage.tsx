import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";

const tools = [
  {
    title: "Childcare Break-Even Calculator",
    description: "Calculate if working is worth it after childcare costs. Includes 2024 state data, tax credits, and flexible schedule comparisons.",
    icon: "Baby" as const,
    href: "/career-hub/tools/childcare-calculator",
    featured: true,
  },
  {
    title: "State-by-State Paycheck Calculator",
    description: "Calculate take-home pay in all 50 states with W-2 vs 1099 comparison, role templates, and shift differentials.",
    icon: "Calculator" as const,
    href: "/career-hub/tools/pay-calculator",
    featured: true,
  },
  {
    title: "1099 & Quarterly Tax Estimator",
    description: "Estimate self-employment taxes with combined W-2/1099 income, deduction tracker, and quarterly deadline reminders.",
    icon: "PiggyBank" as const,
    href: "/career-hub/tools/tax-calculator",
    featured: true,
  },
  {
    title: "Unemployment Benefits Calculator",
    description: "Estimate unemployment benefits in all 50 states. See partial unemployment rules and gig work guidance.",
    icon: "ShieldCheck" as const,
    href: "/career-hub/tools/unemployment-calculator",
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
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Tools" }]} />
        </div>

        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Career Tools
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Plan your career, calculate earnings, and make informed decisions with our interactive tools designed for flexible workers.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 gradient-calm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Why Use Our Tools?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="text-5xl font-bold text-primary mb-3">100%</div>
                  <div className="text-muted-foreground text-lg">Free to use, no signup required</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="text-5xl font-bold text-primary mb-3">2025</div>
                  <div className="text-muted-foreground text-lg">Updated with latest tax rates</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="text-5xl font-bold text-primary mb-3">8</div>
                  <div className="text-muted-foreground text-lg">US cities with local data</div>
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
