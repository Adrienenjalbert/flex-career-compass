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
  Briefcase,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";

const ForFreshersPage = () => {
  const fresherContent = getContentForSituation('fresher');
  const baseUrl = "https://flex-career-compass.lovable.app";

  const fresherBenefits = [
    { icon: Rocket, title: "No Experience Required", description: "Many roles welcome first-time workers with zero experience" },
    { icon: Star, title: "Build Your Reputation", description: "Earn ratings and reviews to unlock better opportunities" },
    { icon: TrendingUp, title: "Quick Career Growth", description: "Move from entry-level to skilled roles within months" },
    { icon: Users, title: "Join 165K+ Community", description: "Connect with experienced Flexers who can mentor you" },
  ];

  const entryLevelRoles = [
    { slug: "picker-packer", title: "Picker Packer", pay: "$15-20/hr", description: "Most common first role—learn warehouse basics" },
    { slug: "warehouse-operative", title: "Warehouse Operative", pay: "$16-24/hr", description: "General warehouse duties, no certification needed" },
    { slug: "event-staff", title: "Event Staff", pay: "$15-22/hr", description: "Fun, social work at concerts and sports events" },
    { slug: "dishwasher", title: "Dishwasher", pay: "$14-18/hr", description: "Entry into hospitality—pathway to kitchen roles" },
    { slug: "cleaner", title: "Cleaner", pay: "$14-18/hr", description: "Flexible hours, consistent demand" },
    { slug: "loader-crew", title: "Loader/Crew", pay: "$15-22/hr", description: "Physical work, quick training" },
  ];

  const fresherGuides = [
    { slug: "fresher-resume-guide", title: "Resume for Freshers: Complete 2026 Guide", description: "Create a winning resume with no work history" },
    { slug: "zero-experience-jobs", title: "How to Get Hired With Zero Experience", description: "Proven strategies to land your first job" },
    { slug: "transferable-skills-guide", title: "Transferable Skills Guide", description: "Turn life experience into resume gold" },
    { slug: "first-flex-job", title: "Your First Indeed Flex Job", description: "What to expect and how to succeed" },
  ];

  const resumeFormats = [
    { format: "functional", title: "Functional Resume", description: "Highlights skills over work history—perfect for freshers", recommended: true },
    { format: "one-page", title: "One-Page Resume", description: "Concise format ideal for entry-level applications" },
    { format: "skills-based", title: "Skills-Based Resume", description: "Lead with your capabilities, not your experience" },
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

  return (
    <Layout>
      <SEOHead
        title="First Job Resume & Tips | Jobs for Freshers With No Experience 2026"
        description="Get your first job with no experience. Free resume templates, interview tips, and entry-level roles that don't require work history. Start your career today."
        canonical={`${baseUrl}/career-hub/for-freshers`}
        type="website"
        tags={["first job", "no experience jobs", "fresher resume", "entry level jobs", "how to get first job"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/20 via-background to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              <Rocket className="w-4 h-4 mr-2" />
              First Job? Start Here
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Land Your <span className="text-primary">First Job</span> With Zero Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everyone starts somewhere. Get the resume templates, guides, and entry-level opportunities you need to launch your career.
            </p>
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

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Indeed Flex is Perfect for First-Timers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fresherBenefits.map((benefit) => (
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

      {/* Entry-Level Roles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Entry-Level Roles (No Experience Needed)</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These roles hire workers with zero experience. Your attitude and reliability matter more than your resume.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entryLevelRoles.map((role) => (
              <Card key={role.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <Badge variant="secondary">{role.pay}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{role.description}</p>
                  <div className="flex gap-2">
                    <Link 
                      to={`/career-hub/roles/${role.slug}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Role Details
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link 
                      to={`/career-hub/resume-examples/${role.slug}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Resume Example
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Formats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Best Resume Formats for Freshers</h2>
            </div>
            <p className="text-center text-muted-foreground mb-8">
              Traditional chronological resumes don't work when you have no experience. Use these formats instead.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {resumeFormats.map((format) => (
                <Card key={format.format} className={`hover:shadow-lg transition-shadow ${format.recommended ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="pt-6">
                    {format.recommended && (
                      <Badge className="mb-3 bg-primary text-primary-foreground">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                    <h3 className="font-semibold text-lg mb-2">{format.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{format.description}</p>
                    <Link 
                      to={`/career-hub/templates?format=${format.format}`}
                      className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                    >
                      View Templates
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Essential Guides for First-Time Job Seekers</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Step-by-step advice to get hired, write your resume, and succeed in your first job.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {fresherGuides.map((guide) => (
              <Card key={guide.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Link to={`/career-hub/guides/${guide.slug}`} className="block">
                    <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{guide.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/career-hub/job-application-toolkit">
                View Full Job Application Toolkit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions About First Jobs</h2>
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
