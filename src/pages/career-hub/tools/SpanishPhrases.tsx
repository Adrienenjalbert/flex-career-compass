import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Volume2, 
  Heart, 
  Printer,
  ArrowLeftRight,
  BookOpen,
  Star
} from "lucide-react";
import { 
  workplacePhrases, 
  categoryLabels, 
  situationLabels,
  type WorkplacePhrase 
} from "@/data/workplace-phrases";

const SpanishPhrases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSituation, setSelectedSituation] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [direction, setDirection] = useState<"en-es" | "es-en">("en-es");
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("spanish-phrase-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("spanish-phrase-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  const speakPhrase = (text: string, lang: "en" | "es", id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "es" ? "es-ES" : "en-US";
      utterance.rate = 0.8;
      setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredPhrases = workplacePhrases.filter(phrase => {
    const matchesSearch = searchQuery === "" || 
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.spanish.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    const matchesSituation = selectedSituation === "all" || phrase.situation === selectedSituation;
    
    return matchesSearch && matchesCategory && matchesSituation;
  });

  const favoritePhrases = workplacePhrases.filter(p => favorites.includes(p.id));

  const printCheatSheet = () => {
    const printContent = favoritePhrases.length > 0 ? favoritePhrases : filteredPhrases.slice(0, 20);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Workplace Spanish Phrases - Cheat Sheet</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; margin-bottom: 20px; }
              .phrase { 
                border-bottom: 1px solid #eee; 
                padding: 12px 0; 
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
              }
              .english { font-weight: bold; }
              .spanish { color: #2563eb; font-weight: 600; }
              .phonetic { color: #666; font-size: 0.9em; font-style: italic; }
              @media print { body { padding: 0; } }
            </style>
          </head>
          <body>
            <h1>🇺🇸 Workplace Spanish Phrases 🇲🇽</h1>
            ${printContent.map(p => `
              <div class="phrase">
                <div>
                  <div class="english">${p.english}</div>
                </div>
                <div>
                  <div class="spanish">${p.spanish}</div>
                  <div class="phonetic">${p.phonetic}</div>
                </div>
              </div>
            `).join('')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const PhraseCard = ({ phrase }: { phrase: WorkplacePhrase }) => {
    const isFavorite = favorites.includes(phrase.id);
    const isPlaying = playingId === phrase.id;
    
    return (
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 space-y-2">
              {direction === "en-es" ? (
                <>
                  <p className="font-semibold text-foreground">{phrase.english}</p>
                  <p className="text-primary font-medium text-lg">{phrase.spanish}</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-primary text-lg">{phrase.spanish}</p>
                  <p className="text-foreground font-medium">{phrase.english}</p>
                </>
              )}
              <p className="text-sm text-muted-foreground italic">{phrase.phonetic}</p>
              <div className="flex gap-2 pt-1">
                <Badge variant="outline" className="text-xs">
                  {categoryLabels[phrase.category].icon} {categoryLabels[phrase.category].english}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {situationLabels[phrase.situation].icon} {situationLabels[phrase.situation].english}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${isPlaying ? 'text-primary animate-pulse' : ''}`}
                onClick={() => speakPhrase(phrase.spanish, "es", phrase.id)}
                title="Listen in Spanish"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${isFavorite ? 'text-red-500' : 'text-muted-foreground'}`}
                onClick={() => toggleFavorite(phrase.id)}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Workplace Spanish Phrases | Bilingual Guide for Work | Career Hub</title>
        <meta 
          name="description" 
          content="Free workplace Spanish phrase guide with audio. Learn essential phrases for warehouse, hospitality, retail, and cleaning jobs. English-Spanish with pronunciation." 
        />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/tools/spanish-phrases" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Bilingual Workplace Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Workplace Spanish Phrases
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Essential phrases for work with pronunciation guides and audio. 
            Build your personal phrase list for quick reference on the job.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search phrases in English or Spanish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
              {/* Direction Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDirection(d => d === "en-es" ? "es-en" : "en-es")}
                className="gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                {direction === "en-es" ? "English → Spanish" : "Spanish → English"}
              </Button>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md bg-background"
              >
                <option value="all">All Industries</option>
                {Object.entries(categoryLabels).map(([key, { english, icon }]) => (
                  <option key={key} value={key}>{icon} {english}</option>
                ))}
              </select>

              {/* Situation Filter */}
              <select
                value={selectedSituation}
                onChange={(e) => setSelectedSituation(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md bg-background"
              >
                <option value="all">All Situations</option>
                {Object.entries(situationLabels).map(([key, { english, icon }]) => (
                  <option key={key} value={key}>{icon} {english}</option>
                ))}
              </select>

              {/* Print Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={printCheatSheet}
                className="gap-2 ml-auto"
              >
                <Printer className="h-4 w-4" />
                Print Cheat Sheet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all" className="gap-2">
              <BookOpen className="h-4 w-4" />
              All Phrases ({filteredPhrases.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Star className="h-4 w-4" />
              My Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {filteredPhrases.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No phrases match your search. Try different keywords.</p>
                </CardContent>
              </Card>
            ) : (
              filteredPhrases.map(phrase => (
                <PhraseCard key={phrase.id} phrase={phrase} />
              ))
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favoritePhrases.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    Tap the heart icon on any phrase to save it here for quick reference.
                  </p>
                </CardContent>
              </Card>
            ) : (
              favoritePhrases.map(phrase => (
                <PhraseCard key={phrase.id} phrase={phrase} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-8 bg-accent/50">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-3">💡 Tips for Learning</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Tap the speaker icon</strong> to hear the phrase in Spanish</li>
              <li>• <strong>Save your favorites</strong> by tapping the heart - they'll be here when you come back</li>
              <li>• <strong>Print a cheat sheet</strong> to keep in your pocket for your first day</li>
              <li>• <strong>Practice daily</strong> - even 5 phrases a day makes a difference!</li>
              <li>• <strong>Don't worry about perfection</strong> - coworkers appreciate the effort</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SpanishPhrases;
