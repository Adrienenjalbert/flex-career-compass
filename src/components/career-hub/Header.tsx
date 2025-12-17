import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, UtensilsCrossed, Warehouse, ShoppingBag, Building2, MapPin, Calculator, BookOpen, DollarSign, Compass, Clock, TrendingUp, Wrench } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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

const locations = [
  { state: "Texas", cities: [
    { name: "Austin", slug: "austin" },
    { name: "Dallas", slug: "dallas" },
    { name: "Houston", slug: "houston" },
  ]},
  { state: "Southeast", cities: [
    { name: "Nashville, TN", slug: "nashville" },
    { name: "Atlanta, GA", slug: "atlanta" },
  ]},
  { state: "Midwest", cities: [
    { name: "Cincinnati, OH", slug: "cincinnati" },
    { name: "Columbus, OH", slug: "columbus" },
  ]},
  { state: "California", cities: [
    { name: "Ontario", slug: "ontario" },
  ]},
];

const tools = [
  { title: "Pay Calculator", slug: "pay-calculator", icon: Calculator, description: "Estimate your earnings" },
  { title: "Shift Planner", slug: "shift-planner", icon: Clock, description: "Plan your work week" },
  { title: "Cost of Living", slug: "cost-of-living", icon: MapPin, description: "Compare city expenses" },
  { title: "Tax Calculator", slug: "tax-calculator", icon: DollarSign, description: "Estimate take-home pay" },
  { title: "Skills Analyzer", slug: "skills-analyzer", icon: TrendingUp, description: "Discover your strengths" },
  { title: "Career Path", slug: "career-path", icon: Compass, description: "Plan your growth" },
];

const resources = [
  { title: "Career Guides", href: "/career-hub/guides", icon: BookOpen, description: "Tips for getting started and growing" },
  { title: "Financial Tips", href: "/career-hub/financial-tips", icon: DollarSign, description: "Money management for flex workers" },
  { title: "All Tools", href: "/career-hub/tools", icon: Wrench, description: "Free calculators and planners" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/career-hub" className="flex items-center gap-2">
            <div className="font-bold text-xl tracking-tight">
              indeed<span className="text-accent">flex</span>
            </div>
          </Link>

          {/* Desktop Navigation - Mega Menu */}
          <NavigationMenu className="hidden md:flex" delayDuration={0} skipDelayDuration={0}>
            <NavigationMenuList>
              {/* Roles Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Roles
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-card border border-border shadow-lg">
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
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {industry.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {industry.description} • {industry.roles} roles
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
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
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
                          to="/career-hub"
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                        >
                          View all roles →
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Locations Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Locations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6 bg-card border border-border shadow-lg">
                    <div className="grid grid-cols-2 gap-6">
                      {locations.map((region) => (
                        <div key={region.state}>
                          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {region.state}
                          </h3>
                          <div className="space-y-1">
                            {region.cities.map((city) => (
                              <Link
                                key={city.slug}
                                to={`/career-hub/locations/${city.slug}`}
                                className="block p-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                {city.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Tools Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[450px] p-6 bg-card border border-border shadow-lg">
                    <div className="grid grid-cols-2 gap-3">
                      {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.slug}
                            to={`/career-hub/tools/${tool.slug}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
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

              {/* Resources Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[350px] p-6 bg-card border border-border shadow-lg">
                    <div className="space-y-2">
                      {resources.map((resource) => {
                        const Icon = resource.icon;
                        return (
                          <Link
                            key={resource.href}
                            to={resource.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {resource.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {resource.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Get the App
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {/* Industries */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/60">Industries</div>
                {industries.map((industry) => (
                  <Link
                    key={industry.id}
                    to={`/career-hub/industries/${industry.id}`}
                    className="block hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>

              {/* Locations */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/60">Locations</div>
                {locations.flatMap(r => r.cities).slice(0, 5).map((city) => (
                  <Link
                    key={city.slug}
                    to={`/career-hub/locations/${city.slug}`}
                    className="block hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {city.name}
                  </Link>
                ))}
              </div>

              {/* Resources */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/60">Resources</div>
                <Link
                  to="/career-hub/tools"
                  className="block hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Career Tools
                </Link>
                <Link
                  to="/career-hub/guides"
                  className="block hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Career Guides
                </Link>
                <Link
                  to="/career-hub/financial-tips"
                  className="block hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Financial Tips
                </Link>
              </div>

              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2">
                Get the App
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
