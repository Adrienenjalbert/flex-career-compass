import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Wine, BookOpen, Dices, Zap, Trophy, ChevronRight, ChevronLeft, Check, X, RotateCcw, Shuffle, ArrowLeft, GraduationCap, Clock } from 'lucide-react';
import Layout from '@/components/career-hub/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cocktails, spiritColors, spiritIcons, techniqueDescriptions, glassDescriptions, type Cocktail } from '@/data/cocktails';
import CTASection from '@/components/career-hub/CTASection';
import ToolDisclaimer from '@/components/career-hub/ToolDisclaimer';

type Mode = 'learn' | 'flashcard' | 'quiz' | 'speed';
type SpiritFilter = 'all' | Cocktail['baseSpirit'];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CocktailQuiz = () => {
  const [mode, setMode] = useState<Mode>('learn');
  const [spiritFilter, setSpiritFilter] = useState<SpiritFilter>('all');
  const [masteredCocktails, setMasteredCocktails] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('cocktail-quiz-mastered');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardDeck, setFlashcardDeck] = useState<Cocktail[]>([]);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Speed round state
  const [speedRoundActive, setSpeedRoundActive] = useState(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedCurrent, setSpeedCurrent] = useState<Cocktail | null>(null);
  const [speedAnswered, setSpeedAnswered] = useState(false);

  const filteredCocktails = useMemo(() => 
    spiritFilter === 'all' 
      ? cocktails 
      : cocktails.filter(c => c.baseSpirit === spiritFilter),
    [spiritFilter]
  );

  // Save mastered cocktails to localStorage
  useEffect(() => {
    localStorage.setItem('cocktail-quiz-mastered', JSON.stringify([...masteredCocktails]));
  }, [masteredCocktails]);

  // Initialize flashcard deck
  useEffect(() => {
    if (mode === 'flashcard') {
      setFlashcardDeck(shuffleArray(filteredCocktails));
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [mode, filteredCocktails]);

  // Generate quiz questions
  useEffect(() => {
    if (mode === 'quiz') {
      const questions = shuffleArray(filteredCocktails).slice(0, 10).map(cocktail => {
        const questionType = Math.random() > 0.5 ? 'ingredients' : 'glass';
        
        if (questionType === 'ingredients') {
          const correctIngredients = cocktail.ingredients.map(i => i.name).join(', ');
          const wrongOptions = shuffleArray(
            filteredCocktails.filter(c => c.id !== cocktail.id)
          ).slice(0, 3).map(c => c.ingredients.map(i => i.name).join(', '));
          
          return {
            cocktail,
            question: `What are the main ingredients in a ${cocktail.name}?`,
            options: shuffleArray([correctIngredients, ...wrongOptions]),
            correctAnswer: correctIngredients
          };
        } else {
          const wrongGlasses = shuffleArray(
            [...new Set(cocktails.map(c => c.glass).filter(g => g !== cocktail.glass))]
          ).slice(0, 3);
          
          return {
            cocktail,
            question: `What glass is a ${cocktail.name} traditionally served in?`,
            options: shuffleArray([cocktail.glass, ...wrongGlasses]),
            correctAnswer: cocktail.glass
          };
        }
      });
      
      setQuizQuestions(questions);
      setQuizIndex(0);
      setQuizScore(0);
      setSelectedAnswer(null);
      setQuizComplete(false);
    }
  }, [mode, filteredCocktails]);

  // Speed round timer
  useEffect(() => {
    if (speedRoundActive && speedTimeLeft > 0) {
      const timer = setInterval(() => {
        setSpeedTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (speedTimeLeft === 0) {
      setSpeedRoundActive(false);
    }
  }, [speedRoundActive, speedTimeLeft]);

  const startSpeedRound = () => {
    setSpeedRoundActive(true);
    setSpeedTimeLeft(60);
    setSpeedScore(0);
    setSpeedCurrent(shuffleArray(filteredCocktails)[0]);
    setSpeedAnswered(false);
  };

  const handleSpeedAnswer = (correct: boolean) => {
    if (speedAnswered) return;
    setSpeedAnswered(true);
    if (correct) {
      setSpeedScore(prev => prev + 1);
      setMasteredCocktails(prev => new Set([...prev, speedCurrent!.id]));
    }
    setTimeout(() => {
      const remaining = filteredCocktails.filter(c => c.id !== speedCurrent?.id);
      if (remaining.length > 0) {
        setSpeedCurrent(shuffleArray(remaining)[0]);
        setSpeedAnswered(false);
      } else {
        setSpeedRoundActive(false);
      }
    }, 500);
  };

  const handleQuizAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = quizQuestions[quizIndex].options[index] === quizQuestions[quizIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      setMasteredCocktails(prev => new Set([...prev, quizQuestions[quizIndex].cocktail.id]));
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const toggleMastered = (cocktailId: string) => {
    setMasteredCocktails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cocktailId)) {
        newSet.delete(cocktailId);
      } else {
        newSet.add(cocktailId);
      }
      return newSet;
    });
  };

  const spirits: SpiritFilter[] = ['all', 'vodka', 'gin', 'rum', 'tequila', 'whiskey', 'brandy', 'champagne'];

  return (
    <>
      <Helmet>
        <title>CocktailQuiz - Free Bartending Skills Trainer | Indeed Flex Career Hub</title>
        <meta name="description" content="Master 50+ classic cocktails with our free bartending quiz. Learn ingredients, techniques, and glassware to advance from barback to bartender." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/cocktail-quiz" />
        <meta property="og:title" content="CocktailQuiz - Free Bartending Skills Trainer" />
        <meta property="og:description" content="Learn classic cocktails, ingredients, and bartending techniques with flashcards, quizzes, and speed rounds." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CocktailQuiz",
            "description": "Free bartending skills trainer with 50+ classic cocktails",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/career-hub/tools" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Tools
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Wine className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">CocktailQuiz</h1>
                <p className="text-white/80">Bartending Skills Trainer</p>
              </div>
            </div>
            <p className="text-lg text-white/90 mb-6">
              Master 50+ classic cocktails through interactive learning. Perfect for barbacks looking to become bartenders.
            </p>
            
            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{masteredCocktails.size}</div>
                <div className="text-sm text-white/70">Mastered</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{cocktails.length}</div>
                <div className="text-sm text-white/70">Total</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{Math.round((masteredCocktails.size / cocktails.length) * 100)}%</div>
                <div className="text-sm text-white/70">Complete</div>
              </div>
            </div>
            
            <Progress value={(masteredCocktails.size / cocktails.length) * 100} className="h-2 bg-white/20" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Mode Tabs */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-xl mx-auto">
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Learn</span>
              </TabsTrigger>
              <TabsTrigger value="flashcard" className="flex items-center gap-2">
                <Dices className="w-4 h-4" />
                <span className="hidden sm:inline">Flashcards</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">Quiz</span>
              </TabsTrigger>
              <TabsTrigger value="speed" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Speed</span>
              </TabsTrigger>
            </TabsList>

            {/* Spirit Filter */}
            <div className="flex justify-center mt-4">
              <Select value={spiritFilter} onValueChange={(v) => setSpiritFilter(v as SpiritFilter)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by spirit" />
                </SelectTrigger>
                <SelectContent>
                  {spirits.map(spirit => (
                    <SelectItem key={spirit} value={spirit}>
                      {spirit === 'all' ? '🍹 All Spirits' : `${spiritIcons[spirit]} ${spirit.charAt(0).toUpperCase() + spirit.slice(1)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* LEARN MODE */}
            <TabsContent value="learn" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCocktails.map(cocktail => (
                  <Card 
                    key={cocktail.id} 
                    className={`hover:shadow-lg transition-all ${masteredCocktails.has(cocktail.id) ? 'ring-2 ring-green-500' : ''}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {spiritIcons[cocktail.baseSpirit]} {cocktail.name}
                          </CardTitle>
                          {cocktail.pronunciation && (
                            <p className="text-xs text-muted-foreground italic">{cocktail.pronunciation}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMastered(cocktail.id)}
                          className={masteredCocktails.has(cocktail.id) ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {masteredCocktails.has(cocktail.id) ? <Check className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className={spiritColors[cocktail.baseSpirit]}>
                          {cocktail.baseSpirit}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {cocktail.technique}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {cocktail.difficulty}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Ingredients:</p>
                        <ul className="text-sm text-muted-foreground space-y-0.5">
                          {cocktail.ingredients.map((ing, i) => (
                            <li key={i}>• {ing.amount} {ing.name}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Glass:</span>{' '}
                        <span className="text-muted-foreground">{cocktail.glass}</span>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Garnish:</span>{' '}
                        <span className="text-muted-foreground">{cocktail.garnish}</span>
                      </div>
                      
                      {cocktail.tips && (
                        <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">
                          💡 {cocktail.tips}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FLASHCARD MODE */}
            <TabsContent value="flashcard" className="mt-6">
              {flashcardDeck.length > 0 && (
                <div className="max-w-lg mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Card {flashcardIndex + 1} of {flashcardDeck.length}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setFlashcardDeck(shuffleArray(filteredCocktails))}>
                      <Shuffle className="w-4 h-4 mr-1" /> Shuffle
                    </Button>
                  </div>
                  
                  <div 
                    className="relative h-80 cursor-pointer perspective-1000"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                      {/* Front */}
                      <Card className={`absolute inset-0 backface-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 ${isFlipped ? 'invisible' : ''}`}>
                        <CardContent className="text-center">
                          <p className="text-4xl mb-4">{spiritIcons[flashcardDeck[flashcardIndex].baseSpirit]}</p>
                          <h2 className="text-2xl font-bold mb-2">{flashcardDeck[flashcardIndex].name}</h2>
                          <p className="text-muted-foreground">Tap to reveal ingredients</p>
                        </CardContent>
                      </Card>
                      
                      {/* Back */}
                      <Card className={`absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center ${!isFlipped ? 'invisible' : ''}`}>
                        <CardContent className="text-center space-y-3">
                          <h3 className="font-semibold">{flashcardDeck[flashcardIndex].name}</h3>
                          <ul className="text-sm space-y-1">
                            {flashcardDeck[flashcardIndex].ingredients.map((ing, i) => (
                              <li key={i}>{ing.amount} {ing.name}</li>
                            ))}
                          </ul>
                          <div className="text-sm text-muted-foreground">
                            <p><strong>Glass:</strong> {flashcardDeck[flashcardIndex].glass}</p>
                            <p><strong>Technique:</strong> {flashcardDeck[flashcardIndex].technique}</p>
                            <p><strong>Garnish:</strong> {flashcardDeck[flashcardIndex].garnish}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFlashcardIndex(prev => Math.max(0, prev - 1));
                        setIsFlipped(false);
                      }}
                      disabled={flashcardIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setFlashcardIndex(prev => Math.min(flashcardDeck.length - 1, prev + 1));
                          setIsFlipped(false);
                        }}
                      >
                        <X className="w-4 h-4 mr-1" /> Still Learning
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                        onClick={() => {
                          toggleMastered(flashcardDeck[flashcardIndex].id);
                          setFlashcardIndex(prev => Math.min(flashcardDeck.length - 1, prev + 1));
                          setIsFlipped(false);
                        }}
                      >
                        <Check className="w-4 h-4 mr-1" /> Got It!
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setFlashcardIndex(prev => Math.min(flashcardDeck.length - 1, prev + 1));
                        setIsFlipped(false);
                      }}
                      disabled={flashcardIndex === flashcardDeck.length - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* QUIZ MODE */}
            <TabsContent value="quiz" className="mt-6">
              <div className="max-w-xl mx-auto">
                {quizComplete ? (
                  <Card className="text-center p-8">
                    <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                    <p className="text-xl mb-4">
                      You scored <span className="text-primary font-bold">{quizScore}</span> out of {quizQuestions.length}
                    </p>
                    <p className="text-muted-foreground mb-6">
                      {quizScore >= 8 ? '🎉 Excellent! You\'re ready to tend bar!' : 
                       quizScore >= 5 ? '👍 Good job! Keep practicing!' : 
                       '📚 Keep studying, you\'ll get there!'}
                    </p>
                    <Button onClick={() => setMode('quiz')}>
                      <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                    </Button>
                  </Card>
                ) : quizQuestions.length > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        Question {quizIndex + 1} of {quizQuestions.length}
                      </span>
                      <Badge variant="outline">Score: {quizScore}</Badge>
                    </div>
                    
                    <Progress value={((quizIndex + 1) / quizQuestions.length) * 100} className="mb-6" />
                    
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg">{quizQuestions[quizIndex].question}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {quizQuestions[quizIndex].options.map((option: string, i: number) => (
                          <Button
                            key={i}
                            variant="outline"
                            className={`w-full justify-start h-auto py-3 px-4 text-left ${
                              selectedAnswer === i 
                                ? option === quizQuestions[quizIndex].correctAnswer 
                                  ? 'border-green-500 bg-green-50 text-green-700' 
                                  : 'border-red-500 bg-red-50 text-red-700'
                                : selectedAnswer !== null && option === quizQuestions[quizIndex].correctAnswer
                                  ? 'border-green-500 bg-green-50'
                                  : ''
                            }`}
                            onClick={() => handleQuizAnswer(i)}
                            disabled={selectedAnswer !== null}
                          >
                            {option}
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                    
                    {selectedAnswer !== null && (
                      <Button className="w-full" onClick={nextQuizQuestion}>
                        {quizIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            {/* SPEED ROUND */}
            <TabsContent value="speed" className="mt-6">
              <div className="max-w-xl mx-auto text-center">
                {!speedRoundActive ? (
                  <Card className="p-8">
                    <Zap className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Speed Round</h2>
                    <p className="text-muted-foreground mb-6">
                      You have 60 seconds to identify as many cocktails as possible. 
                      Can you name the main base spirit and key ingredients?
                    </p>
                    {speedScore > 0 && (
                      <p className="text-lg mb-4">Last score: <span className="font-bold text-primary">{speedScore}</span></p>
                    )}
                    <Button size="lg" onClick={startSpeedRound}>
                      <Zap className="w-5 h-5 mr-2" /> Start Speed Round
                    </Button>
                  </Card>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className={`text-2xl font-bold ${speedTimeLeft <= 10 ? 'text-red-500' : ''}`}>
                          {speedTimeLeft}s
                        </span>
                      </div>
                      <Badge variant="outline" className="text-lg px-4 py-1">
                        Score: {speedScore}
                      </Badge>
                    </div>
                    
                    {speedCurrent && (
                      <Card className="p-8">
                        <h2 className="text-3xl font-bold mb-4">{speedCurrent.name}</h2>
                        <p className="text-muted-foreground mb-6">Do you know this cocktail's ingredients?</p>
                        
                        <div className="flex justify-center gap-4">
                          <Button 
                            size="lg"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleSpeedAnswer(false)}
                            disabled={speedAnswered}
                          >
                            <X className="w-5 h-5 mr-2" /> Skip
                          </Button>
                          <Button 
                            size="lg"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleSpeedAnswer(true)}
                            disabled={speedAnswered}
                          >
                            <Check className="w-5 h-5 mr-2" /> I Know It!
                          </Button>
                        </div>
                        
                        {speedAnswered && (
                          <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                            <p className="font-medium mb-2">Answer:</p>
                            <ul className="text-sm space-y-1">
                              {speedCurrent.ingredients.map((ing, i) => (
                                <li key={i}>• {ing.amount} {ing.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Card>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Career Path Connection */}
          <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Building Your Bartending Career?</h3>
                  <p className="text-muted-foreground mb-4">
                    Mastering cocktails is just one step. Explore the full career path from barback to bar manager.
                  </p>
                  <Link to="/career-hub/tools/career-path-explorer">
                    <Button variant="outline" className="border-amber-300 hover:bg-amber-100">
                      View Career Path <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <ToolDisclaimer type="educational" />
        </div>

        <CTASection />
      </Layout>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default CocktailQuiz;
