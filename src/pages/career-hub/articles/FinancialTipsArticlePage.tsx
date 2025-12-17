import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import MarkdownContent from "@/components/career-hub/MarkdownContent";
import TableOfContents, { generateTOCFromSections } from "@/components/career-hub/TableOfContents";
import { ExternalResourcesSection } from "@/components/career-hub/ExternalResourcesSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { financialArticles, financialTips } from "@/data/articles/financial-tips";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, Calculator, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Map article slugs to relevant resource categories
const getResourceCategory = (slug: string): 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial' | 'warehouse' | 'hospitality' | 'retail' | 'rights' | 'learning' | 'all' => {
  switch (slug) {
    case 'tax-tips':
      return 'tax';
    case 'gig-benefits':
      return 'healthcare';
    case 'between-shifts':
    case 'government-resources':
      return 'government';
    case 'maximize-indeed-flex':
      return 'learning';
    case 'irregular-income-budget':
    case 'emergency-fund-guide':
    case 'retirement-saving':
      return 'financial';
    default:
      return 'all';
  }
};

const getResourceTitle = (slug: string): string => {
  switch (slug) {
    case 'tax-tips':
      return 'Free Tax Resources';
    case 'gig-benefits':
      return 'Healthcare Resources';
    case 'between-shifts':
      return 'Free Assistance Programs';
    case 'government-resources':
      return 'More Ways to Get Help';
    case 'maximize-indeed-flex':
      return 'Skill Building Resources';
    case 'irregular-income-budget':
    case 'emergency-fund-guide':
      return 'Financial Tools & Resources';
    case 'retirement-saving':
      return 'Retirement Planning Resources';
    default:
      return 'Helpful Resources';
  }
};

const getResourceDescription = (slug: string): string => {
  switch (slug) {
    case 'tax-tips':
      return 'Free and low-cost tax help for gig workers';
    case 'gig-benefits':
      return 'Find affordable health coverage options';
    case 'between-shifts':
      return 'Government programs to help during tight times';
    case 'government-resources':
      return 'Additional resources and tools';
    case 'maximize-indeed-flex':
      return 'Free courses and certifications to boost your earnings';
    case 'irregular-income-budget':
    case 'emergency-fund-guide':
      return 'Tools to manage your money effectively';
    case 'retirement-saving':
      return 'Get started with retirement accounts';
    default:
      return 'Verified resources to help you succeed';
  }
};

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

  // Check if article is a how-to guide
  const isHowToGuide = article.sections.some(s => 
    s.heading.toLowerCase().includes('step') || 
    article.title.toLowerCase().includes('how to')
  );

  // Generate TOC items
  const tocItems = generateTOCFromSections(article.sections);
  // Generate Article schema
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

  // Generate HowTo schema for step-by-step financial guides
  const howToSchema = isHowToGuide ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": article.description,
    "totalTime": `PT${parseInt(article.readTime)}M`,
    "step": article.sections
      .filter(s => s.heading.toLowerCase().includes('step') || article.sections.indexOf(s) > 0)
      .slice(0, 8)
      .map((section, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": section.heading.replace(/^Step \d+:\s*/i, ''),
        "text": section.content.substring(0, 500)
      }))
  } : null;

  // Generate FAQ schema
  const faqSchema = article.faqs.length > 0 ? {
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
  } : null;

  return (
    <>
      <Helmet>
        <title>{article.title} | Indeed Flex Career Hub</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`https://indeedflex.com/career-hub/financial-tips/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {howToSchema && (
          <script type="application/ld+json">
            {JSON.stringify(howToSchema)}
          </script>
        )}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
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

          {/* Article Content with Sticky TOC */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Sticky Table of Contents - Desktop */}
                  {tocItems.length >= 3 && (
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                      <TableOfContents items={tocItems} sticky />
                    </aside>
                  )}

                  {/* Mobile TOC */}
                  {tocItems.length >= 3 && (
                    <div className="lg:hidden mb-6">
                      <TableOfContents items={tocItems} />
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="flex-1 max-w-3xl">
                    {article.sections.map((section, index) => (
                      <div key={index} id={`section-${index}`} className="mb-10 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                          {section.heading}
                        </h2>
                        <MarkdownContent content={section.content} />
                      </div>
                    ))}
                  </div>
                </div>
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
                          <MarkdownContent content={faq.answer} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          )}

          {/* External Resources */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <ExternalResourcesSection
                  category={getResourceCategory(article.slug)}
                  title={getResourceTitle(article.slug)}
                  description={getResourceDescription(article.slug)}
                  showIndeedFlex={article.slug === 'between-shifts' || article.slug === 'gig-benefits'}
                  limit={6}
                />
              </div>
            </div>
          </section>

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
