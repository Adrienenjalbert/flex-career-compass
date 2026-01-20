import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { ContentFilter, defaultFilterConfigs, type ActiveFilters } from "@/components/career-hub/resume/ContentFilter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ArrowRight, 
  Users,
  TrendingUp,
  Star
} from "lucide-react";
import { resumeExamples, type ExperienceLevel } from "@/data/resume-content";
import { useState, useMemo } from "react";

const experienceLevelLabels: Record<ExperienceLevel, string> = {
  'entry-level': 'Entry Level',
  'experienced': 'Experienced',
  'career-change': 'Career Change',
  'no-experience': 'No Experience'
};

const industryColors: Record<string, string> = {
  'Industrial': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Hospitality': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Retail': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Facilities': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Business Support': 'bg-rose-500/10 text-rose-600 border-rose-500/20'
};

const ResumeExamplesIndexPage = () => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    industry: [],
    experienceLevel: [],
    userSituation: [],
    documentType: [],
    format: [],
    language: [],
    contentIntent: [],
    search: ''
  });
  const filteredExamples = useMemo(() => {
    return resumeExamples.filter(example => {
      // Search filter
      if (activeFilters.search) {
        const searchLower = activeFilters.search.toLowerCase();
        const matchesSearch = 
          example.roleTitle.toLowerCase().includes(searchLower) ||
          example.industry.toLowerCase().includes(searchLower) ||
          example.metaDescription.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      // Industry filter
      if (activeFilters.industry.length > 0) {
        const industryMatch = activeFilters.industry.some(
          ind => example.industry.toLowerCase() === ind.toLowerCase()
        );
        if (!industryMatch) return false;
      }
      
      // Experience level filter
      if (activeFilters.experienceLevel.length > 0) {
        const levelMatch = example.experienceLevels.some(
          level => activeFilters.experienceLevel.includes(level)
        );
        if (!levelMatch) return false;
      }
      
      return true;
    });
  }, [activeFilters]);

  const handleFilterChange = (newFilters: ActiveFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Resume Examples by Job Title | Indeed Flex Career Hub"
        description="Browse 22+ resume examples for warehouse, hospitality, retail, and facilities jobs. Copy-ready templates with ATS keywords for 2026."
        canonical="https://flex-career-compass.lovable.app/career-hub/resume-examples"
        keywords={["resume examples", "cv templates", "job resume", "warehouse resume", "hospitality resume"]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-4 [&_nav]:text-primary-foreground/80 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground">
            <Breadcrumbs 
              items={[
                { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
                { label: "Resume Examples" }
              ]}
            />
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <FileText className="w-3 h-3 mr-1" />
              {resumeExamples.length}+ Role-Specific Templates
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Resume Examples by Job Title
            </h1>
            
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl">
              Find your role, copy the template, and customize with your experience. 
              Each resume is optimized for ATS systems and includes industry-specific keywords.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{resumeExamples.length}+ Job Titles</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">ATS-Optimized</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
                <Star className="w-4 h-4" />
                <span className="text-sm">2026 Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ContentFilter
            filters={defaultFilterConfigs}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            totalResults={filteredExamples.length}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {filteredExamples.map((example) => (
              <Link 
                key={example.roleSlug}
                to={`/career-hub/resume-examples/${example.roleSlug}`}
                className="group"
              >
                <Card className="h-full border hover:border-primary/30 hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={industryColors[example.industry] || 'bg-muted'}>
                        {example.industry}
                      </Badge>
                      {example.blsData && (
                        <span className="text-sm font-semibold text-emerald-600">
                          {example.blsData.medianHourly}/hr
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {example.roleTitle} Resume
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {example.metaDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {example.experienceLevels.map(level => (
                        <Badge key={level} variant="outline" className="text-xs">
                          {experienceLevelLabels[level]}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      View template <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredExamples.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No resume examples match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ResumeExamplesIndexPage;
