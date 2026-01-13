import { FileText, MapPin, Wrench, BookOpen, Globe, Layers } from "lucide-react";
import { keyMetrics } from "@/data/presentation-templates";

const MetricsDashboard = () => {
  const metrics = [
    {
      label: "Total Pages",
      value: `${keyMetrics.totalPages.toLocaleString()}+`,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Template Types",
      value: keyMetrics.templateTypes,
      icon: Layers,
      color: "text-accent-foreground",
      bgColor: "bg-accent",
    },
    {
      label: "Active Markets",
      value: keyMetrics.activeMarkets,
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Interactive Tools",
      value: keyMetrics.interactiveTools,
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Guide Articles",
      value: `${keyMetrics.guideArticles}+`,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Sitemap Categories",
      value: keyMetrics.sitemapCategories,
      icon: Globe,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
        >
          <div className={`inline-flex p-3 rounded-full ${metric.bgColor} mb-3`}>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {metric.value}
          </div>
          <div className="text-sm text-muted-foreground">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
