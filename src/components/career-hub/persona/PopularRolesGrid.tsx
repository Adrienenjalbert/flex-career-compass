import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Star } from "lucide-react";

interface Role {
  slug: string;
  title: string;
  pay: string;
  description: string;
  tags?: string[];
  highlight?: boolean;
}

interface PopularRolesGridProps {
  roles: Role[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PopularRolesGrid({ 
  roles, 
  title = "Popular Roles",
  subtitle,
  className
}: PopularRolesGridProps) {
  return (
    <section className={`py-16 ${className || 'bg-muted/30'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <Link 
            to="/career-hub/roles"
            className="hidden md:flex items-center text-primary hover:underline font-medium"
          >
            View All Roles
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Link 
              key={role.slug} 
              to={`/career-hub/roles/${role.slug}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative">
                {role.highlight && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-mono text-sm">
                      {role.pay}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{role.description}</p>
                  
                  {role.tags && role.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {role.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/career-hub/roles"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            View All Roles
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
