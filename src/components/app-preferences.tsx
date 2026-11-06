"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type Theme = "light" | "dark";
type Language = "en" | "km";

type AppPreferences = {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const PreferencesContext = createContext<AppPreferences | null>(null);

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("apparxmath-theme");
      const savedLanguage = window.localStorage.getItem("apparxmath-language");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      if (savedLanguage === "en" || savedLanguage === "km") setLanguage(savedLanguage);
    } catch {
      // The site still works when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem("apparxmath-theme", theme);
      window.localStorage.setItem("apparxmath-language", language);
    } catch {
      // Preferences remain active for the current page even without storage.
    }
  }, [theme, language, ready]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => current === "light" ? "dark" : "light");
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => current === "en" ? "km" : "en");
  }, []);

  const value = useMemo(() => ({ theme, language, toggleTheme, toggleLanguage }), [theme, language, toggleTheme, toggleLanguage]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useAppPreferences must be used inside AppPreferencesProvider.");
  return context;
}
