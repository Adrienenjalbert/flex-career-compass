import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Volume2, BookOpen, GraduationCap, Star, Filter, X, AlertCircle } from 'lucide-react';
import Layout from '@/components/career-hub/Layout';
import Breadcrumbs from '@/components/career-hub/Breadcrumbs';
import CTASection from '@/components/career-hub/CTASection';
import PhraseCard from '@/components/career-hub/tools/PhraseCard';
import FlashcardMode from '@/components/career-hub/tools/FlashcardMode';
import { industries, categoryInfo, JobPhrase, IndustryVocabulary } from '@/data/job-english-phrases';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type ViewMode = 'browse' | 'practice' | 'favorites';
type CategoryFilter = JobPhrase['category'] | 'all';

const FAVORITES_KEY = 'worktalk-favorites';

const WorkTalk: React.FC = () => {
  // State
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryVocabulary | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [speakingPhraseId, setSpeakingPhraseId] = useState<string | null>(null);

  // Speech synthesis
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({ defaultRate: 0.8 });

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  // Get phrases based on current view
  const currentPhrases = useMemo(() => {
    if (!selectedIndustry) return [];
    return selectedIndustry.phrases;
  }, [selectedIndustry]);

  // Filter phrases
  const filteredPhrases = useMemo(() => {
    let phrases = currentPhrases;
    
    // Category filter
    if (categoryFilter !== 'all') {
      phrases = phrases.filter(p => p.category === categoryFilter);
    }
    
    // Search filter (bilingual)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      phrases = phrases.filter(p => 
        p.english.toLowerCase().includes(query) ||
        p.spanish.toLowerCase().includes(query) ||
        p.context.toLowerCase().includes(query)
      );
    }
    
    // Favorites only
    if (viewMode === 'favorites') {
      phrases = phrases.filter(p => favorites.has(p.id));
    }
    
    return phrases;
  }, [currentPhrases, categoryFilter, searchQuery, viewMode, favorites]);

  // Group phrases by category
  const groupedPhrases = useMemo(() => {
    if (categoryFilter !== 'all') return null;
    
    const groups: Record<string, JobPhrase[]> = {};
    filteredPhrases.forEach(phrase => {
      if (!groups[phrase.category]) {
        groups[phrase.category] = [];
      }
      groups[phrase.category].push(phrase);
    });
    return groups;
  }, [filteredPhrases, categoryFilter]);

  // Categories in current industry
  const availableCategories = useMemo(() => {
    if (!selectedIndustry) return [];
    const cats = new Set(selectedIndustry.phrases.map(p => p.category));
    return Array.from(cats);
  }, [selectedIndustry]);

  // Handlers
  const handlePlayEnglish = useCallback((phrase: JobPhrase) => {
    if (isSpeaking && speakingPhraseId === phrase.id) {
      stop();
      setSpeakingPhraseId(null);
    } else {
      stop();
      speak(phrase.english, 'en-US');
      setSpeakingPhraseId(phrase.id);
    }
  }, [isSpeaking, speakingPhraseId, speak, stop]);

  const handlePlaySpanish = useCallback((phrase: JobPhrase) => {
    stop();
    speak(phrase.spanish, 'es-ES');
    setSpeakingPhraseId(phrase.id);
  }, [speak, stop]);

  const handleToggleFavorite = useCallback((phraseId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(phraseId)) {
        next.delete(phraseId);
      } else {
        next.add(phraseId);
      }
      return next;
    });
  }, []);

  const handleBackToIndustries = useCallback(() => {
    setSelectedIndustry(null);
    setViewMode('browse');
    setCategoryFilter('all');
    setSearchQuery('');
  }, []);

  const breadcrumbItems = selectedIndustry
    ? [
        { label: 'Career Hub', href: '/career-hub' },
        { label: 'Tools', href: '/career-hub/tools' },
        { label: 'WorkTalk', href: '/career-hub/tools/worktalk' },
        { label: selectedIndustry.name },
      ]
    : [
        { label: 'Career Hub', href: '/career-hub' },
        { label: 'Tools', href: '/career-hub/tools' },
        { label: 'WorkTalk' },
      ];

  // Practice mode
  if (viewMode === 'practice' && selectedIndustry) {
    return (
      <Layout>
        <Helmet>
          <title>Practice Mode - WorkTalk | Indeed Flex Career Hub</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <FlashcardMode
            phrases={filteredPhrases.length > 0 ? filteredPhrases : currentPhrases}
            onPlayEnglish={(text) => speak(text, 'en-US')}
            onPlaySpanish={(text) => speak(text, 'es-ES')}
            isSpeaking={isSpeaking}
            onExit={() => setViewMode('browse')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>WorkTalk: Job English for Spanish Speakers | Indeed Flex Career Hub</title>
        <meta name="description" content="Learn essential job English phrases with audio pronunciation. Free bilingual learning tool for warehouse, hospitality, retail, and industrial workers. Aprende inglés laboral con audio." />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/tools/worktalk" />
        <meta property="og:title" content="WorkTalk: Job English for Spanish Speakers" />
        <meta property="og:description" content="Free bilingual learning tool with audio. Learn workplace English phrases for warehouse, hospitality, retail jobs." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "WorkTalk - Job English Learning Tool",
            "description": "Bilingual English-Spanish workplace vocabulary learning tool with audio pronunciation",
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

      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems.slice(1)} />
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🗣️</span>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">WorkTalk</h1>
                  <p className="text-white/80 text-lg">Job English for Spanish Speakers</p>
                </div>
              </div>
              <p className="text-white/90 text-lg mb-2">
                Aprende inglés laboral esencial con pronunciación de audio
              </p>
              <p className="text-white/70">
                Learn essential workplace English with audio pronunciation • 100% Free • No signup required
              </p>
            </div>
          </div>
        </section>

        {/* Browser Support Warning */}
        {!isSupported && (
          <div className="container mx-auto px-4 py-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 text-amber-800">
              <AlertCircle size={18} />
              <span className="text-sm">Audio playback is not supported in your browser. Try Chrome or Safari.</span>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {!selectedIndustry ? (
            // Industry Selection
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Choose Your Industry / Elige tu industria
                </h2>
                <p className="text-muted-foreground">
                  Select the type of work to learn relevant vocabulary
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry)}
                    className="bg-card rounded-xl border border-border p-6 text-left hover:shadow-soft-lg hover:border-primary/30 transition-all group"
                  >
                    <span className="text-4xl mb-3 block">{industry.icon}</span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{industry.nameSpanish}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {industry.phrases.length} phrases / frases
                    </p>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div className="bg-card rounded-xl border border-border p-4">
                  <p className="text-3xl font-bold text-primary">
                    {industries.reduce((acc, i) => acc + i.phrases.length, 0)}+
                  </p>
                  <p className="text-sm text-muted-foreground">Phrases / Frases</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <p className="text-3xl font-bold text-primary">{industries.length}</p>
                  <p className="text-sm text-muted-foreground">Industries / Industrias</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <p className="text-3xl font-bold text-primary">🔊</p>
                  <p className="text-sm text-muted-foreground">Audio / Audio</p>
                </div>
              </div>
            </div>
          ) : (
            // Phrase Browser
            <div className="max-w-5xl mx-auto">
              {/* Back button and industry header */}
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={handleBackToIndustries} className="gap-2">
                  ← Back / Atrás
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedIndustry.icon}</span>
                  <div>
                    <h2 className="font-bold text-foreground">{selectedIndustry.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedIndustry.nameSpanish}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="mb-6">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                  <TabsTrigger value="browse" className="gap-2">
                    <BookOpen size={16} />
                    <span className="hidden sm:inline">Browse</span>
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="gap-2">
                    <GraduationCap size={16} />
                    <span className="hidden sm:inline">Practice</span>
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="gap-2">
                    <Star size={16} />
                    <span className="hidden sm:inline">Favorites</span>
                    {favorites.size > 0 && (
                      <span className="bg-primary/10 text-primary text-xs px-1.5 rounded-full">
                        {favorites.size}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="text"
                    placeholder="Search English or Spanish... / Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    categoryFilter === 'all'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  )}
                >
                  All / Todos
                </button>
                {availableCategories.map((cat) => {
                  const info = categoryInfo[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        categoryFilter === cat
                          ? "bg-primary text-primary-foreground"
                          : cn("border", info.color, "hover:opacity-80")
                      )}
                    >
                      {info.icon} {info.name}
                    </button>
                  );
                })}
              </div>

              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-4">
                {filteredPhrases.length} phrase{filteredPhrases.length !== 1 ? 's' : ''} / frases
              </p>

              {/* Phrases Grid */}
              {filteredPhrases.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground mb-2">
                    {viewMode === 'favorites' 
                      ? "No favorites yet. Tap the star on phrases you want to save."
                      : "No phrases found. Try a different search or filter."
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {viewMode === 'favorites'
                      ? "Aún no hay favoritos. Toca la estrella en las frases que quieras guardar."
                      : "No se encontraron frases. Prueba otra búsqueda o filtro."
                    }
                  </p>
                </div>
              ) : groupedPhrases ? (
                // Grouped by category
                <div className="space-y-8">
                  {Object.entries(groupedPhrases).map(([category, phrases]) => {
                    const info = categoryInfo[category as JobPhrase['category']];
                    return (
                      <div key={category}>
                        <h3 className={cn("font-semibold mb-3 flex items-center gap-2", info.color.split(' ')[0])}>
                          {info.icon} {info.name} / {info.nameSpanish}
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            {phrases.length}
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {phrases.map((phrase) => (
                            <PhraseCard
                              key={phrase.id}
                              phrase={phrase}
                              onPlayEnglish={() => handlePlayEnglish(phrase)}
                              onPlaySpanish={() => handlePlaySpanish(phrase)}
                              isSpeaking={isSpeaking && speakingPhraseId === phrase.id}
                              isFavorite={favorites.has(phrase.id)}
                              onToggleFavorite={() => handleToggleFavorite(phrase.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Flat list
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPhrases.map((phrase) => (
                    <PhraseCard
                      key={phrase.id}
                      phrase={phrase}
                      onPlayEnglish={() => handlePlayEnglish(phrase)}
                      onPlaySpanish={() => handlePlaySpanish(phrase)}
                      isSpeaking={isSpeaking && speakingPhraseId === phrase.id}
                      isFavorite={favorites.has(phrase.id)}
                      onToggleFavorite={() => handleToggleFavorite(phrase.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <CTASection 
          title="Ready to Start Working? / ¿Listo para empezar?"
          subtitle="Download Indeed Flex to find flexible jobs in your area. Practice your new English skills on real shifts!"
        />
      </div>
    </Layout>
  );
};

export default WorkTalk;
