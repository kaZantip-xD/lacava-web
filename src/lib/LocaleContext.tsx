"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import en from "@/locales/en.json";
import ua from "@/locales/ua.json";

export type Locale = "en" | "ua";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const messages: Record<Locale, Record<string, unknown>> = { en, ua };

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split(".");
      let result: unknown = messages[locale];
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return fallback ?? key;
        }
      }
      return typeof result === "string" ? result : fallback ?? key;
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}