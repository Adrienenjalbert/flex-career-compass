import { useState, useMemo } from "react";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { ContentFilter, ActiveFilters } from "@/components/career-hub/ContentFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { guideCategories } from "@/data/articles/guides";
import { ExperienceLevel, IndustryTag, UserSituation, tagLabels } from "@/data/taxonomy";

// Tag mapping for guides - maps slug to tags for filtering
const guideTagMapping: Record<string, {
  experienceLevel: ExperienceLevel[];
  industries: IndustryTag[];
  situations: UserSituation[];
}> = {
  // Getting Started
  "first-flex-job": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "career-change"] },
  "complete-guide": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "side-gig"] },
  "first-shift": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job"] },
  "worker-profile": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "career-change"] },
  
  // Job Application & Resume
  "temp-work-resume-guide": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "career-change", "returning-worker"] },
  "warehouse-resume-guide": { experienceLevel: ["beginner", "intermediate"], industries: ["warehouse"], situations: ["first-job", "career-change"] },
  "hospitality-resume-tips": { experienceLevel: ["beginner", "intermediate"], industries: ["hospitality"], situations: ["first-job", "career-change"] },
  "first-job-resume-template": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "student"] },
  "indeed-flex-profile-guide": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "side-gig"] },
  "temp-job-cover-letter": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "career-change"] },
  
  // Career Growth
  "career-paths": { experienceLevel: ["intermediate", "advanced"], industries: ["general"], situations: ["career-change"] },
  "skill-boost": { experienceLevel: ["intermediate"], industries: ["general"], situations: ["side-gig", "career-change"] },
  "certifications": { experienceLevel: ["beginner", "intermediate"], industries: ["warehouse", "hospitality"], situations: ["career-change"] },
  "more-shifts": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["side-gig"] },
  "temp-to-perm-guide": { experienceLevel: ["intermediate"], industries: ["general"], situations: ["career-change"] },
  
  // Industry Guides
  "hospitality-guide": { experienceLevel: ["beginner"], industries: ["hospitality"], situations: ["first-job", "career-change"] },
  "warehouse-guide": { experienceLevel: ["beginner"], industries: ["warehouse"], situations: ["first-job", "career-change"] },
  "retail-guide": { experienceLevel: ["beginner"], industries: ["retail"], situations: ["first-job", "student", "side-gig"] },
  "facilities-guide": { experienceLevel: ["beginner"], industries: ["facilities"], situations: ["first-job", "career-change"] },
  
  // Professional Development
  "networking": { experienceLevel: ["intermediate"], industries: ["general"], situations: ["career-change"] },
  "resume-tips": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "returning-worker"] },
  "interview-skills": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["first-job", "career-change"] },
  "multiple-gigs": { experienceLevel: ["intermediate"], industries: ["general"], situations: ["side-gig", "parent"] },
  
  // Workplace Success
  "workplace-success": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job"] },
  "shift-rating-tips": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["side-gig"] },
  
  // Seasonal & Event Hiring
  "holiday-warehouse-guide": { experienceLevel: ["beginner"], industries: ["warehouse"], situations: ["first-job", "side-gig", "student"] },
  "black-friday-hiring": { experienceLevel: ["beginner"], industries: ["warehouse", "retail"], situations: ["first-job", "side-gig"] },
  "summer-hospitality-guide": { experienceLevel: ["beginner"], industries: ["hospitality"], situations: ["student", "side-gig"] },
  "student-jobs-fall": { experienceLevel: ["beginner"], industries: ["general"], situations: ["student"] },
  "event-staffing-guide": { experienceLevel: ["beginner"], industries: ["hospitality"], situations: ["side-gig", "student"] },
  "tax-season-jobs": { experienceLevel: ["beginner", "intermediate"], industries: ["general"], situations: ["side-gig"] },
  
  // Employment Eligibility
  "i9-complete-guide": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "immigrant"] },
  "i9-documents-list": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "immigrant"] },
  "first-job-america-guide": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "immigrant"] },
  "work-authorization-types": { experienceLevel: ["beginner"], industries: ["general"], situations: ["immigrant"] },
  "work-without-ssn": { experienceLevel: ["beginner"], industries: ["general"], situations: ["immigrant"] },
  "e-verify-explained": { experienceLevel: ["beginner"], industries: ["general"], situations: ["first-job", "immigrant"] },
};

const GuidesPage = () => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    experienceLevel: [],
    industries: [],
    situations: [],
  });

  // Filter guides based on active filters
  const filteredCategories = useMemo(() => {
    const hasActiveFilters = 
      activeFilters.experienceLevel.length > 0 ||
      activeFilters.industries.length > 0 ||
      activeFilters.situations.length > 0;

    if (!hasActiveFilters) {
      return guideCategories;
    }

    return guideCategories.map(category => {
      const filteredArticles = category.articles.filter(article => {
        const tags = guideTagMapping[article.slug];
        if (!tags) return true; // Show articles without tag mapping
        
        // Check if article matches ALL selected filter categories (AND logic between categories)
        // but ANY within each category (OR logic within category)
        const matchesExperience = activeFilters.experienceLevel.length === 0 ||
          activeFilters.experienceLevel.some(level => tags.experienceLevel.includes(level));
        
        const matchesIndustry = activeFilters.industries.length === 0 ||
          activeFilters.industries.some(ind => tags.industries.includes(ind));
        
        const matchesSituation = activeFilters.situations.length === 0 ||
          activeFilters.situations.some(sit => tags.situations.includes(sit));

        return matchesExperience && matchesIndustry && matchesSituation;
      });

      return { ...category, articles: filteredArticles };
    }).filter(category => category.articles.length > 0);
  }, [activeFilters]);

  const totalFilteredArticles = filteredCategories.reduce(
    (acc, cat) => acc + cat.articles.length, 0
  );

  const totalArticles = guideCategories.reduce(
    (acc, cat) => acc + cat.articles.length, 0
  );

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

        {/* Filter + Content Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Filter Component */}
              <ContentFilter
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                className="mb-8"
              />

              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {totalFilteredArticles === totalArticles ? (
                    <span>Showing all {totalArticles} guides</span>
                  ) : (
                    <span>
                      Showing <strong>{totalFilteredArticles}</strong> of {totalArticles} guides
                    </span>
                  )}
                </p>
              </div>

              {/* No Results */}
              {filteredCategories.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No guides match your filters</h3>
                  <p className="text-muted-foreground mb-4">
                    Try removing some filters or browse all guides.
                  </p>
                  <button
                    onClick={() => setActiveFilters({ experienceLevel: [], industries: [], situations: [] })}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Guides Grid */}
              <div className="space-y-12">
                {filteredCategories.map((category) => (
                  <div key={category.category} id={category.slug}>
                    <div className="flex items-center gap-3 mb-6">
                      <category.icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                      <Badge variant="secondary" className="ml-2">
                        {category.articles.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.articles.map((article) => {
                        const tags = guideTagMapping[article.slug];
                        return (
                          <Card key={article.slug} className="group hover:border-primary/30 transition-colors">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                <Link to={`/career-hub/guides/${article.slug}`} className="flex items-center justify-between">
                                  {article.title}
                                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </Link>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                                {tags && (
                                  <>
                                    {tags.industries.filter(i => i !== 'general').slice(0, 1).map(ind => (
                                      <Badge key={ind} variant="outline" className="text-xs">
                                        {tagLabels.industries[ind]}
                                      </Badge>
                                    ))}
                                    {tags.experienceLevel.slice(0, 1).map(level => (
                                      <Badge key={level} variant="outline" className="text-xs">
                                        {tagLabels.experienceLevel[level]}
                                      </Badge>
                                    ))}
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
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
