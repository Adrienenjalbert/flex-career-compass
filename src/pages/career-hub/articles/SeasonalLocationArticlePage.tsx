import { useParams, Link, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import Layout from "@/components/career-hub/Layout";
import MarkdownContent from "@/components/career-hub/MarkdownContent";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { RelatedLocationsSection } from "@/components/career-hub/RelatedLocationsSection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { guideArticles } from "@/data/articles/guides";
import { 
  parseSeasonalLocationUrl, 
  getSeasonalLocationData,
  SeasonalArticleSlug,
  LocalEmployer,
} from "@/data/articles/seasonal-location-data";
import { cities, isActiveMarket } from "@/data/cities";
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Building2, 
  Calendar,
  TrendingUp,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Briefcase,
} from "lucide-react";

const SeasonalLocationArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Parse the URL to get article and city slugs
  const parsed = slug ? parseSeasonalLocationUrl(slug) : null;
  
  if (!parsed) {
    // Not a location-specific seasonal article, redirect to guides
    return <Navigate to="/career-hub/guides" replace />;
  }

  const { articleSlug, citySlug } = parsed;
  const baseArticle = guideArticles[articleSlug];
  const locationData = getSeasonalLocationData(citySlug, articleSlug);
  const cityInfo = cities.find(c => c.slug === citySlug);

  if (!baseArticle || !locationData || !cityInfo) {
    return <Navigate to="/career-hub/guides" replace />;
  }

  // Generate location-specific title and description
  const pageTitle = `${baseArticle.title.replace('2026', '')} in ${cityInfo.city}, ${cityInfo.stateCode} 2026`;
  const pageDescription = `Find ${locationData.seasonType} jobs in ${cityInfo.city}, ${cityInfo.stateCode}. Local employers hiring now: ${locationData.localEmployers.slice(0, 3).map(e => e.name).join(', ')}. Pay range: $${locationData.avgWageRange.min}-${locationData.avgWageRange.max}/hr.`;

  // Generate FAQs specific to this location
  const locationFaqs = [
    {
      question: `What companies are hiring for ${locationData.seasonType} work in ${cityInfo.city}?`,
      answer: `Major employers hiring in ${cityInfo.city} include ${locationData.localEmployers.map(e => e.name).join(', ')}. Pay rates typically range from $${locationData.avgWageRange.min} to $${locationData.avgWageRange.max} per hour.`
    },
    {
      question: `When should I apply for ${locationData.seasonType} jobs in ${cityInfo.city}?`,
      answer: `The peak hiring window for ${locationData.seasonType} positions in ${cityInfo.city} is ${locationData.peakHiringWindow}. ${locationData.applicationDeadline || 'Apply early for the best selection of shifts and positions.'}`
    },
    {
      question: `How much do ${locationData.seasonType} jobs pay in ${cityInfo.city}?`,
      answer: `${locationData.seasonType.charAt(0).toUpperCase() + locationData.seasonType.slice(1)} jobs in ${cityInfo.city} typically pay between $${locationData.avgWageRange.min} and $${locationData.avgWageRange.max} per hour. Pay varies by employer, role, and experience level. Premium pay is often available for nights, weekends, and holidays.`
    },
    {
      question: `Is ${cityInfo.city} a good market for Indeed Flex?`,
      answer: isActiveMarket(citySlug) 
        ? `Yes! ${cityInfo.city} is an active Indeed Flex market with regular job opportunities across ${cityInfo.topIndustries.slice(0, 3).join(', ')}. Download the Indeed Flex app to browse available shifts.`
        : `Indeed Flex is expanding and may offer opportunities in the ${cityInfo.city} metro area. Check the app regularly for new openings in your area.`
    },
  ];

  // Schema markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
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
    "datePublished": "2025-01-12",
    "dateModified": "2025-01-12",
    "about": {
      "@type": "Place",
      "name": `${cityInfo.city}, ${cityInfo.stateCode}`,
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "US"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://indeedflex.com/career-hub/guides/${slug}`
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
        "name": "Career Guides",
        "item": "https://indeedflex.com/career-hub/guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": baseArticle.title,
        "item": `https://indeedflex.com/career-hub/guides/${articleSlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": cityInfo.city,
        "item": `https://indeedflex.com/career-hub/guides/${slug}`
      }
    ]
  };

  // Local business/job posting schema for employers
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": locationData.localEmployers.slice(0, 5).map((employer, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": `${locationData.seasonType.charAt(0).toUpperCase() + locationData.seasonType.slice(1)} Worker`,
        "hiringOrganization": {
          "@type": "Organization",
          "name": employer.name
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityInfo.city,
            "addressRegion": cityInfo.stateCode,
            "addressCountry": "US"
          }
        },
        "baseSalary": employer.payRange ? {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": employer.payRange.min,
            "maxValue": employer.payRange.max,
            "unitText": "HOUR"
          }
        } : undefined
      }
    }))
  };

  const getEmployerIcon = (type: LocalEmployer['type']) => {
    switch (type) {
      case 'warehouse': return <Building2 className="h-4 w-4" />;
      case 'retail': return <Briefcase className="h-4 w-4" />;
      case 'hospitality': return <Building2 className="h-4 w-4" />;
      case 'logistics': return <TrendingUp className="h-4 w-4" />;
      case 'events': return <Calendar className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <>
      <SEOMetaTags
        title={`${pageTitle} | Indeed Flex Career Hub`}
        description={pageDescription}
        canonical={`https://indeedflex.com/career-hub/guides/${slug}`}
        ogType="article"
        publishedTime="2025-01-12"
        modifiedTime="2025-01-12"
        section={baseArticle.category}
        keywords={[
          `${locationData.seasonType} jobs ${cityInfo.city}`,
          `${cityInfo.city} ${cityInfo.stateCode} temp jobs`,
          `${locationData.seasonType} hiring ${cityInfo.city}`,
          'indeed flex',
          'seasonal work',
          baseArticle.category.toLowerCase(),
        ]}
      />

      {/* Schema Scripts */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(jobPostingSchema)}
      </script>

      <Layout>
        <article>
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: "Career Guides", href: "/career-hub/guides" },
                { label: baseArticle.title, href: `/career-hub/guides/${articleSlug}` },
                { label: cityInfo.city }
              ]} 
            />
          </div>

          {/* Hero */}
          <header className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Link 
                  to={`/career-hub/guides/${articleSlug}`}
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to National Guide
                </Link>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-accent/20 text-primary-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {cityInfo.city}, {cityInfo.stateCode}
                  </Badge>
                  {isActiveMarket(citySlug) && (
                    <Badge variant="secondary" className="bg-green-500/20 text-primary-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Indeed Flex Active Market
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {pageTitle}
                </h1>
                
                <p className="text-xl text-primary-foreground/90 mb-6">
                  {pageDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {baseArticle.readTime} read
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    ${locationData.avgWageRange.min}-${locationData.avgWageRange.max}/hr avg
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Peak: {locationData.peakHiringWindow}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Local Employers Section */}
          <section className="py-8 bg-accent/10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Top Employers Hiring in {cityInfo.city}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationData.localEmployers.map((employer, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getEmployerIcon(employer.type)}
                              <h3 className="font-medium">{employer.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                              {employer.type.replace('-', ' ')}
                            </p>
                          </div>
                          {employer.payRange && (
                            <Badge variant="outline">
                              ${employer.payRange.min}-${employer.payRange.max}/hr
                            </Badge>
                          )}
                        </div>
                        {employer.estimatedHires && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Estimated hires: {employer.estimatedHires}
                          </p>
                        )}
                        {employer.applyUrl && (
                          <a 
                            href={employer.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                          >
                            Apply Now <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Local Tips */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">
                  Tips for {cityInfo.city} Job Seekers
                </h2>
                <ul className="space-y-3">
                  {locationData.localTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Local Events (if any) */}
          {locationData.localEvents.length > 0 && (
            <section className="py-8 bg-secondary/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Major Events in {cityInfo.city}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locationData.localEvents.map((event, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{event.name}</h3>
                          {event.venue && (
                            <p className="text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {event.venue}
                            </p>
                          )}
                          {event.date && (
                            <p className="text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {event.date}
                            </p>
                          )}
                          {event.expectedStaffing && (
                            <Badge variant="secondary" className="mt-2">
                              {event.expectedStaffing} staff needed
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Main Article Content (from base article) */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  Complete Guide to {locationData.seasonType.charAt(0).toUpperCase() + locationData.seasonType.slice(1)} Jobs
                </h2>
                {baseArticle.sections.slice(0, 4).map((section, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">
                      {section.heading}
                    </h3>
                    <MarkdownContent content={section.content} />
                  </div>
                ))}
                
                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Read the full guide:</strong>{' '}
                    <Link to={`/career-hub/guides/${articleSlug}`} className="text-primary hover:underline">
                      {baseArticle.title} →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Location-Specific FAQs */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  FAQs: {locationData.seasonType.charAt(0).toUpperCase() + locationData.seasonType.slice(1)} Jobs in {cityInfo.city}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {locationFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
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

          {/* Related Locations */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <RelatedLocationsSection
                  articleSlug={articleSlug}
                  currentCitySlug={citySlug}
                  limit={6}
                />
              </div>
            </div>
          </section>

          {/* Internal Link Hub */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <InternalLinkHub 
                variant="footer" 
                currentPage={{ 
                  type: 'guide', 
                  slug: slug,
                  city: citySlug 
                }} 
              />
            </div>
          </section>

          <CTASection />
        </article>
      </Layout>
    </>
  );
};

export default SeasonalLocationArticlePage;
