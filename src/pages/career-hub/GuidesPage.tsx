import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { guideCategories } from "@/data/articles/guides";

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  "getting-started": BookOpen,
  "job-applications": FileText,
  "career-growth": TrendingUp,
  "seasonal-hiring": Calendar,
};

// Category descriptions for better UX
const categoryDescriptions: Record<string, string> = {
  "getting-started": "New to flexible work? Start here with our beginner-friendly guides.",
  "job-applications": "Resume templates, cover letters, and profile optimization tips.",
  "career-growth": "Level up your skills, certifications, and earnings potential.",
  "seasonal-hiring": "Holiday jobs, event staffing, and work eligibility guides.",
};

const GuidesPage = () => {
  const totalArticles = guideCategories.reduce((acc, cat) => acc + cat.articles.length, 0);

  // ItemList schema for guide categories
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Indeed Flex Career Guides",
    "description": "Expert career guides for flexible workers covering getting started, job applications, career growth, and seasonal hiring.",
    "numberOfItems": totalArticles,
    "itemListElement": guideCategories.flatMap((category, catIndex) =>
      category.articles.map((article, artIndex) => ({
        "@type": "ListItem",
        "position": catIndex * 10 + artIndex + 1,
        "item": {
          "@type": "Article",
          "name": article.title,
          "url": `https://indeedflex.com/career-hub/guides/${article.slug}`
        }
      }))
    )
  };

  // BreadcrumbList schema
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
        "name": "Career Guides",
        "item": "https://indeedflex.com/career-hub/guides"
      }
    ]
  };

  // CollectionPage schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Career Guides | Indeed Flex Career Hub",
    "description": "Free career guides for flexible workers. Learn how to grow your career, increase your earnings, and succeed in hospitality, warehouse, retail, and facilities work.",
    "url": "https://indeedflex.com/career-hub/guides",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalArticles
    }
  };

  return (
    <>
      <SEOMetaTags
        title="Career Guides | Indeed Flex Career Hub"
        description="Free career guides for flexible workers. Learn how to grow your career, increase your earnings, and succeed in hospitality, warehouse, retail, and facilities work."
        canonical="https://indeedflex.com/career-hub/guides"
        keywords={[
          'career guides',
          'flexible work tips',
          'indeed flex guide',
          'temp job advice',
          'hospitality career',
          'warehouse jobs guide',
          'gig work tips'
        ]}
      />

      {/* Schema Scripts */}
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(collectionPageSchema)}
      </script>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Career Guides" }]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Career Guides
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
              Expert advice and actionable tips to help you grow your career, earn more, and succeed in flexible work.
            </p>
            <p className="text-sm text-primary-foreground/70">
              {totalArticles} guides across {guideCategories.length} categories
            </p>
          </div>
        </section>

        {/* Quick Category Navigation */}
        <section className="py-6 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {guideCategories.map((category) => {
                const Icon = categoryIcons[category.slug] || BookOpen;
                return (
                  <a
                    key={category.slug}
                    href={`#${category.slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm font-medium"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {category.category}
                    <span className="text-muted-foreground text-xs">({category.articles.length})</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured: Job Application Toolkit */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Link
              to="/career-hub/job-application-toolkit"
              className="block max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-foreground/20 rounded-xl">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Job Application Toolkit</div>
                    <div className="text-primary-foreground/80 text-sm">
                      Resume templates, cover letters, ATS keywords & Indeed Flex profile tips
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Guides Grid - 4 Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {guideCategories.map((category) => {
                const Icon = categoryIcons[category.slug] || BookOpen;
                const description = categoryDescriptions[category.slug];
                
                return (
                  <div key={category.category} id={category.slug}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                        {description && (
                          <p className="text-muted-foreground mt-1">{description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.articles.map((article) => (
                        <Card key={article.slug} className="group hover:border-primary/30 hover:shadow-md transition-all">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              <Link 
                                to={`/career-hub/guides/${article.slug}`} 
                                className="flex items-start justify-between gap-2"
                              >
                                <span>{article.title}</span>
                                <ArrowRight className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{totalArticles}</div>
                <div className="text-sm text-muted-foreground">Free Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2026</div>
                <div className="text-sm text-muted-foreground">Updated Data</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free to Read</div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Put Your Knowledge Into Action"
          subtitle="Download Indeed Flex and start applying what you've learned."
        />
      </Layout>
    </>
  );
};

export default GuidesPage;
