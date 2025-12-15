import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, TrendingUp, Users, Award } from "lucide-react";

const guides = [
  {
    category: "Getting Started",
    icon: BookOpen,
    articles: [
      { title: "How to Get Your First Flexible Job", slug: "first-flex-job", readTime: "5 min" },
      { title: "Complete Guide to Indeed Flex", slug: "complete-guide", readTime: "8 min" },
      { title: "What to Expect on Your First Shift", slug: "first-shift", readTime: "4 min" },
      { title: "Building Your Worker Profile", slug: "worker-profile", readTime: "6 min" },
    ]
  },
  {
    category: "Career Growth",
    icon: TrendingUp,
    articles: [
      { title: "From Entry-Level to Management: Career Paths", slug: "career-paths", readTime: "10 min" },
      { title: "Skills That Boost Your Hourly Rate", slug: "skill-boost", readTime: "7 min" },
      { title: "Getting Certifications That Pay Off", slug: "certifications", readTime: "8 min" },
      { title: "How to Get More (and Better) Shifts", slug: "more-shifts", readTime: "6 min" },
    ]
  },
  {
    category: "Industry Guides",
    icon: Users,
    articles: [
      { title: "Breaking Into Hospitality Work", slug: "hospitality-guide", readTime: "9 min" },
      { title: "Warehouse Work: What You Need to Know", slug: "warehouse-guide", readTime: "8 min" },
      { title: "Retail Jobs: Tips for Success", slug: "retail-guide", readTime: "7 min" },
      { title: "Facilities & Cleaning Careers", slug: "facilities-guide", readTime: "6 min" },
    ]
  },
  {
    category: "Professional Development",
    icon: Award,
    articles: [
      { title: "Building Your Professional Network", slug: "networking", readTime: "6 min" },
      { title: "Resume Tips for Hourly Workers", slug: "resume-tips", readTime: "5 min" },
      { title: "Interview Skills for Flex Work", slug: "interview-skills", readTime: "7 min" },
      { title: "Balancing Multiple Gigs", slug: "multiple-gigs", readTime: "8 min" },
    ]
  },
];

const GuidesPage = () => {
  return (
    <>
      <Helmet>
        <title>Career Guides | Indeed Flex Career Hub</title>
        <meta name="description" content="Free career guides for flexible workers. Learn how to grow your career, increase your earnings, and succeed in hospitality, warehouse, retail, and facilities work." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/guides" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Career Guides" }]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Career Guides
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Expert advice and actionable tips to help you grow your career, earn more, and succeed in flexible work.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {guides.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.articles.map((article) => (
                      <Card key={article.slug} className="group hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            <Link to={`/career-hub/guides/${article.slug}`} className="flex items-center justify-between">
                              {article.title}
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Get Career Tips in Your Inbox
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive weekly tips on growing your income and advancing your career as a flexible worker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground w-full sm:w-80"
                />
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Put Your Knowledge Into Action"
          subtitle="Download Indeed Flex and start applying what you've learned."
        />
      </Layout>
    </>
  );
};

export default GuidesPage;
