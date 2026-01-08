import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, ArrowRight, Award, Briefcase, Target, GraduationCap, ExternalLink } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import { Link } from "react-router-dom";

interface CareerStep {
  title: string;
  years: string;
  hourlyRange: { min: number; max: number };
  annualRange: { min: number; max: number };
  description: string;
  keySkills: string[];
  howToAdvance: string;
}

interface CareerPath {
  id: string;
  name: string;
  industry: string;
  steps: CareerStep[];
}

// Map skills to learning tools
interface LearningResource {
  name: string;
  path: string;
  isExternal?: boolean;
}

const skillToLearningMap: Record<string, LearningResource> = {
  // Bartending/Hospitality skills -> CocktailQuiz
  "mixology": { name: "CocktailQuiz", path: "/career-hub/tools/cocktail-quiz" },
  "menu development": { name: "CocktailQuiz", path: "/career-hub/tools/cocktail-quiz" },
  "cocktail knowledge": { name: "CocktailQuiz", path: "/career-hub/tools/cocktail-quiz" },
  
  // Safety skills -> SafetyFirst
  "safety focus": { name: "SafetyFirst", path: "/career-hub/tools/safety-first" },
  "osha training": { name: "SafetyFirst", path: "/career-hub/tools/safety-first" },
  "physical stamina": { name: "SafetyFirst", path: "/career-hub/tools/safety-first" },
  
  // Culinary skills -> MenuMaster
  "basic knife skills": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "knife skills": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "menu knowledge": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "recipe development": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "menu creation": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "menu innovation": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "consistency": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "quality control": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  "cleanliness": { name: "MenuMaster", path: "/career-hub/tools/menu-master" },
  
  // External certifications
  "forklift certification": { name: "OSHA Forklift", path: "https://www.osha.gov/training", isExternal: true },
  "tips certified": { name: "TIPS Training", path: "https://www.gettips.com/", isExternal: true },
  "food safety certified": { name: "ServSafe", path: "https://www.servsafe.com/", isExternal: true },
};

const getSkillLearningResource = (skill: string): LearningResource | null => {
  const normalizedSkill = skill.toLowerCase();
  
  // Direct match
  if (skillToLearningMap[normalizedSkill]) {
    return skillToLearningMap[normalizedSkill];
  }
  
  // Partial match
  for (const [key, resource] of Object.entries(skillToLearningMap)) {
    if (normalizedSkill.includes(key) || key.includes(normalizedSkill)) {
      return resource;
    }
  }
  
  return null;
};

const careerPaths: CareerPath[] = [
  {
    id: "bartending",
    name: "Bartending Career",
    industry: "Hospitality",
    steps: [
      {
        title: "Barback",
        years: "0-1 year",
        hourlyRange: { min: 12, max: 18 },
        annualRange: { min: 25000, max: 37000 },
        description: "Support bartenders, learn the basics of bar operations",
        keySkills: ["Speed", "Organization", "Physical stamina"],
        howToAdvance: "Learn drink recipes, get TIPS certified, express interest in bartending"
      },
      {
        title: "Bartender",
        years: "1-3 years",
        hourlyRange: { min: 15, max: 25 },
        annualRange: { min: 35000, max: 55000 },
        description: "Mix drinks, serve customers, manage bar section",
        keySkills: ["Mixology", "Customer service", "Multitasking"],
        howToAdvance: "Master cocktails, build regular clientele, show leadership"
      },
      {
        title: "Head Bartender",
        years: "3-5 years",
        hourlyRange: { min: 18, max: 30 },
        annualRange: { min: 45000, max: 70000 },
        description: "Lead bar team, create menus, train new bartenders",
        keySkills: ["Leadership", "Menu development", "Training"],
        howToAdvance: "Develop management skills, understand P&L, build industry network"
      },
      {
        title: "Bar Manager",
        years: "5-8 years",
        hourlyRange: { min: 22, max: 35 },
        annualRange: { min: 55000, max: 85000 },
        description: "Manage full bar operations, hiring, inventory, budgets",
        keySkills: ["Management", "Budgeting", "HR basics"],
        howToAdvance: "Take on more responsibility, understand full venue operations"
      },
      {
        title: "Beverage Director",
        years: "8+ years",
        hourlyRange: { min: 30, max: 50 },
        annualRange: { min: 70000, max: 120000 },
        description: "Oversee multiple venues or large operations, strategy",
        keySkills: ["Strategy", "Multi-unit management", "P&L ownership"],
        howToAdvance: "Industry recognition, consulting, ownership opportunities"
      }
    ]
  },
  {
    id: "warehouse",
    name: "Warehouse Career",
    industry: "Industrial",
    steps: [
      {
        title: "Picker/Packer",
        years: "0-1 year",
        hourlyRange: { min: 15, max: 21 },
        annualRange: { min: 31000, max: 44000 },
        description: "Pick orders, pack shipments, meet productivity targets",
        keySkills: ["Attention to detail", "Speed", "Physical stamina"],
        howToAdvance: "Exceed targets consistently, learn multiple stations"
      },
      {
        title: "Lead Picker / Senior Associate",
        years: "1-2 years",
        hourlyRange: { min: 17, max: 24 },
        annualRange: { min: 35000, max: 50000 },
        description: "Train new hires, handle exceptions, assist supervisors",
        keySkills: ["Training", "Problem-solving", "Communication"],
        howToAdvance: "Get forklift certified, show leadership initiative"
      },
      {
        title: "Forklift Operator",
        years: "1-3 years",
        hourlyRange: { min: 18, max: 26 },
        annualRange: { min: 37000, max: 54000 },
        description: "Operate forklift, move pallets, load/unload trucks",
        keySkills: ["Forklift certification", "Safety focus", "Spatial awareness"],
        howToAdvance: "Get additional equipment certifications, maintain safety record"
      },
      {
        title: "Warehouse Supervisor",
        years: "3-5 years",
        hourlyRange: { min: 22, max: 32 },
        annualRange: { min: 46000, max: 66000 },
        description: "Supervise team of 10-20, manage shift operations",
        keySkills: ["Team management", "Scheduling", "Performance tracking"],
        howToAdvance: "Develop strategic thinking, learn inventory management systems"
      },
      {
        title: "Warehouse Manager",
        years: "5-8 years",
        hourlyRange: { min: 28, max: 42 },
        annualRange: { min: 58000, max: 87000 },
        description: "Manage entire facility, budgets, multiple shifts",
        keySkills: ["Operations management", "Budgeting", "Strategic planning"],
        howToAdvance: "Multi-site experience, supply chain certifications"
      },
      {
        title: "Operations Director",
        years: "8+ years",
        hourlyRange: { min: 40, max: 65 },
        annualRange: { min: 85000, max: 135000 },
        description: "Oversee multiple facilities, regional operations",
        keySkills: ["Multi-site management", "P&L ownership", "Executive leadership"],
        howToAdvance: "VP roles, consulting, entrepreneurship"
      }
    ]
  },
  {
    id: "restaurant",
    name: "Restaurant Service Career",
    industry: "Hospitality",
    steps: [
      {
        title: "Host / Busser",
        years: "0-6 months",
        hourlyRange: { min: 11, max: 15 },
        annualRange: { min: 23000, max: 31000 },
        description: "Greet guests, clear tables, assist servers",
        keySkills: ["Customer service", "Teamwork", "Speed"],
        howToAdvance: "Learn menu, show reliability, express interest in serving"
      },
      {
        title: "Server",
        years: "6 months - 2 years",
        hourlyRange: { min: 12, max: 20 },
        annualRange: { min: 30000, max: 50000 },
        description: "Take orders, serve food, provide excellent guest experience",
        keySkills: ["Sales", "Menu knowledge", "Time management"],
        howToAdvance: "Become top performer, train new servers, handle VIP tables"
      },
      {
        title: "Head Server / Trainer",
        years: "2-4 years",
        hourlyRange: { min: 15, max: 25 },
        annualRange: { min: 38000, max: 60000 },
        description: "Train servers, handle difficult situations, assist management",
        keySkills: ["Training", "Problem resolution", "Leadership"],
        howToAdvance: "Get food safety certified, learn opening/closing procedures"
      },
      {
        title: "Shift Supervisor",
        years: "3-5 years",
        hourlyRange: { min: 18, max: 28 },
        annualRange: { min: 42000, max: 65000 },
        description: "Manage shift operations, staff, and guest experience",
        keySkills: ["Team management", "Cash handling", "Conflict resolution"],
        howToAdvance: "Learn P&L basics, assist with scheduling, show business acumen"
      },
      {
        title: "Restaurant Manager",
        years: "5-8 years",
        hourlyRange: { min: 25, max: 40 },
        annualRange: { min: 55000, max: 85000 },
        description: "Manage all operations, staff, budgets, and guest satisfaction",
        keySkills: ["Full P&L management", "Hiring", "Strategic planning"],
        howToAdvance: "Multi-unit experience, franchise opportunities"
      }
    ]
  },
  {
    id: "culinary",
    name: "Culinary Career",
    industry: "Hospitality",
    steps: [
      {
        title: "Kitchen Porter / Prep Cook",
        years: "0-1 year",
        hourlyRange: { min: 12, max: 16 },
        annualRange: { min: 25000, max: 33000 },
        description: "Clean kitchen, basic prep, assist cooks",
        keySkills: ["Cleanliness", "Basic knife skills", "Speed"],
        howToAdvance: "Learn cooking basics, show initiative, practice knife skills"
      },
      {
        title: "Line Cook",
        years: "1-3 years",
        hourlyRange: { min: 14, max: 20 },
        annualRange: { min: 29000, max: 42000 },
        description: "Work a station, prepare dishes during service",
        keySkills: ["Station management", "Consistency", "Speed under pressure"],
        howToAdvance: "Master multiple stations, learn new techniques"
      },
      {
        title: "Chef de Partie",
        years: "2-4 years",
        hourlyRange: { min: 17, max: 26 },
        annualRange: { min: 35000, max: 54000 },
        description: "Lead a section, supervise junior cooks",
        keySkills: ["Section leadership", "Recipe development", "Quality control"],
        howToAdvance: "Develop signature dishes, assist with menu planning"
      },
      {
        title: "Sous Chef",
        years: "4-7 years",
        hourlyRange: { min: 22, max: 35 },
        annualRange: { min: 46000, max: 73000 },
        description: "Second in command, manage kitchen team, create specials",
        keySkills: ["Team management", "Menu creation", "Inventory control"],
        howToAdvance: "Run kitchen independently, understand food costs deeply"
      },
      {
        title: "Head Chef / Executive Chef",
        years: "7+ years",
        hourlyRange: { min: 30, max: 55 },
        annualRange: { min: 65000, max: 115000 },
        description: "Full kitchen leadership, menu creation, P&L responsibility",
        keySkills: ["Full P&L", "Menu innovation", "Team development"],
        howToAdvance: "Multi-restaurant groups, consulting, ownership"
      }
    ]
  },
];

const CareerPathExplorer = () => {
  const [selectedPath, setSelectedPath] = useState<string>("bartending");

  const currentPath = careerPaths.find(p => p.id === selectedPath);

  return (
    <>
      <Helmet>
        <title>Career Path Explorer | Indeed Flex Career Hub</title>
        <meta name="description" content="Visualize your career progression from entry-level to management. See salary growth, required skills, and how to advance at each step." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/career-path" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Career Path" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Career Path Explorer
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Visualize your career progression and see exactly what it takes to reach the next level.
            </p>
          </div>
        </section>

        {/* Path Selector */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Explore Career Paths</h2>
                <Select value={selectedPath} onValueChange={setSelectedPath}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Select a career path" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerPaths.map((path) => (
                      <SelectItem key={path.id} value={path.id}>
                        {path.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Path Visualization */}
              {currentPath && (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="py-6">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold">{currentPath.name}</h3>
                          <p className="text-primary-foreground/70">{currentPath.industry}</p>
                        </div>
                        <div className="flex gap-8 text-center">
                          <div>
                            <div className="text-3xl font-bold text-accent">
                              ${currentPath.steps[0].hourlyRange.min}
                            </div>
                            <div className="text-sm text-primary-foreground/70">Starting</div>
                          </div>
                          <div className="flex items-center">
                            <ArrowRight className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-accent">
                              ${currentPath.steps[currentPath.steps.length - 1].hourlyRange.max}+
                            </div>
                            <div className="text-sm text-primary-foreground/70">Top Level</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Career Steps */}
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                    
                    <div className="space-y-6">
                      {currentPath.steps.map((step, index) => (
                        <div key={index} className="relative">
                          {/* Timeline dot */}
                          <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block z-10" />
                          
                          <Card className="md:ml-16">
                            <CardHeader>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                                      Level {index + 1}
                                    </span>
                                    <span className="text-sm text-muted-foreground">{step.years}</span>
                                  </div>
                                  <CardTitle className="text-xl mt-2">{step.title}</CardTitle>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-success">
                                    <DollarSign className="h-5 w-5" />
                                    <span className="text-xl font-bold">
                                      {step.hourlyRange.min}-{step.hourlyRange.max}/hr
                                    </span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    ${step.annualRange.min.toLocaleString()}-${step.annualRange.max.toLocaleString()}/yr
                                  </div>
                                </div>
                              </div>
                              <CardDescription className="mt-2">
                                {step.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-sm">Key Skills</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.keySkills.map((skill) => {
                                      const resource = getSkillLearningResource(skill);
                                      return (
                                        <div key={skill} className="flex items-center gap-1">
                                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-l-full">
                                            {skill}
                                          </span>
                                          {resource && (
                                            resource.isExternal ? (
                                              <a
                                                href={resource.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-r-full hover:bg-accent/80 transition-colors"
                                              >
                                                <GraduationCap className="h-3 w-3" />
                                                <span className="hidden sm:inline">{resource.name}</span>
                                                <ExternalLink className="h-2.5 w-2.5" />
                                              </a>
                                            ) : (
                                              <Link
                                                to={resource.path}
                                                className="inline-flex items-center gap-1 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-r-full hover:bg-accent/80 transition-colors"
                                              >
                                                <GraduationCap className="h-3 w-3" />
                                                <span className="hidden sm:inline">Learn</span>
                                              </Link>
                                            )
                                          )}
                                          {!resource && (
                                            <span className="text-xs bg-secondary text-secondary-foreground px-1 py-1 rounded-r-full" />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                {index < currentPath.steps.length - 1 && (
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <TrendingUp className="h-4 w-4 text-accent" />
                                      <span className="font-medium text-sm">How to Advance</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {step.howToAdvance}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Related Tools */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-bold text-foreground mb-4">Related Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/career-hub/tools/skills-analyzer">
                    <Card className="hover:border-primary/30 hover:shadow-md transition-all">
                      <CardContent className="py-4 flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Skills Gap Analyzer</div>
                          <div className="text-sm text-muted-foreground">
                            See exactly what skills you need to advance
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link to="/career-hub/tools/pay-calculator">
                    <Card className="hover:border-primary/30 hover:shadow-md transition-all">
                      <CardContent className="py-4 flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Pay Calculator</div>
                          <div className="text-sm text-muted-foreground">
                            Calculate your take-home pay at each level
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ToolDisclaimer 
                type="educational"
                sources={["Bureau of Labor Statistics", "Industry salary surveys", "Indeed Flex hiring data"]}
                lastUpdated="December 2024"
              />
            </div>
          </div>
        </section>

        <CTASection 
          title="Start Your Career Journey Today"
          subtitle="Find flexible shifts that help you build skills and advance your career."
        />
      </Layout>
    </>
  );
};

export default CareerPathExplorer;
