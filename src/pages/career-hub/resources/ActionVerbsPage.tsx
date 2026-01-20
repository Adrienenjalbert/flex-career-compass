import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { actionVerbs, actionVerbCategories, skillCategories } from '@/data/action-verbs';
import { Search, Copy, Check, Star, Zap, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const ActionVerbsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string | 'all'>('all');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Job Application Toolkit', href: '/career-hub/job-application-toolkit' },
    { label: 'Action Verbs & Skills' }
  ];

  const filteredVerbs = useMemo(() => {
    return actionVerbs.filter(verb => {
      const matchesSearch = verb.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.example.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || verb.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'all' || verb.industries.includes(selectedIndustry);
      return matchesSearch && matchesCategory && matchesIndustry;
    });
  }, [searchTerm, selectedCategory, selectedIndustry]);

  const copyVerb = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    toast.success(`"${verb}" copied!`);
    setTimeout(() => setCopiedVerb(null), 2000);
  };

  const copyAllInCategory = (category: string) => {
    const verbs = actionVerbs
      .filter(v => v.category === category)
      .map(v => v.verb)
      .join(', ');
    navigator.clipboard.writeText(verbs);
    toast.success(`All ${category} verbs copied!`);
  };

  const stats = useMemo(() => ({
    total: actionVerbs.length,
    strong: actionVerbs.filter(v => v.strength === 'strong').length,
    categories: actionVerbCategories.length
  }), []);

  return (
    <Layout>
      <Helmet>
        <title>200+ Resume Action Verbs & Power Words | Free Library | Indeed Flex Career Hub</title>
        <meta name="description" content="Browse 200+ categorized action verbs and power words for your resume. Filter by industry, copy with one click, and see real examples for warehouse, hospitality, and retail jobs." />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/resources/action-verbs" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">{stats.total}+ Power Words</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Action Verbs & Power Words
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform boring resume bullets into compelling achievements. 
            Click any verb to copy, or browse by category and industry.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{stats.total}+</div>
              <div className="text-sm text-muted-foreground">Action Verbs</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{stats.categories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{stats.strong}</div>
              <div className="text-sm text-muted-foreground">Strong Verbs</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verbs" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verbs">Action Verbs</TabsTrigger>
            <TabsTrigger value="skills">Skills Library</TabsTrigger>
          </TabsList>

          <TabsContent value="verbs" className="mt-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search verbs or examples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background"
              >
                <option value="all">All Categories</option>
                {actionVerbCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background"
              >
                <option value="all">All Industries</option>
                <option value="industrial">Industrial/Warehouse</option>
                <option value="hospitality">Hospitality</option>
                <option value="retail">Retail</option>
                <option value="facilities">Facilities</option>
              </select>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredVerbs.length} of {actionVerbs.length} verbs
            </p>

            {/* Verbs by Category */}
            {actionVerbCategories.map(category => {
              const categoryVerbs = filteredVerbs.filter(v => v.category === category.id);
              if (categoryVerbs.length === 0) return null;

              return (
                <Card key={category.id} className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span>{category.icon}</span>
                        {category.name}
                        <Badge variant="secondary" className="ml-2">{categoryVerbs.length}</Badge>
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyAllInCategory(category.id)}
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categoryVerbs.map(verb => (
                        <Button
                          key={verb.verb}
                          variant="outline"
                          size="sm"
                          onClick={() => copyVerb(verb.verb)}
                          className={`
                            transition-all
                            ${verb.strength === 'strong' ? 'border-primary/50 hover:border-primary' : ''}
                            ${copiedVerb === verb.verb ? 'bg-primary text-primary-foreground' : ''}
                          `}
                        >
                          {copiedVerb === verb.verb ? (
                            <Check className="w-3 h-3 mr-1" />
                          ) : verb.strength === 'strong' ? (
                            <Star className="w-3 h-3 mr-1 text-amber-500" />
                          ) : null}
                          {verb.verb}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Examples */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Example Usage:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {categoryVerbs.slice(0, 3).map(verb => (
                          <li key={verb.verb} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {verb.example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {skillCategories.map(category => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => {
                            navigator.clipboard.writeText(skill);
                            toast.success(`"${skill}" copied!`);
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        navigator.clipboard.writeText(category.skills.join(', '));
                        toast.success(`All ${category.name} skills copied!`);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-1" /> Copy All Skills
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Pro Tips for Using Action Verbs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">✅ Do This:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Start every bullet point with an action verb</li>
                  <li>• Use past tense for previous jobs, present for current</li>
                  <li>• Vary your verbs - don't repeat the same one</li>
                  <li>• Match verb strength to achievement importance</li>
                  <li>• Include numbers after the verb when possible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">❌ Avoid This:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Starting with "Responsible for..." (too passive)</li>
                  <li>• Using "Helped" or "Assisted" when you can be specific</li>
                  <li>• Weak verbs like "Did," "Made," or "Worked"</li>
                  <li>• Using the same verb multiple times</li>
                  <li>• Verbs without measurable outcomes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/career-hub/resources/bullet-generator">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BookOpen className="w-5 h-5" />
                  Achievement Bullet Generator
                </CardTitle>
                <CardDescription>
                  Build STAR-format achievement bullets with our interactive templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  Build Bullets <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/career-hub/resume-examples">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Sparkles className="w-5 h-5" />
                  Role-Specific Examples
                </CardTitle>
                <CardDescription>
                  See these verbs in action with complete resume examples for 23 roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  View Examples <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ActionVerbsPage;
