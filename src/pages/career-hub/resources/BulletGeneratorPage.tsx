import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bulletTemplates, actionVerbCategories } from '@/data/action-verbs';
import { Copy, Check, ArrowRight, Sparkles, Target, Lightbulb, RefreshCw, Zap } from 'lucide-react';
import { toast } from 'sonner';

const BulletGeneratorPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('warehouse');
  const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [templateValues, setTemplateValues] = useState<Record<string, Record<string, string>>>({});

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Job Application Toolkit', href: '/career-hub/job-application-toolkit' },
    { label: 'Achievement Bullet Generator' }
  ];

  const categories = [
    { id: 'warehouse', name: 'Warehouse', icon: '📦' },
    { id: 'hospitality', name: 'Hospitality', icon: '🍽️' },
    { id: 'retail', name: 'Retail', icon: '🛒' },
    { id: 'facilities', name: 'Facilities', icon: '🧹' },
    { id: 'general', name: 'General', icon: '⭐' }
  ];

  const categoryTemplates = useMemo(() => 
    bulletTemplates.filter(t => t.category === selectedCategory),
    [selectedCategory]
  );

  const handleValueChange = (templateId: string, variableId: string, value: string) => {
    setTemplateValues(prev => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [variableId]: value
      }
    }));
  };

  const generateBullet = (templateId: string) => {
    const template = bulletTemplates.find(t => t.id === templateId);
    if (!template) return '';

    let result = template.template;
    const values = templateValues[templateId] || {};
    
    template.variables.forEach(v => {
      const value = values[v.id] || v.placeholder;
      result = result.replace(`{${v.id}}`, value);
    });

    return result;
  };

  const copyBullet = (bullet: string, index: number) => {
    navigator.clipboard.writeText(bullet);
    setCopiedIndex(index);
    toast.success('Bullet copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const addToCollection = (bullet: string) => {
    if (!generatedBullets.includes(bullet)) {
      setGeneratedBullets(prev => [...prev, bullet]);
      toast.success('Added to your collection!');
    }
  };

  const copyAllBullets = () => {
    navigator.clipboard.writeText(generatedBullets.join('\n• '));
    toast.success('All bullets copied!');
  };

  const clearCollection = () => {
    setGeneratedBullets([]);
    toast.success('Collection cleared');
  };

  return (
    <Layout>
      <Helmet>
        <title>STAR Achievement Bullet Generator | Resume Builder | Indeed Flex Career Hub</title>
        <meta name="description" content="Generate powerful STAR-format achievement bullets for your resume. 20+ templates for warehouse, hospitality, and retail roles. Fill in your numbers and copy." />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/resources/bullet-generator" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">STAR Method Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Achievement Bullet Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turn your work experience into powerful resume bullets. 
            Fill in your numbers, copy the result, and impress hiring managers.
          </p>
        </div>

        {/* STAR Method Explainer */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              The STAR Method for Resume Bullets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { letter: 'S', word: 'Situation', desc: 'Set the context', example: 'During peak holiday season...' },
                { letter: 'T', word: 'Task', desc: 'Describe your responsibility', example: '...responsible for order processing...' },
                { letter: 'A', word: 'Action', desc: 'What you did (use action verbs!)', example: '...implemented batch picking system...' },
                { letter: 'R', word: 'Result', desc: 'Quantifiable outcome', example: '...increasing throughput by 30%' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-2">
                    {item.letter}
                  </div>
                  <div className="font-semibold">{item.word}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Builder */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Industry</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(cat => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.icon} {cat.name}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {categoryTemplates.map((template, idx) => {
                  const generatedBullet = generateBullet(template.id);
                  
                  return (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="capitalize">
                          {template.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addToCollection(generatedBullet)}
                          >
                            <Zap className="w-4 h-4 mr-1" /> Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyBullet(generatedBullet, idx)}
                          >
                            {copiedIndex === idx ? (
                              <><Check className="w-4 h-4 mr-1" /> Copied</>
                            ) : (
                              <><Copy className="w-4 h-4 mr-1" /> Copy</>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Variable Inputs */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {template.variables.map(v => (
                          <div key={v.id}>
                            <Label className="text-xs">{v.label}</Label>
                            <Input
                              type={v.type}
                              placeholder={v.placeholder}
                              value={templateValues[template.id]?.[v.id] || ''}
                              onChange={(e) => handleValueChange(template.id, v.id, e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Preview */}
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Preview:</p>
                        <p className="text-sm">• {generatedBullet}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Collection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Bullet Collection</CardTitle>
                  <Badge>{generatedBullets.length}</Badge>
                </div>
                <CardDescription>
                  Build your resume by adding bullets here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedBullets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click "Add" on templates to build your collection</p>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {generatedBullets.map((bullet, i) => (
                      <div 
                        key={i} 
                        className="text-sm bg-muted/50 rounded p-2 flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        <span className="flex-1">{bullet}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => setGeneratedBullets(prev => prev.filter((_, idx) => idx !== i))}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={copyAllBullets} 
                    className="flex-1"
                    disabled={generatedBullets.length === 0}
                  >
                    <Copy className="w-4 h-4 mr-1" /> Copy All
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCollection}
                    disabled={generatedBullets.length === 0}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-muted-foreground">
                <p>• Use specific numbers - "150 orders" beats "many orders"</p>
                <p>• Include percentages for improvements</p>
                <p>• Mention timeframes (daily, monthly, over 12 months)</p>
                <p>• Lead with your most impressive achievements</p>
                <p>• Keep bullets to 1-2 lines max</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Links */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link to="/career-hub/resources/action-verbs">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Zap className="w-5 h-5" />
                  Action Verbs Library
                </CardTitle>
                <CardDescription>
                  Browse 200+ power words to start your achievement bullets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  View Verbs <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/career-hub/templates">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Sparkles className="w-5 h-5" />
                  Resume Templates
                </CardTitle>
                <CardDescription>
                  Use your bullets in our 6 professional resume formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  View Templates <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default BulletGeneratorPage;
