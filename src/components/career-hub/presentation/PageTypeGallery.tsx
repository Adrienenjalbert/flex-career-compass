import { Link } from "react-router-dom";
import { ExternalLink, FileText, MapPin, Wrench, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageTemplates, type PageTemplate } from "@/data/presentation-templates";

const categoryIcons = {
  core: FileText,
  geographic: MapPin,
  content: FileText,
  tools: Wrench,
  programmatic: Globe,
};

const categoryColors = {
  core: "bg-primary/10 text-primary border-primary/20",
  geographic: "bg-green-100 text-green-700 border-green-200",
  content: "bg-blue-100 text-blue-700 border-blue-200",
  tools: "bg-orange-100 text-orange-700 border-orange-200",
  programmatic: "bg-purple-100 text-purple-700 border-purple-200",
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
};

const priorityLabels = {
  1: "P1 - Critical",
  2: "P2 - High",
  3: "P3 - Normal",
};

interface PageTypeCardProps {
  template: PageTemplate;
}

const PageTypeCard = ({ template }: PageTypeCardProps) => {
  const Icon = categoryIcons[template.category];

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all hover:border-primary/30">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${categoryColors[template.category]} border`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={statusColors[template.status]}>
            {template.status}
          </Badge>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {template.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-primary">
          {template.pageCount.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground ml-1">pages</span>
        </span>
        <Badge variant="secondary" className="text-xs">
          {priorityLabels[template.priority]}
        </Badge>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-1">Target Keywords:</p>
        <div className="flex flex-wrap gap-1">
          {template.targetKeywords.slice(0, 2).map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
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

const PageTypeGallery = () => {
  const categories = [
    { key: "core", label: "Core Pages" },
    { key: "geographic", label: "Geographic" },
    { key: "content", label: "Content" },
    { key: "tools", label: "Tools" },
    { key: "programmatic", label: "Programmatic SEO" },
  ] as const;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const templates = pageTemplates.filter((t) => t.category === category.key);
        if (templates.length === 0) return null;

        return (
          <div key={category.key}>
            <div className="flex items-center gap-2 mb-4">
              <Badge className={categoryColors[category.key]}>{category.label}</Badge>
              <span className="text-sm text-muted-foreground">
                {templates.reduce((sum, t) => sum + t.pageCount, 0).toLocaleString()} total pages
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
