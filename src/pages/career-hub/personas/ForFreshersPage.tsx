import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Star, 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Clock,
  Calendar
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";
import { getRecommendedTemplatesForSituation } from "@/data/resume-templates";
import { getRecommendedCoverLettersForSituation } from "@/data/cover-letter-templates";
import {
  WhyFlexSection,
  PopularRolesGrid,
  FresherMarketStats,
  FresherSuccessTips,
  JobApplicationNav,
  RelatedArticlesGrid
} from "@/components/career-hub/persona";

const ForFreshersPage = () => {
  const fresherContent = getContentForSituation('fresher');
  const recommendedResumeTemplates = getRecommendedTemplatesForSituation('fresher', 3);
  const recommendedCoverLetters = getRecommendedCoverLettersForSituation('fresher', 2);
  const baseUrl = "https://flex-career-compass.lovable.app";

  // Benefits for horizontal strip (no stats)
  const fresherBenefits = [
    { icon: Rocket, title: "No Experience Needed", description: "Zero work history required" },
    { icon: Star, title: "Build Reputation", description: "Earn ratings for better shifts" },
    { icon: TrendingUp, title: "Quick Growth", description: "Advance within months" },
    { icon: Users, title: "165K+ Community", description: "Learn from experienced Flexers" },
  ];

  // Popular entry-level roles
  const entryLevelRoles = [
    { slug: "picker-packer", title: "Picker Packer", pay: "$15-20/hr", description: "Most common first role—learn warehouse basics", tags: ["No Experience", "Physical"] },
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "General warehouse duties, no certification needed", tags: ["Entry Level"] },
    { slug: "event-staff", title: "Event Staff", pay: "$15-22/hr", description: "Fun, social work at concerts and sports events", tags: ["Weekends", "Social"], highlight: true },
    { slug: "dishwasher", title: "Dishwasher", pay: "$14-18/hr", description: "Entry into hospitality—pathway to kitchen roles", tags: ["Hospitality"] },
  ];

  // Guides and tools
  const fresherGuides = [
    { slug: 'fresher-resume-guide', title: 'Resume for Freshers: Complete 2026 Guide', description: 'Create a winning resume with no work history', readTime: '10 min' },
    { slug: 'zero-experience-jobs', title: 'How to Get Hired With Zero Experience', description: 'Proven strategies to land your first job', readTime: '8 min' },
    { slug: 'transferable-skills-guide', title: 'Transferable Skills Guide', description: 'Turn life experience into resume gold', readTime: '7 min' },
    { slug: 'first-flex-job', title: 'Your First Indeed Flex Job', description: 'What to expect and how to succeed', readTime: '6 min' },
  ];

  const fresherTools = [
    { path: "/career-hub/tools/skills-analyzer", title: "Skills Analyzer", description: "Discover your hidden strengths", icon: Star },
    { path: "/career-hub/resources/action-verbs", title: "Action Verbs", description: "Power words for your resume", icon: FileText },
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Estimate your earnings", icon: DollarSign },
  ];

  // Related articles from research
  const relatedArticles = [
    { type: 'guide' as const, slug: 'fresher-resume-guide', title: 'Resume for Freshers 2026', description: 'Build an impressive resume with no experience.', readTime: '10 min', highlight: true },
    { type: 'guide' as const, slug: 'zero-experience-jobs', title: 'Jobs With No Experience', description: 'Entry-level roles hiring now.', readTime: '8 min' },
    { type: 'guide' as const, slug: 'transferable-skills-guide', title: 'Transferable Skills Guide', description: 'Turn life experience into job qualifications.', readTime: '7 min' },
    { type: 'tool' as const, slug: 'skills-analyzer', title: 'Skills Analyzer Tool', description: 'Discover your hidden strengths.', readTime: '3 min' },
    { type: 'guide' as const, slug: 'interview-skills', title: 'Interview Skills', description: 'Ace your verification interview.', readTime: '8 min' },
    { type: 'guide' as const, slug: 'first-flex-job', title: 'Your First Flex Job', description: 'What to expect on day one.', readTime: '6 min' },
  ];

  const faqs = [
    {
      question: "Can I really get hired with no work experience?",
      answer: "Absolutely! Indeed Flex offers many entry-level roles like picker packer, event staff, cleaner, and dishwasher that require no prior experience. Your reliability, attitude, and willingness to learn matter more than your resume."
    },
    {
      question: "What should I put on my resume if I've never worked?",
      answer: "Focus on transferable skills from school, volunteering, extracurriculars, and personal projects. Skills like teamwork, time management, attention to detail, and physical stamina are highly valued in flexible work."
    },
    {
      question: "How do I stand out as a first-time worker?",
      answer: "Show up early, follow instructions carefully, ask questions when unsure, and maintain a positive attitude. Earning 5-star ratings quickly will get you access to better-paying shifts."
    },
    {
      question: "What's the easiest first job to get?",
      answer: "Picker Packer is the most common entry point—it requires no experience, has consistent demand, and teaches you warehouse fundamentals. Event Staff is great if you prefer social, varied work."
    },
    {
      question: "How long before I can move to higher-paying roles?",
      answer: "With consistent good performance, you can build the ratings and experience to access specialized roles within 2-3 months. Some Flexers progress to forklift certification or team lead positions within their first year."
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
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
      { "@type": "ListItem", "position": 1, "name": "Career Hub", "item": `${baseUrl}/career-hub` },
      { "@type": "ListItem", "position": 2, "name": "For Freshers", "item": `${baseUrl}/career-hub/for-freshers` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "First Job Resume & Tips | Jobs for Freshers 2026",
    "description": "Get your first job with no experience. Free resume templates, interview tips, and entry-level roles that don't require work history.",
    "author": { "@type": "Organization", "name": "Indeed Flex Career Hub" },
    "publisher": { "@type": "Organization", "name": "Indeed Flex Career Hub" },
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-21"
  };

  return (
    <Layout>
      <SEOHead
        title="First Job Resume & Tips | Jobs for Freshers With No Experience 2026"
        description="Get your first job with no experience. Free resume templates, interview tips, and entry-level roles paying $14-24/hr. Start your career today."
        canonical={`${baseUrl}/career-hub/for-freshers`}
        type="article"
        tags={["first job", "no experience jobs", "fresher resume", "entry level jobs", "how to get first job 2026"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              <Rocket className="w-4 h-4 mr-2" />
              First Job? Start Here
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Land Your <span className="text-primary">First Job</span> With Zero Experience
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everyone starts somewhere. Get resume templates, proven strategies, and entry-level roles paying $14-24/hr.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <DollarSign className="w-4 h-4 mr-1" />
                $14-24/hr entry roles
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Clock className="w-4 h-4 mr-1" />
                2-3 months to advance
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Star className="w-4 h-4 mr-1" />
                No experience required
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/career-hub/guides/fresher-resume-guide">
                  Build Your First Resume
                  <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Find Entry-Level Jobs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Horizontal strip */}
      <WhyFlexSection 
        personaName="First-Timers" 
        benefits={fresherBenefits}
        headline="Why First-Timers Choose Flex"
      />

      {/* Market Stats - Visual data cards */}
      <FresherMarketStats className="bg-muted/20" />

      {/* Popular Roles Section */}
      <PopularRolesGrid 
        roles={entryLevelRoles}
        title="Entry-Level Roles (No Experience Needed)"
        subtitle="Your attitude and reliability matter more than your resume"
      />

      {/* Success Tips */}
      <FresherSuccessTips className="bg-muted/30" />

      {/* Related Articles */}
      <RelatedArticlesGrid 
        items={relatedArticles}
        title="Explore More Resources"
        subtitle="Everything you need to launch your career"
      />

      {/* Job Application Navigation */}
      <JobApplicationNav 
        personaSlug="fresher" 
        personaName="First-Time Workers"
      />

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Common Questions About First Jobs</h2>
            <p className="text-muted-foreground">
              Everything first-time workers need to know
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-8">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Rocket className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Your First Job Is Waiting</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            165,000+ Flexers started exactly where you are now. Take the first step today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/career-hub/guides/fresher-resume-guide">
                Build Your Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                Download Indeed Flex
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForFreshersPage;
