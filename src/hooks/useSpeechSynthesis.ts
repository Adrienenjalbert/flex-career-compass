import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechSynthesisOptions {
  defaultRate?: number;
  defaultLang?: 'en-US' | 'es-ES';
}

interface UseSpeechSynthesisReturn {
  speak: (text: string, lang?: 'en-US' | 'es-ES') => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  rate: number;
  setRate: (rate: number) => void;
  currentLang: 'en-US' | 'es-ES';
}

export const useSpeechSynthesis = (
  options: UseSpeechSynthesisOptions = {}
): UseSpeechSynthesisReturn => {
  const { defaultRate = 0.85, defaultLang = 'en-US' } = options;
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(defaultRate);
  const [currentLang, setCurrentLang] = useState<'en-US' | 'es-ES'>(defaultLang);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const getVoice = useCallback((lang: 'en-US' | 'es-ES'): SpeechSynthesisVoice | null => {
    if (!isSupported) return null;
    
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice that matches the language
    const exactMatch = voices.find(v => v.lang === lang);
    if (exactMatch) return exactMatch;
    
    // Fallback to any voice that starts with the language code
    const langCode = lang.split('-')[0];
    const partialMatch = voices.find(v => v.lang.startsWith(langCode));
    if (partialMatch) return partialMatch;
    
    // Last resort: return default voice
    return voices[0] || null;
  }, [isSupported]);

  const speak = useCallback((text: string, lang: 'en-US' | 'es-ES' = 'en-US') => {
    if (!isSupported) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = lang;
    
    // Get appropriate voice
    const voice = getVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentLang(lang);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, rate, getVoice]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  // Load voices when they become available
  useEffect(() => {
    if (!isSupported) return;
    
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    rate,
    setRate,
    currentLang,
  };
};
