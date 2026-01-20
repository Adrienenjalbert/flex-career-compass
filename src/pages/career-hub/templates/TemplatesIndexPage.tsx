import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { resumeTemplates, templateCategories } from '@/data/resume-templates';
import { FileText, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { TemplateComparison } from '@/components/career-hub/TemplateComparison';
const TemplatesIndexPage = () => {
  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Job Application Toolkit', href: '/career-hub/job-application-toolkit' },
    { label: 'Resume Templates' }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Resume Templates for Temp Workers | 6 ATS-Friendly Formats | Indeed Flex Career Hub</title>
        <meta name="description" content="Choose from 6 professional resume templates designed for temp and flex workers. Chronological, functional, combination, student, and career-gap formats with interactive builders." />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/templates" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">6 Professional Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Resume Templates for Flexible Workers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ATS-optimized templates designed specifically for temp, gig, and flex workers. 
            Each includes an interactive builder with live preview.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Templates', value: '6', icon: FileText },
            { label: 'ATS Tested', value: '100%', icon: CheckCircle2 },
            { label: 'Industries Covered', value: '4', icon: Sparkles },
            { label: 'Free to Use', value: 'Always', icon: CheckCircle2 }
          ].map((stat, i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Comparison */}
        <TemplateComparison />

        {/* Template Categories */}
        {templateCategories.map((category) => (
          <section key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.templates.map((slug) => {
                const template = resumeTemplates[slug];
                if (!template) return null;

                return (
                  <Link key={slug} to={`/career-hub/templates/${slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <span className="text-4xl">{template.icon}</span>
                          <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            View Template
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mt-2">{template.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Industry Fit Bars */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Industrial</span>
                            <span className="font-medium">{template.industryFit.industrial}%</span>
                          </div>
                          <Progress value={template.industryFit.industrial} className="h-2" />
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Hospitality</span>
                            <span className="font-medium">{template.industryFit.hospitality}%</span>
                          </div>
                          <Progress value={template.industryFit.hospitality} className="h-2" />
                        </div>

                        {/* Best For Preview */}
                        <div className="text-sm">
                          <span className="font-medium text-green-600">Best for: </span>
                          <span className="text-muted-foreground">{template.bestFor[0]}</span>
                        </div>

                        <div className="flex items-center gap-1 mt-4 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          Open Template <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Choosing Guide */}
        <Card className="bg-muted/50 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Which Template Should You Choose?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Choose Chronological If:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You have steady work history without gaps</li>
                  <li>• You're staying in the same industry</li>
                  <li>• Applying to traditional employers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Functional If:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You're changing careers</li>
                  <li>• You have employment gaps</li>
                  <li>• Your skills matter more than job history</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Temp/Flex Worker If:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You have multiple short assignments</li>
                  <li>• You work through Indeed Flex or similar platforms</li>
                  <li>• You prefer variety over permanent roles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Career Gap If:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You're returning after caregiving</li>
                  <li>• You have 6+ months of unemployment</li>
                  <li>• You need to address gaps strategically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Each template includes an interactive builder. Fill in your information, preview in real-time, 
            and copy your completed resume with one click.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/career-hub/templates/chronological" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start with Chronological <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/career-hub/templates/temp-worker" className="inline-flex items-center gap-2 bg-background border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
              Try Temp Worker Format <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesIndexPage;
