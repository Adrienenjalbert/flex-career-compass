import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRightLeft, 
  Target, 
  DollarSign, 
  Shield, 
  BookOpen, 
  Briefcase,
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";
import { getRecommendedTemplatesForSituation } from "@/data/resume-templates";
import { getRecommendedCoverLettersForSituation } from "@/data/cover-letter-templates";

const ForCareerChangersPage = () => {
  const careerChangerContent = getContentForSituation('career-changer');
  const recommendedResumeTemplates = getRecommendedTemplatesForSituation('career-changer', 3);
  const recommendedCoverLetters = getRecommendedCoverLettersForSituation('career-changer', 2);
  const baseUrl = "https://flex-career-compass.lovable.app";

  const benefits = [
    { icon: ArrowRightLeft, title: "Explore New Industries", description: "Try warehouse, hospitality, or retail without long-term commitment" },
    { icon: Target, title: "Transferable Skills", description: "Your existing skills are more valuable than you think" },
    { icon: DollarSign, title: "Competitive Pay", description: "$15-28/hr depending on role and experience" },
    { icon: Shield, title: "Low Risk Transition", description: "Test drive a new career path before committing fully" },
  ];

  const popularRoles = [
    { slug: "warehouse-clerk", title: "Warehouse Clerk", pay: "$17-24/hr", description: "Office skills transfer well" },
    { slug: "event-staff", title: "Event Staff", pay: "$15-22/hr", description: "Customer service experience valued" },
    { slug: "forklift-driver", title: "Forklift Driver", pay: "$18-28/hr", description: "Certification training available" },
    { slug: "administrative-assistant", title: "Admin Assistant", pay: "$16-24/hr", description: "Leverage existing admin skills" },
  ];

  const guides = [
    { slug: "career-transition", title: "Career Transition Guide 2026", description: "Navigate your industry switch successfully" },
    { slug: "transferable-skills", title: "Identifying Transferable Skills", description: "Translate your experience to new roles" },
    { slug: "temp-to-perm-success", title: "Temp-to-Perm Success Guide", description: "Turn flexible work into permanent offers" },
  ];

  const tools = [
    { path: "/career-hub/tools/skills-analyzer", title: "Skills Analyzer", description: "Map your skills to new roles", icon: Target },
    { path: "/career-hub/tools/career-path", title: "Career Path Explorer", description: "Discover role progressions", icon: TrendingUp },
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Compare earnings across industries", icon: Calculator },
  ];

  const faqs = [
    {
      question: "Can I switch industries with Indeed Flex?",
      answer: "Absolutely! Indeed Flex offers roles across hospitality, industrial, retail, and facilities. Many career changers use flexible work to gain experience in new industries before committing to a permanent role."
    },
    {
      question: "Will my previous experience count?",
      answer: "Yes! Skills like communication, problem-solving, time management, and customer service transfer across industries. Our guides help you identify and highlight these transferable skills."
    },
    {
      question: "How long does it take to transition careers?",
      answer: "With Indeed Flex, you can start working in a new industry immediately. Many Flexers transition to permanent roles within 3-6 months by building experience and getting added to company talent pools."
    },
    {
      question: "What if I need training for a new role?",
      answer: "Indeed Flex offers free training for certain roles, including forklift certification. Many companies also provide on-the-job training for entry-level positions."
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
      { "@type": "ListItem", "position": 2, "name": "For Career Changers", "item": `${baseUrl}/career-hub/for-career-changers` }
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Career Change Jobs | Transition to a New Industry with Flexible Work"
        description="Switch careers with low-risk flexible work. Explore new industries, leverage transferable skills, and find your path. Competitive pay, no long-term commitment required."
        canonical={`${baseUrl}/career-hub/for-career-changers`}
        type="website"
        tags={["career change", "career transition", "switch careers", "new industry", "transferable skills"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              For Career Changers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Next Chapter <span className="text-primary">Starts Here</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore new industries, test different roles, and transition your career—all while earning competitive pay with zero long-term commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Explore New Roles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/tools/skills-analyzer">
                  Analyze Your Skills
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Career Changers Choose Indeed Flex</h2>
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
          <h2 className="text-3xl font-bold text-center mb-4">Popular Roles for Career Changers</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These roles value transferable skills and offer pathways to permanent positions.
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
                <h2 className="text-2xl font-bold">Career Transition Guides</h2>
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
                  to="/career-hub/guides?situation=career-changer" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Career Changer Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Career Planning Tools</h2>
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
            <h2 className="text-3xl font-bold">Recommended Templates for Career Changers</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Templates designed to highlight transferable skills and reframe your experience for new industries.
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
          <h2 className="text-3xl font-bold mb-4">Ready for Your Career Change?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start exploring new industries today with flexible work that fits your transition.
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

export default ForCareerChangersPage;
