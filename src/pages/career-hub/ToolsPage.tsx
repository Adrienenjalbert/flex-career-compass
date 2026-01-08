import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { 
  DollarSign, 
  Scale, 
  Rocket, 
  MapPin, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2
} from "lucide-react";

const toolCategories = [
  {
    id: "income-pay",
    name: "Income & Pay",
    icon: DollarSign,
    description: "Calculate what you'll actually take home",
    colorClass: "bg-emerald-500/10 text-emerald-600",
    iconBg: "bg-emerald-500/10",
    tools: [
      {
        title: "State-by-State Paycheck Calculator",
        description: "Calculate take-home pay in all 50 states with W-2 vs 1099 comparison, role templates, and shift differentials.",
        icon: "Calculator" as const,
        href: "/career-hub/tools/pay-calculator",
        answersQuestion: "How much will I take home after taxes?",
        dataYear: "2025",
        estimatedTime: "~3 min",
      },
      {
        title: "1099 & Quarterly Tax Estimator",
        description: "Estimate self-employment taxes with combined W-2/1099 income, deduction tracker, and quarterly deadline reminders.",
        icon: "PiggyBank" as const,
        href: "/career-hub/tools/tax-calculator",
        answersQuestion: "How much should I save for taxes?",
        dataYear: "2025",
        estimatedTime: "~5 min",
      },
      {
        title: "Shift Income Planner",
        description: "Plan your earnings based on shifts per week, hourly rate, and expected tips. Great for budgeting.",
        icon: "TrendingUp" as const,
        href: "/career-hub/tools/shift-planner",
        answersQuestion: "How much can I earn this month?",
        estimatedTime: "~2 min",
      },
    ],
  },
  {
    id: "decision-tools",
    name: "Decision Calculators",
    icon: Scale,
    description: "Figure out if a job or situation is financially worth it",
    colorClass: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/10",
    tools: [
      {
        title: "Childcare Break-Even Calculator",
        description: "Calculate if working is worth it after childcare costs. Includes 2024 state data, tax credits, and flexible schedule comparisons.",
        icon: "Baby" as const,
        href: "/career-hub/tools/childcare-calculator",
        answersQuestion: "Is working worth it after daycare costs?",
        dataYear: "2024",
        estimatedTime: "~4 min",
      },
      {
        title: "Commute Cost Calculator",
        description: "Calculate the true cost of your commute including gas, maintenance, depreciation, parking, and time. Compare driving vs transit.",
        icon: "Car" as const,
        href: "/career-hub/tools/commute-calculator",
        answersQuestion: "How much is my commute really costing me?",
        dataYear: "2024",
        estimatedTime: "~3 min",
      },
      {
        title: "Unemployment Benefits Calculator",
        description: "Estimate unemployment benefits in all 50 states. See partial unemployment rules and gig work guidance.",
        icon: "ShieldCheck" as const,
        href: "/career-hub/tools/unemployment-calculator",
        answersQuestion: "What benefits am I eligible for?",
        dataYear: "2024",
        estimatedTime: "~3 min",
      },
    ],
  },
  {
    id: "career-growth",
    name: "Career Growth",
    icon: Rocket,
    description: "Plan your path to higher-paying roles",
    colorClass: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/10",
    tools: [
      {
        title: "Career Path Explorer",
        description: "Visualize your career progression from entry-level to management roles. See salary growth potential.",
        icon: "Target" as const,
        href: "/career-hub/tools/career-path",
        answersQuestion: "What's my path to earning more?",
        estimatedTime: "~5 min",
      },
      {
        title: "Skills Gap Analyzer",
        description: "Identify skills you need to advance to higher-paying roles. Get personalized learning recommendations.",
        icon: "Target" as const,
        href: "/career-hub/tools/skills-analyzer",
        answersQuestion: "What skills do I need to advance?",
        estimatedTime: "~4 min",
      },
      {
        title: "WorkTalk: Job English",
        description: "Learn essential workplace English phrases with audio. Bilingual tool for Spanish speakers in warehouse, hospitality & more.",
        icon: "Languages" as const,
        href: "/career-hub/tools/worktalk",
        answersQuestion: "How do I learn job English fast?",
        estimatedTime: "~10 min",
      },
      {
        title: "CocktailQuiz: Bartending Trainer",
        description: "Master 50+ classic cocktails with flashcards, quizzes & speed rounds. Essential for barbacks becoming bartenders.",
        icon: "Wine" as const,
        href: "/career-hub/tools/cocktail-quiz",
        answersQuestion: "How do I learn bartending skills?",
        estimatedTime: "~15 min",
      },
      {
        title: "SafetyFirst: OSHA Trainer",
        description: "Learn workplace safety with bilingual quizzes. Hazard ID, PPE requirements & emergency procedures for warehouse and hospitality.",
        icon: "Shield" as const,
        href: "/career-hub/tools/safety-first",
        answersQuestion: "How do I learn OSHA safety?",
        estimatedTime: "~10 min",
      },
    ],
  },
  {
    id: "location",
    name: "Location & Cost",
    icon: MapPin,
    description: "Find where your money goes furthest",
    colorClass: "bg-orange-500/10 text-orange-600",
    iconBg: "bg-orange-500/10",
    tools: [
      {
        title: "Cost of Living Comparison",
        description: "Compare rent, groceries, and transport costs between cities to find where your money goes furthest.",
        icon: "MapPin" as const,
        href: "/career-hub/tools/cost-of-living",
        answersQuestion: "Where will my paycheck go furthest?",
        estimatedTime: "~3 min",
      },
    ],
  },
];

const decisionHelper = [
  {
    question: "How much will I take home after taxes?",
    tool: "Paycheck Calculator",
    href: "/career-hub/tools/pay-calculator",
  },
  {
    question: "Is working worth it after daycare costs?",
    tool: "Childcare Calculator",
    href: "/career-hub/tools/childcare-calculator",
  },
  {
    question: "How much is my commute costing me?",
    tool: "Commute Calculator",
    href: "/career-hub/tools/commute-calculator",
  },
  {
    question: "How much should I save for quarterly taxes?",
    tool: "Tax Estimator",
    href: "/career-hub/tools/tax-calculator",
  },
  {
    question: "What unemployment benefits can I get?",
    tool: "Unemployment Calculator",
    href: "/career-hub/tools/unemployment-calculator",
  },
  {
    question: "What skills do I need to earn more?",
    tool: "Skills Analyzer",
    href: "/career-hub/tools/skills-analyzer",
  },
];

// Featured tool (can rotate seasonally)
const featuredTool = toolCategories[0].tools[0];

const ToolsPage = () => {
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalTools = toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <>
      <SEOMetaTags
        title="Free Career Tools & Calculators | Indeed Flex Career Hub"
        description="10 free career tools: paycheck calculator, childcare break-even, commute costs, tax estimator & more. All 50 states covered with 2024-2025 data."
        canonical="https://indeedflex.com/career-hub/tools"
        keywords={[
          'paycheck calculator',
          'tax calculator',
          'career tools',
          'gig worker tools',
          'childcare calculator',
          'commute calculator',
          'shift planner'
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": decisionHelper.slice(0, 5).map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Use our free ${item.tool} to find out. Visit ${item.href} to get started.`
            }
          }))
        })}
      </script>

      <Layout>
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Tools" }]} />
        </div>

        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Free Career Tools & Calculators
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Make smarter career decisions with tools built for flexible workers
            </p>
          </div>
        </section>

        {/* Quick Jump Navigation */}
        <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-3">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-sm text-muted-foreground font-medium whitespace-nowrap mr-2">Jump to:</span>
              {toolCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                    <span className="text-xs text-muted-foreground">({category.tools.length})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Tool */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Most Popular Tool</span>
            </div>
            <Link 
              to={featuredTool.href}
              className="group block bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6 md:p-8 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      2025 Data
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      All 50 States
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {featuredTool.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {featuredTool.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Calculate Your Pay
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Tool Categories */}
        {toolCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <section 
              key={category.id} 
              id={category.id}
              className={`py-12 md:py-16 ${index % 2 === 1 ? 'bg-muted/30' : ''}`}
            >
              <div className="container mx-auto px-4 md:px-6">
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl ${category.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.title} {...tool} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                Built for Flexible Workers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Free · No signup required</div>
                </div>
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">50</div>
                  <div className="text-muted-foreground">States covered with tax data</div>
                </div>
                <div className="bg-card rounded-2xl p-6 text-center shadow-sm border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">{totalTools}</div>
                  <div className="text-muted-foreground">Tools for every career decision</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Helper */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Not Sure Which Tool?
                </h2>
              </div>
              <p className="text-center text-muted-foreground mb-8">
                Find the right tool based on your question
              </p>
              <div className="space-y-3">
                {decisionHelper.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="group flex items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">"{item.question}"</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium whitespace-nowrap">
                      <span className="hidden sm:inline">{item.tool}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Hub for SEO */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'tool' }} />
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
