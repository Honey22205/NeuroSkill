import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTextToSpeechProps {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  highlightWords?: boolean;
}

interface UseTextToSpeechReturn {
  isPlaying: boolean;
  isPaused: boolean;
  currentWordIndex: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
  setPosition: (position: number) => void;
}

export const useTextToSpeech = ({
  text,
  rate = 1,
  pitch = 1,
  volume = 1,
  highlightWords = false
}: UseTextToSpeechProps): UseTextToSpeechReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    wordsRef.current = text.split(' ').filter(word => word.trim() !== '');
  }, [text]);

  const speak = useCallback((startFrom: number = 0) => {
    if (!text || !('speechSynthesis' in window)) return;

    // Stop any existing speech
    window.speechSynthesis.cancel();

    const words = wordsRef.current;
    const textToSpeak = words.slice(startFrom).join(' ');
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    if (highlightWords) {
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const currentIndex = startFrom + Math.floor(event.charIndex / 5); // Rough estimation
          setCurrentWordIndex(Math.min(currentIndex, words.length - 1));
        }
      };
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(0);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, rate, pitch, volume, highlightWords]);

  const play = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speak(currentWordIndex);
    }
  }, [isPaused, currentWordIndex, speak]);

  const pause = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(0);
  }, []);

  const setRate = useCallback((newRate: number) => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = newRate;
    }
  }, []);

  const setPosition = useCallback((position: number) => {
    const wordIndex = Math.floor(position * wordsRef.current.length);
    setCurrentWordIndex(wordIndex);
    if (isPlaying) {
      stop();
      speak(wordIndex);
    }
  }, [isPlaying, stop, speak]);

  return {
    isPlaying,
    isPaused,
    currentWordIndex,
    play,
    pause,
    stop,
    setRate,
    setPosition
  };
};