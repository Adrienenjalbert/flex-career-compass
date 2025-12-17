import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  Plus, 
  Trash2, 
  Printer,
  FileText,
  Sparkles,
  CheckCircle2,
  User,
  Briefcase,
  Star
} from "lucide-react";
import {
  resumeTemplates,
  softSkillsLibrary,
  availabilityPhrases,
  noExperienceHighlights,
  usStates,
} from "@/data/resume-templates";

interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  linkedin: string;
}

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

interface ResumeData {
  targetIndustry: string;
  hasExperience: boolean;
  personalInfo: PersonalInfo;
  selectedSkills: string[];
  customSkills: string[];
  experiences: WorkExperience[];
  highlights: string[];
  availability: string[];
  summary: string;
}

const initialResumeData: ResumeData = {
  targetIndustry: '',
  hasExperience: true,
  personalInfo: {
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    linkedin: '',
  },
  selectedSkills: [],
  customSkills: [],
  experiences: [],
  highlights: [],
  availability: [],
  summary: '',
};

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const resumeRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const toggleSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter(s => s !== skill)
        : [...prev.selectedSkills, skill]
    }));
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !resumeData.customSkills.includes(customSkillInput.trim())) {
      setResumeData(prev => ({
        ...prev,
        customSkills: [...prev.customSkills, customSkillInput.trim()]
      }));
      setCustomSkillInput('');
    }
  };

  const removeCustomSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      customSkills: prev.customSkills.filter(s => s !== skill)
    }));
  };

  const toggleHighlight = (highlight: string) => {
    setResumeData(prev => ({
      ...prev,
      highlights: prev.highlights.includes(highlight)
        ? prev.highlights.filter(h => h !== highlight)
        : [...prev.highlights, highlight]
    }));
  };

  const toggleAvailability = (item: string) => {
    setResumeData(prev => ({
      ...prev,
      availability: prev.availability.includes(item)
        ? prev.availability.filter(a => a !== item)
        : [...prev.availability, item]
    }));
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const updateExperienceBullet = (expId: string, bulletIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  const addBulletToExperience = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      )
    }));
  };

  const generateSummary = () => {
    const template = resumeTemplates[resumeData.targetIndustry];
    if (!template) return;
    
    const level = resumeData.hasExperience 
      ? (resumeData.experiences.length > 0 ? 'some' : 'none')
      : 'none';
    
    const summaryTemplate = template.summaryTemplates.find(s => s.experienceLevel === level);
    if (summaryTemplate) {
      setResumeData(prev => ({ ...prev, summary: summaryTemplate.template }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return resumeData.targetIndustry !== '';
      case 2:
        return resumeData.personalInfo.fullName && 
               resumeData.personalInfo.email && 
               resumeData.personalInfo.city &&
               resumeData.personalInfo.state;
      case 3:
        return resumeData.selectedSkills.length > 0 || resumeData.customSkills.length > 0;
      case 4:
        return resumeData.hasExperience 
          ? resumeData.experiences.length > 0 
          : resumeData.highlights.length > 0;
      default:
        return true;
    }
  };

  const selectedTemplate = resumeTemplates[resumeData.targetIndustry];

  return (
    <>
      <Helmet>
        <title>Free Resume Builder for Hourly Workers | No Experience Required</title>
        <meta 
          name="description" 
          content="Build a professional resume in 10 minutes. Templates for warehouse, hospitality, retail jobs. Perfect for first-time job seekers with no experience." 
        />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/resume-builder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Build a Resume for Hourly Work",
            "description": "Create a professional resume for warehouse, hospitality, retail, or facilities jobs",
            "step": [
              { "@type": "HowToStep", "name": "Choose Your Industry", "text": "Select the type of work you're looking for" },
              { "@type": "HowToStep", "name": "Add Personal Info", "text": "Enter your contact information" },
              { "@type": "HowToStep", "name": "Select Skills", "text": "Choose relevant skills from our suggestions" },
              { "@type": "HowToStep", "name": "Add Experience", "text": "Add work history or highlight your strengths" },
              { "@type": "HowToStep", "name": "Download Resume", "text": "Preview and download your professional resume" }
            ]
          })}
        </script>
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs 
            items={[
              { label: "Tools", href: "/career-hub/tools" },
              { label: "Resume Builder" }
            ]} 
          />
        </div>

        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Resume Builder for Hourly Workers
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Build a professional resume in minutes—no experience required
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="sticky top-0 z-40 bg-background border-b border-border py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Step 1: Choose Industry */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    What type of work are you looking for?
                  </h2>
                  <p className="text-muted-foreground">
                    We'll customize your resume with industry-specific skills
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.values(resumeTemplates).map((template) => (
                    <button
                      key={template.industry}
                      onClick={() => setResumeData(prev => ({ ...prev, targetIndustry: template.industry }))}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        resumeData.targetIndustry === template.industry
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-3xl mb-3 block">{template.icon}</span>
                      <h3 className="font-semibold text-foreground text-lg">{template.industryLabel}</h3>
                    </button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Do you have work experience?
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setResumeData(prev => ({ ...prev, hasExperience: true }))}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        resumeData.hasExperience
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Briefcase className="w-5 h-5 mx-auto mb-2" />
                      <span className="block text-sm font-medium">Yes, I have experience</span>
                    </button>
                    <button
                      onClick={() => setResumeData(prev => ({ ...prev, hasExperience: false }))}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        !resumeData.hasExperience
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Star className="w-5 h-5 mx-auto mb-2" />
                      <span className="block text-sm font-medium">No, first job</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    How can employers reach you?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Smith"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@email.com"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Austin"
                        value={resumeData.personalInfo.city}
                        onChange={(e) => updatePersonalInfo('city', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <select
                        id="state"
                        value={resumeData.personalInfo.state}
                        onChange={(e) => updatePersonalInfo('state', e.target.value)}
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select state</option>
                        {usStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/johnsmith"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills */}
            {currentStep === 3 && selectedTemplate && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Select Your Skills
                  </h2>
                  <p className="text-muted-foreground">
                    Choose skills that match your abilities
                  </p>
                </div>

                {selectedTemplate.skills.map((category) => (
                  <Card key={category.category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                              resumeData.selectedSkills.includes(skill)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80 text-foreground'
                            }`}
                          >
                            {resumeData.selectedSkills.includes(skill) && (
                              <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
                            )}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Soft Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {softSkillsLibrary.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            resumeData.selectedSkills.includes(skill)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          {resumeData.selectedSkills.includes(skill) && (
                            <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
                          )}
                          {skill}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Add Custom Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Type a skill..."
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                      />
                      <Button onClick={addCustomSkill} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {resumeData.customSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {resumeData.customSkills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm"
                          >
                            {skill}
                            <button onClick={() => removeCustomSkill(skill)}>
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Experience or Highlights */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {resumeData.hasExperience ? 'Work Experience' : 'What You Bring'}
                  </h2>
                  <p className="text-muted-foreground">
                    {resumeData.hasExperience 
                      ? 'Add your relevant work history'
                      : 'Highlight your strengths and availability'}
                  </p>
                </div>

                {resumeData.hasExperience ? (
                  <div className="space-y-4">
                    {resumeData.experiences.map((exp, index) => (
                      <Card key={exp.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Position {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>Job Title</Label>
                              <Input
                                placeholder="Warehouse Associate"
                                value={exp.jobTitle}
                                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Company</Label>
                              <Input
                                placeholder="Amazon Fulfillment"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                placeholder="Jan 2023"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                placeholder="Present"
                                value={exp.isCurrent ? 'Present' : exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.isCurrent}
                                className="mt-1"
                              />
                              <div className="flex items-center gap-2 mt-2">
                                <Checkbox
                                  id={`current-${exp.id}`}
                                  checked={exp.isCurrent}
                                  onCheckedChange={(checked) => updateExperience(exp.id, 'isCurrent', checked)}
                                />
                                <Label htmlFor={`current-${exp.id}`} className="text-sm">Current position</Label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Responsibilities (bullet points)</Label>
                            {exp.bullets.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex gap-2 mt-2">
                                <span className="text-muted-foreground mt-2">•</span>
                                <Input
                                  placeholder={selectedTemplate?.responsibilityPhrases[bulletIndex] || "Describe what you did..."}
                                  value={bullet}
                                  onChange={(e) => updateExperienceBullet(exp.id, bulletIndex, e.target.value)}
                                />
                              </div>
                            ))}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addBulletToExperience(exp.id)}
                              className="mt-2"
                            >
                              <Plus className="w-4 h-4 mr-1" /> Add bullet
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button
                      onClick={addExperience}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Work Experience
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Your Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select statements that describe you (these replace traditional experience)
                        </p>
                        <div className="space-y-2">
                          {noExperienceHighlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-center gap-3"
                            >
                              <Checkbox
                                id={highlight}
                                checked={resumeData.highlights.includes(highlight)}
                                onCheckedChange={() => toggleHighlight(highlight)}
                              />
                              <Label htmlFor={highlight} className="cursor-pointer">{highlight}</Label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Availability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {availabilityPhrases.map((item) => (
                            <button
                              key={item}
                              onClick={() => toggleAvailability(item)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                resumeData.availability.includes(item)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted hover:bg-muted/80 text-foreground'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Preview & Download */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your Resume is Ready!
                  </h2>
                  <p className="text-muted-foreground">
                    Review and download your professional resume
                  </p>
                </div>

                {/* Summary Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Professional Summary</CardTitle>
                      <Button variant="ghost" size="sm" onClick={generateSummary}>
                        <Sparkles className="w-4 h-4 mr-1" /> Generate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write a brief summary about yourself..."
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Resume Preview */}
                <div className="print-only" ref={resumeRef}>
                  <Card className="bg-white text-black">
                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="text-center border-b border-gray-300 pb-4 mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {resumeData.personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                          {[
                            resumeData.personalInfo.city,
                            resumeData.personalInfo.state
                          ].filter(Boolean).join(', ')}
                          {resumeData.personalInfo.phone && ` • ${resumeData.personalInfo.phone}`}
                          {resumeData.personalInfo.email && ` • ${resumeData.personalInfo.email}`}
                        </p>
                        {resumeData.personalInfo.linkedin && (
                          <p className="text-sm text-gray-600">{resumeData.personalInfo.linkedin}</p>
                        )}
                      </div>

                      {/* Summary */}
                      {resumeData.summary && (
                        <div className="mb-4">
                          <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">
                            Professional Summary
                          </h2>
                          <p className="text-sm text-gray-700">{resumeData.summary}</p>
                        </div>
                      )}

                      {/* Skills */}
                      {(resumeData.selectedSkills.length > 0 || resumeData.customSkills.length > 0) && (
                        <div className="mb-4">
                          <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">
                            Skills
                          </h2>
                          <p className="text-sm text-gray-700">
                            {[...resumeData.selectedSkills, ...resumeData.customSkills].join(' • ')}
                          </p>
                        </div>
                      )}

                      {/* Experience */}
                      {resumeData.hasExperience && resumeData.experiences.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">
                            Work Experience
                          </h2>
                          {resumeData.experiences.map((exp) => (
                            <div key={exp.id} className="mb-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                                  <p className="text-sm text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                </span>
                              </div>
                              <ul className="mt-1 space-y-1">
                                {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                                  <li key={i} className="text-sm text-gray-700 flex">
                                    <span className="mr-2">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* No Experience Highlights */}
                      {!resumeData.hasExperience && resumeData.highlights.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">
                            Qualifications
                          </h2>
                          <ul className="space-y-1">
                            {resumeData.highlights.map((highlight, i) => (
                              <li key={i} className="text-sm text-gray-700 flex">
                                <span className="mr-2">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Availability */}
                      {resumeData.availability.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">
                            Availability
                          </h2>
                          <p className="text-sm text-gray-700">
                            {resumeData.availability.join(' • ')}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handlePrint} size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Download as PDF
                  </Button>
                  <Button variant="outline" size="lg" onClick={handlePrint} className="gap-2">
                    <Printer className="w-5 h-5" />
                    Print Resume
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Tip: Use your browser's "Save as PDF" option when the print dialog opens
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </div>

        <CTASection 
          title="Ready to Find Your Next Shift?"
          subtitle="Download Indeed Flex and start applying with your new resume"
        />
      </Layout>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-only, .print-only * {
            visibility: visible;
          }
          .print-only {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ResumeBuilder;
