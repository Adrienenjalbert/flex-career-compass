import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ChefHat, 
  BookOpen, 
  Shuffle, 
  ClipboardCheck,
  Volume2,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Thermometer,
  Languages
} from "lucide-react";
import { 
  culinaryTerms, 
  knifeCuts, 
  foodSafetyQuestions,
  categoryLabels,
  difficultyLabels,
  safetyCategoryLabels,
  type CulinaryTerm,
  type KnifeCut,
  type FoodSafetyQuestion
} from "@/data/culinary-terms";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";

type Mode = 'learn' | 'flashcard' | 'cuts' | 'safety';
type TermCategory = 'all' | 'technique' | 'cut' | 'term' | 'temperature' | 'cuisine';
type Difficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';
type SafetyCategory = 'all' | 'temperature' | 'storage' | 'contamination' | 'hygiene';

const STORAGE_KEY = 'menumaster-progress';

interface Progress {
  masteredTerms: string[];
  masteredCuts: string[];
  safetyScore: number;
  safetyAttempts: number;
}

export default function MenuMaster() {
  const [mode, setMode] = useState<Mode>('learn');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [category, setCategory] = useState<TermCategory>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [safetyCategory, setSafetyCategory] = useState<SafetyCategory>('all');
  const [progress, setProgress] = useState<Progress>({
    masteredTerms: [],
    masteredCuts: [],
    safetyScore: 0,
    safetyAttempts: 0
  });

  // Flashcard state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  // Safety quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const { speak, isSpeaking } = useSpeechSynthesis();
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load progress');
      }
    }
  }, []);

  // Save progress
  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  // Filter terms
  const filteredTerms = culinaryTerms.filter(term => {
    if (category !== 'all' && term.category !== category) return false;
    if (difficulty !== 'all' && term.difficulty !== difficulty) return false;
    return true;
  });

  // Filter safety questions
  const filteredSafetyQuestions = foodSafetyQuestions.filter(q => {
    if (safetyCategory !== 'all' && q.category !== safetyCategory) return false;
    return true;
  });

  const currentTerm = filteredTerms[currentIndex];
  const currentQuestion = filteredSafetyQuestions[currentQuestionIndex];

  const handlePronounce = (text: string) => {
    if (speechSupported) {
      speak(text, language === 'es' ? 'es-ES' : 'en-US');
    }
  };

  const handleNextTerm = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTerms.length);
    setIsFlipped(false);
    setShowDefinition(false);
  };

  const handlePrevTerm = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
    setIsFlipped(false);
    setShowDefinition(false);
  };

  const handleMarkMastered = (termId: string) => {
    if (!progress.masteredTerms.includes(termId)) {
      saveProgress({
        ...progress,
        masteredTerms: [...progress.masteredTerms, termId]
      });
    }
    handleNextTerm();
  };

  const handleMarkCutMastered = (cutId: string) => {
    if (!progress.masteredCuts.includes(cutId)) {
      saveProgress({
        ...progress,
        masteredCuts: [...progress.masteredCuts, cutId]
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredSafetyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      saveProgress({
        ...progress,
        safetyScore: progress.safetyScore + quizScore,
        safetyAttempts: progress.safetyAttempts + filteredSafetyQuestions.length
      });
    }
  };

  const resetSafetyQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const resetProgress = () => {
    const newProgress = { masteredTerms: [], masteredCuts: [], safetyScore: 0, safetyAttempts: 0 };
    saveProgress(newProgress);
    setCurrentIndex(0);
    resetSafetyQuiz();
  };

  const progressPercent = Math.round(
    ((progress.masteredTerms.length + progress.masteredCuts.length) / 
    (culinaryTerms.length + knifeCuts.length)) * 100
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MenuMaster - Culinary Skills Trainer",
    "description": "Free culinary terminology trainer with knife cuts, cooking techniques, and ServSafe prep for kitchen workers advancing to chef roles.",
    "url": "https://flex-career-compass.lovable.app/career-hub/tools/menu-master",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <Helmet>
        <title>MenuMaster: Culinary Terminology Trainer | Free Chef Skills Quiz</title>
        <meta name="description" content="Master culinary terminology, knife cuts, cooking techniques, and ServSafe food safety prep. Free bilingual trainer for kitchen workers advancing to chef roles." />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/tools/menu-master" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">MenuMaster</h1>
            <p className="text-muted-foreground text-lg">
              {language === 'en' 
                ? 'Master culinary terminology, knife cuts & food safety'
                : 'Domina la terminología culinaria, cortes y seguridad alimentaria'}
            </p>
          </div>

          {/* Progress Card */}
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Overall Progress' : 'Progreso General'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {progress.masteredTerms.length + progress.masteredCuts.length} / {culinaryTerms.length + knifeCuts.length}
                </span>
              </div>
              <Progress value={progressPercent} className="h-2 mb-4" />
              <div className="flex flex-wrap gap-2 justify-between text-xs text-muted-foreground">
                <span>📚 {progress.masteredTerms.length} terms</span>
                <span>🔪 {progress.masteredCuts.length} cuts</span>
                <span>✅ {progress.safetyAttempts > 0 ? Math.round((progress.safetyScore / progress.safetyAttempts) * 100) : 0}% safety</span>
                <Button variant="ghost" size="sm" onClick={resetProgress} className="h-6 px-2">
                  <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="rounded-r-none"
            >
              English
            </Button>
            <Button
              variant={language === 'es' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('es')}
              className="rounded-l-none"
            >
              <Languages className="h-4 w-4 mr-1" />
              Español
            </Button>
          </div>

          {/* Mode Tabs */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Terms' : 'Términos'}</span>
              </TabsTrigger>
              <TabsTrigger value="flashcard" className="flex items-center gap-1">
                <Shuffle className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Practice' : 'Práctica'}</span>
              </TabsTrigger>
              <TabsTrigger value="cuts" className="flex items-center gap-1">
                <Scissors className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Cuts' : 'Cortes'}</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Safety' : 'Seguridad'}</span>
              </TabsTrigger>
            </TabsList>

            {/* Learn Mode */}
            <TabsContent value="learn">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <select 
                  value={category} 
                  onChange={(e) => { setCategory(e.target.value as TermCategory); setCurrentIndex(0); }}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="all">{language === 'en' ? 'All Categories' : 'Todas las Categorías'}</option>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{language === 'en' ? label.en : label.es}</option>
                  ))}
                </select>
                <select 
                  value={difficulty} 
                  onChange={(e) => { setDifficulty(e.target.value as Difficulty); setCurrentIndex(0); }}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="all">{language === 'en' ? 'All Levels' : 'Todos los Niveles'}</option>
                  {Object.entries(difficultyLabels).map(([key, label]) => (
                    <option key={key} value={key}>{language === 'en' ? label.en : label.es}</option>
                  ))}
                </select>
              </div>

              {/* Terms Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTerms.map((term) => (
                  <Card 
                    key={term.id} 
                    className={`transition-all ${progress.masteredTerms.includes(term.id) ? 'border-green-500/50 bg-green-500/5' : ''}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {language === 'en' ? term.term : (term.termSpanish || term.term)}
                          </h3>
                          <span className="text-xs text-muted-foreground italic">{term.pronunciation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {speechSupported && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handlePronounce(term.term)}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          )}
                          {progress.masteredTerms.includes(term.id) && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {language === 'en' ? term.definition : (term.definitionSpanish || term.definition)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {language === 'en' 
                              ? categoryLabels[term.category]?.en 
                              : categoryLabels[term.category]?.es}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {language === 'en' 
                              ? difficultyLabels[term.difficulty]?.en 
                              : difficultyLabels[term.difficulty]?.es}
                          </Badge>
                        </div>
                        {!progress.masteredTerms.includes(term.id) && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkMastered(term.id)}
                            className="text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" /> 
                            {language === 'en' ? 'Got it' : 'Entendido'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Flashcard Mode */}
            <TabsContent value="flashcard">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <select 
                  value={category} 
                  onChange={(e) => { setCategory(e.target.value as TermCategory); setCurrentIndex(0); }}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="all">{language === 'en' ? 'All Categories' : 'Todas las Categorías'}</option>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{language === 'en' ? label.en : label.es}</option>
                  ))}
                </select>
              </div>

              {filteredTerms.length > 0 && currentTerm && (
                <div className="max-w-md mx-auto">
                  <Card 
                    className="min-h-[280px] cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => setShowDefinition(!showDefinition)}
                  >
                    <CardContent className="pt-8 flex flex-col items-center justify-center min-h-[280px]">
                      <p className="text-xs text-muted-foreground mb-2">
                        {currentIndex + 1} / {filteredTerms.length}
                      </p>
                      
                      {!showDefinition ? (
                        <>
                          <h2 className="text-3xl font-bold text-center mb-2">
                            {language === 'en' ? currentTerm.term : (currentTerm.termSpanish || currentTerm.term)}
                          </h2>
                          <p className="text-muted-foreground italic mb-4">{currentTerm.pronunciation}</p>
                          {speechSupported && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); handlePronounce(currentTerm.term); }}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4 mr-2" />
                              {language === 'en' ? 'Listen' : 'Escuchar'}
                            </Button>
                          )}
                          <p className="text-xs text-muted-foreground mt-4">
                            {language === 'en' ? 'Tap to reveal definition' : 'Toca para ver la definición'}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-center text-lg mb-4">
                            {language === 'en' ? currentTerm.definition : (currentTerm.definitionSpanish || currentTerm.definition)}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              {language === 'en' 
                                ? categoryLabels[currentTerm.category]?.en 
                                : categoryLabels[currentTerm.category]?.es}
                            </Badge>
                            <Badge variant="secondary">
                              {language === 'en' 
                                ? difficultyLabels[currentTerm.difficulty]?.en 
                                : difficultyLabels[currentTerm.difficulty]?.es}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">
                            {language === 'en' ? 'Tap to hide' : 'Toca para ocultar'}
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" onClick={handlePrevTerm}>
                      <ChevronLeft className="h-4 w-4 mr-1" /> {language === 'en' ? 'Prev' : 'Ant'}
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => handleMarkMastered(currentTerm.id)}
                      disabled={progress.masteredTerms.includes(currentTerm.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {progress.masteredTerms.includes(currentTerm.id) 
                        ? (language === 'en' ? 'Mastered!' : '¡Dominado!') 
                        : (language === 'en' ? 'Got it!' : '¡Entendido!')}
                    </Button>
                    <Button variant="outline" onClick={handleNextTerm}>
                      {language === 'en' ? 'Next' : 'Sig'} <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Knife Cuts Mode */}
            <TabsContent value="cuts">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'Professional Knife Cuts' : 'Cortes Profesionales de Cuchillo'}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' 
                    ? 'Master these essential cuts for any professional kitchen'
                    : 'Domina estos cortes esenciales para cualquier cocina profesional'}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {knifeCuts.map((cut) => (
                  <Card 
                    key={cut.id}
                    className={`transition-all ${progress.masteredCuts.includes(cut.id) ? 'border-green-500/50 bg-green-500/5' : ''}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {language === 'en' ? cut.name : (cut.nameSpanish || cut.name)}
                          </h3>
                          <span className="text-xs text-muted-foreground italic">{cut.pronunciation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {speechSupported && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handlePronounce(cut.name)}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          )}
                          {progress.masteredCuts.includes(cut.id) && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'en' ? cut.description : (cut.descriptionSpanish || cut.description)}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{cut.size}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        <strong>{language === 'en' ? 'Used for:' : 'Usado para:'}</strong> {cut.usedFor.join(', ')}
                      </div>
                      {!progress.masteredCuts.includes(cut.id) && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkCutMastered(cut.id)}
                          className="w-full text-xs"
                        >
                          <Check className="h-3 w-3 mr-1" /> 
                          {language === 'en' ? 'Mark as Learned' : 'Marcar como Aprendido'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Safety Quiz Mode */}
            <TabsContent value="safety">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'ServSafe Food Safety Prep' : 'Preparación de Seguridad Alimentaria'}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' 
                    ? 'Test your food safety knowledge for ServSafe certification'
                    : 'Pon a prueba tus conocimientos de seguridad alimentaria'}
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <select 
                  value={safetyCategory} 
                  onChange={(e) => { setSafetyCategory(e.target.value as SafetyCategory); resetSafetyQuiz(); }}
                  className="px-3 py-2 rounded-md border bg-background text-sm"
                >
                  <option value="all">{language === 'en' ? 'All Topics' : 'Todos los Temas'}</option>
                  {Object.entries(safetyCategoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{language === 'en' ? label.en : label.es}</option>
                  ))}
                </select>
              </div>

              {!quizComplete && filteredSafetyQuestions.length > 0 && currentQuestion ? (
                <Card className="max-w-xl mx-auto">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">
                        {language === 'en' 
                          ? safetyCategoryLabels[currentQuestion.category]?.en 
                          : safetyCategoryLabels[currentQuestion.category]?.es}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {currentQuestionIndex + 1} / {filteredSafetyQuestions.length}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {language === 'en' ? currentQuestion.question : (currentQuestion.questionSpanish || currentQuestion.question)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(language === 'en' ? currentQuestion.options : (currentQuestion.optionsSpanish || currentQuestion.options)).map((option, idx) => {
                        const originalOption = currentQuestion.options[idx];
                        const isCorrect = originalOption === currentQuestion.correctAnswer;
                        const isSelected = selectedAnswer === originalOption;
                        
                        return (
                          <Button
                            key={idx}
                            variant="outline"
                            className={`w-full justify-start text-left h-auto py-3 px-4 ${
                              showResult 
                                ? isCorrect 
                                  ? 'border-green-500 bg-green-500/10' 
                                  : isSelected 
                                    ? 'border-red-500 bg-red-500/10' 
                                    : ''
                                : isSelected 
                                  ? 'border-primary' 
                                  : ''
                            }`}
                            onClick={() => handleAnswerSelect(originalOption)}
                            disabled={showResult}
                          >
                            <span className="flex items-center gap-2">
                              {showResult && isCorrect && <Check className="h-4 w-4 text-green-500" />}
                              {showResult && isSelected && !isCorrect && <X className="h-4 w-4 text-red-500" />}
                              {option}
                            </span>
                          </Button>
                        );
                      })}
                    </div>

                    {showResult && (
                      <div className="mt-4 p-4 rounded-lg bg-muted">
                        <p className="text-sm">
                          {language === 'en' 
                            ? currentQuestion.explanation 
                            : (currentQuestion.explanationSpanish || currentQuestion.explanation)}
                        </p>
                      </div>
                    )}

                    {showResult && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex < filteredSafetyQuestions.length - 1 
                          ? (language === 'en' ? 'Next Question' : 'Siguiente Pregunta')
                          : (language === 'en' ? 'See Results' : 'Ver Resultados')}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : quizComplete ? (
                <Card className="max-w-md mx-auto text-center">
                  <CardContent className="pt-8">
                    <div className="text-6xl mb-4">
                      {quizScore / filteredSafetyQuestions.length >= 0.8 ? '🎉' : quizScore / filteredSafetyQuestions.length >= 0.6 ? '👍' : '📚'}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {quizScore} / {filteredSafetyQuestions.length}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {quizScore / filteredSafetyQuestions.length >= 0.8 
                        ? (language === 'en' ? 'Excellent! You\'re ready for ServSafe!' : '¡Excelente! ¡Estás listo para ServSafe!')
                        : quizScore / filteredSafetyQuestions.length >= 0.6 
                          ? (language === 'en' ? 'Good job! Keep practicing!' : '¡Buen trabajo! ¡Sigue practicando!')
                          : (language === 'en' ? 'Keep studying - you\'ll get there!' : '¡Sigue estudiando - lo lograrás!')}
                    </p>
                    <Button onClick={resetSafetyQuiz}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-center text-muted-foreground">
                  {language === 'en' ? 'No questions available for this category.' : 'No hay preguntas disponibles para esta categoría.'}
                </p>
              )}
            </TabsContent>
          </Tabs>

          <ToolDisclaimer type="educational" />
        </div>
      </Layout>
    </>
  );
}
