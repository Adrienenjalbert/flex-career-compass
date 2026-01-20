import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { TemplateComparison } from "@/components/career-hub/TemplateComparison";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resumeTemplates } from "@/data/resume-templates";
import { coverLetterTemplates } from "@/data/cover-letter-templates";
import { resumeRoles } from "@/data/resume-content";
import { 
  FileText, 
  Warehouse, 
  UtensilsCrossed, 
  ArrowRight,
  Clock,
  Star,
  Sparkles,
  Briefcase,
  UserCheck,
  PenLine,
  LayoutTemplate,
  Mail,
  Zap,
  Building,
  ShoppingBag,
  Lightbulb,
  Filter,
  X,
  Users,
  FileUser
} from "lucide-react";

// Industries for filtering
const industries = [
  { id: 'all', label: 'All Industries', icon: Briefcase },
  { id: 'industrial', label: 'Industrial', icon: Warehouse },
  { id: 'hospitality', label: 'Hospitality', icon: UtensilsCrossed },
  { id: 'retail', label: 'Retail', icon: ShoppingBag },
  { id: 'facilities', label: 'Facilities', icon: Building },
];

// Experience levels for filtering
const experienceLevels = [
  { id: 'all', label: 'All Levels' },
  { id: 'entry', label: 'Entry Level (0-1 years)' },
  { id: 'mid', label: 'Some Experience (1-3 years)' },
  { id: 'experienced', label: 'Experienced (3+ years)' },
];

// Guide articles with enhanced metadata
const resumeArticles = [
  {
    slug: "temp-work-resume-guide",
    title: "How to Write a Resume for Temp Work",
    description: "Complete guide to creating a temp work resume that gets you hired. Learn what hiring managers look for and essential sections to include.",
    icon: FileText,
    readTime: "12 min",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    featured: true,
    topics: ["Resume format", "Skills summary", "Availability section", "Temp-specific tips"],
    industries: ['industrial', 'hospitality', 'retail', 'facilities'],
    experienceLevel: 'entry',
    type: 'guide'
  },
  {
    slug: "warehouse-resume-guide",
    title: "Resume for Warehouse Jobs: 2026 Guide",
    description: "Master the warehouse resume. Learn what Amazon, FedEx, and UPS look for, essential ATS keywords, and templates that get interviews.",
    icon: Warehouse,
    readTime: "15 min",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
    featured: true,
    topics: ["ATS optimization", "Equipment certifications", "Productivity metrics", "Sample bullets"],
    industries: ['industrial'],
    experienceLevel: 'all',
    type: 'guide'
  },
  {
    slug: "hospitality-resume-tips",
    title: "Hospitality Resume Tips: Get Hired Faster",
    description: "Create a hospitality resume that stands out. Cover letters, key skills, and examples for servers, bartenders, and event staff.",
    icon: UtensilsCrossed,
    readTime: "12 min",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
    featured: false,
    topics: ["Service skills", "POS systems", "Certifications", "Guest experience"],
    industries: ['hospitality'],
    experienceLevel: 'all',
    type: 'guide'
  },
  {
    slug: "first-job-resume-template",
    title: "First Job Resume: No Experience Template",
    description: "Landing your first job without experience? Use our template and strategies to highlight transferable skills and potential.",
    icon: Sparkles,
    readTime: "10 min",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-600",
    featured: false,
    topics: ["No experience tips", "Transferable skills", "Education section", "Volunteer work"],
    industries: ['industrial', 'hospitality', 'retail', 'facilities'],
    experienceLevel: 'entry',
    type: 'guide'
  },
  {
    slug: "indeed-flex-profile-guide",
    title: "Indeed Flex Profile Optimization Guide",
    description: "Optimize your Indeed Flex profile to get more shift offers. Learn what hiring managers see and how to rank higher.",
    icon: UserCheck,
    readTime: "8 min",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
    featured: true,
    topics: ["Profile photo", "Skills selection", "Bio writing", "5-star ratings"],
    industries: ['industrial', 'hospitality', 'retail', 'facilities'],
    experienceLevel: 'all',
    type: 'guide'
  },
  {
    slug: "temp-job-cover-letter",
    title: "Cover Letter for Temp Jobs: Templates",
    description: "Write effective cover letters for temporary positions. Includes templates for warehouse, hospitality, and general temp roles.",
    icon: PenLine,
    readTime: "10 min",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-600",
    featured: false,
    topics: ["Cover letter structure", "Templates", "Temp-specific language", "When to skip"],
    industries: ['industrial', 'hospitality', 'retail', 'facilities'],
    experienceLevel: 'all',
    type: 'guide'
  }
];

// Quick action cards
const quickActions = [
  {
    title: "Resume Examples",
    description: "23 role-specific resumes with ATS keywords",
    href: "/career-hub/resume-examples",
    icon: FileUser,
    color: "bg-purple-500/10 text-purple-600",
    count: resumeRoles.length
  },
  {
    title: "Resume Templates",
    description: "6 interactive templates with fill-in-the-blank builders",
    href: "/career-hub/templates",
    icon: LayoutTemplate,
    color: "bg-primary/10 text-primary",
    count: Object.keys(resumeTemplates).length
  },
  {
    title: "Cover Letter Templates",
    description: "Industry-specific templates with live preview",
    href: "/career-hub/cover-letters",
    icon: Mail,
    color: "bg-rose-500/10 text-rose-600",
    count: Object.keys(coverLetterTemplates).length
  },
  {
    title: "Action Verbs Library",
    description: "200+ power words organized by category",
    href: "/career-hub/resources/action-verbs",
    icon: Zap,
    color: "bg-amber-500/10 text-amber-600",
    count: "200+"
  }
];

// Industry icons map
const industryIcons: Record<string, typeof Warehouse> = {
  industrial: Warehouse,
  hospitality: UtensilsCrossed,
  retail: ShoppingBag,
  facilities: Building
};

// Group resume roles by industry
const rolesByIndustry = resumeRoles.reduce((acc, role) => {
  if (!acc[role.industry]) {
    acc[role.industry] = [];
  }
  acc[role.industry].push(role);
  return acc;
}, {} as Record<string, typeof resumeRoles>);

const quickStats = [
  { value: "23", label: "Role Examples", icon: FileUser },
  { value: "6", label: "Resume Templates", icon: LayoutTemplate },
  { value: "6", label: "Cover Letters", icon: Mail },
  { value: "200+", label: "Action Verbs", icon: Zap }
];

// Template cards with industry fit
const templateCards = [
  ...Object.values(resumeTemplates).map(t => ({
    ...t,
    type: 'resume' as const,
    href: `/career-hub/templates/${t.slug}`
  })),
];

const coverLetterCards = [
  ...Object.values(coverLetterTemplates).map(t => ({
    ...t,
    type: 'cover-letter' as const,
    href: `/career-hub/cover-letters/${t.slug}`
  })),
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
  "hasPart": [
    ...resumeArticles.map(article => ({
      "@type": "Article",
      "name": article.title,
      "url": `https://flex-career-compass.lovable.app/career-hub/guides/${article.slug}`
    })),
    ...Object.values(resumeTemplates).map(t => ({
      "@type": "HowTo",
      "name": t.name,
      "url": `https://flex-career-compass.lovable.app/career-hub/templates/${t.slug}`
    })),
    ...Object.values(coverLetterTemplates).map(t => ({
      "@type": "HowTo",
      "name": t.name,
      "url": `https://flex-career-compass.lovable.app/career-hub/cover-letters/${t.slug}`
    }))
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Career Hub", "item": "https://flex-career-compass.lovable.app/career-hub" },
    { "@type": "ListItem", "position": 2, "name": "Job Application Toolkit", "item": "https://flex-career-compass.lovable.app/career-hub/job-application-toolkit" }
  ]
};

const JobApplicationToolkitPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  // Filter articles based on selection
  const filteredArticles = useMemo(() => {
    return resumeArticles.filter(article => {
      const industryMatch = selectedIndustry === 'all' || article.industries.includes(selectedIndustry);
      const experienceMatch = selectedExperience === 'all' || 
        article.experienceLevel === 'all' || 
        article.experienceLevel === selectedExperience;
      return industryMatch && experienceMatch;
    });
  }, [selectedIndustry, selectedExperience]);

  // Filter templates based on industry
  const filteredResumeTemplates = useMemo(() => {
    if (selectedIndustry === 'all') return templateCards;
    return templateCards.filter(t => {
      const fitScore = t.industryFit[selectedIndustry as keyof typeof t.industryFit];
      return fitScore >= 70;
    }).sort((a, b) => {
      const aFit = a.industryFit[selectedIndustry as keyof typeof a.industryFit];
      const bFit = b.industryFit[selectedIndustry as keyof typeof b.industryFit];
      return bFit - aFit;
    });
  }, [selectedIndustry]);

  const filteredCoverLetterTemplates = useMemo(() => {
    if (selectedIndustry === 'all') return coverLetterCards;
    return coverLetterCards.filter(t => {
      const fitScore = t.industryFit[selectedIndustry as keyof typeof t.industryFit];
      return fitScore >= 70;
    }).sort((a, b) => {
      const aFit = a.industryFit[selectedIndustry as keyof typeof a.industryFit];
      const bFit = b.industryFit[selectedIndustry as keyof typeof b.industryFit];
      return bFit - aFit;
    });
  }, [selectedIndustry]);

  const hasActiveFilters = selectedIndustry !== 'all' || selectedExperience !== 'all';

  const clearFilters = () => {
    setSelectedIndustry('all');
    setSelectedExperience('all');
  };

  const getIndustryIcon = (industryId: string) => {
    const industry = industries.find(i => i.id === industryId);
    return industry?.icon || Briefcase;
  };

  const getFitBadge = (fitScore: number) => {
    if (fitScore >= 90) return { label: 'Excellent Fit', variant: 'default' as const };
    if (fitScore >= 80) return { label: 'Good Fit', variant: 'secondary' as const };
    return { label: 'Suitable', variant: 'outline' as const };
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Job Application Toolkit: Resume & Cover Letter Guides | Indeed Flex Career Hub"
        description="Complete toolkit for temp workers: resume guides for warehouse and hospitality jobs, cover letter templates, action verbs library, and Indeed Flex profile optimization tips for 2026."
        canonical="https://flex-career-compass.lovable.app/career-hub/job-application-toolkit"
        keywords={["resume for temp work", "warehouse resume", "hospitality resume", "cover letter template", "indeed flex profile", "job application tips", "no experience resume", "action verbs resume"]}
      />

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 [&_nav]:text-primary-foreground/80 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground">
            <Breadcrumbs 
              items={[
                { label: "Job Application Toolkit" }
              ]}
            />
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Resume & Application Resources
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Job Application Toolkit
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Everything you need to land temp jobs: interactive templates, guides, and tools tailored for flexible workers.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {quickStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-foreground/80" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-8 md:py-10 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {quickActions.map((action) => (
                <Link 
                  key={action.href}
                  to={action.href}
                  className="group"
                >
                  <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-xl ${action.color.split(' ')[0]} flex items-center justify-center mb-3`}>
                        <action.icon className={`w-5 h-5 ${action.color.split(' ')[1]}`} />
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {action.count}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Template Comparison */}
      <section className="py-8 md:py-10 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <TemplateComparison />
          </div>
        </div>
      </section>

      {/* Role-Specific Resume Examples */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileUser className="w-5 h-5 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Resume Examples by Job Title
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {resumeRoles.length} role-specific templates with ATS keywords, BLS data & STAR bullets
                </p>
              </div>
              <Link to="/career-hub/resume-examples">
                <Button variant="outline" size="sm" className="h-8">
                  View All Examples <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(rolesByIndustry).map(([industry, roles]) => {
                const Icon = industryIcons[industry] || Briefcase;
                const displayRoles = selectedIndustry === 'all' || selectedIndustry === industry ? roles : [];
                
                if (selectedIndustry !== 'all' && selectedIndustry !== industry) return null;
                
                return (
                  <div key={industry} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        industry === 'hospitality' ? 'bg-purple-500/10' :
                        industry === 'industrial' ? 'bg-amber-500/10' :
                        industry === 'retail' ? 'bg-blue-500/10' :
                        'bg-green-500/10'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          industry === 'hospitality' ? 'text-purple-600' :
                          industry === 'industrial' ? 'text-amber-600' :
                          industry === 'retail' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground capitalize text-sm">
                          {industry}
                        </h3>
                        <p className="text-xs text-muted-foreground">{roles.length} roles</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {displayRoles.map((role) => (
                        <Link
                          key={role.slug}
                          to={`/career-hub/resume-examples/${role.slug}`}
                          className="group flex items-center gap-2 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1 truncate">
                            {role.title}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section with Tabs */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Compact Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-border">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <Button
                    key={industry.id}
                    variant={selectedIndustry === industry.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIndustry(industry.id)}
                    className="h-7 text-xs px-2.5"
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {industry.label.replace(' Industries', '')}
                  </Button>
                );
              })}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 text-xs ml-auto"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <Tabs defaultValue="resume" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    Interactive Templates
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Fill-in-the-blank builders with live preview
                  </p>
                </div>
                <TabsList className="grid w-full md:w-auto grid-cols-2">
                  <TabsTrigger value="resume" className="gap-2 text-sm">
                    <LayoutTemplate className="w-4 h-4" />
                    Resume
                  </TabsTrigger>
                  <TabsTrigger value="cover-letter" className="gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    Cover Letter
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="resume" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResumeTemplates.map((template) => {
                    const fitScore = selectedIndustry !== 'all' 
                      ? template.industryFit[selectedIndustry as keyof typeof template.industryFit]
                      : null;
                    const fitBadge = fitScore ? getFitBadge(fitScore) : null;
                    
                    return (
                      <Link key={template.slug} to={template.href} className="group">
                        <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <span className="text-3xl">{template.icon}</span>
                              {fitBadge && (
                                <Badge variant={fitBadge.variant} className="text-xs">
                                  {fitBadge.label}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {template.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {/* Industry Fit Bars */}
                            {selectedIndustry === 'all' && (
                              <div className="space-y-2 mb-4">
                                {Object.entries(template.industryFit).slice(0, 2).map(([ind, score]) => {
                                  const Icon = getIndustryIcon(ind);
                                  return (
                                    <div key={ind} className="flex items-center gap-2 text-xs">
                                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                      <span className="capitalize w-16 text-muted-foreground">{ind}</span>
                                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-primary rounded-full"
                                          style={{ width: `${score}%` }}
                                        />
                                      </div>
                                      <span className="text-muted-foreground w-8">{score}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {template.bestFor.slice(0, 2).map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs font-normal">
                                  {item.length > 30 ? item.slice(0, 30) + '...' : item}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                              Build Resume <ArrowRight className="w-4 h-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="cover-letter" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCoverLetterTemplates.map((template) => {
                    const fitScore = selectedIndustry !== 'all' 
                      ? template.industryFit[selectedIndustry as keyof typeof template.industryFit]
                      : null;
                    const fitBadge = fitScore ? getFitBadge(fitScore) : null;
                    
                    return (
                      <Link key={template.slug} to={template.href} className="group">
                        <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <span className="text-3xl">{template.icon}</span>
                              {fitBadge && (
                                <Badge variant={fitBadge.variant} className="text-xs">
                                  {fitBadge.label}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {template.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {template.bestFor.slice(0, 2).map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs font-normal">
                                  {item.length > 30 ? item.slice(0, 30) + '...' : item}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                              Build Cover Letter <ArrowRight className="w-4 h-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  In-Depth Guides
                </h2>
                <p className="text-sm text-muted-foreground">
                  Comprehensive articles to level up your applications
                  {hasActiveFilters && (
                    <span className="ml-2 text-primary">
                      ({filteredArticles.length} matching)
                    </span>
                  )}
                </p>
              </div>
              <Link to="/career-hub/guides">
                <Button variant="outline" size="sm" className="h-8">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredArticles.map((article) => (
                  <Link 
                    key={article.slug}
                    to={`/career-hub/guides/${article.slug}`}
                    className="group flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl ${article.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <article.icon className={`w-6 h-6 ${article.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        {article.featured && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                        <div className="flex gap-1">
                          {article.industries.slice(0, 2).map((ind) => {
                            const Icon = getIndustryIcon(ind);
                            return <Icon key={ind} className="w-3.5 h-3.5 text-muted-foreground" />;
                          })}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">No guides match your current filters</p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg border border-border p-4"
                >
                  <h3 className="font-medium text-foreground mb-2 text-sm">
                    {faq.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-foreground mb-4">Related Resources</h2>
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

      {/* Internal Links */}
      <InternalLinkHub currentPage={{ type: 'guide', slug: 'job-application-toolkit' }} />

      {/* CTA */}
      <CTASection />
    </Layout>
  );
};

export default JobApplicationToolkitPage;
