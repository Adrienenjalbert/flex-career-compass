import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Baby, 
  Clock, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle2,
  Heart
} from "lucide-react";
import { getRecommendedTemplatesForSituation } from "@/data/resume-templates";
import { getRecommendedCoverLettersForSituation } from "@/data/cover-letter-templates";
import { getPersonaGuides } from "@/data/persona-guides";
import { PersonaResearchSection } from "@/components/career-hub/persona";

const ForParentsPage = () => {
  const recommendedResumeTemplates = getRecommendedTemplatesForSituation('parent', 3);
  const recommendedCoverLetters = getRecommendedCoverLettersForSituation('parent', 2);
  const guides = getPersonaGuides('parent');
  const baseUrl = "https://flex-career-compass.lovable.app";

  const benefits = [
    { icon: Clock, title: "School-Hour Shifts", description: "Work while kids are in school, be home when they're home" },
    { icon: DollarSign, title: "Same Day Pay", description: "Access earnings fast for unexpected expenses" },
    { icon: Calendar, title: "Week-by-Week Flexibility", description: "Adjust hours around school breaks and activities" },
    { icon: Heart, title: "Medical Benefits", description: "Access to medical, dental, and vision insurance" },
  ];

  const popularRoles = [
    { slug: "picker-packer", title: "Picker Packer", pay: "$15-20/hr", description: "Morning shifts end before pickup" },
    { slug: "cleaner", title: "Cleaner", pay: "$14-20/hr", description: "Flexible daytime hours" },
    { slug: "warehouse-clerk", title: "Warehouse Clerk", pay: "$17-24/hr", description: "Set schedules available" },
    { slug: "retail-assistant", title: "Retail Assistant", pay: "$14-18/hr", description: "Part-time options" },
  ];

  const tools = [
    { path: "/career-hub/tools/childcare-calculator", title: "Childcare Calculator", description: "Is work worth the childcare cost?", icon: Baby },
    { path: "/career-hub/tools/shift-planner", title: "Shift Planner", description: "Plan around school schedules", icon: Calendar },
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Estimate weekly take-home", icon: Calculator },
  ];

  const faqs = [
    {
      question: "Can I work only during school hours?",
      answer: "Yes! Many Indeed Flex shifts run from 8am-2pm or 9am-3pm, perfect for parents. You can filter available shifts by time to find ones that work with your schedule."
    },
    {
      question: "What happens if my child is sick?",
      answer: "With Indeed Flex, there's no penalty for not booking shifts. If you need to stay home, simply don't book work that day. There are no minimum hour requirements."
    },
    {
      question: "Can I take time off for school breaks?",
      answer: "Absolutely. You control your schedule week by week. Many parents work more during school weeks and take off during holidays and summer when kids are home."
    },
    {
      question: "Is the childcare cost worth it?",
      answer: "Use our Childcare Calculator to find out! It compares your potential earnings against local childcare costs to help you make an informed decision."
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

  return (
    <Layout>
      <SEOHead
        title="Jobs for Parents | Flexible Work Around Your Kids' Schedule"
        description="Find flexible jobs that work around school hours, kids' activities, and family needs. Same day pay, no minimum hours, and medical benefits available."
        canonical={`${baseUrl}/career-hub/for-parents`}
        type="website"
        tags={["jobs for parents", "flexible jobs for moms", "work from home", "school hours jobs", "part-time jobs for parents"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Baby className="w-4 h-4 mr-2" />
              For Parents
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Work That Works <span className="text-primary">Around Your Family</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be there for school drop-off, pickup, and everything in between. Find flexible shifts that fit your family's schedule.
            </p>
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

      {/* Research Insights Section */}
      <PersonaResearchSection personaSlug="parent" personaName="Working Parent" />

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Parents Love Indeed Flex</h2>
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

      {/* Popular Roles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Parent-Friendly Roles</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These roles offer daytime shifts, predictable hours, and flexibility for family needs.
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Guides for Working Parents</h2>
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
                  to="/career-hub/guides?situation=parent" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Parent Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Family Planning Tools</h2>
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Recommended Templates for Parents</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Templates that address employment gaps and highlight your organizational and multitasking skills.
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Family-Friendly Work?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of parents who balance work and family with Indeed Flex.
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
