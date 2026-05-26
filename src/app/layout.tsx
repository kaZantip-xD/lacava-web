// src/app/layout.tsx
"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { getTheme, Page, Theme } from "../types";
import { LocaleProvider } from "@/lib/LocaleContext";

// Імпорти сторінок
import HomePage from "@/components/pages/HomePage";
import CoffeePage from "@/components/pages/CoffeePage";
import CocktailsPage from "@/components/pages/CocktailsPage";
import MenuPage from "@/components/pages/MenuPage";
import AboutPage from "@/components/pages/AboutPage";
import ContactPage from "@/components/pages/ContactPage";

import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleNavigation = (page: Page): void => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300);
  };

  const currentTheme: Theme = getTheme(currentPage);

  const renderPage = (): React.ReactNode => {
    switch (currentPage) {
      case "home":
        return <HomePage theme={currentTheme} onNavigate={handleNavigation} />;
      case "coffee":
        return <CoffeePage theme={currentTheme} onNavigate={handleNavigation} />;
      case "cocktails":
        return <CocktailsPage theme={currentTheme} onNavigate={handleNavigation} />;
      case "menu":
        return <MenuPage theme={currentTheme} onNavigate={handleNavigation} />;
      case "about":
        return <AboutPage theme={currentTheme} onNavigate={handleNavigation} />;
      case "contact":
        return <ContactPage theme={currentTheme} onNavigate={handleNavigation} />;
      default:
        return <HomePage theme={currentTheme} onNavigate={handleNavigation} />;
    }
  };

  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${inter.className} ${currentTheme.bg} text-white font-sans transition-colors duration-700 ease-in-out min-h-screen flex flex-col`}
      >
        <LocaleProvider>
          <Header
            currentTheme={currentTheme}
            currentPage={currentPage}
            onNavigate={handleNavigation}
          />

          <main
            className={`flex-grow transition-all duration-500 ease-in-out transform ${
              isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
            }`}
          >
            {renderPage()}
          </main>

          <Footer onNavigate={handleNavigation} />
        </LocaleProvider>
      </body>
    </html>
  );
}

export default RootLayout;
