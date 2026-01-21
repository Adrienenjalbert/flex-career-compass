import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Clock, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Calculator,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield
} from "lucide-react";
import { getPersonaGuides } from "@/data/persona-guides";
import { usePersonaResearchData } from "@/hooks/usePersonaResearch";
import { 
  WhyFlexSection,
  PopularRolesGrid,
  GuidesToolsSection,
  JobApplicationNav,
  DeepResearchSection
} from "@/components/career-hub/persona";

const ForStudentsPage = () => {
  const studentGuides = getPersonaGuides('student');
  const { data: researchData, isLoading, hasResearch } = usePersonaResearchData('student');
  const baseUrl = "https://flex-career-compass.lovable.app";

  // Benefits data with stats from research
  const studentBenefits = [
    { 
      icon: Clock, 
      title: "Flexible Hours", 
      stat: "100%",
      description: "Full control over your work schedule" 
    },
    { 
      icon: DollarSign, 
      title: "Same Day Pay", 
      stat: "50%",
      description: "Access earnings within 1 hour" 
    },
    { 
      icon: Calendar, 
      title: "No Minimums", 
      stat: "0",
      description: "No weekly hour requirements" 
    },
    { 
      icon: TrendingUp, 
      title: "Career Skills", 
      stat: "20+",
      description: "Role types to build experience" 
    },
  ];

  // Popular roles for students with pay data
  const popularRoles = [
    { 
      slug: "event-staff", 
      title: "Event Staff", 
      pay: "$15-22/hr", 
      description: "Concerts, festivals, and sports venues",
      tags: ["Weekends", "No Experience"],
      highlight: true
    },
    { 
      slug: "warehouse-operative", 
      title: "Warehouse Operative", 
      pay: "$16-24/hr", 
      description: "Picking, packing, and logistics",
      tags: ["Night Shifts", "Physical"]
    },
    { 
      slug: "banquet-server", 
      title: "Banquet Server", 
      pay: "$15-25/hr", 
      description: "Hotels and event venues with tips",
      tags: ["Tips", "Hospitality"]
    },
    { 
      slug: "retail-assistant", 
      title: "Retail Assistant", 
      pay: "$14-18/hr", 
      description: "Seasonal retail and customer service",
      tags: ["Part-Time", "Customer Service"]
    },
  ];

  // Tools relevant for students
  const studentTools = [
    { 
      path: "/career-hub/tools/shift-planner", 
      title: "Shift Planner", 
      description: "Plan work around your class schedule", 
      icon: Calendar 
    },
    { 
      path: "/career-hub/tools/pay-calculator", 
      title: "Pay Calculator", 
      description: "Estimate your weekly take-home pay", 
      icon: Calculator 
    },
    { 
      path: "/career-hub/tools/tax-calculator", 
      title: "Tax Calculator", 
      description: "Understand taxes for part-time income", 
      icon: DollarSign 
    },
  ];

  // Enhanced guides with read times
  const enhancedGuides = [
    { slug: 'zero-experience-jobs', title: 'Jobs With No Experience Required', description: 'Start earning with no prior work history', readTime: '5 min' },
    { slug: 'first-flex-job', title: 'Your First Flexible Job Guide', description: 'Step-by-step getting started', readTime: '8 min' },
    { slug: 'student-resume-template', title: 'Student Resume Template 2026', description: 'Balance academics and work experience', readTime: '6 min' },
    { slug: 'skill-boost', title: 'Skills That Boost Your Pay', description: 'High-demand skills employers look for', readTime: '4 min' },
  ];

  const faqs = [
    {
      question: "Can I work with Indeed Flex while in college?",
      answer: "Yes! Indeed Flex is ideal for students aged 18+. You can work part-time during the semester and take on more hours during breaks. There are no minimum hour requirements."
    },
    {
      question: "What hours are available for students?",
      answer: "Indeed Flex offers shifts across all hours—morning, afternoon, evening, and overnight. Many students prefer evening warehouse shifts (4pm-midnight) or weekend hospitality events."
    },
    {
      question: "Do I need work experience to start?",
      answer: "No! Many Indeed Flex roles like picker packer, event staff, and general labor require no prior experience. Your campus activities and volunteer work count as transferable skills."
    },
    {
      question: "How quickly can I get paid?",
      answer: "With Same Day Pay, you can access up to 50% of your earnings within 1 hour after completing a shift. The remainder is deposited on Friday."
    },
    {
      question: "How much can college students earn per hour?",
      answer: "Pay varies by role: tutoring pays $17-25/hr, food delivery averages $17.64/hr, fitness instruction $24-32/hr, and campus jobs $12-25/hr. Many students earn $400-800+ per week working part-time."
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
      { "@type": "ListItem", "position": 2, "name": "For Students", "item": `${baseUrl}/career-hub/for-students` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Student Jobs & Flexible Work Guide 2026",
    "description": "Complete guide to finding flexible part-time jobs that work around your class schedule. Includes 2026 wage data, job market statistics, and career resources.",
    "author": {
      "@type": "Organization",
      "name": "Indeed Flex Career Hub"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Indeed Flex Career Hub"
    },
    "datePublished": "2026-01-01",
    "dateModified": researchData?.researched_at || "2026-01-21"
  };

  return (
    <Layout>
      <SEOHead
        title="Student Jobs & Flexible Work 2026 | Part-Time Jobs for College Students"
        description="Find flexible part-time jobs that work around your class schedule. 2026 wage data: tutoring $17-25/hr, delivery $17.64/hr, campus jobs $12-25/hr. Same day pay, no minimums."
        canonical={`${baseUrl}/career-hub/for-students`}
        type="article"
        tags={["student jobs", "part-time jobs", "college jobs", "flexible work", "same day pay", "jobs for college students 2026"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <GraduationCap className="w-4 h-4 mr-2" />
              For College Students
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Jobs That Fit Your <span className="text-primary">Class Schedule</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Earn $15-25/hour with flexible shifts, same-day pay, and no minimum hours. 
              Join 165,000+ students balancing work and education.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <DollarSign className="w-4 h-4 mr-1" />
                Avg. $17.64/hr delivery
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Clock className="w-4 h-4 mr-1" />
                Flexible scheduling
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Shield className="w-4 h-4 mr-1" />
                No experience needed
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Start Earning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="#research">
                  View 2026 Market Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <WhyFlexSection 
        personaName="Students" 
        benefits={studentBenefits}
        headline="Why Students Choose Flexible Work"
      />

      {/* Popular Roles Section */}
      <PopularRolesGrid 
        roles={popularRoles}
        title="Popular Roles for Students"
        subtitle="No experience required • Flexible schedules • Competitive pay"
      />

      {/* Guides & Tools Section */}
      <GuidesToolsSection 
        guides={enhancedGuides}
        tools={studentTools}
        guidesTitle="Student Career Guides"
        toolsTitle="Planning Tools"
      />

      {/* Job Application Navigation */}
      <JobApplicationNav 
        personaSlug="student" 
        personaName="Students"
      />

      {/* Deep Research Section with Tabs */}
      {hasResearch && researchData && (
        <div id="research">
          <DeepResearchSection 
            data={researchData}
            personaName="Student"
          />
        </div>
      )}

      {/* Loading state for research */}
      {isLoading && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse flex flex-col items-center gap-2">
              <div className="h-8 w-64 bg-muted rounded"></div>
              <div className="h-4 w-48 bg-muted rounded"></div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything students need to know about flexible work
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
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 165,000+ Flexers who balance work and life on their own terms. 
            No experience required, no minimum hours.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
              Download Indeed Flex App
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ForStudentsPage;
