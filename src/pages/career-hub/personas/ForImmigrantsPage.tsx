import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  FileCheck, 
  Languages, 
  Shield, 
  Heart, 
  MessageCircle,
  BookOpen,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";

const ForImmigrantsPage = () => {
  const immigrantContent = getContentForSituation('immigrant');
  const baseUrl = "https://flex-career-compass.lovable.app";

  const immigrantBenefits = [
    { icon: FileCheck, title: "E-Verify Compliant", description: "Simple I-9 process with clear guidance at every step" },
    { icon: Languages, title: "Bilingual Support", description: "Resources and support available in Spanish and English" },
    { icon: Shield, title: "Worker Protections", description: "Same pay and benefits regardless of background" },
    { icon: Heart, title: "Inclusive Community", description: "Join a diverse workforce from all over the world" },
  ];

  const essentialGuides = [
    { 
      slug: "i9-form-guide", 
      title: "I-9 Form: Complete Guide for New Workers", 
      description: "Step-by-step instructions for the I-9 verification process",
      icon: FileCheck,
      priority: "essential"
    },
    { 
      slug: "work-authorization-guide", 
      title: "Work Authorization Documents Explained", 
      description: "Which documents you need and how to present them",
      icon: Shield,
      priority: "essential"
    },
    { 
      slug: "first-flex-job", 
      title: "Your First Indeed Flex Job", 
      description: "What to expect when starting work in the US",
      icon: Briefcase,
      priority: "helpful"
    },
    { 
      slug: "workplace-communication", 
      title: "Workplace Communication Guide", 
      description: "Common workplace phrases and cultural expectations",
      icon: MessageCircle,
      priority: "helpful"
    },
  ];

  const helpfulTools = [
    { 
      path: "/career-hub/tools/worktalk", 
      title: "WorkTalk", 
      description: "Learn essential workplace English phrases with audio pronunciation",
      icon: Languages,
      highlight: true
    },
    { 
      path: "/career-hub/tools/pay-calculator", 
      title: "Pay Calculator", 
      description: "Understand US hourly wages and weekly earnings",
      icon: Briefcase
    },
    { 
      path: "/career-hub/tools/tax-calculator", 
      title: "Tax Calculator", 
      description: "Learn about US tax withholding and take-home pay",
      icon: FileCheck
    },
  ];

  const immigrantFriendlyRoles = [
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "Actions speak louder than words—physical work, minimal English needed" },
    { slug: "picker-packer", title: "Picker Packer", pay: "$15-20/hr", description: "Follow visual instructions, fast-paced environment" },
    { slug: "dishwasher", title: "Dishwasher", pay: "$14-18/hr", description: "Entry into hospitality, team environment" },
    { slug: "cleaner", title: "Cleaner", pay: "$14-18/hr", description: "Independent work, flexible hours" },
    { slug: "prep-cook", title: "Prep Cook", pay: "$15-20/hr", description: "Culinary skills transfer across cultures" },
    { slug: "loader-crew", title: "Loader/Crew", pay: "$15-22/hr", description: "Teamwork-focused, physical work" },
  ];

  const i9Requirements = [
    { 
      category: "List A (One document)", 
      examples: ["US Passport", "Permanent Resident Card (Green Card)", "Employment Authorization Document (EAD)"],
      note: "Any one of these proves both identity AND work authorization"
    },
    { 
      category: "List B + List C (One from each)", 
      listB: ["Driver's License", "State ID Card", "School ID with photo"],
      listC: ["Social Security Card", "Birth Certificate", "Employment Authorization"],
      note: "Combine one identity document with one work authorization document"
    },
  ];

  const faqs = [
    {
      question: "What documents do I need to work with Indeed Flex?",
      answer: "You need to complete an I-9 form using either one List A document (like a Green Card or EAD) OR a combination of one List B document (like a driver's license) plus one List C document (like a Social Security card). Indeed Flex uses E-Verify to confirm work authorization."
    },
    {
      question: "Can I work while my work permit is being renewed?",
      answer: "If you have an Employment Authorization Document (EAD) renewal pending, you may be eligible for automatic extensions. Check with USCIS for your specific situation. Indeed Flex requires valid work authorization at all times."
    },
    {
      question: "Do I need to speak English fluently?",
      answer: "Many roles require only basic English. Warehouse roles like picker packer and loader focus on physical work with simple instructions. Our WorkTalk tool helps you learn essential workplace phrases."
    },
    {
      question: "Will I be treated fairly compared to US-born workers?",
      answer: "Absolutely. Indeed Flex pays the same rates regardless of background, and discrimination is strictly prohibited. You'll have access to the same benefits, Same Day Pay, and opportunities as all Flexers."
    },
    {
      question: "How do I get help if I don't understand something?",
      answer: "Indeed Flex offers 24/7 support through the Lexi AI agent in the app. For complex questions, human support is available Mon-Sat 6:30 AM-10:30 PM and Sun 8 AM-10 PM."
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
      { "@type": "ListItem", "position": 2, "name": "For Immigrants", "item": `${baseUrl}/career-hub/for-immigrants` }
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Jobs for Immigrants in USA | I-9 Guide & Work Authorization Help"
        description="Find jobs in America as a new immigrant. I-9 form guidance, work authorization help, bilingual resources, and immigrant-friendly employers. Start working legally today."
        canonical={`${baseUrl}/career-hub/for-immigrants`}
        type="website"
        tags={["immigrant jobs usa", "i-9 form", "work authorization", "jobs for immigrants", "bilingual jobs"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-blue-950/20 dark:to-green-950/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200">
              <Globe className="w-4 h-4 mr-2" />
              Welcome to the US Workforce
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start Your <span className="text-primary">American Career</span> With Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Clear guidance on work authorization, I-9 forms, and finding your first US job. Resources available in English and Spanish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/career-hub/guides/i9-form-guide">
                  I-9 Form Guide
                  <FileCheck className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/tools/worktalk">
                  Learn Workplace English
                  <Languages className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Indeed Flex Welcomes Immigrant Workers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {immigrantBenefits.map((benefit) => (
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

      {/* I-9 Quick Reference */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileCheck className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">I-9 Document Requirements</h2>
            </div>
            <p className="text-center text-muted-foreground mb-8">
              To work legally in the US, you must complete an I-9 form. Here's what you need:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {i9Requirements.map((req, index) => (
                <Card key={index} className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {index === 0 ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">Option 1</Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">Option 2</Badge>
                      )}
                      {req.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {req.examples && (
                      <ul className="space-y-2 mb-4">
                        {req.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    )}
                    {req.listB && (
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-sm mb-2">List B (Identity):</p>
                          <ul className="space-y-1">
                            {req.listB.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-2">List C (Work Auth):</p>
                          <ul className="space-y-1">
                            {req.listC.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-4 flex items-start gap-1">
                      <HelpCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      {req.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/career-hub/guides/i9-form-guide">
                  Read Complete I-9 Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Immigrant-Friendly Roles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Roles Where Actions Speak Louder Than Words</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These roles focus on physical work and skills, not fluent English. Perfect for building your US work experience.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {immigrantFriendlyRoles.map((role) => (
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
            {/* Guides */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Essential Guides</h2>
              </div>
              <div className="space-y-4">
                {essentialGuides.map((guide) => (
                  <Card key={guide.slug} className={`hover:shadow-md transition-shadow ${guide.priority === 'essential' ? 'border-primary/50' : ''}`}>
                    <CardContent className="p-4">
                      <Link to={`/career-hub/guides/${guide.slug}`} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${guide.priority === 'essential' ? 'bg-primary/20' : 'bg-muted'}`}>
                          <guide.icon className={`w-5 h-5 ${guide.priority === 'essential' ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {guide.title}
                            </h3>
                            {guide.priority === 'essential' && (
                              <Badge variant="outline" className="text-xs">Essential</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{guide.description}</p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Languages className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Helpful Tools</h2>
              </div>
              <div className="space-y-4">
                {helpfulTools.map((tool) => (
                  <Card key={tool.path} className={`hover:shadow-md transition-shadow ${tool.highlight ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                    <CardContent className="p-4">
                      <Link to={tool.path} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
                          <tool.icon className={`w-5 h-5 ${tool.highlight ? '' : 'text-primary'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {tool.title}
                            </h3>
                            {tool.highlight && (
                              <Badge className="bg-primary text-primary-foreground text-xs">Recommended</Badge>
                            )}
                          </div>
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

      {/* FAQ Section */}
      <section className="py-16 bg-background">
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

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Important Legal Notice</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This information is for educational purposes only and is not legal advice. Work authorization requirements 
                can change, and individual situations vary. For official guidance, consult USCIS.gov or an immigration attorney.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Working?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of immigrant workers who found their first US job with Indeed Flex.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/career-hub/guides/i9-form-guide">
                Complete I-9 Guide
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

export default ForImmigrantsPage;
