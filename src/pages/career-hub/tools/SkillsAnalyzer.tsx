import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, XCircle, ArrowRight, RotateCcw, Lightbulb, Clock, DollarSign, Zap, Sparkles, ChefHat, Package, ShoppingBag, Building2, Wrench, PartyPopper, Star } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import SkillRecommendationCard from "@/components/career-hub/interactive/SkillRecommendationCard";
import { skillRecommendations, getRecommendationsForSkills, sortByPriority } from "@/data/skill-recommendations";

interface Skill {
  id: string;
  name: string;
  description: string;
  category: "soft" | "technical" | "certification";
}

interface RoleSkills {
  roleId: string;
  title: string;
  currentLevel: string;
  nextLevel: string;
  requiredSkills: Skill[];
  salaryIncrease: string;
  industry: string;
  traits: string[];
}

// Industry categories for interests
const industries = [
  { id: "hospitality-bar", name: "Bar & Nightlife", icon: "🍸", description: "Bartending, bar service" },
  { id: "hospitality-kitchen", name: "Kitchen & Culinary", icon: "🍳", description: "Cooking, food prep" },
  { id: "hospitality-foh", name: "Front of House", icon: "🍽️", description: "Serving, hosting" },
  { id: "warehouse", name: "Warehouse & Logistics", icon: "📦", description: "Picking, packing, forklift" },
  { id: "retail", name: "Retail & Sales", icon: "🛍️", description: "Customer service, sales" },
  { id: "events", name: "Events & Entertainment", icon: "🎉", description: "Setup, staffing events" },
  { id: "facilities", name: "Facilities & Cleaning", icon: "🧹", description: "Maintenance, custodial" },
  { id: "industrial", name: "Manufacturing", icon: "⚙️", description: "Assembly, machine operation" },
];

// Personal traits/preferences
const personalTraits = [
  { id: "people-person", name: "I enjoy working with people", matchIndustries: ["hospitality-bar", "hospitality-foh", "retail", "events"] },
  { id: "physical-work", name: "I prefer physical/active work", matchIndustries: ["warehouse", "facilities", "industrial", "hospitality-kitchen"] },
  { id: "fast-paced", name: "I thrive in fast-paced environments", matchIndustries: ["hospitality-bar", "hospitality-kitchen", "events", "warehouse"] },
  { id: "detail-oriented", name: "I'm detail-oriented", matchIndustries: ["industrial", "warehouse", "facilities", "retail"] },
  { id: "leadership", name: "I want to lead teams", matchIndustries: ["hospitality-foh", "retail", "warehouse", "facilities"] },
  { id: "tips-income", name: "I want to earn tips", matchIndustries: ["hospitality-bar", "hospitality-foh", "events"] },
  { id: "daytime", name: "I prefer daytime hours", matchIndustries: ["warehouse", "retail", "facilities", "industrial"] },
  { id: "creative", name: "I enjoy creative work", matchIndustries: ["hospitality-bar", "hospitality-kitchen", "events"] },
];

// Existing skills users might have
const existingSkills = [
  { id: "customer-service-exp", name: "Customer service experience", boostIndustries: ["retail", "hospitality-foh", "hospitality-bar"] },
  { id: "food-handling", name: "Food handling knowledge", boostIndustries: ["hospitality-kitchen", "hospitality-foh", "events"] },
  { id: "forklift-interest", name: "Forklift or machinery experience", boostIndustries: ["warehouse", "industrial"] },
  { id: "cash-handling", name: "Cash register/POS experience", boostIndustries: ["retail", "hospitality-foh", "hospitality-bar"] },
  { id: "team-lead-exp", name: "Team lead or supervisor experience", boostIndustries: ["warehouse", "retail", "facilities", "events"] },
  { id: "cleaning-exp", name: "Professional cleaning experience", boostIndustries: ["facilities", "hospitality-foh"] },
  { id: "alcohol-service", name: "Alcohol service experience", boostIndustries: ["hospitality-bar", "events"] },
  { id: "warehouse-exp", name: "Warehouse or logistics experience", boostIndustries: ["warehouse", "industrial"] },
];

const roleProgression: RoleSkills[] = [
  // Hospitality - Bar
  {
    roleId: "barback-to-bartender",
    title: "Barback → Bartender",
    currentLevel: "Barback",
    nextLevel: "Bartender",
    salaryIncrease: "$5-10/hr more + tips",
    industry: "hospitality-bar",
    traits: ["people-person", "fast-paced", "tips-income", "creative"],
    requiredSkills: [
      { id: "mixology", name: "Mixology Basics", description: "Know 20+ classic cocktail recipes", category: "technical" },
      { id: "tips-cert", name: "TIPS Certification", description: "Responsible alcohol service training", category: "certification" },
      { id: "speed", name: "Speed & Efficiency", description: "Handle multiple orders quickly", category: "soft" },
      { id: "customer", name: "Customer Rapport", description: "Build relationships with regulars", category: "soft" },
      { id: "memory", name: "Order Memory", description: "Remember complex orders without notes", category: "technical" },
    ]
  },
  // Hospitality - Kitchen
  {
    roleId: "dishwasher-to-prep",
    title: "Dishwasher → Prep Cook",
    currentLevel: "Dishwasher",
    nextLevel: "Prep Cook",
    salaryIncrease: "$2-4/hr more",
    industry: "hospitality-kitchen",
    traits: ["physical-work", "detail-oriented", "fast-paced"],
    requiredSkills: [
      { id: "knife-skills", name: "Basic Knife Skills", description: "Proper cutting techniques and safety", category: "technical" },
      { id: "food-safety", name: "Food Safety Cert", description: "ServSafe or equivalent certification", category: "certification" },
      { id: "kitchen-stations", name: "Station Knowledge", description: "Understand kitchen workflow and stations", category: "technical" },
      { id: "time-management", name: "Time Management", description: "Complete prep lists within deadlines", category: "soft" },
      { id: "recipe-following", name: "Recipe Accuracy", description: "Follow recipes and portion standards", category: "technical" },
    ]
  },
  {
    roleId: "prep-to-line",
    title: "Prep Cook → Line Cook",
    currentLevel: "Prep Cook",
    nextLevel: "Line Cook",
    salaryIncrease: "$3-5/hr more",
    industry: "hospitality-kitchen",
    traits: ["fast-paced", "physical-work", "creative"],
    requiredSkills: [
      { id: "cooking-techniques", name: "Cooking Techniques", description: "Master sautéing, grilling, frying", category: "technical" },
      { id: "station-management", name: "Station Management", description: "Run a station during service", category: "technical" },
      { id: "pressure-handling", name: "Handle Pressure", description: "Stay calm during rush hours", category: "soft" },
      { id: "plating", name: "Plating & Presentation", description: "Consistent, attractive plate presentation", category: "technical" },
      { id: "kitchen-communication", name: "Kitchen Communication", description: "Call backs, timing, team coordination", category: "soft" },
    ]
  },
  // Hospitality - Front of House
  {
    roleId: "server-to-supervisor",
    title: "Server → Shift Supervisor",
    currentLevel: "Server",
    nextLevel: "Shift Supervisor",
    salaryIncrease: "$4-6/hr more",
    industry: "hospitality-foh",
    traits: ["people-person", "leadership", "fast-paced", "tips-income"],
    requiredSkills: [
      { id: "leadership", name: "Leadership Skills", description: "Guide and motivate team members", category: "soft" },
      { id: "conflict", name: "Conflict Resolution", description: "Handle customer complaints professionally", category: "soft" },
      { id: "pos", name: "POS System Mastery", description: "Handle voids, comps, and reports", category: "technical" },
      { id: "scheduling", name: "Scheduling Basics", description: "Understand shift planning", category: "technical" },
      { id: "food-safety", name: "Food Safety Cert", description: "ServSafe or equivalent", category: "certification" },
    ]
  },
  // Warehouse
  {
    roleId: "picker-to-lead",
    title: "Picker/Packer → Lead",
    currentLevel: "Picker/Packer",
    nextLevel: "Lead Picker",
    salaryIncrease: "$2-4/hr more",
    industry: "warehouse",
    traits: ["physical-work", "detail-oriented", "leadership", "daytime"],
    requiredSkills: [
      { id: "productivity", name: "High Productivity", description: "Consistently exceed rate targets", category: "technical" },
      { id: "quality", name: "Quality Accuracy", description: "Maintain 99%+ accuracy rate", category: "technical" },
      { id: "training", name: "Training Others", description: "Ability to onboard new team members", category: "soft" },
      { id: "problem", name: "Problem Solving", description: "Handle inventory issues independently", category: "soft" },
      { id: "wms", name: "WMS Proficiency", description: "Master warehouse management system", category: "technical" },
    ]
  },
  {
    roleId: "warehouse-to-forklift",
    title: "Warehouse Operative → Forklift Driver",
    currentLevel: "Warehouse Operative",
    nextLevel: "Forklift Driver",
    salaryIncrease: "$3-5/hr more",
    industry: "warehouse",
    traits: ["physical-work", "detail-oriented", "daytime"],
    requiredSkills: [
      { id: "forklift-cert", name: "Forklift Certification", description: "OSHA-compliant training (1-2 days)", category: "certification" },
      { id: "spatial", name: "Spatial Awareness", description: "Navigate tight spaces safely", category: "technical" },
      { id: "safety", name: "Safety Record", description: "Clean safety history, no incidents", category: "soft" },
      { id: "loading", name: "Load Assessment", description: "Evaluate weight and balance", category: "technical" },
      { id: "communication", name: "Radio Communication", description: "Clear communication with team", category: "soft" },
    ]
  },
  {
    roleId: "forklift-to-supervisor",
    title: "Forklift Driver → Warehouse Supervisor",
    currentLevel: "Forklift Driver",
    nextLevel: "Warehouse Supervisor",
    salaryIncrease: "$4-7/hr more",
    industry: "warehouse",
    traits: ["leadership", "detail-oriented", "daytime"],
    requiredSkills: [
      { id: "team-leadership", name: "Team Leadership", description: "Manage and motivate 5-15 team members", category: "soft" },
      { id: "osha-30", name: "OSHA 30 Certification", description: "Advanced safety certification", category: "certification" },
      { id: "inventory-systems", name: "Inventory Management", description: "Track stock levels and shrinkage", category: "technical" },
      { id: "scheduling", name: "Scheduling Basics", description: "Create and manage shift schedules", category: "technical" },
      { id: "reporting", name: "KPI Reporting", description: "Track and report productivity metrics", category: "technical" },
    ]
  },
  // Retail
  {
    roleId: "retail-to-lead",
    title: "Retail Associate → Shift Lead",
    currentLevel: "Retail Associate",
    nextLevel: "Shift Lead",
    salaryIncrease: "$2-4/hr more",
    industry: "retail",
    traits: ["people-person", "detail-oriented", "leadership", "daytime"],
    requiredSkills: [
      { id: "pos-mastery", name: "POS Mastery", description: "Handle returns, voids, manager overrides", category: "technical" },
      { id: "customer-service", name: "Customer Service Excellence", description: "Resolve issues and create positive experiences", category: "soft" },
      { id: "inventory-basics", name: "Inventory Basics", description: "Stock counts, receiving, loss prevention", category: "technical" },
      { id: "opening-closing", name: "Opening/Closing", description: "Handle store open/close procedures", category: "technical" },
      { id: "coaching", name: "Peer Coaching", description: "Help train and support team members", category: "soft" },
    ]
  },
  {
    roleId: "retail-lead-to-manager",
    title: "Shift Lead → Store Manager",
    currentLevel: "Shift Lead",
    nextLevel: "Store Manager",
    salaryIncrease: "$5-10/hr more + bonus",
    industry: "retail",
    traits: ["leadership", "people-person", "detail-oriented"],
    requiredSkills: [
      { id: "p-and-l", name: "P&L Understanding", description: "Read and impact profit/loss statements", category: "technical" },
      { id: "hiring", name: "Hiring & Onboarding", description: "Interview, hire, and train new staff", category: "soft" },
      { id: "merchandising", name: "Visual Merchandising", description: "Create appealing product displays", category: "technical" },
      { id: "loss-prevention", name: "Loss Prevention", description: "Reduce shrinkage and theft", category: "technical" },
      { id: "nrf-cert", name: "NRF Certification", description: "National Retail Federation credential", category: "certification" },
    ]
  },
  // Events
  {
    roleId: "event-staff-to-lead",
    title: "Event Staff → Event Lead",
    currentLevel: "Event Staff",
    nextLevel: "Event Lead",
    salaryIncrease: "$3-5/hr more",
    industry: "events",
    traits: ["people-person", "fast-paced", "physical-work", "creative"],
    requiredSkills: [
      { id: "event-setup", name: "Setup Expertise", description: "Efficient venue setup and breakdown", category: "technical" },
      { id: "guest-management", name: "Guest Management", description: "Handle VIPs and special requests", category: "soft" },
      { id: "problem-solving", name: "Quick Problem Solving", description: "Handle issues during live events", category: "soft" },
      { id: "team-coordination", name: "Team Coordination", description: "Direct staff during events", category: "soft" },
      { id: "food-safety", name: "Food Safety Cert", description: "Required for events with food service", category: "certification" },
    ]
  },
  // Facilities
  {
    roleId: "cleaner-to-supervisor",
    title: "Cleaner → Cleaning Supervisor",
    currentLevel: "Cleaner",
    nextLevel: "Cleaning Supervisor",
    salaryIncrease: "$3-5/hr more",
    industry: "facilities",
    traits: ["detail-oriented", "leadership", "physical-work", "daytime"],
    requiredSkills: [
      { id: "quality-control", name: "Quality Inspection", description: "Evaluate cleaning standards", category: "technical" },
      { id: "team-management", name: "Team Coordination", description: "Assign tasks and manage workflow", category: "soft" },
      { id: "inventory-mgmt", name: "Supply Management", description: "Track and order cleaning supplies", category: "technical" },
      { id: "client-relations", name: "Client Communication", description: "Handle client requests professionally", category: "soft" },
      { id: "safety-protocols", name: "Safety Compliance", description: "OSHA cleaning safety knowledge", category: "certification" },
    ]
  },
  {
    roleId: "custodian-to-facilities",
    title: "Custodian → Facilities Technician",
    currentLevel: "Custodian",
    nextLevel: "Facilities Technician",
    salaryIncrease: "$4-6/hr more",
    industry: "facilities",
    traits: ["detail-oriented", "physical-work", "daytime"],
    requiredSkills: [
      { id: "basic-maintenance", name: "Basic Maintenance", description: "Handle minor repairs and fixes", category: "technical" },
      { id: "hvac-basics", name: "HVAC Basics", description: "Basic understanding of heating/cooling systems", category: "technical" },
      { id: "electrical-safety", name: "Electrical Safety", description: "Safe handling of electrical systems", category: "certification" },
      { id: "work-orders", name: "Work Order Systems", description: "Use facility management software", category: "technical" },
      { id: "vendor-coordination", name: "Vendor Coordination", description: "Work with contractors and suppliers", category: "soft" },
    ]
  },
  // Industrial
  {
    roleId: "machine-op-to-lead",
    title: "Machine Operator → Lead Operator",
    currentLevel: "Machine Operator",
    nextLevel: "Lead Operator",
    salaryIncrease: "$2-4/hr more",
    industry: "industrial",
    traits: ["detail-oriented", "physical-work", "leadership", "daytime"],
    requiredSkills: [
      { id: "multi-machine", name: "Multi-Machine Operation", description: "Operate 3+ different machine types", category: "technical" },
      { id: "troubleshooting", name: "Basic Troubleshooting", description: "Diagnose and fix minor issues", category: "technical" },
      { id: "quality-standards", name: "Quality Standards", description: "Ensure output meets specifications", category: "technical" },
      { id: "training-others", name: "Training New Operators", description: "Onboard and mentor new hires", category: "soft" },
      { id: "osha-10", name: "OSHA 10 Certification", description: "Occupational safety certification", category: "certification" },
    ]
  },
  {
    roleId: "assembler-to-quality",
    title: "Assembler → Quality Inspector",
    currentLevel: "Assembler",
    nextLevel: "Quality Inspector",
    salaryIncrease: "$2-3/hr more",
    industry: "industrial",
    traits: ["detail-oriented", "daytime"],
    requiredSkills: [
      { id: "attention-detail", name: "Attention to Detail", description: "Spot defects and inconsistencies", category: "soft" },
      { id: "measurement-tools", name: "Measurement Tools", description: "Use calipers, gauges, and testing equipment", category: "technical" },
      { id: "documentation", name: "Documentation Skills", description: "Record findings accurately", category: "technical" },
      { id: "quality-standards", name: "Quality Standards", description: "Understand ISO and company standards", category: "technical" },
      { id: "six-sigma", name: "Six Sigma Yellow Belt", description: "Basic quality improvement methodology", category: "certification" },
    ]
  },
];

type ViewMode = "quiz" | "select" | "analyze";

const SkillsAnalyzer = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("quiz");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [checkedSkills, setCheckedSkills] = useState<Set<string>>(new Set());
  
  // Quiz state
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedTraits, setSelectedTraits] = useState<Set<string>>(new Set());
  const [selectedExistingSkills, setSelectedExistingSkills] = useState<Set<string>>(new Set());
  const [showRecommendations, setShowRecommendations] = useState(false);

  const currentPath = roleProgression.find(r => r.roleId === selectedPath);

  // Calculate recommended paths based on quiz answers
  const getRecommendedPaths = () => {
    const scores = roleProgression.map(path => {
      let score = 0;
      
      // Industry match (highest weight)
      if (selectedIndustries.has(path.industry)) {
        score += 30;
      }
      
      // Trait matches
      path.traits.forEach(trait => {
        if (selectedTraits.has(trait)) {
          score += 10;
        }
      });
      
      // Existing skills boost
      existingSkills.forEach(skill => {
        if (selectedExistingSkills.has(skill.id) && skill.boostIndustries.includes(path.industry)) {
          score += 15;
        }
      });
      
      return { path, score };
    });
    
    return scores.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const recommendedPaths = getRecommendedPaths();

  const toggleIndustry = (id: string) => {
    setSelectedIndustries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleTrait = (id: string) => {
    setSelectedTraits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleExistingSkill = (id: string) => {
    setSelectedExistingSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSkill = (skillId: string) => {
    setCheckedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  const resetAnalysis = () => {
    setSelectedPath(null);
    setCheckedSkills(new Set());
    setViewMode("quiz");
    setShowRecommendations(false);
  };

  const resetQuiz = () => {
    setSelectedIndustries(new Set());
    setSelectedTraits(new Set());
    setSelectedExistingSkills(new Set());
    setShowRecommendations(false);
  };

  const canShowRecommendations = selectedIndustries.size > 0 || selectedTraits.size > 0;

  const progressPercentage = currentPath 
    ? (checkedSkills.size / currentPath.requiredSkills.length) * 100 
    : 0;

  const missingSkillIds = currentPath?.requiredSkills.filter(s => !checkedSkills.has(s.id)).map(s => s.id) || [];
  const missingRecommendations = sortByPriority(getRecommendationsForSkills(missingSkillIds));
  const quickWins = missingRecommendations.filter(r => r.quickWin);

  // Calculate total time and cost for action plan
  const actionPlanSummary = missingRecommendations.reduce((acc, rec) => {
    const costMatch = rec.costRange.match(/\$(\d+)/);
    if (costMatch) {
      acc.minCost += parseInt(costMatch[1]);
    }
    return acc;
  }, { minCost: 0 });

  return (
    <>
      <Helmet>
        <title>Skills Gap Analyzer | Indeed Flex Career Hub</title>
        <meta name="description" content="Identify the skills you need to advance to higher-paying roles. Get personalized recommendations with step-by-step action plans and resources." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/skills-analyzer" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Skills Analyzer" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <Target className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Skills Gap Analyzer
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Discover what skills you need to advance to higher-paying roles and get personalized action plans with resources.
            </p>
          </div>
        </section>

        {/* Analyzer */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {viewMode === "quiz" && !showRecommendations && (
                /* Career Path Quiz */
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent mb-4">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">Career Path Finder</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Find Your Best Career Path
                    </h2>
                    <p className="text-muted-foreground">
                      Answer a few questions and we'll recommend the best paths for you
                    </p>
                  </div>

                  {/* Step 1: Industry Interest */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
                        What industries interest you?
                      </CardTitle>
                      <CardDescription>Select all that apply</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {industries.map((industry) => (
                          <button
                            key={industry.id}
                            onClick={() => toggleIndustry(industry.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedIndustries.has(industry.id)
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <span className="text-2xl block mb-1">{industry.icon}</span>
                            <span className="font-medium text-sm block">{industry.name}</span>
                            <span className="text-xs text-muted-foreground">{industry.description}</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 2: Personal Traits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
                        What describes you?
                      </CardTitle>
                      <CardDescription>Select all that apply</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {personalTraits.map((trait) => (
                          <button
                            key={trait.id}
                            onClick={() => toggleTrait(trait.id)}
                            className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                              selectedTraits.has(trait.id)
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedTraits.has(trait.id) ? "bg-primary border-primary" : "border-muted-foreground"
                            }`}>
                              {selectedTraits.has(trait.id) && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <span className="text-sm">{trait.name}</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 3: Existing Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</span>
                        What experience do you have?
                      </CardTitle>
                      <CardDescription>Select all that apply (optional)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {existingSkills.map((skill) => (
                          <button
                            key={skill.id}
                            onClick={() => toggleExistingSkill(skill.id)}
                            className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                              selectedExistingSkills.has(skill.id)
                                ? "border-success bg-success/10"
                                : "border-border hover:border-success/50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedExistingSkills.has(skill.id) ? "bg-success border-success" : "border-muted-foreground"
                            }`}>
                              {selectedExistingSkills.has(skill.id) && <CheckCircle className="h-4 w-4 text-success-foreground" />}
                            </div>
                            <span className="text-sm">{skill.name}</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      onClick={() => setShowRecommendations(true)}
                      disabled={!canShowRecommendations}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Get Recommendations
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setViewMode("select")}
                    >
                      Skip Quiz → Browse All Paths
                    </Button>
                  </div>
                </div>
              )}

              {viewMode === "quiz" && showRecommendations && (
                /* Recommendations */
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success mb-4">
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">Your Personalized Matches</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Recommended Career Paths
                    </h2>
                    <p className="text-muted-foreground">
                      Based on your interests, traits, and experience
                    </p>
                  </div>

                  {/* Top Recommendations */}
                  <div className="space-y-4">
                    {recommendedPaths.map((item, index) => {
                      const industry = industries.find(i => i.id === item.path.industry);
                      const matchScore = Math.min(100, Math.round((item.score / 70) * 100));
                      
                      return (
                        <Card 
                          key={item.path.roleId}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            index === 0 ? "border-2 border-success" : "hover:border-primary/50"
                          }`}
                          onClick={() => {
                            setSelectedPath(item.path.roleId);
                            setViewMode("analyze");
                          }}
                        >
                          <CardContent className="py-4">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                index === 0 ? "bg-success/20" : "bg-muted"
                              }`}>
                                {industry?.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {index === 0 && (
                                    <span className="text-xs px-2 py-0.5 bg-success text-success-foreground rounded-full">
                                      Best Match
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {matchScore}% match
                                  </span>
                                </div>
                                <h3 className="font-semibold text-lg">{item.path.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.path.requiredSkills.length} skills to develop • {item.path.salaryIncrease}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {item.path.traits.filter(t => selectedTraits.has(t)).slice(0, 3).map(traitId => {
                                    const trait = personalTraits.find(t => t.id === traitId);
                                    return (
                                      <span key={traitId} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                        ✓ {trait?.name.replace("I ", "").replace("I'm ", "")}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-primary mt-2" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button variant="outline" onClick={resetQuiz} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Retake Quiz
                    </Button>
                    <Button variant="ghost" onClick={() => setViewMode("select")}>
                      Browse All {roleProgression.length} Paths
                    </Button>
                  </div>
                </div>
              )}

              {viewMode === "select" && !selectedPath && (
                /* Path Selection */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      All Career Paths
                    </h2>
                    <Button variant="outline" onClick={() => setViewMode("quiz")} className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Get Recommendations
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roleProgression.map((path) => {
                      const industry = industries.find(i => i.id === path.industry);
                      return (
                        <Card 
                          key={path.roleId}
                          className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                          onClick={() => {
                            setSelectedPath(path.roleId);
                            setViewMode("analyze");
                          }}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{industry?.icon}</span>
                              <span className="text-xs text-muted-foreground">{industry?.name}</span>
                            </div>
                            <CardTitle className="text-lg">{path.title}</CardTitle>
                            <CardDescription>
                              {path.requiredSkills.length} skills to develop
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-success font-medium">
                                {path.salaryIncrease}
                              </span>
                              <ArrowRight className="h-5 w-5 text-primary" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {(viewMode === "analyze" || selectedPath) && currentPath && (
                /* Skill Analysis */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{currentPath?.title}</h2>
                      <p className="text-muted-foreground">Check the skills you already have</p>
                    </div>
                    <Button variant="outline" onClick={resetAnalysis}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Start Over
                    </Button>
                  </div>

                  {/* Progress */}
                  <Card className="mb-8">
                    <CardContent className="py-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Your Progress</span>
                        <span className="text-primary font-bold">
                          {checkedSkills.size} / {currentPath?.requiredSkills.length} skills
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      {progressPercentage === 100 && (
                        <div className="mt-4 p-4 bg-success/10 rounded-lg flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-success" />
                          <div>
                            <p className="font-semibold text-success">You're ready to advance!</p>
                            <p className="text-sm text-muted-foreground">
                              You have all the skills needed for {currentPath?.nextLevel}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Skills List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentPath?.requiredSkills.map((skill) => {
                      const isChecked = checkedSkills.has(skill.id);
                      return (
                        <Card 
                          key={skill.id}
                          className={`cursor-pointer transition-all ${
                            isChecked ? 'border-success bg-success/5' : 'hover:border-primary/30'
                          }`}
                          onClick={() => toggleSkill(skill.id)}
                        >
                          <CardContent className="py-4">
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 ${isChecked ? 'text-success' : 'text-muted-foreground'}`}>
                                {isChecked ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <XCircle className="h-5 w-5" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium ${isChecked ? 'text-success' : ''}`}>
                                    {skill.name}
                                  </span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    skill.category === 'certification' 
                                      ? 'bg-accent/20 text-accent' 
                                      : skill.category === 'technical'
                                      ? 'bg-primary/20 text-primary'
                                      : 'bg-secondary text-secondary-foreground'
                                  }`}>
                                    {skill.category}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {skill.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Action Plan with Rich Recommendations */}
                  {missingRecommendations.length > 0 && missingRecommendations.length < (currentPath?.requiredSkills.length || 0) && (
                    <div className="space-y-6">
                      {/* Action Plan Summary */}
                      <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                          <CardTitle className="text-primary-foreground flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-accent" />
                            Your Action Plan
                          </CardTitle>
                          <CardDescription className="text-primary-foreground/80">
                            {missingRecommendations.length} skill{missingRecommendations.length > 1 ? 's' : ''} to develop for {currentPath?.nextLevel}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-primary-foreground/10 rounded-lg p-3">
                              <div className="text-2xl font-bold">{missingRecommendations.length}</div>
                              <div className="text-sm text-primary-foreground/70">Skills to Learn</div>
                            </div>
                            <div className="bg-primary-foreground/10 rounded-lg p-3">
                              <div className="text-2xl font-bold">{quickWins.length}</div>
                              <div className="text-sm text-primary-foreground/70">Quick Wins</div>
                            </div>
                            <div className="bg-primary-foreground/10 rounded-lg p-3">
                              <div className="text-2xl font-bold flex items-center gap-1">
                                <DollarSign className="h-5 w-5" />{actionPlanSummary.minCost}+
                              </div>
                              <div className="text-sm text-primary-foreground/70">Est. Investment</div>
                            </div>
                            <div className="bg-primary-foreground/10 rounded-lg p-3">
                              <div className="text-2xl font-bold text-accent">{currentPath?.salaryIncrease}</div>
                              <div className="text-sm text-primary-foreground/70">Potential Raise</div>
                            </div>
                          </div>

                          {quickWins.length > 0 && (
                            <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Zap className="h-4 w-4 text-accent" />
                                <span className="font-semibold text-accent">Start Here:</span>
                              </div>
                              <p className="text-sm text-primary-foreground/90">
                                <strong>{quickWins[0].skillName}</strong> — {quickWins[0].timeEstimate}, {quickWins[0].costRange}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Detailed Recommendations */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          Step-by-Step Skill Development
                        </h3>
                        <div className="space-y-4">
                          {missingRecommendations.map((rec) => (
                            <SkillRecommendationCard 
                              key={rec.skillId} 
                              recommendation={rec}
                              compact
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ToolDisclaimer 
                type="educational"
                sources={["Industry hiring requirements", "Certification body data", "Employer skill surveys"]}
                lastUpdated="December 2024"
                customText="Skill requirements, costs, and salary increases shown are general industry estimates. Actual advancement criteria and resource pricing vary. This assessment is for educational purposes—consult with employers about specific requirements."
              />
            </div>
          </div>
        </section>

        <CTASection 
          title="Start Building Your Skills Today"
          subtitle="Find shifts that help you develop new skills and advance your career."
        />
      </Layout>
    </>
  );
};

export default SkillsAnalyzer;
