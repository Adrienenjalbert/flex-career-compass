import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UtensilsCrossed, Warehouse, ShoppingBag, Building2, Calculator, BookOpen, DollarSign, Compass, Clock, TrendingUp, Wrench, Wallet, PiggyBank, Receipt, Shield, Award, ArrowRight, FileText } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.svg";

const popularRoles = [
  { title: "Bartender", slug: "bartender", pay: "$15-28/hr" },
  { title: "Server", slug: "server", pay: "$12-22/hr" },
  { title: "Warehouse Operative", slug: "warehouse-operative", pay: "$15-22/hr" },
  { title: "Forklift Driver", slug: "forklift-driver", pay: "$17-25/hr" },
];

const industries = [
  { id: "hospitality", name: "Hospitality", icon: UtensilsCrossed, description: "Bars, restaurants & hotels", roles: 8 },
  { id: "industrial", name: "Industrial & Warehouse", icon: Warehouse, description: "Distribution & logistics", roles: 6 },
  { id: "retail", name: "Retail", icon: ShoppingBag, description: "Stores & shopping centers", roles: 4 },
  { id: "facilities", name: "Facilities", icon: Building2, description: "Cleaning & maintenance", roles: 2 },
];

const tools = [
  { title: "Pay Calculator", slug: "pay-calculator", icon: Calculator, description: "Estimate your earnings" },
  { title: "Shift Planner", slug: "shift-planner", icon: Clock, description: "Plan your work week" },
  { title: "Tax Calculator", slug: "tax-calculator", icon: DollarSign, description: "Estimate take-home pay" },
  { title: "Skills Analyzer", slug: "skills-analyzer", icon: TrendingUp, description: "Discover your strengths" },
  { title: "Career Path", slug: "career-path", icon: Compass, description: "Plan your growth" },
];

// Career Guide categories with featured articles
const guideCategories = [
  {
    category: "Getting Started",
    icon: BookOpen,
    articles: [
      { title: "How to Get Your First Flexible Job", slug: "first-flex-job" },
      { title: "Complete Guide to Indeed Flex", slug: "complete-guide" },
    ]
  },
  {
    category: "Career Growth",
    icon: TrendingUp,
    articles: [
      { title: "Career Paths in Flexible Work", slug: "career-paths" },
      { title: "Skills That Boost Your Hourly Rate", slug: "skill-boost" },
    ]
  },
  {
    category: "Industry Guides",
    icon: Award,
    articles: [
      { title: "Getting Certifications That Pay Off", slug: "certifications" },
      { title: "Warehouse Skills Guide", slug: "warehouse-skills" },
    ]
  },
];

// Financial Tips featured articles
const financialArticles = [
  { title: "Budgeting for Irregular Income", slug: "irregular-income-budget", icon: Wallet, description: "Create a flexible budget" },
  { title: "Building an Emergency Fund", slug: "emergency-fund-guide", icon: PiggyBank, description: "Save 3-6 months expenses" },
  { title: "Tax Tips for Flexible Workers", slug: "tax-tips", icon: Receipt, description: "Maximize your deductions" },
  { title: "Benefits & Insurance Options", slug: "gig-benefits", icon: Shield, description: "Healthcare & retirement" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo - White version using same approach as footer */}
          <Link to="/career-hub" className="flex items-center">
            <img src={logo} alt="Indeed Flex" className="h-8 md:h-10 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation - Mega Menu */}
          <NavigationMenu className="hidden md:flex" delayDuration={0} skipDelayDuration={0}>
            <NavigationMenuList>
              {/* Tools Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    {/* Prominent View All CTA */}
                    <Link
                      to="/career-hub/tools"
                      className="flex items-center justify-between p-4 mb-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-lg">All Career Tools</div>
                        <div className="text-sm text-primary-foreground/80">Free calculators & planners</div>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {tools.map((tool) => {
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
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Career Guides Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Career Guides
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
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
                          <div className="font-semibold text-lg">Job Application Toolkit</div>
                          <div className="text-sm text-primary-foreground/80">Resume tips & profile optimization</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* View All Guides CTA */}
                    <Link
                      to="/career-hub/guides"
                      className="flex items-center justify-between p-3 mb-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
                    >
                      <div>
                        <div className="font-medium text-foreground">All Career Guides</div>
                        <div className="text-xs text-muted-foreground">16+ guides for getting started & growing</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="grid grid-cols-3 gap-5">
                      {guideCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.category}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="p-1.5 bg-primary/10 rounded-lg">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-semibold text-foreground text-sm">{category.category}</h3>
                            </div>
                            <div className="space-y-1">
                              {category.articles.map((article) => (
                                <Link
                                  key={article.slug}
                                  to={`/career-hub/guides/${article.slug}`}
                                  className="block p-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                >
                                  {article.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Financial Tips Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Financial Tips
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[520px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    {/* Prominent View All CTA */}
                    <Link
                      to="/career-hub/financial-tips"
                      className="flex items-center justify-between p-4 mb-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-lg">All Financial Tips</div>
                        <div className="text-sm text-primary-foreground/80">Money management for flexible workers</div>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {financialArticles.map((article) => {
                        const Icon = article.icon;
                        return (
                          <Link
                            key={article.slug}
                            to={`/career-hub/financial-tips/${article.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                                {article.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {article.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Roles Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Roles
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Industries */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">By Industry</h3>
                        <div className="space-y-2">
                          {industries.map((industry) => {
                            const Icon = industry.icon;
                            return (
                              <Link
                                key={industry.id}
                                to={`/career-hub/industries/${industry.id}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                              >
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {industry.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {industry.roles} roles
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Popular Roles */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Popular Roles</h3>
                        <div className="space-y-2">
                          {popularRoles.map((role) => (
                            <Link
                              key={role.slug}
                              to={`/career-hub/roles/${role.slug}`}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {role.title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {role.pay}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/career-hub/locations"
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                        >
                          View all markets →
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

        {/* Mobile Navigation - Simplified */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-1">
              <Link
                to="/career-hub/tools"
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Tools</span>
                <Calculator className="h-4 w-4 opacity-60" />
              </Link>
              
              <Link
                to="/career-hub/job-application-toolkit"
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Job Application Toolkit</span>
                <FileText className="h-4 w-4 opacity-60" />
              </Link>
              
              <Link
                to="/career-hub/guides"
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Career Guides</span>
                <BookOpen className="h-4 w-4 opacity-60" />
              </Link>
              
              <Link
                to="/career-hub/financial-tips"
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Financial Tips</span>
                <DollarSign className="h-4 w-4 opacity-60" />
              </Link>
              
              <Link
                to="/career-hub/locations"
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-medium">Roles & Locations</span>
                <Compass className="h-4 w-4 opacity-60" />
              </Link>

              <div className="pt-3 mt-2 border-t border-primary-foreground/20">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full rounded-xl" asChild>
                  <a href="https://indeedflex.onelink.me/4jvh/x7l4jms3" target="_blank" rel="noopener noreferrer">
                    Get the App
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
