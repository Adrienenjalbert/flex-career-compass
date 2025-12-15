import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { financialArticles, financialTips } from "@/data/articles/financial-tips";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, Calculator, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FinancialTipsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? financialArticles[slug] : null;

  if (!article) {
    return <Navigate to="/career-hub/financial-tips" replace />;
  }

  // Find related articles
  const relatedArticleData = article.relatedArticles
    .map(relSlug => financialArticles[relSlug])
    .filter(Boolean)
    .slice(0, 3);

  const ArticleIcon = article.icon;

  // Generate schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "Indeed Flex"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Indeed Flex",
      "logo": {
        "@type": "ImageObject",
        "url": "https://indeedflex.com/logo.png"
      }
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-12-01",
    "about": {
      "@type": "Thing",
      "name": "Personal Finance for Gig Workers"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Indeed Flex Career Hub</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`https://indeedflex.com/career-hub/financial-tips/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Layout>
        <article>
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: "Financial Tips", href: "/career-hub/financial-tips" },
                { label: article.title }
              ]} 
            />
          </div>

          {/* Hero */}
          <header className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Link 
                  to="/career-hub/financial-tips" 
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Financial Tips
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <ArticleIcon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-primary-foreground/80">Financial Guide</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {article.title}
                </h1>
                
                <p className="text-xl text-primary-foreground/90 mb-6">
                  {article.description}
                </p>

                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Key Takeaways */}
          <section className="py-8 bg-accent/10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-semibold text-foreground mb-4">Key Takeaways</h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                {article.sections.map((section, index) => (
                  <div key={index} className="mb-10">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {section.heading}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tools CTA Banner */}
          <section className="py-8 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Put This Into Practice
                </h3>
                <p className="text-muted-foreground mb-6">
                  Use our free tools to apply what you've learned.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    to="/career-hub/tools/pay-calculator"
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Pay Calculator
                  </Link>
                  <Link 
                    to="/career-hub/tools/tax-calculator"
                    className="bg-card border border-border text-foreground px-5 py-2.5 rounded-lg font-medium hover:border-primary/30 transition-colors inline-flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Tax Calculator
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          {article.faqs.length > 0 && (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {article.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`faq-${index}`}
                        className="bg-card border border-border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          )}

          {/* Related Articles */}
          {relatedArticleData.length > 0 && (
            <section className="py-12 bg-muted/50">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Related Financial Guides
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticleData.map((related) => {
                      const RelatedIcon = related.icon;
                      return (
                        <Card key={related.slug} className="group hover:border-primary/30 transition-colors">
                          <CardHeader>
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                              <RelatedIcon className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              <Link to={`/career-hub/financial-tips/${related.slug}`}>
                                {related.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {related.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{related.readTime} read</span>
                              <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>

        <CTASection 
          title="Take Control of Your Finances"
          subtitle="Find flexible shifts that help you reach your financial goals."
        />
      </Layout>
    </>
  );
};

export default FinancialTipsArticlePage;
