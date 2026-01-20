import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Clock, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Briefcase,
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { getContentForSituation, SITUATION_LABELS } from "@/data/taxonomy";

const ForStudentsPage = () => {
  const studentContent = getContentForSituation('student');
  const baseUrl = "https://flex-career-compass.lovable.app";

  const studentBenefits = [
    { icon: Clock, title: "Flexible Hours", description: "Work around your class schedule, not the other way around" },
    { icon: DollarSign, title: "Same Day Pay", description: "Access up to 50% of earnings within 1 hour of shift completion" },
    { icon: Calendar, title: "No Minimum Hours", description: "Work as much or as little as you need each week" },
    { icon: BookOpen, title: "Skill Building", description: "Gain real-world experience for your resume" },
  ];

  const popularRoles = [
    { slug: "event-staff", title: "Event Staff", pay: "$15-22/hr", description: "Perfect for weekend availability" },
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "Evening & night shifts available" },
    { slug: "banquet-server", title: "Banquet Server", pay: "$15-25/hr", description: "Tips + flexible scheduling" },
    { slug: "retail-assistant", title: "Retail Assistant", pay: "$14-18/hr", description: "Part-time hours, holiday rush" },
  ];

  const studentGuides = [
    { slug: "student-resume-template", title: "Student Resume Template 2026", description: "Balance academics and work experience" },
    { slug: "zero-experience-jobs", title: "Jobs With No Experience Required", description: "Start earning with no prior work history" },
    { slug: "first-flex-job", title: "Your First Flexible Job Guide", description: "Step-by-step getting started" },
  ];

  const studentTools = [
    { path: "/career-hub/tools/shift-planner", title: "Shift Planner", description: "Plan work around classes", icon: Calendar },
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Estimate weekly earnings", icon: Calculator },
    { path: "/career-hub/tools/tax-calculator", title: "Tax Calculator", description: "Understand student tax situations", icon: DollarSign },
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

  return (
    <Layout>
      <SEOHead
        title="Student Jobs & Flexible Work | Part-Time Jobs for College Students"
        description="Find flexible part-time jobs that work around your class schedule. Same day pay, no minimum hours, and no experience required. Perfect for college students."
        canonical={`${baseUrl}/career-hub/for-students`}
        type="website"
        tags={["student jobs", "part-time jobs", "college jobs", "flexible work", "same day pay"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <GraduationCap className="w-4 h-4 mr-2" />
              For Students
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Flexible Jobs That Fit Your <span className="text-primary">Class Schedule</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Work when you want, get paid fast, and build real-world experience—all while staying focused on your studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Start Earning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/resume-examples?situation=student">
                  View Student Resumes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose Indeed Flex</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentBenefits.map((benefit) => (
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
          <h2 className="text-3xl font-bold text-center mb-4">Popular Roles for Students</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These roles offer flexible scheduling, no experience requirements, and competitive pay.
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

      {/* Guides & Resources Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Guides */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Student Career Guides</h2>
              </div>
              <div className="space-y-4">
                {studentGuides.map((guide) => (
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
                  to="/career-hub/guides?situation=student" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Student Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Helpful Tools</h2>
              </div>
              <div className="space-y-4">
                {studentTools.map((tool) => (
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
                <Link 
                  to="/career-hub/tools" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Tools
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Templates Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Student Resume Templates</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            No work experience? No problem. These templates highlight your education, activities, and transferable skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/career-hub/resume-examples?situation=student">
                Browse Student Examples
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/career-hub/templates?format=functional">
                Functional Format (No Experience)
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/career-hub/templates?format=one-page">
                One-Page Templates
              </Link>
            </Button>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 165,000+ Flexers who balance work and life on their own terms.
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
