import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, TrendingUp, Users, Award } from "lucide-react";
import { guideCategories } from "@/data/articles/guides";

const GuidesPage = () => {
  // ItemList schema for guide categories
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Indeed Flex Career Guides",
    "description": "Expert career guides for flexible workers covering getting started, career growth, industry tips, and professional development.",
    "numberOfItems": guideCategories.reduce((acc, cat) => acc + cat.articles.length, 0),
    "itemListElement": guideCategories.flatMap((category, catIndex) =>
      category.articles.map((article, artIndex) => ({
        "@type": "ListItem",
        "position": catIndex * 4 + artIndex + 1,
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
      "numberOfItems": guideCategories.reduce((acc, cat) => acc + cat.articles.length, 0)
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
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Expert advice and actionable tips to help you grow your career, earn more, and succeed in flexible work.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {guideCategories.map((category) => (
                <div key={category.category} id={category.slug}>
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.articles.map((article) => (
                      <Card key={article.slug} className="group hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            <Link to={`/career-hub/guides/${article.slug}`} className="flex items-center justify-between">
                              {article.title}
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Get Career Tips in Your Inbox
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive weekly tips on growing your income and advancing your career as a flexible worker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground w-full sm:w-80"
                />
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Hub for SEO */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'guide' }} />
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
