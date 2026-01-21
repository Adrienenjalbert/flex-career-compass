import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BookOpen, FileText, Wrench } from "lucide-react";

interface RelatedItem {
  type: 'guide' | 'article' | 'tool' | 'template';
  slug: string;
  title: string;
  description: string;
  readTime?: string;
  highlight?: boolean;
}

interface RelatedArticlesGridProps {
  items: RelatedItem[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function RelatedArticlesGrid({ items, title, subtitle, className }: RelatedArticlesGridProps) {
  const getBasePath = (type: RelatedItem['type']) => {
    switch (type) {
      case 'guide':
      case 'article':
        return '/career-hub/guides';
      case 'tool':
        return '/career-hub/tools';
      case 'template':
        return '/career-hub/templates';
      default:
        return '/career-hub/guides';
    }
  };

  const getIcon = (type: RelatedItem['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'tool':
        return <Wrench className="w-4 h-4" />;
      case 'template':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: RelatedItem['type']) => {
    switch (type) {
      case 'guide':
        return 'Guide';
      case 'article':
        return 'Article';
      case 'tool':
        return 'Tool';
      case 'template':
        return 'Template';
      default:
        return 'Resource';
    }
  };

  return (
    <section className={`py-16 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <Link 
              key={index} 
              to={`${getBasePath(item.type)}/${item.slug}`}
              className="group"
            >
              <Card className={`h-full transition-all hover:shadow-lg ${item.highlight ? 'border-primary/30 bg-primary/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge 
                      variant={item.highlight ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {getIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                    {item.readTime && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
