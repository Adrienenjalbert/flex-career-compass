import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cities, City } from '@/data/cities';
import { roles, industries, Role } from '@/data/roles';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  Wrench, 
  BookOpen,
  TrendingUp,
  DollarSign,
  Search
} from 'lucide-react';

interface LinkItem {
  href: string;
  label: string;
  description?: string;
}

interface LinkSection {
  title: string;
  icon: React.ReactNode;
  links: LinkItem[];
}

interface InternalLinkHubProps {
  variant?: 'sidebar' | 'footer' | 'full';
  currentPage?: {
    type: 'role' | 'city' | 'location' | 'industry' | 'tool' | 'guide' | 'programmatic';
    slug?: string;
    city?: string;
    role?: string;
    industry?: string;
  };
  maxLinksPerSection?: number;
  showAllSections?: boolean;
}

// Get top cities by search volume
const getTopCities = (limit: number = 8, excludeSlug?: string): City[] => {
  return cities
    .filter(city => city.slug !== excludeSlug)
    .filter(city => city.searchVolume === 'high')
    .slice(0, limit);
};

// Get roles by industry
const getRolesByIndustry = (industry?: string, limit: number = 6, excludeSlug?: string): Role[] => {
  let filtered = roles.filter(role => role.slug !== excludeSlug);
  if (industry) {
    filtered = filtered.filter(role => role.industry === industry);
  }
  return filtered.slice(0, limit);
};

// Get related cities (same region or nearby)
const getRelatedCities = (currentCity: City, limit: number = 6): City[] => {
  return cities
    .filter(city => city.slug !== currentCity.slug)
    .filter(city => city.region === currentCity.region || city.searchVolume === 'high')
    .slice(0, limit);
};

// Generate city + role links
const getCityRoleLinks = (citySlug?: string, roleSlug?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 4);
  const topRoles = roles.slice(0, 4);
  
  if (citySlug) {
    // Show other roles in this city
    topRoles.filter(r => r.slug !== roleSlug).forEach(role => {
      links.push({
        href: `/career-hub/cities/${citySlug}/${role.slug}`,
        label: `${role.title} Jobs in ${cities.find(c => c.slug === citySlug)?.city || citySlug}`,
      });
    });
  } else if (roleSlug) {
    // Show this role in other cities
    topCities.forEach(city => {
      links.push({
        href: `/career-hub/cities/${city.slug}/${roleSlug}`,
        label: `${roles.find(r => r.slug === roleSlug)?.title || roleSlug} in ${city.city}`,
      });
    });
  } else {
    // Show mix of city + role combinations
    topCities.slice(0, 3).forEach(city => {
      topRoles.slice(0, 2).forEach(role => {
        links.push({
          href: `/career-hub/cities/${city.slug}/${role.slug}`,
          label: `${role.title} Jobs in ${city.city}`,
        });
      });
    });
  }
  
  return links.slice(0, limit);
};

// Generate industry + location links
const getIndustryLocationLinks = (currentIndustry?: string, currentCity?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const industryNames = ['warehouse', 'hospitality', 'retail', 'logistics'];
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 8);
  
  industryNames.filter(ind => ind !== currentIndustry).forEach(industry => {
    topCities.filter(city => city.slug !== currentCity).slice(0, 2).forEach(city => {
      links.push({
        href: `/${industry}-jobs-${city.slug}`,
        label: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Jobs in ${city.city}`,
      });
    });
  });
  
  return links.slice(0, limit);
};

// Generate intent-based page links
const getIntentPageLinks = (currentCity?: string, limit: number = 6): LinkItem[] => {
  const links: LinkItem[] = [];
  const topCities = cities.filter(c => c.searchVolume === 'high' && c.slug !== currentCity).slice(0, 6);
  
  topCities.forEach(city => {
    links.push({
      href: `/how-to-find-temp-work-in-${city.slug}`,
      label: `How to Find Temp Work in ${city.city}`,
    });
  });
  
  topCities.forEach(city => {
    links.push({
      href: `/best-paying-temp-jobs-${city.slug}`,
      label: `Best Paying Jobs in ${city.city}`,
    });
  });
  
  return links.slice(0, limit);
};

// Tool links
const toolLinks: LinkItem[] = [
  { href: '/career-hub/tools/pay-calculator', label: 'Pay Calculator', description: 'Calculate your earnings' },
  { href: '/career-hub/tools/tax-calculator', label: 'Tax Calculator', description: 'Estimate take-home pay' },
  { href: '/career-hub/tools/shift-planner', label: 'Shift Planner', description: 'Plan your schedule' },
  { href: '/career-hub/tools/career-path-explorer', label: 'Career Path Explorer', description: 'Plan your growth' },
  { href: '/career-hub/tools/skills-analyzer', label: 'Skills Analyzer', description: 'Assess your skills' },
  { href: '/career-hub/tools/cost-of-living', label: 'Cost of Living', description: 'Compare cities' },
];

export const InternalLinkHub = ({
  variant = 'sidebar',
  currentPage,
  maxLinksPerSection = 6,
  showAllSections = true,
}: InternalLinkHubProps) => {
  
  // Build sections based on current page context
  const buildSections = (): LinkSection[] => {
    const sections: LinkSection[] = [];
    
    // Roles section
    const roleLinks = getRolesByIndustry(currentPage?.industry, maxLinksPerSection, currentPage?.role);
    if (roleLinks.length > 0) {
      sections.push({
        title: 'Explore Roles',
        icon: <Briefcase className="h-4 w-4" />,
        links: roleLinks.map(role => ({
          href: `/career-hub/roles/${role.slug}`,
          label: role.title,
          description: role.shortDescription,
        })),
      });
    }
    
    // Cities section
    const cityLinks = getTopCities(maxLinksPerSection, currentPage?.city);
    if (cityLinks.length > 0) {
      sections.push({
        title: 'Top Cities',
        icon: <MapPin className="h-4 w-4" />,
        links: cityLinks.map(city => ({
          href: `/career-hub/cities/${city.slug}`,
          label: `${city.city}, ${city.stateCode}`,
          description: `$${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg`,
        })),
      });
    }
    
    // City + Role combinations
    const cityRoleLinks = getCityRoleLinks(currentPage?.city, currentPage?.role, maxLinksPerSection);
    if (cityRoleLinks.length > 0) {
      sections.push({
        title: 'Jobs by City',
        icon: <Building2 className="h-4 w-4" />,
        links: cityRoleLinks,
      });
    }
    
    // Industry + Location (programmatic pages)
    const industryLocationLinks = getIndustryLocationLinks(currentPage?.industry, currentPage?.city, maxLinksPerSection);
    if (industryLocationLinks.length > 0 && showAllSections) {
      sections.push({
        title: 'Jobs by Industry',
        icon: <TrendingUp className="h-4 w-4" />,
        links: industryLocationLinks,
      });
    }
    
    // Intent-based pages
    const intentLinks = getIntentPageLinks(currentPage?.city, maxLinksPerSection);
    if (intentLinks.length > 0 && showAllSections) {
      sections.push({
        title: 'Career Guides',
        icon: <Search className="h-4 w-4" />,
        links: intentLinks,
      });
    }
    
    // Tools section
    if (showAllSections) {
      sections.push({
        title: 'Free Tools',
        icon: <Wrench className="h-4 w-4" />,
        links: toolLinks.slice(0, maxLinksPerSection),
      });
    }
    
    return sections;
  };
  
  const sections = buildSections();
  
  if (variant === 'sidebar') {
    return (
      <aside className="space-y-4" aria-label="Related content">
        {sections.slice(0, 3).map((section, idx) => (
          <Card key={idx} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {section.links.slice(0, 5).map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </aside>
    );
  }
  
  if (variant === 'footer') {
    return (
      <nav className="border-t border-border/50 pt-8 mt-12" aria-label="Site navigation">
        <h2 className="text-lg font-semibold mb-6">Explore More</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2 text-foreground">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.slice(0, 6).map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    );
  }
  
  // Full variant - comprehensive link section
  return (
    <section className="py-12 bg-muted/30 rounded-lg" aria-label="Internal links">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">Explore Career Resources</h2>
        <p className="text-muted-foreground mb-8">
          Discover opportunities across roles, cities, and industries
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, idx) => (
            <Card key={idx} className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        to={link.href}
                        className="group flex flex-col"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="text-xs text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick links badges */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <h3 className="text-sm font-medium mb-3">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {industries.map(industry => (
              <Link key={industry.id} to={`/career-hub/industries/${industry.id}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {industry.name} Jobs
                </Badge>
              </Link>
            ))}
            {getTopCities(4).map(city => (
              <Link key={city.slug} to={`/career-hub/cities/${city.slug}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  Jobs in {city.city}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Quick Links component for embedding in content
export const QuickLinks = ({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) => (
  <div className="bg-muted/50 rounded-lg p-4 my-6">
    <h4 className="font-medium text-sm mb-2">{title}</h4>
    <ul className="flex flex-wrap gap-x-4 gap-y-1">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            to={link.href}
            className="text-sm text-primary hover:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Export helper functions for use in other components
export { getTopCities, getRolesByIndustry, getCityRoleLinks, getIndustryLocationLinks, getIntentPageLinks, toolLinks };
