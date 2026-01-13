import { Link } from "react-router-dom";
import { ExternalLink, FileText, MapPin, Wrench, Globe, Home, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageTemplates, type PageTemplate } from "@/data/presentation-templates";

const categoryIcons = {
  core: Home,
  geographic: MapPin,
  content: FileText,
  tools: Wrench,
  programmatic: Globe,
};

const categoryColors = {
  core: "bg-primary/10 text-primary border-primary/20",
  geographic: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
  content: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
  tools: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
  programmatic: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
};

const statusConfig = {
  draft: { color: "bg-muted text-muted-foreground", icon: AlertCircle, label: "Draft" },
  review: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: null, label: "In Review" },
  approved: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle, label: "Approved" },
};

const priorityLabels = {
  1: { label: "P1 - Critical", color: "text-red-600 dark:text-red-400" },
  2: { label: "P2 - High", color: "text-orange-600 dark:text-orange-400" },
  3: { label: "P3 - Normal", color: "text-muted-foreground" },
};

interface PageTypeCardProps {
  template: PageTemplate;
}

const PageTypeCard = ({ template }: PageTypeCardProps) => {
  const Icon = categoryIcons[template.category];
  const status = statusConfig[template.status];
  const priority = priorityLabels[template.priority];

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all hover:border-primary/30 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${categoryColors[template.category]} border`}>
          <Icon className="h-5 w-5" />
        </div>
        <Badge variant="outline" className={status.color}>
          {status.icon && <status.icon className="h-3 w-3 mr-1" />}
          {status.label}
        </Badge>
      </div>

      <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
        {template.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-primary">
          {template.pageCount.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {template.pageCount === 1 ? 'page' : 'pages'}
          </span>
        </span>
        <span className={`text-xs font-medium ${priority.color}`}>
          {priority.label}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-1">Target Keywords:</p>
        <div className="flex flex-wrap gap-1">
          {template.targetKeywords.slice(0, 2).map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {template.targetKeywords.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{template.targetKeywords.length - 2}
            </Badge>
          )}
        </div>
      </div>

      <Button asChild variant="outline" className="w-full" size="sm">
        <Link to={template.exampleUrl}>
          View Example <ExternalLink className="ml-2 h-3 w-3" />
        </Link>
      </Button>
    </div>
  );
};

const categoryInfo = {
  core: { key: "core" as const, label: "Core Pages", description: "Foundation pages and main navigation" },
  geographic: { key: "geographic" as const, label: "Geographic", description: "Location and market-specific pages" },
  content: { key: "content" as const, label: "Content", description: "Guides, articles, and educational content" },
  tools: { key: "tools" as const, label: "Tools", description: "Interactive calculators and training tools" },
  programmatic: { key: "programmatic" as const, label: "Programmatic SEO", description: "Auto-generated pages for long-tail keywords" },
};

const PageTypeGallery = () => {
  const categories = [
    categoryInfo.core,
    categoryInfo.geographic,
    categoryInfo.content,
    categoryInfo.tools,
    categoryInfo.programmatic,
  ];

  const totalPages = pageTemplates.reduce((sum, t) => sum + t.pageCount, 0);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-muted/50 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-2xl font-bold text-foreground">{pageTemplates.length}</span>
          <span className="text-muted-foreground ml-2">template types</span>
          <span className="text-muted-foreground mx-2">•</span>
          <span className="text-2xl font-bold text-foreground">{totalPages.toLocaleString()}</span>
          <span className="text-muted-foreground ml-2">total pages</span>
        </div>
        <div className="flex gap-2">
          {Object.entries(statusConfig).map(([key, config]) => (
            <Badge key={key} variant="outline" className={config.color}>
              {config.label}: {pageTemplates.filter(t => t.status === key).length}
            </Badge>
          ))}
        </div>
      </div>

      {categories.map((category) => {
        const templates = pageTemplates.filter((t) => t.category === category.key);
        if (templates.length === 0) return null;

        const categoryPageCount = templates.reduce((sum, t) => sum + t.pageCount, 0);

        return (
          <div key={category.key}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className={categoryColors[category.key]}>{category.label}</Badge>
              <span className="text-sm text-muted-foreground">
                {categoryPageCount.toLocaleString()} pages across {templates.length} template{templates.length !== 1 ? 's' : ''}
              </span>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                — {category.description}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {templates.map((template) => (
                <PageTypeCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PageTypeGallery;
