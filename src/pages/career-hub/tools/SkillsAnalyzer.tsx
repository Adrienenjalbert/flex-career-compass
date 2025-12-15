import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, XCircle, ArrowRight, RotateCcw, Lightbulb } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";

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
}

const roleProgression: RoleSkills[] = [
  {
    roleId: "barback-to-bartender",
    title: "Barback → Bartender",
    currentLevel: "Barback",
    nextLevel: "Bartender",
    salaryIncrease: "$5-10/hr more + tips",
    requiredSkills: [
      { id: "mixology", name: "Mixology Basics", description: "Know 20+ classic cocktail recipes", category: "technical" },
      { id: "tips-cert", name: "TIPS Certification", description: "Responsible alcohol service training", category: "certification" },
      { id: "speed", name: "Speed & Efficiency", description: "Handle multiple orders quickly", category: "soft" },
      { id: "customer", name: "Customer Rapport", description: "Build relationships with regulars", category: "soft" },
      { id: "memory", name: "Order Memory", description: "Remember complex orders without notes", category: "technical" },
    ]
  },
  {
    roleId: "picker-to-lead",
    title: "Picker/Packer → Lead",
    currentLevel: "Picker/Packer",
    nextLevel: "Lead Picker",
    salaryIncrease: "$2-4/hr more",
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
    requiredSkills: [
      { id: "forklift-cert", name: "Forklift Certification", description: "OSHA-compliant training (1-2 days)", category: "certification" },
      { id: "spatial", name: "Spatial Awareness", description: "Navigate tight spaces safely", category: "technical" },
      { id: "safety", name: "Safety Record", description: "Clean safety history, no incidents", category: "soft" },
      { id: "loading", name: "Load Assessment", description: "Evaluate weight and balance", category: "technical" },
      { id: "communication", name: "Radio Communication", description: "Clear communication with team", category: "soft" },
    ]
  },
  {
    roleId: "server-to-supervisor",
    title: "Server → Restaurant Supervisor",
    currentLevel: "Server",
    nextLevel: "Shift Supervisor",
    salaryIncrease: "$4-6/hr more",
    requiredSkills: [
      { id: "leadership", name: "Leadership Skills", description: "Guide and motivate team members", category: "soft" },
      { id: "conflict", name: "Conflict Resolution", description: "Handle customer complaints professionally", category: "soft" },
      { id: "pos", name: "POS System Mastery", description: "Handle voids, comps, and reports", category: "technical" },
      { id: "scheduling", name: "Scheduling Basics", description: "Understand shift planning", category: "technical" },
      { id: "food-safety", name: "Food Safety Cert", description: "ServSafe or equivalent", category: "certification" },
    ]
  },
  {
    roleId: "cleaner-to-supervisor",
    title: "Cleaner → Cleaning Supervisor",
    currentLevel: "Cleaner",
    nextLevel: "Cleaning Supervisor",
    salaryIncrease: "$3-5/hr more",
    requiredSkills: [
      { id: "quality-control", name: "Quality Inspection", description: "Evaluate cleaning standards", category: "technical" },
      { id: "team-management", name: "Team Coordination", description: "Assign tasks and manage workflow", category: "soft" },
      { id: "inventory-mgmt", name: "Supply Management", description: "Track and order cleaning supplies", category: "technical" },
      { id: "client-relations", name: "Client Communication", description: "Handle client requests professionally", category: "soft" },
      { id: "safety-protocols", name: "Safety Compliance", description: "OSHA cleaning safety knowledge", category: "certification" },
    ]
  },
];

const SkillsAnalyzer = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [checkedSkills, setCheckedSkills] = useState<Set<string>>(new Set());

  const currentPath = roleProgression.find(r => r.roleId === selectedPath);

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
  };

  const progressPercentage = currentPath 
    ? (checkedSkills.size / currentPath.requiredSkills.length) * 100 
    : 0;

  const missingSkills = currentPath?.requiredSkills.filter(s => !checkedSkills.has(s.id)) || [];

  return (
    <>
      <Helmet>
        <title>Skills Gap Analyzer | Indeed Flex Career Hub</title>
        <meta name="description" content="Identify the skills you need to advance to higher-paying roles. Get personalized recommendations to grow your career." />
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
              Discover what skills you need to advance to higher-paying roles and get personalized recommendations.
            </p>
          </div>
        </section>

        {/* Analyzer */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {!selectedPath ? (
                /* Path Selection */
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Choose Your Career Path
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roleProgression.map((path) => (
                      <Card 
                        key={path.roleId}
                        className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                        onClick={() => setSelectedPath(path.roleId)}
                      >
                        <CardHeader>
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
                    ))}
                  </div>
                </div>
              ) : (
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

                  {/* Recommendations */}
                  {missingSkills.length > 0 && missingSkills.length < (currentPath?.requiredSkills.length || 0) && (
                    <Card className="bg-primary text-primary-foreground">
                      <CardHeader>
                        <CardTitle className="text-primary-foreground flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-accent" />
                          Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {missingSkills.map((skill) => (
                          <div key={skill.id} className="bg-primary-foreground/10 rounded-lg p-4">
                            <div className="font-medium mb-1">{skill.name}</div>
                            <p className="text-sm text-primary-foreground/80">
                              {skill.category === 'certification' 
                                ? `Get certified: ${skill.description}. Many programs are available online or through employers.`
                                : skill.category === 'technical'
                                ? `Practice this skill: ${skill.description}. Ask for opportunities to develop this on the job.`
                                : `Develop this soft skill: ${skill.description}. Focus on demonstrating this in your current role.`
                              }
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
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
