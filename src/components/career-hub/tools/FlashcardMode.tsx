import React, { useState, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle } from 'lucide-react';
import { JobPhrase, categoryInfo } from '@/data/job-english-phrases';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FlashcardModeProps {
  phrases: JobPhrase[];
  onPlayEnglish: (text: string) => void;
  onPlaySpanish: (text: string) => void;
  isSpeaking: boolean;
  onExit: () => void;
}

interface CardResult {
  phraseId: string;
  correct: boolean;
}

const FlashcardMode: React.FC<FlashcardModeProps> = ({
  phrases,
  onPlayEnglish,
  onPlaySpanish,
  isSpeaking,
  onExit,
}) => {
  const [shuffledPhrases, setShuffledPhrases] = useState<JobPhrase[]>(() => 
    [...phrases].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<CardResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentPhrase = shuffledPhrases[currentIndex];
  const progress = ((currentIndex) / shuffledPhrases.length) * 100;

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (!isFlipped && currentPhrase) {
      onPlaySpanish(currentPhrase.spanish);
    }
  }, [isFlipped, currentPhrase, onPlaySpanish]);

  const handleResult = useCallback((correct: boolean) => {
    setResults(prev => [...prev, { phraseId: currentPhrase.id, correct }]);
    
    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, shuffledPhrases.length, currentPhrase]);

  const handleRestart = useCallback(() => {
    setShuffledPhrases([...phrases].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults([]);
    setIsComplete(false);
  }, [phrases]);

  const handleShuffle = useCallback(() => {
    setShuffledPhrases([...phrases].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [phrases]);

  const correctCount = results.filter(r => r.correct).length;
  const incorrectCount = results.filter(r => !r.correct).length;

  if (isComplete) {
    const percentage = Math.round((correctCount / results.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center shadow-soft">
          <div className="text-5xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {percentage >= 80 ? '¡Excelente!' : percentage >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h3>
          <p className="text-muted-foreground mb-6">
            Session Complete / Sesión Completa
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-green-700">Got it! / ¡Lo sé!</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-amber-600">{incorrectCount}</p>
              <p className="text-sm text-amber-700">Need practice / Practicar</p>
            </div>
          </div>

          <div className="text-lg font-semibold text-foreground mb-6">
            {percentage}% Score
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleRestart} className="w-full">
              <RotateCcw size={16} className="mr-2" />
              Practice Again / Practicar de nuevo
            </Button>
            <Button variant="outline" onClick={onExit} className="w-full">
              Exit / Salir
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPhrase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <p className="text-muted-foreground">No phrases to practice</p>
        <Button variant="outline" onClick={onExit} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const category = categoryInfo[currentPhrase.category];

  return (
    <div className="flex flex-col h-full">
      {/* Progress header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {shuffledPhrases.length}
          </span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓ {correctCount}</span>
            <span className="text-amber-600">✗ {incorrectCount}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className={cn(
            "relative w-full max-w-md aspect-[3/4] cursor-pointer perspective-1000",
          )}
          onClick={handleFlip}
        >
          <div className={cn(
            "absolute inset-0 transition-transform duration-500 transform-style-preserve-3d",
            isFlipped && "rotate-y-180"
          )}>
            {/* Front - English */}
            <div className={cn(
              "absolute inset-0 backface-hidden bg-card rounded-2xl border-2 border-border p-6 flex flex-col shadow-soft-lg",
              isFlipped && "invisible"
            )}>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border self-start mb-4", category.color)}>
                {category.icon} {category.name}
              </span>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {currentPhrase.english}
                </p>
                <p className="text-sm text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded">
                  /{currentPhrase.phonetic}/
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayEnglish(currentPhrase.english);
                }}
                className={cn(
                  "self-center p-4 rounded-full transition-colors",
                  isSpeaking 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Tap to reveal Spanish / Toca para ver español
              </p>
            </div>

            {/* Back - Spanish */}
            <div className={cn(
              "absolute inset-0 backface-hidden bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/20 p-6 flex flex-col shadow-soft-lg rotate-y-180",
              !isFlipped && "invisible"
            )}>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border self-start mb-4", category.color)}>
                {category.icon} {category.nameSpanish}
              </span>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {currentPhrase.spanish}
                </p>
                <div className="w-12 h-0.5 bg-border my-3" />
                <p className="text-lg text-muted-foreground">
                  {currentPhrase.english}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySpanish(currentPhrase.spanish);
                }}
                className="self-center p-4 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Volume2 size={24} />
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4 italic">
                💡 {currentPhrase.context}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 border-t border-border bg-card/50">
        {isFlipped ? (
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-14 border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={() => handleResult(false)}
            >
              <X size={20} className="mr-2" />
              <span className="flex flex-col items-start">
                <span className="font-medium">Need Practice</span>
                <span className="text-xs opacity-70">Necesito practicar</span>
              </span>
            </Button>
            <Button 
              className="flex-1 h-14 bg-green-600 hover:bg-green-700"
              onClick={() => handleResult(true)}
            >
              <Check size={20} className="mr-2" />
              <span className="flex flex-col items-start">
                <span className="font-medium">Got it!</span>
                <span className="text-xs opacity-70">¡Lo sé!</span>
              </span>
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" size="icon" onClick={handleShuffle}>
              <Shuffle size={18} />
            </Button>
            <Button variant="outline" onClick={handleFlip} className="px-8">
              Flip Card / Voltear
            </Button>
            <Button variant="ghost" size="icon" onClick={onExit}>
              <X size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardMode;
