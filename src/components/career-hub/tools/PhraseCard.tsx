import React from 'react';
import { Volume2, VolumeX, Star, StarOff } from 'lucide-react';
import { JobPhrase, categoryInfo } from '@/data/job-english-phrases';
import { cn } from '@/lib/utils';

interface PhraseCardProps {
  phrase: JobPhrase;
  onPlayEnglish: () => void;
  onPlaySpanish: () => void;
  isSpeaking: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  compact?: boolean;
}

const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  onPlayEnglish,
  onPlaySpanish,
  isSpeaking,
  isFavorite,
  onToggleFavorite,
  compact = false,
}) => {
  const category = categoryInfo[phrase.category];
  
  if (compact) {
    return (
      <div className="bg-card rounded-lg border border-border p-3 hover:shadow-soft transition-shadow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{phrase.english}</p>
            <p className="text-muted-foreground text-xs truncate">{phrase.spanish}</p>
          </div>
          <button
            onClick={onPlayEnglish}
            className={cn(
              "p-1.5 rounded-full transition-colors flex-shrink-0",
              isSpeaking 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary"
            )}
            aria-label="Play English pronunciation"
          >
            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-soft transition-all group">
      {/* Header with category and favorite */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn("text-xs px-2 py-0.5 rounded-full border", category.color)}>
          {category.icon} {category.name}
        </span>
        <button
          onClick={onToggleFavorite}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            isFavorite 
              ? "text-amber-500" 
              : "text-muted-foreground hover:text-amber-500"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
        </button>
      </div>

      {/* English phrase - prominent */}
      <div className="mb-2">
        <p className="text-lg font-semibold text-foreground leading-snug">
          {phrase.english}
        </p>
      </div>

      {/* Spanish translation */}
      <div className="mb-2">
        <p className="text-muted-foreground">
          {phrase.spanish}
        </p>
      </div>

      {/* Phonetic guide */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground/70 font-mono bg-muted/50 px-2 py-1 rounded inline-block">
          /{phrase.phonetic}/
        </p>
      </div>

      {/* Context hint */}
      <p className="text-xs text-muted-foreground mb-4 italic">
        💡 {phrase.context}
      </p>

      {/* Audio controls */}
      <div className="flex gap-2">
        <button
          onClick={onPlayEnglish}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-medium text-sm transition-all",
            isSpeaking
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
          )}
        >
          {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>English</span>
        </button>
        <button
          onClick={onPlaySpanish}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-medium text-sm bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Volume2 size={16} />
          <span>Español</span>
        </button>
      </div>

      {/* Difficulty indicator */}
      <div className="mt-3 flex justify-end">
        <span className={cn(
          "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded",
          phrase.difficulty === 'beginner' && "bg-green-100 text-green-700",
          phrase.difficulty === 'intermediate' && "bg-amber-100 text-amber-700",
          phrase.difficulty === 'advanced' && "bg-red-100 text-red-700"
        )}>
          {phrase.difficulty}
        </span>
      </div>
    </div>
  );
};

export default PhraseCard;
