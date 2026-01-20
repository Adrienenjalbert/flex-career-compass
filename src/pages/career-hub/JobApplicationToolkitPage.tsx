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
  FileUser,
  GraduationCap,
  Scale,
  MessageSquare,
  Search,
  TrendingUp,
  CheckCircle
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

// New: Students & Freshers articles
const fresherArticles = [
  {
    slug: "fresher-resume-guide",
    title: "Resume for Freshers 2026: Complete Guide",
    description: "Step-by-step guide to creating your first resume with no work experience. Focus on education, skills, and potential.",
    icon: GraduationCap,
    readTime: "15 min",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
    badge: "Most Popular",
    searchVolume: "30K+/mo"
  },
  {
    slug: "student-resume-template",
    title: "Student Resume Template: Balance Work & School",
    description: "Templates and strategies for students seeking part-time or flexible work while studying.",
    icon: Users,
    readTime: "12 min",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
    badge: "For Students",
    searchVolume: "18K+/mo"
  },
  {
    slug: "zero-experience-jobs",
    title: "How to Get Hired With Zero Experience",
    description: "Proven strategies for landing your first job when you have no work history.",
    icon: Sparkles,
    readTime: "10 min",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-600",
    badge: "Entry Level",
    searchVolume: "25K+/mo"
  },
  {
    slug: "transferable-skills-guide",
    title: "Transferable Skills for Your First Resume",
    description: "Map skills from school, volunteer work, and life experience to job requirements.",
    icon: TrendingUp,
    readTime: "12 min",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
    badge: null,
    searchVolume: "12K+/mo"
  }
];

// New: Compare Your Options articles
const comparisonArticles = [
  {
    slug: "best-resume-builders-2026",
    title: "Best Free Resume Builders 2026: Complete Comparison",
    description: "Side-by-side comparison of top resume builders with ATS compatibility scores and pricing.",
    icon: LayoutTemplate,
    readTime: "18 min",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    badge: "Comparison",
    searchVolume: "45K+/mo"
  },
  {
    slug: "best-job-boards-2026",
    title: "Best Job Boards by Industry: Where to Find Work",
    description: "Find the best job sites for warehouse, hospitality, retail, and temp work in 2026.",
    icon: Search,
    readTime: "15 min",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-600",
    badge: "Comparison",
    searchVolume: "35K+/mo"
  },
  {
    slug: "indeed-flex-vs-staffing-agencies",
    title: "Indeed Flex vs Staffing Agencies: Which Is Right?",
    description: "Honest comparison of app-based flexible work vs traditional temp agencies.",
    icon: Scale,
    readTime: "12 min",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-600",
    badge: "vs Guide",
    searchVolume: "8K+/mo"
  }
];

// New: Interview Prep articles
const interviewArticles = [
  {
    slug: "warehouse-interview-questions",
    title: "Warehouse Interview Questions & Answers 2026",
    description: "Top 20 warehouse interview questions with STAR method answers and safety scenarios.",
    icon: Warehouse,
    readTime: "18 min",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
    badge: "Interview Prep",
    searchVolume: "22K+/mo"
  },
  {
    slug: "hospitality-interview-questions",
    title: "Hospitality Interview Questions & Answers 2026",
    description: "Questions for servers, bartenders, and event staff with customer scenario responses.",
    icon: UtensilsCrossed,
    readTime: "18 min",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
    badge: "Interview Prep",
    searchVolume: "18K+/mo"
  },
  {
    slug: "ats-resume-tips",
    title: "ATS Resume Tips: Beat the Bots in 2026",
    description: "How ATS systems work and formatting tips to ensure your resume gets seen by humans.",
    icon: FileText,
    readTime: "12 min",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
    badge: "Essential",
    searchVolume: "28K+/mo"
  },
  {
    slug: "temp-to-permanent-guide",
    title: "How to Turn a Temp Job Into Permanent Employment",
    description: "10 strategies to convert seasonal or temp work into a full-time position.",
    icon: TrendingUp,
    readTime: "10 min",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-600",
    badge: "Career Growth",
    searchVolume: "15K+/mo"
  }
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
  { value: "11", label: "In-Depth Guides", icon: FileText },
  { value: "6", label: "Resume Templates", icon: LayoutTemplate },
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
      "name": "How do I write a resume with no experience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on education, skills, projects, and volunteer work. Use a functional resume format that highlights what you CAN do rather than where you've worked. Include coursework, extracurricular activities, and any certifications."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best resume format for freshers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The functional format (skills-based) or combination format works best for freshers. These emphasize transferable skills over chronological work history."
      }
    },
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
      "name": "What are the best free resume builders in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top free resume builders include Canva, Resume.io, Zety, and Indeed's Resume Builder. Consider ATS compatibility, template variety, and export options when choosing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pass ATS resume screening?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use standard section headings, include job posting keywords in your skills section, avoid graphics and fancy formatting, save as PDF, and use standard fonts like Arial or Calibri."
      }
    },
    {
      "@type": "Question",
      "name": "What questions are asked in warehouse interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common warehouse interview questions include: 'Can you lift 50 pounds repeatedly?', 'What's your experience with inventory systems?', 'How do you handle working in extreme temperatures?', and safety-related scenario questions."
      }
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Job Application Toolkit - Resume & Cover Letter Guides",
  "description": "Complete toolkit for job seekers: resume guides for freshers and students, cover letter templates, interview prep, and comparison guides for 2026.",
  "url": "https://flex-career-compass.lovable.app/career-hub/job-application-toolkit",
  "hasPart": [
    ...fresherArticles.map(article => ({
      "@type": "Article",
      "name": article.title,
      "url": `https://flex-career-compass.lovable.app/career-hub/guides/${article.slug}`
    })),
    ...comparisonArticles.map(article => ({
      "@type": "Article",
      "name": article.title,
      "url": `https://flex-career-compass.lovable.app/career-hub/guides/${article.slug}`
    })),
    ...interviewArticles.map(article => ({
      "@type": "Article",
      "name": article.title,
      "url": `https://flex-career-compass.lovable.app/career-hub/guides/${article.slug}`
    })),
    ...Object.values(resumeTemplates).map(t => ({
      "@type": "HowTo",
      "name": t.name,
      "url": `https://flex-career-compass.lovable.app/career-hub/templates/${t.slug}`
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
        title="Job Application Toolkit: Resume & Interview Guides 2026 | Indeed Flex Career Hub"
        description="Complete toolkit for job seekers: resume templates for freshers & students, interview prep for warehouse & hospitality, ATS tips, and job board comparisons for 2026."
        canonical="https://flex-career-compass.lovable.app/career-hub/job-application-toolkit"
        keywords={["resume for freshers", "student resume template", "warehouse interview questions", "best resume builders 2026", "ATS resume tips", "how to get a job with no experience", "indeed flex vs temp agency"]}
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
              Resume, Interview & Application Resources
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Job Application Toolkit
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Everything you need to land your next job: resume templates, interview prep, comparison guides, and tools tailored for students, freshers, and flexible workers.
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

      {/* NEW: For Students & Freshers Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    For Students & Freshers
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    First job? No experience? Start here.
                  </p>
                </div>
              </div>
              <Badge className="w-fit bg-blue-500/10 text-blue-600 border-blue-500/20">
                <Star className="w-3 h-3 mr-1" />
                Most Searched
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {fresherArticles.map((article) => (
                <Link 
                  key={article.slug}
                  to={`/career-hub/guides/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl ${article.iconBg} flex items-center justify-center`}>
                          <article.icon className={`w-5 h-5 ${article.iconColor}`} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {article.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {article.badge}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{article.searchVolume}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Compare Your Options Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Compare Your Options
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Make informed decisions with side-by-side comparisons
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {comparisonArticles.map((article) => (
                <Link 
                  key={article.slug}
                  to={`/career-hub/guides/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl ${article.iconBg} flex items-center justify-center`}>
                          <article.icon className={`w-5 h-5 ${article.iconColor}`} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-600">
                            {article.badge}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.searchVolume}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          Compare <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Interview Prep Section */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Interview Prep & ATS Tips
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Ace your interview and beat the resume bots
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {interviewArticles.map((article) => (
                <Link 
                  key={article.slug}
                  to={`/career-hub/guides/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full border-2 border-transparent hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl ${article.iconBg} flex items-center justify-center`}>
                          <article.icon className={`w-5 h-5 ${article.iconColor}`} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                            {article.badge}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.searchVolume}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          Prepare <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Template Comparison */}
      <section className="py-8 md:py-10 bg-background border-y border-border">
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
      <section className="py-8 md:py-12 bg-muted/30">
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Related Resources
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link 
                to="/career-hub/tools/skills-analyzer"
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">Skills Analyzer</span>
                </div>
                <p className="text-xs text-muted-foreground">Discover your strengths</p>
              </Link>
              <Link 
                to="/career-hub/tools/pay-calculator"
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">Pay Calculator</span>
                </div>
                <p className="text-xs text-muted-foreground">Estimate your earnings</p>
              </Link>
              <Link 
                to="/career-hub/locations"
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">Active Markets</span>
                </div>
                <p className="text-xs text-muted-foreground">Find jobs near you</p>
              </Link>
              <Link 
                to="/career-hub/guides"
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">All Guides</span>
                </div>
                <p className="text-xs text-muted-foreground">Career development tips</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkHub currentPage={{ type: "guide", slug: "job-application-toolkit" }} />

      <CTASection />
    </Layout>
  );
};

export default JobApplicationToolkitPage;
