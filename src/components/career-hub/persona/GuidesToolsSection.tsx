import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Calendar, 
  DollarSign,
  FileText,
  Lightbulb
} from "lucide-react";

interface Guide {
  slug: string;
  title: string;
  description: string;
  readTime?: string;
}

interface Tool {
  path: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface GuidesToolsSectionProps {
  guides: Guide[];
  tools: Tool[];
  guidesTitle?: string;
  toolsTitle?: string;
}

export function GuidesToolsSection({ 
  guides, 
  tools,
  guidesTitle = "Essential Guides",
  toolsTitle = "Helpful Tools"
}: GuidesToolsSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Guides Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{guidesTitle}</h2>
                <p className="text-sm text-muted-foreground">In-depth career resources</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {guides.map((guide, index) => (
                <Link 
                  key={guide.slug} 
                  to={`/career-hub/guides/${guide.slug}`}
                  className="block group"
                >
                  <Card className="hover:shadow-md transition-all hover:border-primary/30">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {guide.title}
                          </h3>
                          {guide.readTime && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {guide.readTime}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-1">
                          {guide.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              <Link 
                to="/career-hub/guides" 
                className="inline-flex items-center text-primary hover:underline text-sm font-medium mt-2"
              >
                Browse All Guides
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{toolsTitle}</h2>
                <p className="text-sm text-muted-foreground">Interactive calculators & planners</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="hover:shadow-md transition-all hover:border-primary/30">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{tool.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              <Link 
                to="/career-hub/tools" 
                className="inline-flex items-center text-primary hover:underline text-sm font-medium mt-2"
              >
                View All Tools
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
