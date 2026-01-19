import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, TrendingUp, Globe, GraduationCap, MessageSquare } from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import { SEOMetaTags } from "@/components/career-hub/seo";
import CTASection from "@/components/career-hub/CTASection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GrowHub = () => {
  const gettingStartedGuides = [
    { title: 'How to Get Your First Flexible Job', slug: 'first-flex-job', readTime: '5 min' },
    { title: 'Complete Guide to Indeed Flex', slug: 'complete-guide', readTime: '8 min' },
    { title: 'What to Expect on Your First Shift', slug: 'first-shift', readTime: '4 min' },
    { title: 'Building Your Worker Profile', slug: 'worker-profile', readTime: '6 min' },
  ];

  const skillsTraining = [
    { title: 'WorkTalk (Job English)', slug: 'worktalk', icon: MessageSquare, description: 'Practice workplace phrases' },
    { title: 'Career Path Explorer', slug: 'career-path', icon: TrendingUp, description: 'Plan your growth' },
    { title: 'Cocktail Quiz', slug: 'cocktail-quiz', icon: Award, description: 'Test bartending knowledge' },
    { title: 'Safety First', slug: 'safety-first', icon: Award, description: 'Warehouse safety training' },
  ];

  const workAuthGuides = [
    { title: 'Form I-9 Complete Guide', slug: 'i9-complete-guide', readTime: '12 min' },
    { title: 'I-9 Documents Explained', slug: 'i9-documents-list', readTime: '8 min' },
    { title: 'E-Verify Explained', slug: 'e-verify-explained', readTime: '7 min' },
    { title: 'Working in America: First Job Guide', slug: 'first-job-america-guide', readTime: '15 min' },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Grow - Indeed Flex Career Hub",
    "description": "Learn skills, get certifications, and advance your flexible work career with free guides and training.",
    "url": "https://indeedflex.com/career-hub/grow"
  };

  return (
    <>
      <SEOMetaTags
        title="Career Growth & Training | Indeed Flex Career Hub"
        description="Free career guides, skills training, and certifications for flexible workers. Learn how to get started, advance your career, and navigate work authorization."
        canonical="/career-hub/grow"
        keywords={["career growth", "job training", "certifications", "I-9 guide", "gig worker skills"]}
      />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <GraduationCap className="h-3 w-3 mr-1" />
                Grow
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Build Your Career, Your Way
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Free guides, skills training, and resources to help you get started, earn more, and advance in flexible work.
              </p>
              <Link
                to="/career-hub/guides/complete-guide"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-purple-700 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Getting Started</h2>
            </div>
            <p className="text-muted-foreground mb-8">Essential guides for new flexible workers</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {gettingStartedGuides.map((guide) => (
                <Link 
                  key={guide.slug} 
                  to={`/career-hub/guides/${guide.slug}`}
                  className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{guide.title}</h3>
                    <span className="text-sm text-muted-foreground">{guide.readTime} read</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Training Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Skills & Training</h2>
            </div>
            <p className="text-muted-foreground mb-8">Interactive tools to build job-ready skills</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsTraining.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.slug} to={`/career-hub/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors w-fit">
                          <Icon className="h-6 w-6 text-purple-700" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-700 transition-colors">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Certifications That Pay Off</h3>
                  <p className="text-muted-foreground">Forklift, TIPS, Food Handler & more — see which boost your pay</p>
                </div>
                <Link
                  to="/career-hub/guides/certifications"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl font-medium transition-colors"
                >
                  View Certifications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Work Authorization Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Work Authorization</h2>
            </div>
            <p className="text-muted-foreground mb-8">I-9, E-Verify, and eligibility guides</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {workAuthGuides.map((guide) => (
                <Link 
                  key={guide.slug} 
                  to={`/career-hub/guides/${guide.slug}`}
                  className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{guide.title}</h3>
                    <span className="text-sm text-muted-foreground">{guide.readTime} read</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Career Advancement CTA */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 md:p-12 rounded-2xl">
              <div className="max-w-2xl">
                <TrendingUp className="h-10 w-10 mb-4 opacity-80" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Advance?</h2>
                <p className="text-primary-foreground/80 mb-6">
                  Learn how to get 5-star ratings, join Talent Pools, and transition from temp to permanent roles.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/career-hub/guides/more-shifts"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-5 py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Get More Shifts
                  </Link>
                  <Link
                    to="/career-hub/guides/temp-to-perm-guide"
                    className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-5 py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Temp to Perm Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default GrowHub;
