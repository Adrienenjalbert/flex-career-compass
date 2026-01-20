import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { CopyPanel } from '@/components/career-hub/resume/CopyPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeTemplates } from '@/data/resume-templates';
import { CheckCircle2, XCircle, Lightbulb, Building2, ArrowRight, FileText, Download, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TemplatePage = () => {
  const { templateSlug } = useParams<{ templateSlug: string }>();
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  const template = templateSlug ? resumeTemplates[templateSlug] : null;

  if (!template) {
    return <Navigate to="/career-hub/templates" replace />;
  }

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Job Application Toolkit', href: '/career-hub/job-application-toolkit' },
    { label: 'Templates', href: '/career-hub/templates' },
    { label: template.name }
  ];

  const handleVariableChange = (id: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [id]: value }));
  };

  // Convert template sections and variables to CopyPanel format
  const copyPanelSections = template.sections.map(section => ({
    id: section.id,
    title: section.name,
    content: section.content
  }));

  const copyPanelVariables = template.variables.map(v => ({
    key: v.id,
    label: v.label,
    placeholder: v.placeholder,
    defaultValue: v.defaultValue,
    type: v.type === 'textarea' ? 'textarea' as const : 'text' as const
  }));

  // Build full resume preview with specific data
  const buildResumeWithData = (data: Record<string, string>) => {
    let content = '';
    template.sections.forEach(section => {
      let sectionContent = section.content;
      template.variables.forEach(v => {
        const value = data[v.id] || v.placeholder || `[${v.label}]`;
        sectionContent = sectionContent.replace(new RegExp(`\\{${v.id}\\}`, 'g'), value);
      });
      content += sectionContent + '\n\n';
    });
    return content.trim();
  };

  // Build resume with user's input
  const buildFullResume = () => buildResumeWithData(variableValues);
  
  // Build resume with example data
  const buildExampleResume = () => buildResumeWithData(template.exampleData);

  const copyFullResume = () => {
    navigator.clipboard.writeText(buildFullResume());
    toast.success('Full resume copied to clipboard!');
  };

  const downloadResume = () => {
    const blob = new Blob([buildFullResume()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.slug}-resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Resume downloaded!');
  };

  // Related templates
  const relatedTemplates = Object.values(resumeTemplates)
    .filter(t => t.slug !== template.slug)
    .slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>{template.name} | Free Template & Builder | Indeed Flex Career Hub</title>
        <meta name="description" content={`${template.description} Interactive builder with live preview. Perfect for ${template.bestFor[0].toLowerCase()}.`} />
        <link rel="canonical" href={`https://flex-career-compass.lovable.app/career-hub/templates/${template.slug}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{template.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {template.name}
                </h1>
                <p className="text-muted-foreground">Free Template & Interactive Builder</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {template.description}
            </p>

            {/* Industry Fit */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Industry Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(template.industryFit).map(([industry, score]) => (
                    <div key={industry}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="capitalize">{industry}</span>
                        <span className={`font-medium ${score >= 85 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          {score}%
                        </span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={copyFullResume} className="w-full" variant="default">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Full Resume
                </Button>
                <Button onClick={downloadResume} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download as Text
                </Button>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Or customize below:</p>
                  <a href="#builder" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                    Go to Interactive Builder <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Best For / Not Recommended */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                Best For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {template.bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="w-5 h-5" />
                Not Recommended For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {template.notRecommendedFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pro Tips */}
        <Card className="mb-8 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              Pro Tips for This Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {template.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                    {i + 1}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Builder */}
        <div id="builder" className="scroll-mt-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Interactive Resume Builder
          </h2>
          
          <Tabs defaultValue="example" className="mb-8">
            <TabsList>
              <TabsTrigger value="example">View Example</TabsTrigger>
              <TabsTrigger value="builder">Build Your Resume</TabsTrigger>
              <TabsTrigger value="preview">Your Preview</TabsTrigger>
              <TabsTrigger value="sections">Section Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="example" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Sample Resume
                      </CardTitle>
                      <CardDescription>
                        See what this template looks like with realistic example content
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">Example Data</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-8 font-mono text-sm whitespace-pre-wrap min-h-[400px]">
                    {buildExampleResume()}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <a href="#builder" className="text-primary font-medium hover:underline flex items-center gap-1">
                      Use This Template → Customize with Your Info
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="builder" className="mt-6">
              <CopyPanel
                sections={copyPanelSections}
                variables={copyPanelVariables}
                roleTitle={template.name}
                onVariableChange={handleVariableChange}
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Resume Preview</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={copyFullResume}>
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={downloadResume}>
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Your completed resume based on the information you've entered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-8 font-mono text-sm whitespace-pre-wrap min-h-[400px]">
                    {buildFullResume()}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sections" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {template.sections.map((section, i) => (
                  <Card key={section.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {i + 1}. {section.name}
                        </CardTitle>
                        <Badge variant={section.required ? 'default' : 'secondary'}>
                          {section.required ? 'Required' : 'Optional'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {section.required 
                          ? 'Include this section for best results.' 
                          : 'Add if relevant to your situation.'}
                      </p>
                      <div className="bg-muted/50 rounded p-3 text-xs font-mono">
                        {section.content.substring(0, 100)}...
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Templates */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Other Templates You Might Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedTemplates.map((related) => (
              <Link key={related.slug} to={`/career-hub/templates/${related.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{related.icon}</span>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {related.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {related.description}
                    </p>
                    <span className="text-primary text-sm font-medium flex items-center gap-1">
                      View Template <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Put Your Resume to Work</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Once your resume is ready, start applying to flexible work opportunities through Indeed Flex.
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
              to="/career-hub/resume-examples"
              className="inline-flex items-center gap-2 bg-background border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Browse Role-Specific Examples <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplatePage;
