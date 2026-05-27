"use client";

import React, { useEffect, useState } from "react";
import { Theme, Page } from "@/types";
import { client } from "@/lib/sanity";
import groq from "groq";
import { iconMap } from "@/lib/iconMap";
import { useTranslation } from "react-i18next";

interface MenuPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

interface CategoryData {
  _id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

const query = groq`*[_type == "menuCategory" && locale == "en"] | order(order asc) { _id, title, icon, items }`;

const MenuPage: React.FC<MenuPageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    client.fetch<CategoryData[]>(query).then(setCategories);
  }, []);

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6'>{t("menu.title")}</h1>
          <p className='text-gray-400'>{t("menu.subtitle")}</p>
        </div>
        <div className='grid md:grid-cols-2 gap-16'>
          {categories.map((cat) => {
            if (!cat.items || cat.items.length === 0) return null;
            return (
              <div key={cat._id}>
                <div className='flex items-center gap-3 mb-8 pb-4 border-b border-emerald-900/50'>
                  {iconMap[cat.icon]?.(theme.accent)}
                  <h2 className='text-3xl font-bold'>{cat.title}</h2>
                </div>
                <ul className='space-y-6'>
                  {cat.items.map((item, idx) => (
                    <li
                      key={idx}
                      className='relative rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.03] active:bg-white/[0.03] cursor-default overflow-hidden group flex flex-col justify-center min-h-[95px]'
                    >
                      <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-transparent opacity-0 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-500 pointer-events-none' />
                      <div className='relative z-10'>
                        <div className='flex justify-between items-baseline mb-2'>
                          <h3 className='text-xl font-semibold'>{item.name}</h3>
                          <div className='border-b border-dotted border-gray-700 flex-grow mx-4 relative top-[-4px]'></div>
                          <span className={`${theme.accent} font-bold text-lg whitespace-nowrap`}>{item.price}</span>
                        </div>
                        <p className='text-gray-400 text-sm'>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;