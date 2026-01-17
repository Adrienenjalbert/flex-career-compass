import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Warehouse, 
  UtensilsCrossed, 
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Briefcase,
  UserCheck,
  PenLine
} from "lucide-react";

// Article data for the hub
const resumeArticles = [
  {
    slug: "temp-work-resume-guide",
    title: "How to Write a Resume for Temp Work",
    description: "Complete guide to creating a temp work resume that gets you hired. Learn what hiring managers look for and essential sections to include.",
    icon: FileText,
    readTime: "12 min",
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary/20",
    featured: true,
    topics: ["Resume format", "Skills summary", "Availability section", "Temp-specific tips"]
  },
  {
    slug: "warehouse-resume-guide",
    title: "Resume for Warehouse Jobs: 2026 Guide",
    description: "Master the warehouse resume. Learn what Amazon, FedEx, and UPS look for, essential ATS keywords, and templates that get interviews.",
    icon: Warehouse,
    readTime: "15 min",
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/20",
    featured: true,
    topics: ["ATS optimization", "Equipment certifications", "Productivity metrics", "Sample bullets"]
  },
  {
    slug: "hospitality-resume-tips",
    title: "Hospitality Resume Tips: Get Hired Faster",
    description: "Create a hospitality resume that stands out. Cover letters, key skills, and examples for servers, bartenders, and event staff.",
    icon: UtensilsCrossed,
    readTime: "12 min",
    color: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/20",
    featured: false,
    topics: ["Service skills", "POS systems", "Certifications", "Guest experience"]
  },
  {
    slug: "first-job-resume-template",
    title: "First Job Resume: No Experience Template",
    description: "Landing your first job without experience? Use our template and strategies to highlight transferable skills and potential.",
    icon: Sparkles,
    readTime: "10 min",
    color: "bg-green-500/10 text-green-600",
    iconBg: "bg-green-500/20",
    featured: false,
    topics: ["No experience tips", "Transferable skills", "Education section", "Volunteer work"]
  },
  {
    slug: "indeed-flex-profile-guide",
    title: "Indeed Flex Profile Optimization Guide",
    description: "Optimize your Indeed Flex profile to get more shift offers. Learn what hiring managers see and how to rank higher.",
    icon: UserCheck,
    readTime: "8 min",
    color: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/20",
    featured: true,
    topics: ["Profile photo", "Skills selection", "Bio writing", "5-star ratings"]
  },
  {
    slug: "temp-job-cover-letter",
    title: "Cover Letter for Temp Jobs: Templates",
    description: "Write effective cover letters for temporary positions. Includes templates for warehouse, hospitality, and general temp roles.",
    icon: PenLine,
    readTime: "10 min",
    color: "bg-rose-500/10 text-rose-600",
    iconBg: "bg-rose-500/20",
    featured: false,
    topics: ["Cover letter structure", "Templates", "Temp-specific language", "When to skip"]
  }
];

const quickStats = [
  { value: "6", label: "In-Depth Guides", icon: BookOpen },
  { value: "30+", label: "Resume Tips", icon: CheckCircle2 },
  { value: "12+", label: "Templates", icon: FileText },
  { value: "2026", label: "Updated Content", icon: Star }
];

// SEO Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a resume for Indeed Flex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Indeed Flex uses your in-app profile instead of a traditional resume. However, having a well-organized resume helps you build a stronger profile with the right skills and experience listed."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a temp work resume be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One page maximum. Hiring managers for temp positions make decisions in under 30 seconds, so your resume must communicate value instantly."
      }
    },
    {
      "@type": "Question",
      "name": "What skills should I put on a warehouse resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Include equipment certifications (forklift, pallet jack, RF scanner), WMS experience, productivity metrics, safety training, and physical capabilities like lifting requirements."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a resume with no experience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on transferable skills from school, volunteer work, or personal projects. Highlight reliability, willingness to learn, physical capabilities, and any relevant coursework or certifications."
      }
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Job Application Toolkit - Resume & Cover Letter Guides",
  "description": "Complete toolkit for temp workers: resume guides, cover letter templates, and Indeed Flex profile optimization tips for 2026.",
  "url": "https://flex-career-compass.lovable.app/career-hub/job-application-toolkit",
  "hasPart": resumeArticles.map(article => ({
    "@type": "Article",
    "name": article.title,
    "url": `https://flex-career-compass.lovable.app/career-hub/guides/${article.slug}`
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Career Hub", "item": "https://flex-career-compass.lovable.app/career-hub" },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://flex-career-compass.lovable.app/career-hub/guides" },
    { "@type": "ListItem", "position": 3, "name": "Job Application Toolkit", "item": "https://flex-career-compass.lovable.app/career-hub/job-application-toolkit" }
  ]
};

const JobApplicationToolkitPage = () => {
  const featuredArticles = resumeArticles.filter(a => a.featured);
  const otherArticles = resumeArticles.filter(a => !a.featured);

  return (
    <Layout>
      <SEOMetaTags
        title="Job Application Toolkit: Resume & Cover Letter Guides | Indeed Flex Career Hub"
        description="Complete toolkit for temp workers: resume guides for warehouse and hospitality jobs, cover letter templates, and Indeed Flex profile optimization tips for 2026."
        canonical="https://flex-career-compass.lovable.app/career-hub/job-application-toolkit"
        keywords={["resume for temp work", "warehouse resume", "hospitality resume", "cover letter template", "indeed flex profile", "job application tips", "no experience resume"]}
      />

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 [&_nav]:text-primary-foreground/80 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground">
            <Breadcrumbs 
              items={[
                { label: "Guides", href: "/career-hub/guides" },
                { label: "Job Application Toolkit" }
              ]}
            />
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Resume & Application Resources
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Job Application Toolkit
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Everything you need to land temp jobs in 2026: resume guides, cover letter templates, and profile optimization tips tailored for flexible workers.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-foreground/80" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Featured Guides
            </h2>
            <p className="text-muted-foreground mb-8">
              Start with these essential resources for your job search
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredArticles.map((article) => (
                <Link 
                  key={article.slug}
                  to={`/career-hub/guides/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-xl ${article.iconBg} flex items-center justify-center mb-3`}>
                        <article.icon className={`w-6 h-6 ${article.color.split(' ')[1]}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} read</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {article.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Read guide <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              All Resume & Application Guides
            </h2>
            <p className="text-muted-foreground mb-8">
              Comprehensive resources for every stage of your job application
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {resumeArticles.map((article) => (
                <Link 
                  key={article.slug}
                  to={`/career-hub/guides/${article.slug}`}
                  className="group flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg ${article.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <article.icon className={`w-5 h-5 ${article.color.split(' ')[1]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      {article.featured && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Resources</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link 
                to="/career-hub/guides/i9-complete-guide"
                className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                  Form I-9 Complete Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Everything you need for employment verification
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Read guide <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              
              <Link 
                to="/career-hub/guides/first-job-america-guide"
                className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                  First Job in America Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Complete guide for new US workers
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Read guide <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              
              <Link 
                to="/career-hub/tools/skills-analyzer"
                className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                  Skills Gap Analyzer
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Find skills to add to your resume
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Link Hub */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <InternalLinkHub variant="footer" currentPage={{ type: 'guide' }} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
};

export default JobApplicationToolkitPage;
