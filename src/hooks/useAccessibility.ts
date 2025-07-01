import { useState, useEffect } from 'react';
import { UserPreferences } from '../types';

const defaultPreferences: UserPreferences = {
  fontSize: 'medium',
  fontFamily: 'standard',
  lineSpacing: 'normal',
  colorScheme: 'default',
  learningStyle: 'visual',
  speechRate: 1,
  focusMode: false,
  breakReminders: true
};

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('neuroskill-preferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('neuroskill-preferences', JSON.stringify(preferences));
    
    // Apply CSS custom properties based on preferences
    const root = document.documentElement;
    
    // Font size
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '22px'
    };
    root.style.setProperty('--base-font-size', fontSizeMap[preferences.fontSize]);
    
    // Line spacing
    const lineSpacingMap = {
      'normal': '1.5',
      'wide': '1.8',
      'extra-wide': '2.0'
    };
    root.style.setProperty('--line-height', lineSpacingMap[preferences.lineSpacing]);
    
    // Font family
    if (preferences.fontFamily === 'dyslexic') {
      document.body.classList.add('font-dyslexic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-dyslexic');
    }
    
    // Color scheme
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${preferences.colorScheme}`);
    
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences
  };
};