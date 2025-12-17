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
    const langCode = lang.split('-')[0];
    
    // Filter voices that match the language
    const matchingVoices = voices.filter(v => 
      v.lang === lang || v.lang.startsWith(langCode)
    );
    
    if (matchingVoices.length === 0) {
      return voices[0] || null;
    }
    
    // Priority list for high-quality voices (ranked by typical quality)
    const preferredVoicePatterns = lang === 'en-US' ? [
      // Google voices (usually high quality)
      /google.*us/i,
      /google.*english/i,
      // Microsoft voices (often good quality)
      /microsoft.*aria/i,
      /microsoft.*jenny/i,
      /microsoft.*guy/i,
      /microsoft.*en/i,
      // Apple voices
      /samantha/i,
      /alex/i,
      /karen/i,
      // Other quality indicators
      /enhanced/i,
      /premium/i,
      /natural/i,
    ] : [
      // Spanish voices
      /google.*español/i,
      /google.*spanish/i,
      /microsoft.*es/i,
      /paulina/i,
      /jorge/i,
      /monica/i,
      /enhanced/i,
      /premium/i,
      /natural/i,
    ];
    
    // Try to find a preferred voice
    for (const pattern of preferredVoicePatterns) {
      const preferredVoice = matchingVoices.find(v => 
        pattern.test(v.name) || pattern.test(v.voiceURI)
      );
      if (preferredVoice) return preferredVoice;
    }
    
    // Prefer non-local voices as they're often higher quality
    const remoteVoice = matchingVoices.find(v => !v.localService);
    if (remoteVoice) return remoteVoice;
    
    // Return first matching voice
    return matchingVoices[0];
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
