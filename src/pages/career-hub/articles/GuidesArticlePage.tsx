import { useParams, Link, Navigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CertificationProviderCard from "@/components/career-hub/CertificationProviderCard";
import CTASection from "@/components/career-hub/CTASection";
import { ExternalResourcesSection } from "@/components/career-hub/ExternalResourcesSection";
import Layout from "@/components/career-hub/Layout";
import MarkdownContent from "@/components/career-hub/MarkdownContent";
import { SEOMetaTags } from "@/components/career-hub/seo";
import TableOfContents, { generateTOCFromSections } from "@/components/career-hub/TableOfContents";
import { guideArticles, guideCategories } from "@/data/articles/guides";
import { certifications, getCertificationsByCategory } from "@/data/certifications";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, Award, ExternalLink } from "lucide-react";

// Helper functions to determine resource category based on article slug
const getResourceCategory = (slug: string): 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial' | 'warehouse' | 'hospitality' | 'retail' | 'rights' | 'learning' | 'seasonal-warehouse' | 'seasonal-events' | 'seasonal-tax' | 'seasonal-summer' | 'employment-eligibility' | 'all' => {
  // Employment eligibility articles
  if (slug === 'i9-complete-guide' || slug === 'i9-documents-list' || slug === 'first-job-america-guide' || 
      slug === 'work-authorization-types' || slug === 'work-without-ssn' || slug === 'e-verify-explained') {
    return 'employment-eligibility';
  }
  
  // Seasonal hiring articles
  if (slug === 'holiday-warehouse-guide' || slug === 'black-friday-hiring') {
    return 'seasonal-warehouse';
  }
  if (slug === 'event-staffing-guide') {
    return 'seasonal-events';
  }
  if (slug === 'summer-hospitality-guide') {
    return 'seasonal-summer';
  }
  if (slug === 'tax-season-jobs') {
    return 'seasonal-tax';
  }
  if (slug === 'student-jobs-fall') {
    return 'retail';
  }
  
  // Industry guides
  if (slug === 'warehouse-skills' || slug === 'forklift-certification' || slug === 'warehouse-guide') {
    return 'warehouse';
  }
  if (slug === 'hospitality-skills' || slug === 'food-service-guide' || slug === 'hospitality-guide') {
    return 'hospitality';
  }
  if (slug === 'retail-skills' || slug === 'retail-guide') {
    return 'retail';
  }
  if (slug === 'certifications') {
    return 'certifications';
  }
  if (slug === 'first-aid-skills' || slug === 'workplace-safety') {
    return 'healthcare';
  }
  if (slug === 'career-paths' || slug === 'networking-success' || slug === 'professional-development' || slug === 'networking') {
    return 'learning';
  }
  if (slug === 'worker-rights' || slug === 'know-your-rights') {
    return 'rights';
  }
  return 'all';
};

const getResourceTitle = (slug: string): string => {
  // Employment eligibility articles
  if (slug === 'i9-complete-guide' || slug === 'i9-documents-list' || slug === 'first-job-america-guide' || 
      slug === 'work-authorization-types' || slug === 'work-without-ssn' || slug === 'e-verify-explained') {
    return 'Employment Eligibility Resources';
  }
  
  // Seasonal articles
  if (slug === 'holiday-warehouse-guide' || slug === 'black-friday-hiring') {
    return 'Holiday Season Hiring Resources';
  }
  if (slug === 'event-staffing-guide') {
    return 'Event & Festival Staffing Resources';
  }
  if (slug === 'summer-hospitality-guide') {
    return 'Summer Hospitality Job Resources';
  }
  if (slug === 'tax-season-jobs') {
    return 'Tax Season Employment Resources';
  }
  
  // Industry articles
  if (slug === 'warehouse-skills' || slug === 'forklift-certification' || slug === 'warehouse-guide') {
    return 'Warehouse & Industrial Resources';
  }
  if (slug === 'hospitality-skills' || slug === 'food-service-guide' || slug === 'hospitality-guide') {
    return 'Hospitality Industry Resources';
  }
  if (slug === 'retail-skills' || slug === 'retail-guide' || slug === 'student-jobs-fall') {
    return 'Retail Industry Resources';
  }
  if (slug === 'certifications') {
    return 'Certification Resources';
  }
  if (slug === 'first-aid-skills' || slug === 'workplace-safety') {
    return 'Safety & Healthcare Resources';
  }
  if (slug === 'career-paths' || slug === 'networking-success' || slug === 'professional-development' || slug === 'networking') {
    return 'Free Learning Resources';
  }
  if (slug === 'worker-rights' || slug === 'know-your-rights') {
    return 'Worker Rights Resources';
  }
  return 'Helpful Resources';
};

const getResourceDescription = (slug: string): string => {
  // Employment eligibility articles
  if (slug === 'i9-complete-guide' || slug === 'i9-documents-list' || slug === 'first-job-america-guide' || 
      slug === 'work-authorization-types' || slug === 'work-without-ssn' || slug === 'e-verify-explained') {
    return 'Official government resources for I-9, SSN, work permits, and employment verification';
  }
  
  // Seasonal articles
  if (slug === 'holiday-warehouse-guide' || slug === 'black-friday-hiring') {
    return 'Apply directly to major employers hiring 100,000+ workers for holiday peak season';
  }
  if (slug === 'event-staffing-guide') {
    return 'Find event staffing positions at concerts, sports venues, and festivals';
  }
  if (slug === 'summer-hospitality-guide') {
    return 'Explore summer positions at resorts, national parks, and vacation destinations';
  }
  if (slug === 'tax-season-jobs') {
    return 'Tax preparation companies hiring 60,000+ seasonal workers with training provided';
  }
  
  // Industry articles
  if (slug === 'warehouse-skills' || slug === 'forklift-certification' || slug === 'warehouse-guide') {
    return 'Training programs and certifications for warehouse and industrial careers';
  }
  if (slug === 'hospitality-skills' || slug === 'food-service-guide' || slug === 'hospitality-guide') {
    return 'Food safety, bartending, and hospitality certifications';
  }
  if (slug === 'retail-skills' || slug === 'retail-guide' || slug === 'student-jobs-fall') {
    return 'Training and development resources for retail careers';
  }
  if (slug === 'certifications') {
    return 'Find accredited certification providers and training programs';
  }
  if (slug === 'first-aid-skills' || slug === 'workplace-safety') {
    return 'Access safety training and healthcare resources for workers';
  }
  if (slug === 'career-paths' || slug === 'networking-success' || slug === 'professional-development' || slug === 'networking') {
    return 'Free courses and learning platforms to build new skills';
  }
  if (slug === 'worker-rights' || slug === 'know-your-rights') {
    return 'Know your rights and access legal resources for workers';
  }
  return 'Verified external resources to help you succeed';
};

const GuidesArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? guideArticles[slug] : null;

  if (!article) {
    return <Navigate to="/career-hub/guides" replace />;
  }

  // Find related articles
  const relatedArticleData = article.relatedArticles
    .map(relSlug => guideArticles[relSlug])
    .filter(Boolean)
    .slice(0, 3);

  // Find category icon
  const category = guideCategories.find(c => c.slug === article.categorySlug);
  const CategoryIcon = category?.icon;

  // Check if this is the certifications article
  const isCertificationsArticle = slug === 'certifications';

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
      "name": "Indeed Flex Career Hub"
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
    "dateModified": "2024-12-17",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://indeedflex.com/career-hub/guides/${article.slug}`
    }
  };

  // Generate HowTo schema for step-by-step guides
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

  // Generate Course schema for certifications article
  const courseSchemas = isCertificationsArticle ? certifications.slice(0, 5).map(cert => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": cert.name,
    "description": cert.description,
    "provider": cert.providers[0] ? {
      "@type": "Organization",
      "name": cert.providers[0].name,
      "sameAs": cert.providers[0].url
    } : undefined,
    "offers": cert.providers[0] ? {
      "@type": "Offer",
      "price": cert.providers[0].cost.replace(/[^0-9.-]/g, '').split('-')[0],
      "priceCurrency": "USD"
    } : undefined
  })) : null;

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://indeedflex.com/career-hub/guides/${article.slug}`
      }
    ]
  };

  return (
    <>
      <SEOMetaTags
        title={`${article.title} | Indeed Flex Career Hub`}
        description={article.description}
        canonical={`https://indeedflex.com/career-hub/guides/${article.slug}`}
        ogType="article"
        publishedTime="2024-01-15"
        modifiedTime="2024-12-17"
        section={article.category}
        keywords={[
          article.title.toLowerCase(),
          'indeed flex',
          'career guide',
          article.category.toLowerCase(),
          'flexible work',
          'temp jobs'
        ]}
        readingTime={parseInt(article.readTime)}
      />

      {/* Schema Scripts */}
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
      {courseSchemas && (
        <script type="application/ld+json">
          {JSON.stringify(courseSchemas)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <Layout>
        <article>
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: "Career Guides", href: "/career-hub/guides" },
                { label: article.category, href: `/career-hub/guides#${article.categorySlug}` },
                { label: article.title }
              ]} 
            />
          </div>

          {/* Hero */}
          <header className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Link 
                  to="/career-hub/guides" 
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Guides
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  {CategoryIcon && (
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <CategoryIcon className="h-5 w-5 text-accent" />
                    </div>
                  )}
                  <span className="text-primary-foreground/80">{article.category}</span>
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

          {/* Certification Providers Section (only for certifications article) */}
          {isCertificationsArticle && (
            <section className="py-12 bg-secondary/50">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <Award className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Accredited Certification Providers
                    </h2>
                  </div>
                  
                  {/* Hospitality Certifications */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Hospitality Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCertificationsByCategory('hospitality').map((cert) => (
                        cert.providers.slice(0, 1).map((provider) => (
                          <CertificationProviderCard
                            key={`${cert.slug}-${provider.name}`}
                            provider={provider}
                            certificationName={cert.name}
                          />
                        ))
                      ))}
                    </div>
                  </div>

                  {/* Warehouse Certifications */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Warehouse Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCertificationsByCategory('warehouse').map((cert) => (
                        cert.providers.slice(0, 1).map((provider) => (
                          <CertificationProviderCard
                            key={`${cert.slug}-${provider.name}`}
                            provider={provider}
                            certificationName={cert.name}
                          />
                        ))
                      ))}
                    </div>
                  </div>

                  {/* Universal Certifications */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Universal Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCertificationsByCategory('universal').map((cert) => (
                        cert.providers.slice(0, 1).map((provider) => (
                          <CertificationProviderCard
                            key={`${cert.slug}-${provider.name}`}
                            provider={provider}
                            certificationName={cert.name}
                          />
                        ))
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Links to external certification providers are provided for your convenience. 
                        Prices and course details are subject to change. Always verify current information 
                        on the provider's official website before enrolling.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQs */}
          {article.faqs.length > 0 && (
            <section className="py-12 bg-secondary">
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

          {/* External Resources Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <ExternalResourcesSection
                  category={getResourceCategory(slug || '')}
                  title={getResourceTitle(slug || '')}
                  description={getResourceDescription(slug || '')}
                  showIndeedFlex={true}
                  limit={6}
                />
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticleData.length > 0 && (
            <section className="py-12 bg-secondary/30">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Related Guides
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticleData.map((related) => (
                      <Card key={related.slug} className="group hover:border-primary/30 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            <Link to={`/career-hub/guides/${related.slug}`}>
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
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>

        <CTASection 
          title="Put Your Knowledge Into Action"
          subtitle="Download Indeed Flex and start applying what you've learned."
        />
      </Layout>
    </>
  );
};

export default GuidesArticlePage;
