import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalResource, 
  resourceCategories,
  governmentResources,
  taxResources,
  healthcareResources,
  certificationResources,
  financialToolResources,
  warehouseResources,
  hospitalityResources,
  retailResources,
  workerRightsResources,
  learningResources,
  indeedFlexLinks
} from '@/data/external-resources';

interface ExternalResourceCardProps {
  resource: ExternalResource;
  compact?: boolean;
}

const ExternalResourceCard: React.FC<ExternalResourceCardProps> = ({ resource, compact = false }) => {
  const Icon = resource.icon || ExternalLink;
  
  if (compact) {
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
      >
        <Icon className="h-4 w-4 text-primary flex-shrink-0" />
        <span className="text-sm font-medium group-hover:text-primary transition-colors">{resource.name}</span>
        <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
      </a>
    );
  }
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base">{resource.name}</CardTitle>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label={`Visit ${resource.name}`}
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{resource.description}</CardDescription>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline font-medium"
        >
          Visit site
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
};

interface ExternalResourcesSectionProps {
  category?: 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial' | 'warehouse' | 'hospitality' | 'retail' | 'rights' | 'learning' | 'all';
  title?: string;
  description?: string;
  compact?: boolean;
  limit?: number;
  showIndeedFlex?: boolean;
}

export const ExternalResourcesSection: React.FC<ExternalResourcesSectionProps> = ({
  category = 'all',
  title = 'Helpful Resources',
  description = 'Verified external resources to help you succeed',
  compact = false,
  limit,
  showIndeedFlex = false
}) => {
  const getResources = (): ExternalResource[] => {
    switch (category) {
      case 'government':
        return governmentResources;
      case 'tax':
        return taxResources;
      case 'healthcare':
        return healthcareResources;
      case 'certifications':
        return certificationResources;
      case 'financial':
        return financialToolResources;
      case 'warehouse':
        return warehouseResources;
      case 'hospitality':
        return hospitalityResources;
      case 'retail':
        return retailResources;
      case 'rights':
        return workerRightsResources;
      case 'learning':
        return learningResources;
      case 'all':
      default:
        return [
          ...governmentResources.slice(0, 2),
          ...taxResources.slice(0, 2),
          ...certificationResources.slice(0, 2)
        ];
    }
  };

  let resources = getResources();
  if (limit) {
    resources = resources.slice(0, limit);
  }

  return (
    <section className="py-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {showIndeedFlex && (
        <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Featured
            </Badge>
            <span className="font-semibold">Indeed Flex</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Find flexible shifts, access Same Day Pay, and get medical benefits through Indeed Flex.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={indeedFlexLinks.download.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Download App
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={indeedFlexLinks.sameDayPay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Same Day Pay
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={indeedFlexLinks.benefits.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Benefits
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      <div className={compact ? "flex flex-wrap gap-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
        {resources.map((resource) => (
          <ExternalResourceCard key={resource.url} resource={resource} compact={compact} />
        ))}
      </div>
    </section>
  );
};

// Inline resource link component for use within article content
interface InlineResourceLinkProps {
  href: string;
  children: React.ReactNode;
}

export const InlineResourceLink: React.FC<InlineResourceLinkProps> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
  >
    {children}
    <ExternalLink className="h-3 w-3" />
  </a>
);

export default ExternalResourcesSection;
