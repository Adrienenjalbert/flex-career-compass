import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Briefcase, Calculator, GraduationCap } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationStructure } from "@/data/taxonomy";
import logo from "@/assets/logo.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pillarIcons = {
    'find-work': Briefcase,
    'calculate': Calculator,
    'grow': GraduationCap
  };

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/career-hub" className="flex items-center">
            <img src={logo} alt="Indeed Flex" className="h-8 md:h-10 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation - 3 Pillar Mega Menu */}
          <NavigationMenu className="hidden md:flex" delayDuration={0} skipDelayDuration={0}>
            <NavigationMenuList>
              {navigationStructure.map((navPillar) => {
                const PillarIcon = pillarIcons[navPillar.pillar.id];
                const FeaturedIcon = navPillar.featured.icon;
                
                return (
                  <NavigationMenuItem key={navPillar.pillar.id}>
                    <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10">
                      <PillarIcon className="h-4 w-4 mr-2" />
                      {navPillar.pillar.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-6 bg-card border border-border shadow-soft-lg rounded-xl">
                        {/* Featured Item */}
                        <Link
                          to={navPillar.featured.href}
                          className="flex items-center justify-between p-4 mb-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-foreground/20 rounded-lg">
                              <FeaturedIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{navPillar.featured.title}</div>
                              <div className="text-sm text-primary-foreground/80">{navPillar.featured.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Section Grid */}
                        <div className={`grid gap-6 ${navPillar.sections.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                          {navPillar.sections.map((section) => (
                            <div key={section.title}>
                              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                                {section.title}
                              </h3>
                              <div className="space-y-1">
                                {section.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    to={link.href}
                                    className="block p-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                  >
                                    {link.title}
                                    {link.description && (
                                      <span className="text-xs text-muted-foreground/70 ml-1">
                                        ({link.description})
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* View All Link */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <Link
                            to={navPillar.viewAllLink.href}
                            className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                          >
                            {navPillar.viewAllLink.title} →
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
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

        {/* Mobile Navigation - 3 Pillar Accordion */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-1">
              {navigationStructure.map((navPillar) => {
                const PillarIcon = pillarIcons[navPillar.pillar.id];
                
                return (
                  <div key={navPillar.pillar.id} className="mb-4">
                    {/* Pillar Header */}
                    <div className="flex items-center gap-2 mb-2 px-2">
                      <PillarIcon className="h-5 w-5 opacity-80" />
                      <span className="font-semibold text-lg">{navPillar.pillar.name}</span>
                    </div>
                    
                    {/* Featured Link */}
                    <Link
                      to={navPillar.featured.href}
                      className="block py-2 px-4 mb-2 rounded-lg bg-primary-foreground/10 text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ⭐ {navPillar.featured.title}
                    </Link>
                    
                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-1">
                      {navPillar.sections.slice(0, 2).flatMap(section => 
                        section.links.slice(0, 2).map(link => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="py-2 px-3 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.title}
                          </Link>
                        ))
                      )}
                    </div>
                    
                    {/* View All */}
                    <Link
                      to={navPillar.viewAllLink.href}
                      className="block py-2 px-4 text-accent text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {navPillar.viewAllLink.title} →
                    </Link>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 mt-2 border-t border-primary-foreground/20">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl" asChild>
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
