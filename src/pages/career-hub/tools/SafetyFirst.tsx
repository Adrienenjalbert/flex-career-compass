import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, BookOpen, Brain, Target, ChevronRight, ChevronLeft,
  CheckCircle, XCircle, RotateCcw, AlertTriangle, HardHat
} from 'lucide-react';
import ToolDisclaimer from '@/components/career-hub/ToolDisclaimer';
import { 
  safetyScenarios, 
  ppeItems, 
  categoryLabels, 
  industryLabels,
  SafetyScenario,
  PPEItem
} from '@/data/safety-scenarios';

type Language = 'en' | 'es';
type Mode = 'learn' | 'quiz' | 'ppe';
type Industry = 'all' | 'warehouse' | 'hospitality' | 'general';
type Category = 'all' | 'hazard' | 'ppe' | 'emergency' | 'procedure';

const SafetyFirst: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<Mode>('learn');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  
  // Progress tracking
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('safetyfirst-completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Filter scenarios
  const filteredScenarios = safetyScenarios.filter(s => {
    if (selectedIndustry !== 'all' && s.industry !== selectedIndustry) return false;
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    return true;
  });

  const currentScenario = filteredScenarios[currentQuestionIndex];

  // Filter PPE items
  const filteredPPE = ppeItems.filter(p => 
    selectedIndustry === 'all' || p.industries.includes(selectedIndustry as any)
  );

  useEffect(() => {
    localStorage.setItem('safetyfirst-completed', JSON.stringify([...completedScenarios]));
  }, [completedScenarios]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (currentScenario.options[index].correct) {
      setScore(prev => prev + 1);
      setCompletedScenarios(prev => new Set([...prev, currentScenario.id]));
    }
    setAnsweredQuestions(prev => new Set([...prev, currentScenario.id]));
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredScenarios.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions(new Set());
  };

  const resetProgress = () => {
    setCompletedScenarios(new Set());
    localStorage.removeItem('safetyfirst-completed');
    resetQuiz();
  };

  const progressPercent = (completedScenarios.size / safetyScenarios.length) * 100;

  const breadcrumbs = [
    { label: 'Career Hub', href: '/career-hub' },
    { label: 'Tools', href: '/career-hub/tools' },
    { label: 'SafetyFirst' }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SafetyFirst - OSHA Safety Trainer",
    "description": "Free bilingual workplace safety training tool covering hazard identification, PPE requirements, and emergency procedures for warehouse and hospitality workers.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": ["en", "es"]
  };

  return (
    <Layout>
      <Helmet>
        <title>SafetyFirst: Free OSHA Safety Trainer | Bilingual Workplace Safety Quiz</title>
        <meta name="description" content="Free workplace safety training tool. Learn OSHA regulations, hazard identification, PPE requirements, and emergency procedures. Bilingual English/Spanish support for warehouse and hospitality workers." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/safety-first" />
        <meta property="og:title" content="SafetyFirst: Free OSHA Safety Trainer" />
        <meta property="og:description" content="Master workplace safety with free bilingual training. Hazard identification, PPE, emergency procedures for warehouse and hospitality." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">SafetyFirst</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            {language === 'en' 
              ? 'Master workplace safety with interactive training'
              : 'Domina la seguridad laboral con entrenamiento interactivo'}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center gap-2">
            <Button 
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
            <Button 
              variant={language === 'es' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('es')}
            >
              Español
            </Button>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {language === 'en' ? 'Your Progress' : 'Tu Progreso'}
              </span>
              <span className="text-sm text-muted-foreground">
                {completedScenarios.size}/{safetyScenarios.length} {language === 'en' ? 'scenarios' : 'escenarios'}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Mode Tabs */}
        <Tabs value={mode} onValueChange={(v) => { setMode(v as Mode); resetQuiz(); }}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Learn' : 'Aprender'}</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Quiz' : 'Prueba'}</span>
            </TabsTrigger>
            <TabsTrigger value="ppe" className="flex items-center gap-2">
              <HardHat className="h-4 w-4" />
              <span className="hidden sm:inline">PPE</span>
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">
                {language === 'en' ? 'Industry' : 'Industria'}
              </label>
              <div className="flex flex-wrap gap-1">
                {(['all', 'warehouse', 'hospitality', 'general'] as Industry[]).map(ind => (
                  <Button
                    key={ind}
                    variant={selectedIndustry === ind ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setSelectedIndustry(ind); resetQuiz(); }}
                  >
                    {ind === 'all' 
                      ? (language === 'en' ? 'All' : 'Todos')
                      : industryLabels[ind][language]
                    }
                  </Button>
                ))}
              </div>
            </div>
            
            {mode !== 'ppe' && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'en' ? 'Category' : 'Categoría'}
                </label>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'hazard', 'ppe', 'emergency', 'procedure'] as Category[]).map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => { setSelectedCategory(cat); resetQuiz(); }}
                    >
                      {cat === 'all' 
                        ? (language === 'en' ? 'All' : 'Todos')
                        : categoryLabels[cat][language]
                      }
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learn Mode */}
          <TabsContent value="learn">
            {filteredScenarios.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {language === 'en' 
                    ? 'No scenarios match your filters. Try different options.'
                    : 'No hay escenarios que coincidan con tus filtros. Prueba diferentes opciones.'}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredScenarios.map((scenario) => (
                  <Card key={scenario.id} className={completedScenarios.has(scenario.id) ? 'border-green-500/50 bg-green-500/5' : ''}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">
                            {industryLabels[scenario.industry].icon} {industryLabels[scenario.industry][language]}
                          </Badge>
                          <Badge className={categoryLabels[scenario.category].color}>
                            {categoryLabels[scenario.category].icon} {categoryLabels[scenario.category][language]}
                          </Badge>
                          {scenario.oshaReference && (
                            <Badge variant="outline" className="text-xs">
                              {scenario.oshaReference}
                            </Badge>
                          )}
                        </div>
                        {completedScenarios.has(scenario.id) && (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-2">
                        {language === 'en' ? scenario.scenario : scenario.scenarioSpanish}
                      </p>
                      <p className="text-primary font-medium mb-3">
                        {language === 'en' ? scenario.question : scenario.questionSpanish}
                      </p>
                      <div className="space-y-2">
                        {scenario.options.map((option, idx) => (
                          <div 
                            key={idx}
                            className={`p-3 rounded-lg border ${
                              option.correct 
                                ? 'border-green-500 bg-green-500/10' 
                                : 'border-border'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {option.correct ? (
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className={option.correct ? 'font-medium' : ''}>
                                  {language === 'en' ? option.text : option.textSpanish}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {language === 'en' ? option.explanation : option.explanationSpanish}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Quiz Mode */}
          <TabsContent value="quiz">
            {filteredScenarios.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {language === 'en' 
                    ? 'No scenarios match your filters. Try different options.'
                    : 'No hay escenarios que coincidan con tus filtros. Prueba diferentes opciones.'}
                </CardContent>
              </Card>
            ) : quizComplete ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <div className="text-6xl mb-4">
                    {score >= filteredScenarios.length * 0.8 ? '🏆' : score >= filteredScenarios.length * 0.5 ? '👍' : '📚'}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'en' ? 'Quiz Complete!' : '¡Prueba Completa!'}
                  </h2>
                  <p className="text-xl mb-4">
                    {language === 'en' ? 'Score:' : 'Puntuación:'} {score}/{filteredScenarios.length}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {score >= filteredScenarios.length * 0.8 
                      ? (language === 'en' ? 'Excellent! You\'re a safety pro!' : '¡Excelente! ¡Eres un profesional de la seguridad!')
                      : score >= filteredScenarios.length * 0.5
                        ? (language === 'en' ? 'Good job! Keep practicing to improve.' : '¡Buen trabajo! Sigue practicando para mejorar.')
                        : (language === 'en' ? 'Review the scenarios and try again.' : 'Revisa los escenarios e intenta de nuevo.')
                    }
                  </p>
                  <Button onClick={resetQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
                  </Button>
                </CardContent>
              </Card>
            ) : currentScenario && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {industryLabels[currentScenario.industry].icon} {industryLabels[currentScenario.industry][language]}
                      </Badge>
                      <Badge className={categoryLabels[currentScenario.category].color}>
                        {categoryLabels[currentScenario.category][language]}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {currentQuestionIndex + 1}/{filteredScenarios.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-start gap-2 mb-4 p-4 bg-muted/50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-lg">
                        {language === 'en' ? currentScenario.scenario : currentScenario.scenarioSpanish}
                      </p>
                    </div>
                    <p className="text-primary font-semibold text-lg">
                      {language === 'en' ? currentScenario.question : currentScenario.questionSpanish}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentScenario.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-lg border text-left transition-colors ${
                          showExplanation
                            ? option.correct
                              ? 'border-green-500 bg-green-500/10'
                              : selectedAnswer === idx
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-border opacity-50'
                            : 'border-border hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-primary">{String.fromCharCode(65 + idx)}.</span>
                          <span>{language === 'en' ? option.text : option.textSpanish}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      currentScenario.options[selectedAnswer!].correct 
                        ? 'bg-green-500/10 border border-green-500' 
                        : 'bg-red-500/10 border border-red-500'
                    }`}>
                      <div className="flex items-start gap-2">
                        {currentScenario.options[selectedAnswer!].correct ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        )}
                        <p>
                          {language === 'en' 
                            ? currentScenario.options[selectedAnswer!].explanation 
                            : currentScenario.options[selectedAnswer!].explanationSpanish}
                        </p>
                      </div>
                      {currentScenario.oshaReference && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Reference: {currentScenario.oshaReference}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Previous' : 'Anterior'}
                    </Button>
                    <Button 
                      onClick={handleNext}
                      disabled={!showExplanation}
                    >
                      {currentQuestionIndex === filteredScenarios.length - 1 
                        ? (language === 'en' ? 'Finish' : 'Terminar')
                        : (language === 'en' ? 'Next' : 'Siguiente')}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PPE Reference Mode */}
          <TabsContent value="ppe">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPPE.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <CardTitle className="text-lg">
                          {language === 'en' ? item.name : item.nameSpanish}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? item.description : item.descriptionSpanish}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Protects Against:' : 'Protege Contra:'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(language === 'en' ? item.hazards : item.hazardsSpanish).map((hazard, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.industries.map(ind => (
                        <Badge key={ind} variant="outline" className="text-xs">
                          {industryLabels[ind].icon} {industryLabels[ind][language]}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Reset Progress */}
        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm" onClick={resetProgress}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Reset All Progress' : 'Reiniciar Todo el Progreso'}
          </Button>
        </div>

        <ToolDisclaimer type="educational" />
      </div>
    </Layout>
  );
};

export default SafetyFirst;
