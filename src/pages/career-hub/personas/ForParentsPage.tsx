import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Baby, 
  Clock, 
  DollarSign, 
  Calendar, 
  Calculator,
  ArrowRight,
  CheckCircle2,
  Heart,
  Shield
} from "lucide-react";
import { getPersonaGuides } from "@/data/persona-guides";
import { 
  WhyFlexSection,
  PopularRolesGrid,
  GuidesToolsSection,
  JobApplicationNav,
  ParentMarketStats,
  ParentSuccessTips,
  RelatedArticlesGrid
} from "@/components/career-hub/persona";

const ForParentsPage = () => {
  const parentGuides = getPersonaGuides('parent');
  const baseUrl = "https://flex-career-compass.lovable.app";

  // Benefits data for horizontal strip
  const parentBenefits = [
    { 
      icon: Clock, 
      title: "School-Hour Shifts", 
      description: "Work 8am-3pm, home for pickup" 
    },
    { 
      icon: DollarSign, 
      title: "Same Day Pay", 
      description: "Access earnings in 1 hour" 
    },
    { 
      icon: Calendar, 
      title: "No Minimums", 
      description: "Take off during school breaks" 
    },
    { 
      icon: Heart, 
      title: "Medical Benefits", 
      description: "Health, dental & vision" 
    },
  ];

  // Popular roles for parents with pay data
  const popularRoles = [
    { 
      slug: "picker-packer", 
      title: "Picker Packer", 
      pay: "$15-20/hr", 
      description: "Morning shifts end before pickup",
      tags: ["School Hours", "No Experience"],
      highlight: true
    },
    { 
      slug: "cleaner", 
      title: "Cleaner", 
      pay: "$14-20/hr", 
      description: "Flexible daytime commercial cleaning",
      tags: ["Daytime", "Consistent"]
    },
    { 
      slug: "warehouse-clerk", 
      title: "Warehouse Clerk", 
      pay: "$17-24/hr", 
      description: "Set schedules, predictable hours",
      tags: ["Set Schedule", "Indoor"]
    },
    { 
      slug: "retail-assistant", 
      title: "Retail Assistant", 
      pay: "$14-18/hr", 
      description: "Part-time midday availability",
      tags: ["Part-Time", "Customer Service"]
    },
  ];

  // Tools relevant for parents
  const parentTools = [
    { 
      path: "/career-hub/tools/childcare-calculator", 
      title: "Childcare Calculator", 
      description: "Is work worth the childcare cost?", 
      icon: Baby 
    },
    { 
      path: "/career-hub/tools/shift-planner", 
      title: "Shift Planner", 
      description: "Plan work around school schedule", 
      icon: Calendar 
    },
    { 
      path: "/career-hub/tools/pay-calculator", 
      title: "Pay Calculator", 
      description: "Estimate your weekly take-home", 
      icon: Calculator 
    },
  ];

  // Enhanced guides with read times
  const enhancedGuides = [
    { slug: 'working-parent-guide', title: 'Complete Working Parent Guide', description: 'Balance family and flexible work', readTime: '18 min' },
    { slug: 'same-day-pay-explained', title: 'Same Day Pay Explained', description: 'Access earnings when you need them', readTime: '7 min' },
    { slug: 'complete-guide', title: 'Complete Indeed Flex Guide', description: 'Benefits, pay, and scheduling', readTime: '8 min' },
    { slug: 'multiple-gigs', title: 'Balancing Multiple Gigs', description: 'Manage work and family time', readTime: '8 min' },
  ];

  // Related articles for parents
  const relatedArticles = [
    { 
      type: 'guide' as const, 
      slug: 'working-parent-guide', 
      title: 'Complete Working Parent Guide 2026', 
      description: 'Everything you need to know about balancing flexible work and family.',
      readTime: '18 min',
      highlight: true
    },
    { 
      type: 'tool' as const, 
      slug: 'childcare-calculator', 
      title: 'Childcare Cost Calculator', 
      description: 'Find out if working is financially worth it after childcare costs.',
      readTime: '2 min'
    },
    { 
      type: 'guide' as const, 
      slug: 'same-day-pay-explained', 
      title: 'Same Day Pay Explained', 
      description: 'Access up to 50% of your earnings within 1 hour.',
      readTime: '7 min'
    },
    { 
      type: 'guide' as const, 
      slug: 'tax-guide-gig-workers', 
      title: 'Gig Worker Tax Guide 2026', 
      description: 'Understand taxes, credits, and deductions for flexible workers.',
      readTime: '15 min'
    },
    { 
      type: 'guide' as const, 
      slug: 'multiple-gigs', 
      title: 'Balancing Multiple Gigs', 
      description: 'Manage multiple jobs without burning out.',
      readTime: '8 min'
    },
    { 
      type: 'tool' as const, 
      slug: 'shift-planner', 
      title: 'Shift Planner', 
      description: 'Map your work schedule around school hours.',
      readTime: '2 min'
    },
  ];

  const faqs = [
    {
      question: "Can I work only during school hours?",
      answer: "Yes! Many Indeed Flex shifts run from 8am-2pm or 9am-3pm, perfect for parents. You can filter available shifts by time to find ones that work with your school pickup schedule."
    },
    {
      question: "What happens if my child is sick?",
      answer: "With Indeed Flex, there's no penalty for not booking shifts. If you need to stay home, simply don't book work that day. There are no minimum hour requirements."
    },
    {
      question: "Is the childcare cost worth it?",
      answer: "Use our Childcare Calculator to find out! It compares your potential earnings against local childcare costs, including tax credits like the CDCTC (up to $1,050/child) and Dependent Care FSA savings."
    },
    {
      question: "Can I take time off for school breaks?",
      answer: "Absolutely. You control your schedule week by week. Many parents work more during school weeks and take off during holidays and summer when kids are home."
    },
    {
      question: "What about medical benefits?",
      answer: "Indeed Flex offers medical, dental, and vision insurance through Essential StaffCARE to qualifying workers. This can save families thousands compared to marketplace plans."
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
      { "@type": "ListItem", "position": 2, "name": "For Parents", "item": `${baseUrl}/career-hub/for-parents` }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jobs for Parents: Flexible Work Around Your Family",
    "description": "Complete guide to finding flexible jobs that work around school hours, kids' activities, and family needs. 2026 childcare cost data, tax benefits, and scheduling strategies.",
    "author": {
      "@type": "Organization",
      "name": "Indeed Flex Career Hub"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Indeed Flex Career Hub"
    },
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-21"
  };

  return (
    <Layout>
      <SEOHead
        title="Jobs for Parents 2026 | Flexible Work Around Your Kids' Schedule"
        description="Find flexible jobs that work around school hours, kids' activities, and family needs. 2026 childcare cost data shows avg. $11,582/year. Same day pay, no minimum hours, medical benefits."
        canonical={`${baseUrl}/career-hub/for-parents`}
        type="article"
        tags={["jobs for parents", "flexible jobs for moms", "school hours jobs", "part-time jobs for parents", "working parent guide 2026"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Baby className="w-4 h-4 mr-2" />
              For Working Parents
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Work That Works <span className="text-primary">Around Your Family</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be there for school drop-off, pickup, and everything in between. Find flexible shifts that fit your family's schedule.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Clock className="w-4 h-4 mr-1" />
                8am-3pm shifts available
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <DollarSign className="w-4 h-4 mr-1" />
                Avg. childcare: $11,582/yr
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Shield className="w-4 h-4 mr-1" />
                Medical benefits included
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Find Parent-Friendly Shifts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/tools/childcare-calculator">
                  Calculate Childcare Costs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Horizontal strip */}
      <WhyFlexSection 
        personaName="Parents" 
        benefits={parentBenefits}
        headline="Why Parents Love Indeed Flex"
      />

      {/* 2026 Market Stats Section - Visual data cards */}
      <ParentMarketStats className="bg-muted/20" />

      {/* Popular Roles Section */}
      <PopularRolesGrid 
        roles={popularRoles}
        title="Parent-Friendly Roles"
        subtitle="Daytime shifts • Predictable hours • Work around school"
      />

      {/* Research-Backed Success Tips */}
      <ParentSuccessTips />

      {/* Guides & Tools Section */}
      <GuidesToolsSection 
        guides={enhancedGuides}
        tools={parentTools}
        guidesTitle="Working Parent Guides"
        toolsTitle="Family Planning Tools"
      />

      {/* Related Articles Grid */}
      <RelatedArticlesGrid 
        items={relatedArticles}
        title="Explore Parent Resources"
        subtitle="Guides and tools designed for working parents"
        className="bg-muted/20"
      />

      {/* Job Application Navigation */}
      <JobApplicationNav 
        personaSlug="parent" 
        personaName="Parents"
      />

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything parents need to know about flexible work
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
          <Baby className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Find Family-Friendly Work?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of parents who balance work and family with Indeed Flex. 
            No minimum hours, same day pay, medical benefits available.
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

export default ForParentsPage;
