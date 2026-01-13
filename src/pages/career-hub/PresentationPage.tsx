import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  FileText,
  Layers,
  Download,
  ExternalLink,
  ChevronDown,
  Target,
  Users,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MetricsDashboard,
  PageTypeGallery,
  TimelineVisualization,
  SEOChecklist,
} from "@/components/career-hub/presentation";
import HiringCalendar from "@/components/career-hub/HiringCalendar";

type SectionKey = "overview" | "templates" | "calendar" | "timeline" | "seo";

const PresentationPage = () => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    overview: true,
    templates: true,
    calendar: true,
    timeline: true,
    seo: true,
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    { key: "overview" as SectionKey, label: "Strategy Overview", icon: BarChart3 },
    { key: "templates" as SectionKey, label: "Page Templates", icon: Layers },
    { key: "calendar" as SectionKey, label: "Content Calendar", icon: Calendar },
    { key: "timeline" as SectionKey, label: "Review Timeline", icon: CheckSquare },
    { key: "seo" as SectionKey, label: "Technical SEO", icon: FileText },
  ];

  return (
    <Layout>
      <Helmet>
        <title>SEO Strategy Presentation | Indeed Flex Career Hub</title>
        <meta
          name="description"
          content="Executive overview of the Indeed Flex Career Hub SEO strategy, page templates, content calendar, and 8-week review timeline."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Internal Presentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Indeed Flex Career Hub
            </h1>
            <p className="text-xl opacity-90 mb-6">
              SEO Strategy Overview & Template Review
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
              A comprehensive programmatic SEO hub designed to help US temp workers 
              discover opportunities, access career resources, and convert to Indeed Flex app downloads.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">1,700+</div>
                <div className="text-sm opacity-80">Indexed Pages</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm opacity-80">Template Types</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">19</div>
                <div className="text-sm opacity-80">Active Markets</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold">14</div>
                <div className="text-sm opacity-80">Interactive Tools</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 overflow-x-auto">
            <div className="flex items-center gap-2">
              {sections.map((section) => (
                <Button
                  key={section.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    document.getElementById(section.key)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <section.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Strategy Overview */}
        <Collapsible open={openSections.overview} onOpenChange={() => toggleSection("overview")}>
          <section id="overview" className="scroll-mt-20">
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground">Strategy Overview</h2>
                  <p className="text-muted-foreground">Key metrics and SEO architecture</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  openSections.overview ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-8">
              {/* Metrics Dashboard */}
              <MetricsDashboard />

              {/* Core Strategy Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <Target className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Target Audience</h3>
                  <p className="text-sm text-muted-foreground">
                    US temp workers aged 18-45 researching flexible work opportunities before 
                    downloading the Indeed Flex app.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">SEO Goal</h3>
                  <p className="text-sm text-muted-foreground">
                    Rank for "Indeed Flex + [query]" terms including reviews, how it works, 
                    jobs, pay, and location-specific searches.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Users className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">User Intent</h3>
                  <p className="text-sm text-muted-foreground">
                    Educational content that builds trust and confidence, guiding users 
                    from research to app download.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Smartphone className="h-8 w-8 text-orange-600 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Conversion Path</h3>
                  <p className="text-sm text-muted-foreground">
                    Discovery → Education → Confidence → App Download → Registration
                  </p>
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Page Architecture</h3>
                <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-muted-foreground">
{`Career Hub (/)
├── 📍 Locations (19 active markets)
│   └── Location × Role combinations
├── 🏙️ Cities (50+ programmatic)
│   └── City × Role combinations (1,000+)
├── 💼 Roles (20+ job types)
├── 📚 Guides
│   ├── Core articles (16)
│   └── Seasonal localized (114)
├── 🧮 Tools (14 interactive)
├── 📅 Seasonal Hubs
│   ├── Holiday Jobs 2026
│   ├── Summer Jobs 2026
│   └── Event pages (Black Friday, etc.)
└── 🏭 Industries (4)
    └── Industry × Location (80+)`}
                  </pre>
                </div>
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>

        {/* Page Templates Gallery */}
        <Collapsible open={openSections.templates} onOpenChange={() => toggleSection("templates")}>
          <section id="templates" className="scroll-mt-20">
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Layers className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground">Page Templates</h2>
                  <p className="text-muted-foreground">12 unique template types with representative examples</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  openSections.templates ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <PageTypeGallery />
            </CollapsibleContent>
          </section>
        </Collapsible>

        {/* Content Calendar */}
        <Collapsible open={openSections.calendar} onOpenChange={() => toggleSection("calendar")}>
          <section id="calendar" className="scroll-mt-20">
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground">2026 Content Calendar</h2>
                  <p className="text-muted-foreground">Seasonal hiring patterns and publishing schedule</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  openSections.calendar ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <HiringCalendar />
            </CollapsibleContent>
          </section>
        </Collapsible>

        {/* Review Timeline */}
        <Collapsible open={openSections.timeline} onOpenChange={() => toggleSection("timeline")}>
          <section id="timeline" className="scroll-mt-20">
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground">8-Week Review Timeline</h2>
                  <p className="text-muted-foreground">Structured review schedule for team collaboration</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  openSections.timeline ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <TimelineVisualization />
            </CollapsibleContent>
          </section>
        </Collapsible>

        {/* Technical SEO */}
        <Collapsible open={openSections.seo} onOpenChange={() => toggleSection("seo")}>
          <section id="seo" className="scroll-mt-20">
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-foreground">Technical SEO Status</h2>
                  <p className="text-muted-foreground">Implementation checklist and progress</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  openSections.seo ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SEOChecklist />
            </CollapsibleContent>
          </section>
        </Collapsible>

        {/* Footer CTA */}
        <section className="bg-card border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Review?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore the template examples above and use the 8-week timeline to structure 
            your team's review process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/career-hub">
                View Live Career Hub <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/career-hub/tools">
                Explore Interactive Tools
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/career-hub/guides">
                Browse Guides
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PresentationPage;
