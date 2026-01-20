import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { coverLetterTemplates, coverLetterCategories } from '@/data/cover-letter-templates';
import { ArrowRight, FileText, Lightbulb, CheckCircle2, Mail } from 'lucide-react';

const CoverLettersIndexPage = () => {
  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Job Application Toolkit', href: '/career-hub/job-application-toolkit' },
    { label: 'Cover Letter Templates' }
  ];

  const templates = Object.values(coverLetterTemplates);

  return (
    <Layout>
      <Helmet>
        <title>Free Cover Letter Templates for Temp & Flex Workers | Indeed Flex Career Hub</title>
        <meta 
          name="description" 
          content="Professional cover letter templates designed for temp workers, gig economy, and flexible work. Standard, hospitality, warehouse, and career-change formats with interactive builders." 
        />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/cover-letters" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Cover Letter Templates for Flexible Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional cover letter templates designed specifically for temp workers, gig economy professionals, 
            and those seeking flexible work opportunities through Indeed Flex.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{templates.length}</div>
              <p className="text-sm text-muted-foreground">Templates</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">Industries</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground">Free</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">∞</div>
              <p className="text-sm text-muted-foreground">Customizable</p>
            </CardContent>
          </Card>
        </div>

        {/* Template Categories */}
        {coverLetterCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.templates.map((templateSlug) => {
                const template = coverLetterTemplates[templateSlug];
                if (!template) return null;

                return (
                  <Link key={template.slug} to={`/career-hub/cover-letters/${template.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{template.icon}</span>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {template.name}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Industry Fit Preview */}
                        <div className="space-y-2 mb-4">
                          {Object.entries(template.industryFit)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 2)
                            .map(([industry, score]) => (
                              <div key={industry} className="flex items-center gap-2">
                                <span className="text-xs capitalize w-20">{industry}</span>
                                <Progress value={score} className="h-1.5 flex-1" />
                                <span className="text-xs font-medium w-8">{score}%</span>
                              </div>
                            ))}
                        </div>

                        {/* Best For Tag */}
                        <Badge variant="secondary" className="text-xs">
                          Best for: {template.bestFor[0].length > 30 
                            ? template.bestFor[0].substring(0, 30) + '...' 
                            : template.bestFor[0]}
                        </Badge>

                        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                          Use Template <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* All Templates Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Cover Letter Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Link key={template.slug} to={`/career-hub/cover-letters/${template.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{template.icon}</span>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      Build Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Guidance Section */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Choosing the Right Cover Letter Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  For Traditional Applications
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the <strong>Standard</strong> or industry-specific templates when applying 
                  through formal channels, job boards, or when a cover letter is specifically requested.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  For Temp/Flex Work
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The <strong>Temp/Flex Worker</strong> template emphasizes availability, reliability, 
                  and adaptability—key traits that staffing agencies prioritize.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  For Career Changers
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're transitioning from another field, the <strong>Career Changer</strong> template 
                  helps you highlight transferable skills and explain your motivation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  For Entry-Level
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Students and first-time workers should use the <strong>Entry-Level</strong> template 
                  to showcase education, volunteer work, and enthusiasm.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/career-hub/templates">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Resume Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    6 resume formats for every career situation
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/career-hub/resources/action-verbs">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <span className="text-3xl mb-3 block">💪</span>
                  <h3 className="font-semibold mb-2">Action Verbs Library</h3>
                  <p className="text-sm text-muted-foreground">
                    200+ power words to strengthen your application
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/career-hub/resume-examples">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <span className="text-3xl mb-3 block">📋</span>
                  <h3 className="font-semibold mb-2">Role-Specific Examples</h3>
                  <p className="text-sm text-muted-foreground">
                    Real examples for 20+ flex work roles
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Once your cover letter is ready, pair it with a matching resume and start applying 
            to flexible work opportunities through Indeed Flex.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://indeedflex.com/download-app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Download Indeed Flex <ArrowRight className="w-4 h-4" />
            </a>
            <Link 
              to="/career-hub/templates"
              className="inline-flex items-center gap-2 bg-background border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Browse Resume Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoverLettersIndexPage;
