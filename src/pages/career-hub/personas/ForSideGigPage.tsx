import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  Clock, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Briefcase,
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
  Zap
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";
import { getRecommendedTemplatesForSituation } from "@/data/resume-templates";
import { getRecommendedCoverLettersForSituation } from "@/data/cover-letter-templates";

const ForSideGigPage = () => {
  const sideGigContent = getContentForSituation('side-gig');
  const recommendedResumeTemplates = getRecommendedTemplatesForSituation('side-gig', 3);
  const recommendedCoverLetters = getRecommendedCoverLettersForSituation('side-gig', 2);
  const baseUrl = "https://flex-career-compass.lovable.app";

  const benefits = [
    { icon: Clock, title: "Work on Your Terms", description: "Evenings, weekends, whenever fits your main job" },
    { icon: DollarSign, title: "Same Day Pay", description: "Extra cash in your account within hours" },
    { icon: Calendar, title: "No Commitment", description: "Work one shift or twenty—your choice" },
    { icon: Zap, title: "Quick Start", description: "Get verified once and start earning fast" },
  ];

  const popularRoles = [
    { slug: "event-staff", title: "Event Staff", pay: "$15-22/hr", description: "Weekend concerts & events" },
    { slug: "banquet-server", title: "Banquet Server", pay: "$15-25/hr", description: "Friday/Saturday weddings" },
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "Evening & overnight shifts" },
    { slug: "bartender", title: "Bartender", pay: "$12-20/hr + tips", description: "High-energy weekend work" },
  ];

  const guides = [
    { slug: "side-gig-guide", title: "Side Gig Success Guide", description: "Maximize your extra income" },
    { slug: "same-day-pay", title: "Same Day Pay Explained", description: "Get paid fast" },
    { slug: "tax-guide-gig-workers", title: "Tax Guide for Gig Workers", description: "Manage taxes on extra income" },
  ];

  const tools = [
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Plan your extra earnings", icon: Calculator },
    { path: "/career-hub/tools/tax-calculator", title: "Tax Calculator", description: "Estimate taxes on side income", icon: DollarSign },
    { path: "/career-hub/tools/shift-planner", title: "Shift Planner", description: "Balance with your main job", icon: Calendar },
  ];

  const earningScenarios = [
    { hours: "5 hrs/week", monthly: "$300-400", description: "One shift per weekend" },
    { hours: "10 hrs/week", monthly: "$600-800", description: "Two evening shifts" },
    { hours: "15 hrs/week", monthly: "$900-1,200", description: "Weekend warrior" },
    { hours: "20 hrs/week", monthly: "$1,200-1,600", description: "Serious side hustle" },
  ];

  const faqs = [
    {
      question: "Can I do Indeed Flex alongside my full-time job?",
      answer: "Absolutely! Many Flexers use Indeed Flex as a side gig. Work evenings, weekends, or whenever fits your primary job. There are no minimum hours, so you control your schedule."
    },
    {
      question: "How much can I realistically earn on the side?",
      answer: "Depending on your availability, side gig Flexers typically earn $300-1,600+ per month working 5-20 hours per week. Evening and weekend shifts often pay $15-25/hr."
    },
    {
      question: "Do I need to work every week?",
      answer: "No! With Indeed Flex, you can work one week and take the next off. There's no schedule commitment—book shifts only when you want extra income."
    },
    {
      question: "How do I handle taxes on side income?",
      answer: "Indeed Flex handles W-2 taxes like a regular employer. You'll receive a W-2 for your earnings. Use our Tax Calculator to estimate your additional tax burden."
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
      { "@type": "ListItem", "position": 2, "name": "For Side Gig Workers", "item": `${baseUrl}/career-hub/for-side-gig` }
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Side Gig Jobs | Earn Extra Income on Your Schedule"
        description="Boost your income with flexible side gig work. Evening and weekend shifts, same day pay, no minimum hours. Perfect supplement to your main job."
        canonical={`${baseUrl}/career-hub/for-side-gig`}
        type="website"
        tags={["side gig", "extra income", "second job", "weekend work", "evening jobs"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Wallet className="w-4 h-4 mr-2" />
              Side Gig Work
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Boost Your Income <span className="text-primary">On Your Terms</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Already have a job? Add $300-1,600+ per month with flexible evening and weekend shifts. No commitment, same day pay available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Start Earning Extra
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/tools/pay-calculator">
                  Calculate Extra Income
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Indeed Flex for Your Side Gig</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Scenarios Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Side Gig Earning Potential</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how much extra you could earn based on your availability.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningScenarios.map((scenario) => (
              <Card key={scenario.hours} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{scenario.monthly}</div>
                  <div className="font-semibold text-lg mb-2">{scenario.hours}</div>
                  <p className="text-muted-foreground text-sm">{scenario.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">
            *Estimates based on $15-20/hr average across roles. Actual earnings vary.
          </p>
        </div>
      </section>

      {/* Popular Roles Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Best Roles for Side Gigs</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Evening and weekend shifts perfect for supplementing your main income.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoles.map((role) => (
              <Card key={role.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <Badge variant="secondary">{role.pay}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{role.description}</p>
                  <Link 
                    to={`/career-hub/roles/${role.slug}`}
                    className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                  >
                    View Role Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & Tools Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Side Gig Success Guides</h2>
              </div>
              <div className="space-y-4">
                {guides.map((guide) => (
                  <Card key={guide.slug} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link to={`/career-hub/guides/${guide.slug}`} className="block">
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">{guide.description}</p>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
                <Link 
                  to="/career-hub/guides?situation=side-gig" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Side Gig Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Income Planning Tools</h2>
              </div>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <Card key={tool.path} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link to={tool.path} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <tool.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{tool.description}</p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Recommended Templates</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quick, effective templates for landing side gig work fast.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recommendedResumeTemplates.map((template) => (
              <Card key={template.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{template.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.bestFor.slice(0, 2).map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                    ))}
                  </div>
                  <Link 
                    to={`/career-hub/templates/${template.slug}`}
                    className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                  >
                    Use Template
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {recommendedCoverLetters.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center mb-6">Cover Letter Templates</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {recommendedCoverLetters.map((template) => (
                  <Card key={template.slug} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-muted-foreground text-sm line-clamp-2">{template.description}</p>
                          <Link 
                            to={`/career-hub/cover-letters/${template.slug}`}
                            className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-2"
                          >
                            View Template
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Income?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start your side gig today—no long-term commitment, just extra cash when you need it.
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

export default ForSideGigPage;
