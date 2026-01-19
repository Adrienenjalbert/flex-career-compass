import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { ContentFilter, ActiveFilters } from "@/components/career-hub/ContentFilter";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Scale, 
  Rocket, 
  MapPin, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Search,
  LucideIcon
} from "lucide-react";
import { ExperienceLevel, IndustryTag, UserSituation, tagLabels } from "@/data/taxonomy";

// Tool type with tags
interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  answersQuestion?: string;
  dataYear?: string;
  estimatedTime?: string;
  tags: {
    experienceLevel: ExperienceLevel[];
    industries: IndustryTag[];
    situations: UserSituation[];
  };
}

interface ToolCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  colorClass: string;
  iconBg: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
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
        dataYear: "2026",
        estimatedTime: "~3 min",
        tags: {
          experienceLevel: ["beginner", "intermediate", "advanced"],
          industries: ["general"],
          situations: ["first-job", "side-gig", "career-change", "student", "parent"],
        },
      },
      {
        title: "1099 & Quarterly Tax Estimator",
        description: "Estimate self-employment taxes with combined W-2/1099 income, deduction tracker, and quarterly deadline reminders.",
        icon: "PiggyBank" as const,
        href: "/career-hub/tools/tax-calculator",
        answersQuestion: "How much should I save for taxes?",
        dataYear: "2026",
        estimatedTime: "~5 min",
        tags: {
          experienceLevel: ["intermediate", "advanced"],
          industries: ["general"],
          situations: ["side-gig"],
        },
      },
      {
        title: "Shift Income Planner",
        description: "Plan your earnings based on shifts per week, hourly rate, and expected tips. Great for budgeting.",
        icon: "TrendingUp" as const,
        href: "/career-hub/tools/shift-planner",
        answersQuestion: "How much can I earn this month?",
        estimatedTime: "~2 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["hospitality", "warehouse", "retail"],
          situations: ["first-job", "side-gig", "student"],
        },
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
        description: "Calculate if working is worth it after childcare costs. Includes 2026 state data, tax credits, and flexible schedule comparisons.",
        icon: "Baby" as const,
        href: "/career-hub/tools/childcare-calculator",
        answersQuestion: "Is working worth it after daycare costs?",
        dataYear: "2026",
        estimatedTime: "~4 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["general"],
          situations: ["parent", "returning-worker"],
        },
      },
      {
        title: "Commute Cost Calculator",
        description: "Calculate the true cost of your commute including gas, maintenance, depreciation, parking, and time. Compare driving vs transit.",
        icon: "Car" as const,
        href: "/career-hub/tools/commute-calculator",
        answersQuestion: "How much is my commute really costing me?",
        dataYear: "2026",
        estimatedTime: "~3 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["general"],
          situations: ["first-job", "career-change"],
        },
      },
      {
        title: "Unemployment Benefits Calculator",
        description: "Estimate unemployment benefits in all 50 states. See partial unemployment rules and gig work guidance.",
        icon: "ShieldCheck" as const,
        href: "/career-hub/tools/unemployment-calculator",
        answersQuestion: "What benefits am I eligible for?",
        dataYear: "2026",
        estimatedTime: "~3 min",
        tags: {
          experienceLevel: ["intermediate"],
          industries: ["general"],
          situations: ["career-change", "returning-worker"],
        },
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
        title: "Job Application Toolkit",
        description: "Resume tips, cover letter templates & Indeed Flex profile optimization for temp workers.",
        icon: "FileText" as const,
        href: "/career-hub/job-application-toolkit",
        answersQuestion: "How do I create a great resume?",
        estimatedTime: "~10 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["general"],
          situations: ["first-job", "career-change", "returning-worker"],
        },
      },
      {
        title: "Career Path Explorer",
        description: "Visualize your career progression from entry-level to management roles. See salary growth potential.",
        icon: "Target" as const,
        href: "/career-hub/tools/career-path",
        answersQuestion: "What's my path to earning more?",
        estimatedTime: "~5 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["warehouse", "hospitality", "retail", "facilities"],
          situations: ["first-job", "career-change"],
        },
      },
      {
        title: "Skills Gap Analyzer",
        description: "Identify skills you need to advance to higher-paying roles. Get personalized learning recommendations.",
        icon: "Target" as const,
        href: "/career-hub/tools/skills-analyzer",
        answersQuestion: "What skills do I need to advance?",
        estimatedTime: "~4 min",
        tags: {
          experienceLevel: ["intermediate", "advanced"],
          industries: ["general"],
          situations: ["career-change"],
        },
      },
      {
        title: "WorkTalk: Job English",
        description: "Learn essential workplace English phrases with audio. Bilingual tool for Spanish speakers in warehouse, hospitality & more.",
        icon: "Languages" as const,
        href: "/career-hub/tools/worktalk",
        answersQuestion: "How do I learn job English fast?",
        estimatedTime: "~10 min",
        tags: {
          experienceLevel: ["beginner"],
          industries: ["warehouse", "hospitality", "retail", "facilities"],
          situations: ["first-job", "immigrant"],
        },
      },
      {
        title: "CocktailQuiz: Bartending Trainer",
        description: "Master 50+ classic cocktails with flashcards, quizzes & speed rounds. Essential for barbacks becoming bartenders.",
        icon: "Wine" as const,
        href: "/career-hub/tools/cocktail-quiz",
        answersQuestion: "How do I learn bartending skills?",
        estimatedTime: "~15 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["hospitality"],
          situations: ["career-change", "side-gig"],
        },
      },
      {
        title: "SafetyFirst: OSHA Trainer",
        description: "Learn workplace safety with bilingual quizzes. Hazard ID, PPE requirements & emergency procedures for warehouse and hospitality.",
        icon: "Shield" as const,
        href: "/career-hub/tools/safety-first",
        answersQuestion: "How do I learn OSHA safety?",
        estimatedTime: "~10 min",
        tags: {
          experienceLevel: ["beginner"],
          industries: ["warehouse", "hospitality", "facilities"],
          situations: ["first-job"],
        },
      },
      {
        title: "MenuMaster: Culinary Trainer",
        description: "Master culinary terms, knife cuts & ServSafe food safety. Bilingual flashcards and quizzes for kitchen workers advancing to chef.",
        icon: "ChefHat" as const,
        href: "/career-hub/tools/menu-master",
        answersQuestion: "How do I learn culinary skills?",
        estimatedTime: "~10 min",
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["hospitality"],
          situations: ["career-change"],
        },
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
        tags: {
          experienceLevel: ["beginner", "intermediate"],
          industries: ["general"],
          situations: ["career-change"],
        },
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
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    experienceLevel: [],
    industries: [],
    situations: [],
  });

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter tools based on active filters
  const filteredCategories = useMemo(() => {
    const hasActiveFilters = 
      activeFilters.experienceLevel.length > 0 ||
      activeFilters.industries.length > 0 ||
      activeFilters.situations.length > 0;

    if (!hasActiveFilters) {
      return toolCategories;
    }

    return toolCategories.map(category => {
      const filteredTools = category.tools.filter(tool => {
        const tags = tool.tags;
        
        // Check if tool matches ALL selected filter categories (AND logic between categories)
        // but ANY within each category (OR logic within category)
        const matchesExperience = activeFilters.experienceLevel.length === 0 ||
          activeFilters.experienceLevel.some(level => tags.experienceLevel.includes(level));
        
        const matchesIndustry = activeFilters.industries.length === 0 ||
          activeFilters.industries.some(ind => tags.industries.includes(ind) || tags.industries.includes('general'));
        
        const matchesSituation = activeFilters.situations.length === 0 ||
          activeFilters.situations.some(sit => tags.situations.includes(sit));

        return matchesExperience && matchesIndustry && matchesSituation;
      });

      return { ...category, tools: filteredTools };
    }).filter(category => category.tools.length > 0);
  }, [activeFilters]);

  const totalFilteredTools = filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0);
  const totalTools = toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

  const hasActiveFilters = 
    activeFilters.experienceLevel.length > 0 ||
    activeFilters.industries.length > 0 ||
    activeFilters.situations.length > 0;

  return (
    <>
      <SEOMetaTags
        title="Free Career Tools & Calculators | Indeed Flex Career Hub"
        description="14 free career tools: paycheck calculator, childcare break-even, commute costs, tax estimator & more. All 50 states covered with 2026 data."
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

        {/* Filter Section */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <ContentFilter
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </div>
        </section>

        {/* Quick Jump Navigation - only show when not filtering */}
        {!hasActiveFilters && (
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
        )}

        {/* Results Count when filtering */}
        {hasActiveFilters && (
          <section className="py-4">
            <div className="container mx-auto px-4 md:px-6">
              <p className="text-muted-foreground">
                Showing <strong>{totalFilteredTools}</strong> of {totalTools} tools
              </p>
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center py-12 bg-muted/30 rounded-lg max-w-xl mx-auto">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tools match your filters</h3>
                <p className="text-muted-foreground mb-4">
                  Try removing some filters or browse all tools.
                </p>
                <button
                  onClick={() => setActiveFilters({ experienceLevel: [], industries: [], situations: [] })}
                  className="text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Featured Tool - only show when not filtering */}
        {!hasActiveFilters && (
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
                        2026 Data
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
        )}

        {/* Tool Categories */}
        {filteredCategories.map((category, index) => {
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
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {category.name}
                      </h2>
                      <Badge variant="secondary">
                        {category.tools.length}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool) => (
                    <ToolCard 
                      key={tool.title} 
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon as any}
                      href={tool.href}
                      answersQuestion={tool.answersQuestion}
                      dataYear={tool.dataYear}
                      estimatedTime={tool.estimatedTime}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Stats Section - only show when not filtering */}
        {!hasActiveFilters && (
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
        )}

        {/* Decision Helper - only show when not filtering */}
        {!hasActiveFilters && (
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
        )}

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
