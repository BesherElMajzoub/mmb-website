import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load persisted language
    const saved = localStorage.getItem('mmb-language') as Language;
    if (saved && (saved === 'en' || saved === 'de' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    // Update document direction and lang attribute
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem('mmb-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      if (value && value[key]) {
        value = value[key];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const k of keys) {
          fallback = fallback?.[k];
        }
        return fallback || path;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
