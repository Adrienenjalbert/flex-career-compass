import { Link } from "react-router-dom";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { SEOMetaTags } from "@/components/career-hub/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Warehouse, 
  UtensilsCrossed, 
  Store, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Star,
  Clock,
  Target,
  Award,
  Users,
  Zap,
  Download,
  Sparkles
} from "lucide-react";

// Role-specific resume data
const roleResumeTips = [
  {
    id: "warehouse",
    title: "Warehouse & Industrial",
    icon: Warehouse,
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/20",
    description: "Stand out for picker/packer, forklift, and warehouse roles",
    keySkills: [
      "Order picking accuracy rate (e.g., 99.8% accuracy)",
      "Forklift certification (sit-down, stand-up, reach)",
      "RF scanner & WMS system experience",
      "Physical stamina (lifting 50+ lbs repeatedly)",
      "Safety record (days without incident)",
      "Speed metrics (picks per hour, units processed)"
    ],
    resumeTips: [
      {
        title: "Lead with Numbers",
        tip: "Instead of 'Picked orders in warehouse,' write 'Picked 200+ orders daily with 99.5% accuracy rate'",
        icon: Target
      },
      {
        title: "Highlight Certifications",
        tip: "List forklift types (sit-down, stand-up, reach truck) and any OSHA training",
        icon: Award
      },
      {
        title: "Show Reliability",
        tip: "Mention attendance record, on-time percentage, or willingness to work overtime",
        icon: Clock
      },
      {
        title: "Tech Skills Matter",
        tip: "Include WMS systems you've used: Manhattan, SAP, Oracle, or RF scanners",
        icon: Zap
      }
    ],
    sampleBullets: [
      "Processed 250+ orders per shift using RF scanner with 99.7% accuracy",
      "Operated sit-down and stand-up forklifts safely for 18+ months",
      "Maintained 100% attendance record over 6-month period",
      "Trained 5 new team members on pick/pack procedures",
      "Exceeded daily productivity targets by 15% consistently"
    ],
    commonMistakes: [
      "Using vague phrases like 'worked in warehouse'",
      "Forgetting to mention specific equipment certifications",
      "Not including safety record or training",
      "Leaving out productivity metrics"
    ]
  },
  {
    id: "hospitality",
    title: "Hospitality & Events",
    icon: UtensilsCrossed,
    color: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/20",
    description: "Perfect your resume for server, bartender, and event staff roles",
    keySkills: [
      "POS system experience (Toast, Square, Aloha)",
      "Food handler's permit / ServSafe certification",
      "TIPS or alcohol service certification",
      "High-volume service experience",
      "Menu knowledge and upselling",
      "Guest satisfaction scores"
    ],
    resumeTips: [
      {
        title: "Quantify Guest Experience",
        tip: "Mention tables served per shift, guest satisfaction scores, or tip percentages",
        icon: Users
      },
      {
        title: "List Your Certifications",
        tip: "Food handler's permit, ServSafe, TIPS, and any specialty training (wine, cocktails)",
        icon: Award
      },
      {
        title: "Show Upselling Results",
        tip: "Include average check increase, appetizer/dessert sales percentages",
        icon: Target
      },
      {
        title: "Highlight Versatility",
        tip: "Show you can work different positions: host, server, bartender, food runner",
        icon: Zap
      }
    ],
    sampleBullets: [
      "Served 50+ guests per shift in high-volume restaurant averaging $300+ in daily tips",
      "Achieved 98% positive reviews on guest satisfaction surveys",
      "Increased average check by 18% through appetizer and drink upselling",
      "ServSafe and TIPS certified with 3+ years of alcohol service experience",
      "Trained 8 new servers on POS system and restaurant procedures"
    ],
    commonMistakes: [
      "Not including specific POS systems you've used",
      "Forgetting food safety certifications",
      "Using generic phrases like 'great customer service'",
      "Leaving out volume indicators (covers, tables, events)"
    ]
  },
  {
    id: "retail",
    title: "Retail & Customer Service",
    icon: Store,
    color: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/20",
    description: "Create a resume that gets you hired for retail and sales roles",
    keySkills: [
      "POS and inventory system experience",
      "Sales metrics and conversion rates",
      "Visual merchandising",
      "Loss prevention awareness",
      "Customer complaint resolution",
      "Product knowledge training"
    ],
    resumeTips: [
      {
        title: "Show Sales Performance",
        tip: "Include metrics like 'exceeded monthly sales goals by 120%' or 'top 10% of associates'",
        icon: Target
      },
      {
        title: "Highlight Customer Wins",
        tip: "Mention customer satisfaction scores, repeat customer rates, or positive reviews",
        icon: Star
      },
      {
        title: "Include Systems",
        tip: "List POS systems (Square, Shopify, NCR) and inventory tools you've used",
        icon: Zap
      },
      {
        title: "Show Problem-Solving",
        tip: "Describe how you resolved customer issues or improved store processes",
        icon: Lightbulb
      }
    ],
    sampleBullets: [
      "Exceeded monthly sales goals by 125%, ranking in top 5% of store associates",
      "Processed 100+ transactions daily with 99% accuracy on POS system",
      "Resolved customer complaints resulting in 95% satisfaction rating",
      "Maintained inventory accuracy of 99.2% through regular cycle counts",
      "Trained 6 new associates on sales techniques and store procedures"
    ],
    commonMistakes: [
      "Not including sales metrics or performance rankings",
      "Generic customer service descriptions",
      "Forgetting inventory or loss prevention experience",
      "Leaving out brand or product category expertise"
    ]
  }
];

// General resume tips for temp/flex workers
const generalTips = [
  {
    title: "Keep It to One Page",
    description: "Hiring managers for temp roles scan resumes in 10 seconds. One focused page with relevant experience is better than two pages of everything.",
    icon: FileText
  },
  {
    title: "Lead with Your Best Fit",
    description: "Put your most relevant experience first. If applying for warehouse roles, lead with warehouse experience—even if your retail job was more recent.",
    icon: Target
  },
  {
    title: "Use Action Verbs",
    description: "Start bullets with strong verbs: Processed, Operated, Trained, Resolved, Achieved, Maintained, Exceeded, Managed.",
    icon: Zap
  },
  {
    title: "Include Availability",
    description: "For temp work, mention your availability: 'Available for all shifts including weekends' or 'Open to overtime and holiday shifts.'",
    icon: Clock
  },
  {
    title: "List All Certifications",
    description: "Forklift license, food handler's permit, OSHA 10, CPR—these certifications can put you ahead of other applicants.",
    icon: Award
  },
  {
    title: "Add a Skills Section",
    description: "Create a quick-scan skills section at the top with your key qualifications: 'Forklift Certified | RF Scanner | SAP WMS | Bilingual Spanish'",
    icon: Star
  }
];

// Indeed Flex specific tips
const indeedFlexTips = [
  {
    title: "Complete Your Profile 100%",
    description: "Indeed Flex shows profile completeness. Add a professional photo, detailed skills, and work history for better job matches."
  },
  {
    title: "Highlight Flexibility",
    description: "Mention willingness to work different shifts, locations, or roles. Flexibility is valued in temp work."
  },
  {
    title: "Keep Certifications Current",
    description: "Upload current certifications to your profile. Expired certs can disqualify you from roles."
  },
  {
    title: "Build Your Rating",
    description: "High ratings (5 stars) get priority access to the best shifts. Be punctual, professional, and communicative."
  }
];

const JobApplicationToolkitPage = () => {
  return (
    <>
      <SEOMetaTags
        title="Job Application Toolkit: Resume Tips for Temp Work | Indeed Flex Career Hub"
        description="Free resume tips for warehouse, hospitality, and retail temp workers. Get role-specific advice, sample bullets, and templates to land your next flexible job."
        canonical="https://indeedflex.com/career-hub/job-application-toolkit"
        keywords={[
          'resume tips',
          'temp work resume',
          'warehouse resume',
          'hospitality resume',
          'retail resume',
          'cv maker',
          'resume builder',
          'job application tips',
          'indeed flex resume',
          'gig worker resume'
        ]}
      />
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I write a resume for temp work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Focus on relevant skills, include certifications, quantify your achievements with numbers, and keep it to one page. Highlight availability and flexibility for different shifts."
              }
            },
            {
              "@type": "Question",
              "name": "What should I include in a warehouse resume?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Include forklift certifications, picking accuracy rates, equipment experience (RF scanners, WMS systems), physical capabilities, and safety record. Quantify with metrics like 'picked 200+ orders daily.'"
              }
            },
            {
              "@type": "Question",
              "name": "How do I create an Indeed Flex profile?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Download the Indeed Flex app, add a professional photo, complete your skills and certifications, add work history, and complete the verification interview. A 100% complete profile gets better job matches."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need a resume for temp jobs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While Indeed Flex uses in-app profiles, having a well-crafted resume helps during interviews and for roles requiring more experience. It's especially useful for temp-to-perm opportunities."
              }
            }
          ]
        })}
      </script>

      {/* HowTo Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Write a Resume for Temp Work",
          "description": "Step-by-step guide to creating a resume that gets you hired for flexible and temporary jobs",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Choose a Clean Format",
              "text": "Use a simple, one-page format with clear sections for contact info, skills, experience, and certifications."
            },
            {
              "@type": "HowToStep",
              "name": "Add a Skills Summary",
              "text": "Create a quick-scan section at the top with your key qualifications and certifications."
            },
            {
              "@type": "HowToStep",
              "name": "Quantify Your Experience",
              "text": "Use numbers to describe achievements: orders processed, accuracy rates, customers served, sales goals exceeded."
            },
            {
              "@type": "HowToStep",
              "name": "Include All Certifications",
              "text": "List relevant certifications like forklift license, food handler's permit, OSHA training, or TIPS certification."
            },
            {
              "@type": "HowToStep",
              "name": "Highlight Availability",
              "text": "Mention your flexibility for different shifts, overtime, weekends, or holiday work."
            }
          ]
        })}
      </script>

      <Layout>
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Job Application Toolkit" }]} />
        </div>

        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Job Application Toolkit
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed mb-6">
              Resume tips and templates designed specifically for warehouse, hospitality, and retail temp workers
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {roleResumeTips.map((role) => (
                <a
                  key={role.id}
                  href={`#${role.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                >
                  <role.icon className="w-4 h-4" />
                  {role.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Industries Covered</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Sample Bullets</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Pro Tips</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Free to Use</div>
              </div>
            </div>
          </div>
        </section>

        {/* General Tips Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Resume Basics for Temp Work
                  </h2>
                  <p className="text-muted-foreground">Essential tips that apply to all flexible work roles</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {generalTips.map((tip) => (
                  <Card key={tip.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <tip.icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {tip.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Role-Specific Sections */}
        {roleResumeTips.map((role, index) => {
          const Icon = role.icon;
          return (
            <section 
              key={role.id} 
              id={role.id}
              className={`py-12 md:py-16 ${index % 2 === 1 ? 'bg-muted/30' : ''}`}
            >
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                  {/* Section Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-xl ${role.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-foreground" />
                    </div>
                    <div>
                      <Badge variant="secondary" className={role.color}>
                        {role.title}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-2">
                        Resume Tips for {role.title} Roles
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column: Tips */}
                    <div className="space-y-6">
                      {/* Key Skills */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Star className="w-5 h-5 text-amber-500" />
                            Key Skills to Highlight
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {role.keySkills.map((skill, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Resume Tips */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Lightbulb className="w-5 h-5 text-primary" />
                            Pro Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {role.resumeTips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <tip.icon className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{tip.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{tip.tip}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Column: Examples */}
                    <div className="space-y-6">
                      {/* Sample Bullets */}
                      <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="w-5 h-5 text-primary" />
                            Copy-Paste Resume Bullets
                          </CardTitle>
                          <CardDescription>
                            Customize these with your actual numbers
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {role.sampleBullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 p-2 bg-background rounded-md border">
                                <span className="text-primary font-bold">•</span>
                                <span className="text-sm">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Common Mistakes */}
                      <Card className="border-destructive/20 bg-destructive/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                            <span className="text-lg">⚠️</span>
                            Common Mistakes to Avoid
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {role.commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-destructive">✗</span>
                                {mistake}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Indeed Flex Profile Tips */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Indeed Flex Profile Tips
                  </h2>
                  <p className="text-muted-foreground">Optimize your in-app profile for better job matches</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {indeedFlexTips.map((tip, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <CardTitle className="text-base">{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tip.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://indeedflex.com/download-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Indeed Flex App
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Guides</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Link 
                  to="/career-hub/guides/i9-complete-guide"
                  className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                    Form I-9 Complete Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Everything you need for employment verification
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                
                <Link 
                  to="/career-hub/guides/first-job-america-guide"
                  className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                    First Job in America Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete guide for new US workers
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                
                <Link 
                  to="/career-hub/tools/skills-analyzer"
                  className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                    Skills Gap Analyzer
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Find skills to add to your resume
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Try tool <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Hub */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <InternalLinkHub variant="footer" currentPage={{ type: 'guide' }} />
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </Layout>
    </>
  );
};

export default JobApplicationToolkitPage;
