"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Coffee, Globe, Share2, Menu, X } from "lucide-react";
import { NavLinks, Page, Theme } from "../types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setMenuOpen(false), []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    close();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, close]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarGutter = "stable";
    } else {
      document.body.style.overflow = "";
      document.body.style.scrollbarGutter = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarGutter = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed w-full z-50 ${currentTheme.bg}/90 backdrop-blur-md border-b border-gray-800 transition-colors duration-700`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            <button
              onClick={() => handleNav("home")}
              className='flex items-center gap-2 cursor-pointer'
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
                  onClick={() => handleNav(link.id)}
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

            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden text-white transition-colors ${
                menuOpen ? "hidden" : ""
              }`}
              aria-label='Open menu'
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

{/* Mobile menu — sibling of header, animated */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto backdrop-blur-2xl"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: menuOpen ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)" }}
      >
        {/* Backdrop click */}
        <div className='absolute inset-0' onClick={close} />

        {/* Top bar — always visible immediately (no transition) */}
        <div
          className={`relative z-10 flex items-center justify-between h-20 px-4 transition-opacity duration-150 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => handleNav("home")}
            className='flex items-center gap-2'
          >
            <Coffee className='text-orange-500' size={32} />
            <span className='font-bold text-2xl tracking-tighter text-white'>
              la cava
              <span className='text-orange-500'>.</span>
            </span>
          </button>
          <button
            onClick={close}
            className='text-white p-1'
            aria-label='Close menu'
          >
            <X size={28} />
          </button>
        </div>

        {/* Animated content (nav + footer) */}
        <div
          className={`relative z-10 flex flex-col flex-1 transition-all duration-300 ease-out delay-75 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          style={{ height: "calc(100% - 5rem)" }}
        >
          <nav className='flex-1 flex flex-col justify-center gap-3 max-w-sm mx-auto w-full'>
            {NavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-center py-4 text-xl font-serif tracking-wide rounded-xl transition-all ${
                  currentPage === link.id
                    ? "text-white bg-white/10 border border-white/20"
                    : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {t(`nav.${link.id}`)}
              </button>
            ))}
          </nav>

          <div className='flex items-center justify-center gap-6 py-5 border-t border-white/10'>
            <a
              href='#'
              className='text-white/60 hover:text-white transition-colors p-1'
            >
              <Globe size={22} />
            </a>
            <a
              href='#'
              className='text-white/60 hover:text-white transition-colors p-1'
            >
              <Share2 size={22} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;