// src/types.ts
import { ReactNode } from "react";

// --- CORE TYPE DEFINITIONS ---

export type Page = "home" | "coffee" | "cocktails" | "menu" | "about" | "contact";

export const SITE_NAME = "la cava";


export interface Theme {
  bg: string;
  accent: string;
  bgAccent: string;
  gradFrom: string;
  gradTo: string;
}


// --- COMPONENT PROP INTERFACES ---
export interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

export interface GradientButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // <-- CHANGE MADE HERE: Accepts a MouseEvent
  active?: boolean;
  className?: string;
}


// --- DATA MODEL INTERFACES ---
export interface FeatureItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

export interface DrinkItem {
  id: number;
  name: string;
  desc: string;
  image: string;
}

export interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

export interface MenuSection {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}


// --- DATA STORE & HELPERS ---

// Defines the structure for NavLink before it is used in NavLinks array
export interface NavLink {
  id: Page;
  label: string;
}

// Constant data arrays use the defined interfaces
export const NavLinks: ReadonlyArray<NavLink> = [ // <-- Uses NavLink
  { id: "coffee", label: "Coffee" },
  { id: "cocktails", label: "Cocktails" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact Us" },
];

// Helper function to retrieve theme data by page key
export const getTheme = (page: Page): Theme => { // <-- Uses Page type
  const themes: Record<Page, Theme> = {
    home: { bg: "bg-[#1c1816]", accent: "text-orange-500", bgAccent: "bg-orange-500", gradFrom: "from-orange-500", gradTo: "to-transparent" },
    coffee: { bg: "bg-[#1c1816]", accent: "text-orange-500", bgAccent: "bg-orange-500", gradFrom: "from-orange-500", gradTo: "to-transparent" },
    cocktails: { bg: "bg-[#130f1c]", accent: "text-fuchsia-500", bgAccent: "bg-fuchsia-500", gradFrom: "from-fuchsia-500", gradTo: "to-transparent" },
    menu: { bg: "bg-[#0f1411]", accent: "text-emerald-500", bgAccent: "bg-emerald-500", gradFrom: "from-emerald-500", gradTo: "to-transparent" },
    about: { bg: "bg-[#141414]", accent: "text-gray-300", bgAccent: "bg-gray-100 text-black", gradFrom: "from-gray-400", gradTo: "to-transparent" },
    contact: { bg: "bg-[#1c1816]", accent: "text-blue-500", bgAccent: "bg-blue-500", gradFrom: "from-blue-500", gradTo: "to-transparent" },
  };
  return themes[page] || themes.home;
};
