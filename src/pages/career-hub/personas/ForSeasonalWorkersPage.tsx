import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import SEOHead from "@/components/career-hub/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Snowflake, 
  Sun, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Briefcase,
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Gift
} from "lucide-react";
import { getContentForSituation } from "@/data/taxonomy";
import { getRecommendedTemplatesForSituation } from "@/data/resume-templates";
import { getRecommendedCoverLettersForSituation } from "@/data/cover-letter-templates";

const ForSeasonalWorkersPage = () => {
  const seasonalContent = getContentForSituation('seasonal');
  const recommendedResumeTemplates = getRecommendedTemplatesForSituation('seasonal', 3);
  const recommendedCoverLetters = getRecommendedCoverLettersForSituation('seasonal', 2);
  const baseUrl = "https://flex-career-compass.lovable.app";

  const benefits = [
    { icon: TrendingUp, title: "Peak Season Demand", description: "More shifts = more earning potential during busy periods" },
    { icon: DollarSign, title: "Higher Holiday Pay", description: "Many employers offer premium rates during peak seasons" },
    { icon: Calendar, title: "Predictable Seasons", description: "Know when to expect the most opportunities" },
    { icon: Gift, title: "Temp-to-Perm Paths", description: "Seasonal work often leads to permanent offers" },
  ];

  const seasonalOpportunities = [
    { season: "Holiday (Oct-Jan)", roles: ["Picker Packer", "Retail Assistant", "Warehouse Operative"], pay: "$16-26/hr" },
    { season: "Summer (May-Aug)", roles: ["Event Staff", "Banquet Server", "Festival Staff"], pay: "$15-25/hr" },
    { season: "Prime Day/Back to School", roles: ["Loader/Unloader", "Assembler", "Warehouse Clerk"], pay: "$17-24/hr" },
    { season: "Tax Season (Jan-Apr)", roles: ["Administrative Assistant", "Data Entry"], pay: "$16-22/hr" },
  ];

  const guides = [
    { slug: "holiday-hiring-guide", title: "Holiday Hiring Guide 2026", description: "Land the best seasonal positions" },
    { slug: "warehouse-career-path", title: "Warehouse Career Progression", description: "Turn seasonal into permanent" },
    { slug: "temp-to-perm-success", title: "Temp-to-Perm Success Guide", description: "Get hired full-time after the season" },
  ];

  const tools = [
    { path: "/career-hub/tools/pay-calculator", title: "Pay Calculator", description: "Estimate seasonal earnings", icon: Calculator },
    { path: "/career-hub/tools/shift-planner", title: "Shift Planner", description: "Maximize hours during peak", icon: Calendar },
    { path: "/career-hub/seasonal-hiring", title: "Seasonal Hiring Hub", description: "Find peak season opportunities", icon: TrendingUp },
  ];

  const faqs = [
    {
      question: "When do seasonal hiring peaks occur?",
      answer: "The biggest hiring peaks are: Holiday season (October-January) for retail and warehouse, Summer (May-August) for events and hospitality, and Prime Day/Back-to-School (July-September) for Amazon and logistics."
    },
    {
      question: "How early should I apply for seasonal work?",
      answer: "Start applying 4-6 weeks before the season begins. For holiday work, apply in September-October. For summer events, apply in March-April. Early applicants get first picks on shifts."
    },
    {
      question: "Can seasonal work become permanent?",
      answer: "Yes! Many employers keep top seasonal performers as permanent staff. Indeed Flex's talent pool system means companies can add you for repeat work, and temp-to-perm opportunities are common."
    },
    {
      question: "What's the earning potential during peak season?",
      answer: "During peak seasons like holidays, you can often work 40+ hours per week with overtime available. Some seasonal workers earn $3,000-5,000+ per month during peak periods."
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
      { "@type": "ListItem", "position": 2, "name": "For Seasonal Workers", "item": `${baseUrl}/career-hub/for-seasonal-workers` }
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Seasonal Jobs & Holiday Work | Peak Season Hiring Guide"
        description="Find the best seasonal jobs during holiday, summer, and peak hiring periods. Higher pay, overtime opportunities, and paths to permanent employment."
        canonical={`${baseUrl}/career-hub/for-seasonal-workers`}
        type="website"
        tags={["seasonal jobs", "holiday work", "summer jobs", "peak season hiring", "temporary employment"]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Snowflake className="w-4 h-4 mr-2" />
              For Seasonal Workers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Maximize Your Earnings During <span className="text-primary">Peak Seasons</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Holiday rush, summer events, Prime Day—capitalize on high-demand periods with more shifts, better pay, and paths to permanent work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="https://indeedflex.com/download-app/" target="_blank" rel="noopener noreferrer">
                  Find Seasonal Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-hub/seasonal-hiring">
                  View Hiring Calendar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Seasonal Work with Indeed Flex</h2>
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

      {/* Seasonal Opportunities Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Seasonal Hiring Peaks</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Know when to maximize your earning potential throughout the year.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalOpportunities.map((opp) => (
              <Card key={opp.season} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{opp.season}</CardTitle>
                    <Badge variant="secondary">{opp.pay}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-2">Top roles:</p>
                  <ul className="space-y-1">
                    {opp.roles.map((role, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        {role}
                      </li>
                    ))}
                  </ul>
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
                <h2 className="text-2xl font-bold">Seasonal Success Guides</h2>
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
                  to="/career-hub/guides?situation=seasonal" 
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center mt-4"
                >
                  View All Seasonal Guides
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Planning Tools</h2>
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
            <h2 className="text-3xl font-bold">Recommended Templates for Seasonal Workers</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Templates optimized for seasonal hiring—highlight availability and quick-start readiness.
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
          <h2 className="text-3xl font-bold mb-4">Ready for Peak Season Earnings?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get ahead of the seasonal rush—start applying now to lock in the best shifts.
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

export default ForSeasonalWorkersPage;
