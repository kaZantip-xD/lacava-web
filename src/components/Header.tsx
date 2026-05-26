"use client";

import React from "react";
import { Coffee, Globe, Share2 } from "lucide-react";
import { NavLinks, Page, Theme } from "../types";
import { useLocale } from "@/lib/LocaleContext";

interface HeaderProps {
  currentTheme: Theme;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentTheme,
  currentPage,
  onNavigate,
}) => {
  const { locale, setLocale, t } = useLocale();

  return (
    <header
      className={`fixed w-full z-50 ${currentTheme.bg}/90 backdrop-blur-md border-b border-gray-800 transition-colors duration-700`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          <button
            onClick={() => onNavigate("home")}
            className='flex items-center gap-2 cursor-pointer relative z-50'
          >
            <Coffee className='text-orange-500' size={32} />
            <span className='font-bold text-2xl tracking-tighter text-white'>
              la cava
              <span className='text-orange-500'>.</span>
            </span>
          </button>

          <div className='hidden md:flex items-center space-x-8'>
            {NavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm transition-colors duration-200 ${
                  currentPage === link.id
                    ? "text-white font-bold"
                    : "text-gray-400 font-medium"
                } hover:text-white`}
              >
                {t(`nav.${link.id}`)}
              </button>
            ))}
          </div>

          <div className='hidden md:flex items-center space-x-6'>
            <button
              onClick={() => setLocale(locale === "en" ? "ua" : "en")}
              className={`text-sm font-semibold px-3 py-1 rounded-full border transition ${
                locale === "ua"
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-400 border-gray-600 hover:text-white hover:border-gray-400"
              }`}
            >
              {locale === "en" ? "UA" : "EN"}
            </button>
            <a
              href='#'
              className='text-gray-400 hover:text-white transition-colors duration-200'
            >
              <Globe size={22} />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-white transition-colors duration-200'
            >
              <Share2 size={22} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;