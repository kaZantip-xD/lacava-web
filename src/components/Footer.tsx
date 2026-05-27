"use client";

import React from "react";
import { Coffee } from "lucide-react";
import { Page } from "../types";
import { useTranslation } from "react-i18next";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className='bg-black/60 border-t border-gray-900 mt-auto py-10'>
      <div className='flex justify-between py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <button
          onClick={() => onNavigate("home")}
          className='gap-2 my-auto cursor-pointer inline-flex items-center'
        >
          <Coffee className='text-orange-500' size={28} />
          <span className='font-bold text-xl text-white'>
            la cava
            <span className='text-orange-500'>.</span>
          </span>
        </button>
        <p className='text-gray-500 text-sm self-center'>
          &copy; 2026 {t("footer.copyright")}{" "}
          {t("footer.designed_by")}{" "}
          <span className='animate-pulse text-red-500 inline-block'>❤ </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;