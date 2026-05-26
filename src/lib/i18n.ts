import en from "@/locales/en.json";

const locales = { en } as const;
type Locale = keyof typeof locales;

let currentLocale: Locale = "en";

const translations: Record<string, Record<string, unknown>> = { en };

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function t(path: string): string {
  const keys = path.split(".");
  let result: unknown = translations[currentLocale];
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}