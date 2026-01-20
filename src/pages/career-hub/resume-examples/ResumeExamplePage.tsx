import { useParams, Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { CopyPanel } from "@/components/career-hub/resume/CopyPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy,
  CheckCircle2,
  Target,
  Award,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  ChevronRight,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { resumeExamples, type ExperienceLevel } from "@/data/resume-content";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const experienceLevelLabels: Record<ExperienceLevel, string> = {
  'entry-level': 'Entry Level',
  'experienced': 'Experienced',
  'career-change': 'Career Change',
  'no-experience': 'No Experience'
};

const experienceLevelIcons: Record<ExperienceLevel, React.ReactNode> = {
  'entry-level': <Briefcase className="w-4 h-4" />,
  'experienced': <Star className="w-4 h-4" />,
  'career-change': <TrendingUp className="w-4 h-4" />,
  'no-experience': <GraduationCap className="w-4 h-4" />
};

const ResumeExamplePage = () => {
  const { roleSlug, variation } = useParams<{ roleSlug: string; variation?: string }>();
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<number | null>(null);
  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);

  const example = useMemo(() => 
    resumeExamples.find(r => r.roleSlug === roleSlug),
    [roleSlug]
  );

  const currentLevel: ExperienceLevel = (variation as ExperienceLevel) || 
    (example?.experienceLevels[0] || 'entry-level');

  if (!example) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Resume Example Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a resume example for this role.
          </p>
          <Link to="/career-hub/resume-examples" className="text-primary hover:underline">
            Browse all resume examples →
          </Link>
        </div>
      </Layout>
    );
  }

  const currentSummary = example.professionalSummaries.find(s => s.level === currentLevel);
  const currentTemplate = example.templateSections.find(t => t.level === currentLevel);

  const copyToClipboard = (text: string, type: 'keyword' | 'summary' | 'bullet', index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'keyword') {
      setCopiedKeyword(text);
      setTimeout(() => setCopiedKeyword(null), 2000);
    } else if (type === 'summary' && index !== undefined) {
      setCopiedSummary(index);
      setTimeout(() => setCopiedSummary(null), 2000);
    } else if (type === 'bullet' && index !== undefined) {
      setCopiedBullet(index);
      setTimeout(() => setCopiedBullet(null), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  const copyAllKeywords = () => {
    const allKeywords = example.skillsKeywords.map(s => s.keyword).join(", ");
    navigator.clipboard.writeText(allKeywords);
    toast.success("All keywords copied!");
  };

  const relatedRoles = resumeExamples
    .filter(r => r.industry === example.industry && r.roleSlug !== example.roleSlug)
    .slice(0, 3);

  // Build sections and variables for CopyPanel
  const panelSections = currentTemplate?.sections || [
    { id: 'summary', title: 'Professional Summary', content: currentSummary?.text || '' }
  ];
  
  const panelVariables = [
    { key: 'name', label: 'Your Name', placeholder: 'John Smith' },
    { key: 'city', label: 'City, State', placeholder: 'Austin, TX' },
    { key: 'phone', label: 'Phone', placeholder: '(555) 123-4567' },
    { key: 'email', label: 'Email', placeholder: 'john@email.com' },
    { key: 'company', label: 'Company Name', placeholder: 'Amazon Fulfillment' },
    { key: 'years', label: 'Years Experience', placeholder: '2' },
  ];

  return (
    <Layout>
      <SEOMetaTags
        title={`${example.roleTitle} Resume Example & Template 2026 | Indeed Flex Career Hub`}
        description={example.metaDescription}
        canonical={`https://flex-career-compass.lovable.app/career-hub/resume-examples/${example.roleSlug}${variation ? `/${variation}` : ''}`}
        keywords={[`${example.roleTitle.toLowerCase()} resume`, `${example.roleTitle.toLowerCase()} cv`, ...example.skillsKeywords.slice(0, 5).map(s => s.keyword)]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-4 [&_nav]:text-primary-foreground/80 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground">
            <Breadcrumbs 
              items={[
                { label: "Resume Examples", href: "/career-hub/resume-examples" },
                { label: `${example.roleTitle} Resume` }
              ]}
            />
          </div>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                {example.industry}
              </Badge>
              {example.blsData && (
                <Badge className="bg-emerald-500/20 text-emerald-100 border-0">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {example.blsData.medianHourly}/hr median
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {example.roleTitle} Resume Example
            </h1>
            
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl">
              {example.metaDescription}
            </p>

            {/* Experience Level Tabs */}
            <div className="flex flex-wrap gap-2">
              {example.experienceLevels.map(level => (
                <Link
                  key={level}
                  to={`/career-hub/resume-examples/${example.roleSlug}${level !== example.experienceLevels[0] ? `/${level}` : ''}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentLevel === level
                      ? 'bg-primary-foreground text-primary font-medium'
                      : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                  }`}
                >
                  {experienceLevelIcons[level]}
                  {experienceLevelLabels[level]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with CopyPanel Sidebar */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Quick Stats */}
              {example.blsData && (
                <Card className="mb-8 border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{example.blsData.medianHourly}</div>
                        <div className="text-sm text-muted-foreground">Median Hourly</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{example.blsData.jobGrowth}</div>
                        <div className="text-sm text-muted-foreground">Job Growth</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{example.blsData.totalJobs}</div>
                        <div className="text-sm text-muted-foreground">Total Jobs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{example.blsData.outlook}</div>
                        <div className="text-sm text-muted-foreground">Outlook</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Source: {example.blsData.source} ({example.blsData.lastUpdated})
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* ATS Keywords Section */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      ATS Keywords for {example.roleTitle}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={copyAllKeywords}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Include these keywords in your resume to pass Applicant Tracking Systems (ATS). 
                    Click any keyword to copy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.skillsKeywords.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(skill.keyword, 'keyword')}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                          copiedKeyword === skill.keyword
                            ? 'bg-emerald-500 text-white'
                            : skill.atsScore >= 90
                            ? 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20'
                            : skill.atsScore >= 70
                            ? 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border border-amber-500/20'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {copiedKeyword === skill.keyword ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : null}
                        {skill.keyword}
                        {skill.atsScore >= 90 && <Star className="w-3 h-3 ml-1" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/30" />
                      High priority (90+)
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                      Medium (70-89)
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      Include if applicable
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary Generator */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Professional Summary Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose a summary that matches your experience level. Click to copy.
                  </p>
                  
                  <Tabs defaultValue={currentLevel} className="w-full">
                    <TabsList className="w-full flex flex-wrap h-auto gap-1 mb-4">
                      {example.professionalSummaries.map(summary => (
                        <TabsTrigger 
                          key={summary.level} 
                          value={summary.level}
                          className="flex-1 min-w-[120px]"
                        >
                          {experienceLevelLabels[summary.level]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {example.professionalSummaries.map((summary, index) => (
                      <TabsContent key={summary.level} value={summary.level}>
                        <div 
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            copiedSummary === index
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                          onClick={() => copyToClipboard(summary.text, 'summary', index)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-foreground leading-relaxed">
                              {summary.text}
                            </p>
                            {copiedSummary === index ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Copy className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Achievement Bullets */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Achievement Bullet Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use these STAR-format bullets to describe your accomplishments. Customize the numbers with your actual metrics.
                  </p>
                  
                  <div className="space-y-3">
                    {example.bulletExamples.map((bullet, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          copiedBullet === index
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onClick={() => copyToClipboard(`${bullet.action} ${bullet.metric} ${bullet.result}`, 'bullet', index)}
                      >
                        <Badge variant="outline" className="flex-shrink-0 mt-0.5">
                          {bullet.category}
                        </Badge>
                        <p className="flex-1 text-foreground">
                          <span className="font-medium text-primary">{bullet.action}</span>{" "}
                          <span className="text-emerald-600 font-medium">{bullet.metric}</span>{" "}
                          {bullet.result}
                        </p>
                        {copiedBullet === index ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Copy className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              {example.certifications.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Recommended Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {example.certifications.map((cert, index) => (
                        <div key={index} className="p-4 rounded-lg border border-border">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{cert.name}</h4>
                            {cert.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="w-3 h-3" />
                              {cert.cost}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600">
                              <TrendingUp className="w-3 h-3" />
                              {cert.payBoost}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {cert.timeToComplete}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQ Section */}
              {example.faqs.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {example.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}

              {/* Related Roles */}
              {relatedRoles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related {example.industry} Resumes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {relatedRoles.map(role => (
                        <Link
                          key={role.roleSlug}
                          to={`/career-hub/resume-examples/${role.roleSlug}`}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                        >
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {role.roleTitle} Resume
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {role.metaDescription}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar - Copy Panel */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="sticky top-4">
                <CopyPanel
                  sections={panelSections}
                  variables={panelVariables}
                  roleTitle={example.roleTitle}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ResumeExamplePage;
