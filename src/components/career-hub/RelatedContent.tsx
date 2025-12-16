import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Briefcase, Calculator, BookOpen } from "lucide-react";

interface RelatedRole {
  title: string;
  slug: string;
  pay: string;
}

interface RelatedLocation {
  name: string;
  slug: string;
}

interface RelatedTool {
  title: string;
  slug: string;
  description: string;
}

interface RelatedGuide {
  title: string;
  slug: string;
  readTime: string;
}

interface RelatedContentProps {
  currentRole?: string;
  currentLocation?: string;
  roles?: RelatedRole[];
  locations?: RelatedLocation[];
  tools?: RelatedTool[];
  guides?: RelatedGuide[];
  variant?: "sidebar" | "full";
}

const RelatedContent = ({
  currentRole,
  currentLocation,
  roles = [],
  locations = [],
  tools = [],
  guides = [],
  variant = "sidebar"
}: RelatedContentProps) => {
  const hasContent = roles.length > 0 || locations.length > 0 || tools.length > 0 || guides.length > 0;

  if (!hasContent) return null;

  if (variant === "sidebar") {
    return (
      <div className="space-y-6">
        {/* Related Roles */}
        {roles.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Related Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {roles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      to={`/career-hub/roles/${role.slug}`}
                      className="flex items-center justify-between text-sm hover:text-primary transition-colors group"
                    >
                      <span>{role.title}</span>
                      <span className="text-muted-foreground group-hover:text-primary">
                        {role.pay}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Find This Role In */}
        {locations.length > 0 && currentRole && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Find {currentRole} Jobs In
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      to={`/career-hub/locations/${location.slug}`}
                      className="text-sm hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {location.name}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Useful Tools */}
        {tools.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                Useful Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      to={`/career-hub/tools/${tool.slug}`}
                      className="block hover:text-primary transition-colors group"
                    >
                      <div className="text-sm font-medium">{tool.title}</div>
                      <div className="text-xs text-muted-foreground">{tool.description}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Related Guides */}
        {guides.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Helpful Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      to={`/career-hub/guides/${guide.slug}`}
                      className="block hover:text-primary transition-colors"
                    >
                      <div className="text-sm font-medium">{guide.title}</div>
                      <div className="text-xs text-muted-foreground">{guide.readTime} read</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Full width variant
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related Roles */}
          {roles.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Related Roles
              </h3>
              <ul className="space-y-2">
                {roles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      to={`/career-hub/roles/${role.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {role.title} ({role.pay})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Locations */}
          {locations.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {currentRole ? `${currentRole} Jobs By Location` : "Popular Locations"}
              </h3>
              <ul className="space-y-2">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      to={currentRole 
                        ? `/career-hub/locations/${location.slug}/${currentRole.toLowerCase().replace(/\s+/g, '-')}`
                        : `/career-hub/locations/${location.slug}`
                      }
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                Useful Tools
              </h3>
              <ul className="space-y-2">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      to={`/career-hub/tools/${tool.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guides */}
          {guides.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Helpful Guides
              </h3>
              <ul className="space-y-2">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      to={`/career-hub/guides/${guide.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedContent;
