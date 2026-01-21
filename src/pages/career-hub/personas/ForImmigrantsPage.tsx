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
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Clock,
  Star
} from "lucide-react";
import {
  WhyFlexSection,
  PopularRolesGrid,
  ImmigrantMarketStats,
  ImmigrantSuccessTips,
  JobApplicationNav,
  RelatedArticlesGrid
} from "@/components/career-hub/persona";

const ForImmigrantsPage = () => {
  const baseUrl = "https://flex-career-compass.lovable.app";

  // Benefits for horizontal strip (no stats)
  const immigrantBenefits = [
    { icon: FileCheck, title: "E-Verify Compliant", description: "Simple I-9 verification process" },
    { icon: Languages, title: "Bilingual Support", description: "Resources in Spanish & English" },
    { icon: Shield, title: "Equal Protections", description: "Same pay regardless of origin" },
    { icon: Heart, title: "Diverse Community", description: "Join 165K+ Flexers worldwide" },
  ];

  // Immigrant-friendly roles
  const immigrantFriendlyRoles = [
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "Physical work, minimal English needed", tags: ["No Fluency", "Physical"] },
    { slug: "picker-packer", title: "Picker Packer", pay: "$15-20/hr", description: "Follow visual instructions, fast-paced", tags: ["Entry Level"] },
    { slug: "dishwasher", title: "Dishwasher", pay: "$14-18/hr", description: "Entry into hospitality, team environment", tags: ["Hospitality"], highlight: true },
    { slug: "cleaner", title: "Cleaner", pay: "$14-18/hr", description: "Independent work, flexible hours", tags: ["Independent"] },
  ];

  // I-9 Requirements
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

  // Related articles
  const relatedArticles = [
    { type: 'guide' as const, slug: 'i9-complete-guide', title: 'I-9 Form Complete Guide', description: 'Step-by-step verification process.', readTime: '10 min', highlight: true },
    { type: 'guide' as const, slug: 'i9-documents-list', title: 'I-9 Acceptable Documents', description: 'Lists A, B, and C explained.', readTime: '6 min' },
    { type: 'guide' as const, slug: 'first-job-america-guide', title: 'First Job in America', description: 'Navigate US workplace culture.', readTime: '8 min' },
    { type: 'tool' as const, slug: 'worktalk', title: 'WorkTalk Tool', description: 'Learn workplace English phrases.', readTime: '5 min' },
    { type: 'guide' as const, slug: 'work-authorization-types', title: 'Work Authorization Types', description: 'EAD, H-1B, Green Card explained.', readTime: '7 min' },
    { type: 'guide' as const, slug: 'e-verify-explained', title: 'E-Verify Explained', description: 'How employers verify eligibility.', readTime: '5 min' },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jobs for Immigrants in USA | I-9 Guide & Work Authorization Help",
    "description": "Find jobs in America as a new immigrant. I-9 form guidance, work authorization help, bilingual resources, and immigrant-friendly employers.",
    "author": { "@type": "Organization", "name": "Indeed Flex Career Hub" },
    "publisher": { "@type": "Organization", "name": "Indeed Flex Career Hub" },
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-21"
  };

  return (
    <Layout>
      <SEOHead
        title="Jobs for Immigrants in USA | I-9 Guide & Work Authorization Help"
        description="Find jobs in America as a new immigrant. I-9 form guidance, work authorization help, bilingual resources, and immigrant-friendly employers. Start working legally today."
        canonical={`${baseUrl}/career-hub/for-immigrants`}
        type="article"
        tags={["immigrant jobs usa", "i-9 form", "work authorization", "jobs for immigrants", "bilingual jobs"]}
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
              <Globe className="w-4 h-4 mr-2" />
              Welcome to the US Workforce
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Start Your <span className="text-primary">American Career</span> With Confidence
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Clear guidance on work authorization, I-9 forms, and finding your first US job. Resources in English and Spanish.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <DollarSign className="w-4 h-4 mr-1" />
                $14-24/hr starting pay
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Clock className="w-4 h-4 mr-1" />
                28% of US workforce
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Star className="w-4 h-4 mr-1" />
                E-Verify compliant
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/career-hub/guides/i9-complete-guide">
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

      {/* Why Section - Horizontal strip */}
      <WhyFlexSection 
        personaName="Immigrant Workers" 
        benefits={immigrantBenefits}
        headline="Why Immigrants Choose Indeed Flex"
      />

      {/* Market Stats - Visual data cards */}
      <ImmigrantMarketStats className="bg-muted/20" />

      {/* I-9 Quick Reference */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3">Quick Reference</Badge>
              <h2 className="text-3xl font-bold mb-2">I-9 Document Requirements</h2>
              <p className="text-muted-foreground">
                To work legally in the US, you must complete an I-9 form. Here's what you need:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {i9Requirements.map((req, index) => (
                <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {index === 0 ? (
                        <Badge className="bg-primary/20 text-primary">Option 1</Badge>
                      ) : (
                        <Badge className="bg-secondary text-secondary-foreground">Option 2</Badge>
                      )}
                      {req.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {req.examples && (
                      <ul className="space-y-2 mb-4">
                        {req.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
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
                                <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
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
                                <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-4 pt-3 border-t">
                      💡 {req.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/career-hub/guides/i9-complete-guide">
                  Read Complete I-9 Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Roles Section */}
      <PopularRolesGrid 
        roles={immigrantFriendlyRoles}
        title="Roles Where Actions Speak Louder Than Words"
        subtitle="Physical work and skills matter more than fluent English"
        className="bg-muted/30"
      />

      {/* Success Tips */}
      <ImmigrantSuccessTips />

      {/* Related Articles */}
      <RelatedArticlesGrid 
        items={relatedArticles}
        title="Work Authorization Resources"
        subtitle="Everything you need to work legally in the US"
        className="bg-muted/20"
      />

      {/* Job Application Navigation */}
      <JobApplicationNav 
        personaSlug="immigrant" 
        personaName="Immigrant Workers"
      />

      {/* Important Notice */}
      <section className="py-8 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Important Legal Notice</h3>
              <p className="text-sm text-muted-foreground">
                This information is for educational purposes only and is not legal advice. Work authorization requirements 
                can change, and individual situations vary. For official guidance, consult USCIS.gov or an immigration attorney.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about working in the US
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
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Working?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of immigrant workers who found their first US job with Indeed Flex.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/career-hub/guides/i9-complete-guide">
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
