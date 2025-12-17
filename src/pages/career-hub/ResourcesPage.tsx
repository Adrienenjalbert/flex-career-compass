import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Building2, FileText, GraduationCap, Heart, DollarSign, Truck, UtensilsCrossed, ShoppingBag, Scale, BookOpen, Shield, Warehouse, Users, ArrowRight } from "lucide-react";
import {
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
  indeedFlexLinks,
  ExternalResource
} from "@/data/external-resources";

const categoryIcons: Record<string, React.ElementType> = {
  "Government Assistance": Building2,
  "Tax Help": FileText,
  "Healthcare": Heart,
  "Certifications": GraduationCap,
  "Warehouse & Industrial": Warehouse,
  "Hospitality": UtensilsCrossed,
  "Retail": ShoppingBag,
  "Financial Tools": DollarSign,
  "Worker Rights": Scale,
  "Free Learning": BookOpen,
};

const categoryDescriptions: Record<string, string> = {
  "Government Assistance": "Free programs and services to help with financial hardship, job training, and essential needs",
  "Tax Help": "Free and low-cost tax preparation services for gig workers and independent contractors",
  "Healthcare": "Affordable health insurance options and medical assistance programs",
  "Certifications": "Industry certifications that increase earning potential and job opportunities",
  "Warehouse & Industrial": "Safety training and certifications for warehouse and industrial careers",
  "Hospitality": "Food safety, bartending, and hospitality industry certifications",
  "Retail": "Training and development resources for retail careers",
  "Financial Tools": "Budgeting apps, banking solutions, and financial planning resources",
  "Worker Rights": "Know your rights and access legal resources for workers",
  "Free Learning": "Free online courses and learning platforms to build new skills",
};

const ResourceCard = ({ resource }: { resource: ExternalResource }) => {
  const Icon = resource.icon || ExternalLink;
  
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base group-hover:text-primary transition-colors">
                {resource.name}
              </CardTitle>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm line-clamp-2">
            {resource.description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
};

const ResourcesPage = () => {
  // Schema for SEO
  const resourceSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Resources for Flexible Workers | Indeed Flex Career Hub",
    "description": "Comprehensive collection of free resources for gig workers including government assistance, tax help, certifications, and career development tools.",
    "url": "https://indeedflex.com/career-hub/resources",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": resourceCategories.length,
      "itemListElement": resourceCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": category.title,
        "url": `https://indeedflex.com/career-hub/resources#${category.title.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Career Hub",
        "item": "https://indeedflex.com/career-hub"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resources",
        "item": "https://indeedflex.com/career-hub/resources"
      }
    ]
  };

  return (
    <>
      <SEOMetaTags
        title="Free Resources for Flexible Workers | Indeed Flex Career Hub"
        description="Access free government assistance, tax help, healthcare resources, certifications, and career development tools. Everything gig workers need to succeed."
        canonical="https://indeedflex.com/career-hub/resources"
        ogType="website"
        keywords={[
          'free resources for gig workers',
          'government assistance programs',
          'free tax help',
          'healthcare for gig workers',
          'certifications for warehouse workers',
          'hospitality certifications',
          'worker rights',
          'free online courses'
        ]}
      />

      <script type="application/ld+json">
        {JSON.stringify(resourceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Resources" }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <header className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Free Resources for Flexible Workers
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6">
                Verified external resources to help you succeed — from government assistance to career certifications
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  {resourceCategories.length} Categories
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  {governmentResources.length + taxResources.length + healthcareResources.length + certificationResources.length + financialToolResources.length + warehouseResources.length + hospitalityResources.length + retailResources.length + workerRightsResources.length + learningResources.length}+ Resources
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  All Free or Low-Cost
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Indeed Flex Featured Section */}
        <section className="py-8 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-card border border-primary/20 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary/10 text-primary">Featured</Badge>
                      <span className="font-semibold text-lg">Indeed Flex</span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Find flexible shifts, access Same Day Pay (get up to 50% of earnings within 1 hour), 
                      and get medical benefits through Indeed Flex.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={indeedFlexLinks.download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        Download App <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={indeedFlexLinks.sameDayPay.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        Same Day Pay <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={indeedFlexLinks.benefits.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        Benefits <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={indeedFlexLinks.roles.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        Available Roles <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Jump Navigation */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-semibold text-foreground mb-4">Jump to Category</h2>
              <div className="flex flex-wrap gap-2">
                {resourceCategories.map((category) => {
                  const Icon = categoryIcons[category.title] || ExternalLink;
                  return (
                    <a
                      key={category.title}
                      href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                    >
                      <Icon className="h-4 w-4" />
                      {category.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              {resourceCategories.map((category) => {
                const Icon = categoryIcons[category.title] || ExternalLink;
                const description = categoryDescriptions[category.title];
                
                return (
                  <div 
                    key={category.title} 
                    id={category.title.toLowerCase().replace(/\s+/g, '-')}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {category.title}
                        </h2>
                        {description && (
                          <p className="text-muted-foreground mt-1">
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.resources.map((resource) => (
                        <ResourceCard key={resource.url} resource={resource} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                More Ways to Grow Your Career
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/career-hub/guides" className="group">
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          Career Guides
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guides for getting started and advancing your career
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/career-hub/financial-tips" className="group">
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          Financial Tips
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Money management strategies for flexible workers
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/career-hub/tools" className="group">
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Scale className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          Career Tools
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Free calculators for pay, taxes, and career planning
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Ready to Start Earning?"
          subtitle="Download Indeed Flex and find flexible shifts that fit your schedule."
        />
      </Layout>
    </>
  );
};

export default ResourcesPage;
