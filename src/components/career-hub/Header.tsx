import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, MapPin, Briefcase, Calculator, TrendingUp, 
  ChevronDown, ChevronRight, DollarSign, Baby, Car, 
  Umbrella, Scale, FileText, MessageSquare, Wine, 
  ShieldCheck, Compass, Brain, BookOpen, Wallet,
  UtensilsCrossed, Warehouse, ShoppingBag, Building2, ArrowRight
} from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo.svg";

// Featured markets (6 top markets)
const featuredMarkets = [
  { name: "Austin, TX", slug: "austin" },
  { name: "Dallas, TX", slug: "dallas" },
  { name: "Chicago, IL", slug: "chicago" },
  { name: "Atlanta, GA", slug: "atlanta" },
  { name: "Las Vegas, NV", slug: "las-vegas" },
  { name: "Nashville, TN", slug: "nashville" },
];

// Industries
const industries = [
  { id: "hospitality", name: "Hospitality", icon: UtensilsCrossed },
  { id: "industrial", name: "Industrial", icon: Warehouse },
  { id: "retail", name: "Retail", icon: ShoppingBag },
  { id: "facilities", name: "Facilities", icon: Building2 },
];

// Popular roles
const popularRoles = [
  { title: "Bartender", slug: "bartender" },
  { title: "Server", slug: "server" },
  { title: "Warehouse Operative", slug: "warehouse-operative" },
  { title: "Forklift Driver", slug: "forklift-driver" },
];

// Calculate tools (Pay & Life Decisions)
const calculateTools = [
  { title: "Pay Calculator", slug: "pay-calculator", icon: DollarSign, description: "Estimate your earnings" },
  { title: "Tax Estimator", slug: "tax-calculator", icon: Calculator, description: "Take-home pay after taxes" },
  { title: "Childcare Calculator", slug: "childcare-calculator", icon: Baby, description: "Work vs. childcare costs" },
  { title: "Commute Calculator", slug: "commute-calculator", icon: Car, description: "True cost of your commute" },
  { title: "Unemployment Calculator", slug: "unemployment-calculator", icon: Umbrella, description: "Estimate benefits" },
  { title: "Cost of Living", slug: "cost-of-living", icon: Scale, description: "Compare cities" },
];

// Grow tools (Skill Building)
const skillTools = [
  { title: "WorkTalk", slug: "worktalk", icon: MessageSquare, description: "Job English practice" },
  { title: "Cocktail Quiz", slug: "cocktail-quiz", icon: Wine, description: "Bartending knowledge" },
  { title: "Safety First", slug: "safety-first", icon: ShieldCheck, description: "Warehouse safety" },
  { title: "Career Path", slug: "career-path", icon: Compass, description: "Plan your growth" },
  { title: "Skills Analyzer", slug: "skills-analyzer", icon: Brain, description: "Discover strengths" },
];

// Guide categories (consolidated to 4)
const guideCategories = [
  { title: "Getting Started", slug: "first-flex-job", icon: BookOpen },
  { title: "Job Applications", slug: "temp-work-resume-guide", icon: FileText },
  { title: "Career Growth", slug: "career-paths", icon: TrendingUp },
  { title: "Financial Tips", slug: "irregular-income-budget", icon: Wallet, isFinancial: true },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/career-hub" className="flex items-center">
            <img src={logo} alt="Indeed Flex" className="h-8 md:h-10 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation - 3 Pillars */}
          <NavigationMenu className="hidden md:flex" delayDuration={0} skipDelayDuration={0}>
            <NavigationMenuList>
              {/* Pillar 1: Find Work */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Find Work
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[580px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left: Active Markets */}
                      <div>
                        <Link 
                          to="/career-hub/active-markets"
                          className="flex items-center justify-between mb-4 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Active Markets
                          </span>
                          <span className="text-xs text-muted-foreground">19 cities</span>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                          {featuredMarkets.map((market) => (
                            <Link
                              key={market.slug}
                              to={`/career-hub/locations/${market.slug}`}
                              className="text-sm text-muted-foreground hover:text-primary hover:bg-muted p-2 rounded-lg transition-colors"
                            >
                              {market.name}
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/career-hub/active-markets"
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline"
                        >
                          View all 19 markets <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      {/* Right: Industries & Roles */}
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            By Industry
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {industries.map((industry) => {
                              const Icon = industry.icon;
                              return (
                                <Link
                                  key={industry.id}
                                  to={`/career-hub/industries/${industry.id}`}
                                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted p-2 rounded-lg transition-colors"
                                >
                                  <Icon className="h-4 w-4" />
                                  {industry.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-foreground mb-3">Popular Roles</h3>
                          <div className="space-y-1">
                            {popularRoles.map((role) => (
                              <Link
                                key={role.slug}
                                to={`/career-hub/roles/${role.slug}`}
                                className="block text-sm text-muted-foreground hover:text-primary hover:bg-muted p-2 rounded-lg transition-colors"
                              >
                                {role.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Seasonal Hiring Banner */}
                    <Link
                      to="/career-hub/seasonal-hiring"
                      className="flex items-center justify-between mt-5 p-3 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors group"
                    >
                      <div className="text-sm">
                        <span className="font-medium text-foreground">🎄 Seasonal Hiring</span>
                        <span className="text-muted-foreground ml-2">Holiday & event opportunities</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pillar 2: Calculate */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Calculate
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    {/* Featured: Pay Calculator */}
                    <Link
                      to="/career-hub/tools/pay-calculator"
                      className="flex items-center justify-between p-4 mb-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-foreground/20 rounded-lg">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Pay Calculator</div>
                          <div className="text-sm text-primary-foreground/80">Estimate your weekly & monthly earnings</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      {calculateTools.slice(1).map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.slug}
                            to={`/career-hub/tools/${tool.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                                {tool.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {tool.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <Link
                      to="/career-hub/tools"
                      className="flex items-center justify-center gap-2 mt-4 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
                    >
                      View all tools <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pillar 3: Grow */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Grow
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[580px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    {/* Featured: Job Application Toolkit */}
                    <Link
                      to="/career-hub/job-application-toolkit"
                      className="flex items-center justify-between p-4 mb-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-foreground/20 rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Job Application Toolkit</div>
                          <div className="text-sm text-primary-foreground/80">Resume templates, cover letters & profile tips</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Left: Skill Training Tools */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Skill Training
                        </h3>
                        <div className="space-y-2">
                          {skillTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <Link
                                key={tool.slug}
                                to={`/career-hub/tools/${tool.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <Icon className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {tool.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{tool.description}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Guides & Resources */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Guides & Resources
                        </h3>
                        <div className="space-y-2">
                          {guideCategories.map((category) => {
                            const Icon = category.icon;
                            const basePath = category.isFinancial ? '/career-hub/financial-tips' : '/career-hub/guides';
                            return (
                              <Link
                                key={category.slug}
                                to={category.isFinancial ? basePath : `${basePath}/${category.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <Icon className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {category.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          to="/career-hub/guides"
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                        >
                          All career guides <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl px-6" asChild>
              <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                Get the App
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Accordion */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20">
            <Accordion type="single" collapsible className="w-full">
              {/* Find Work */}
              <AccordionItem value="find-work" className="border-primary-foreground/20">
                <AccordionTrigger className="text-primary-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4" />
                    Find Work
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-1 pb-2">
                    <Link
                      to="/career-hub/active-markets"
                      className="block py-2 text-primary-foreground/80 hover:text-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Active Markets (19)
                    </Link>
                    {industries.map((industry) => (
                      <Link
                        key={industry.id}
                        to={`/career-hub/industries/${industry.id}`}
                        className="block py-2 text-primary-foreground/80 hover:text-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {industry.name}
                      </Link>
                    ))}
                    <Link
                      to="/career-hub/seasonal-hiring"
                      className="block py-2 text-accent font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🎄 Seasonal Hiring
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Calculate */}
              <AccordionItem value="calculate" className="border-primary-foreground/20">
                <AccordionTrigger className="text-primary-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <Calculator className="h-4 w-4" />
                    Calculate
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-1 pb-2">
                    <Link
                      to="/career-hub/tools/pay-calculator"
                      className="block py-2 text-accent font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pay Calculator ★
                    </Link>
                    {calculateTools.slice(1).map((tool) => (
                      <Link
                        key={tool.slug}
                        to={`/career-hub/tools/${tool.slug}`}
                        className="block py-2 text-primary-foreground/80 hover:text-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.title}
                      </Link>
                    ))}
                    <Link
                      to="/career-hub/tools"
                      className="block py-2 text-primary-foreground/80 hover:text-accent font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Tools →
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Grow */}
              <AccordionItem value="grow" className="border-primary-foreground/20">
                <AccordionTrigger className="text-primary-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    Grow
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-1 pb-2">
                    <Link
                      to="/career-hub/job-application-toolkit"
                      className="block py-2 text-accent font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Job Application Toolkit ★
                    </Link>
                    <Link
                      to="/career-hub/guides"
                      className="block py-2 text-primary-foreground/80 hover:text-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Career Guides
                    </Link>
                    <Link
                      to="/career-hub/financial-tips"
                      className="block py-2 text-primary-foreground/80 hover:text-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Financial Tips
                    </Link>
                    {skillTools.slice(0, 3).map((tool) => (
                      <Link
                        key={tool.slug}
                        to={`/career-hub/tools/${tool.slug}`}
                        className="block py-2 text-primary-foreground/80 hover:text-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4 mt-2 border-t border-primary-foreground/20">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full rounded-xl" asChild>
                <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                  Get the App
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
