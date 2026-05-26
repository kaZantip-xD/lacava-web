"use client";

import React, { useEffect, useState } from "react";
import { Theme, Page } from "@/types";
import client from "../../../tina/__generated__/client";
import { iconMap } from "@/lib/iconMap";
import { useLocale } from "@/lib/LocaleContext";

interface MenuPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface CategoryData {
  id: string;
  title: string;
  icon: string;
  order: number;
}

interface MenuItemData {
  id: string;
  title: string;
  description: string;
  price: string;
  category: { id: string } | null;
  order: number;
}

const MenuPage: React.FC<MenuPageProps> = ({ theme, onNavigate }) => {
  const { t, locale } = useLocale();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [items, setItems] = useState<MenuItemData[]>([]);

  useEffect(() => {
    Promise.all([
      client.queries.menuCategoryConnection({ sort: "order", last: 50 }),
      client.queries.menuItemConnection({ sort: "order", last: 50 }),
    ]).then(([catsRes, itemsRes]) => {
      const catNodes =
        catsRes.data.menuCategoryConnection.edges?.map(
          (e) => e?.node as CategoryData,
        ) ?? [];
      const itemNodes =
        itemsRes.data.menuItemConnection.edges?.map(
          (e) => e?.node as MenuItemData,
        ) ?? [];
      setCategories(catNodes.sort((a, b) => a.order - b.order));
      setItems(itemNodes);
    });
  }, []);

  const grouped = new Map<string, MenuItemData[]>();
  items.forEach((item) => {
    const catId = item.category?.id ?? "uncategorized";
    if (!grouped.has(catId)) grouped.set(catId, []);
    grouped.get(catId)!.push(item);
  });

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6'>{t("menu.title")}</h1>
          <p className='text-gray-400'>{t("menu.subtitle")}</p>
        </div>
        <div className='grid md:grid-cols-2 gap-16'>
          {categories.map((cat) => {
            const catItems = grouped.get(cat.id) ?? [];
            if (catItems.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className='flex items-center gap-3 mb-8 pb-4 border-b border-emerald-900/50'>
                  {iconMap[cat.icon]?.(theme.accent)}
                  <h2 className='text-3xl font-bold'>{cat.title}</h2>
                </div>
                <ul className='space-y-6'>
                  {catItems
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <li
                        key={item.id}
                        className='relative rounded-xl p-4 -mx-4 transition-all duration-300 hover:bg-white/[0.03] active:bg-white/[0.03] cursor-default overflow-hidden group'
                      >
                        <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-transparent opacity-0 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-500 pointer-events-none' />
                        <div className='relative z-10'>
                          <div className='flex justify-between items-baseline mb-2'>
                            <h3 className='text-xl font-semibold'>{item.title}</h3>
                            <div className='border-b border-dotted border-gray-700 flex-grow mx-4 relative top-[-4px]'></div>
                            <span className={`${theme.accent} font-bold text-lg`}>
                              {item.price}
                            </span>
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