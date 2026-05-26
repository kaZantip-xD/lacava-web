// src/pages/CocktailsPage.tsx
import React, { useEffect, useState } from "react";
import DynamicGradientCard from "@/components/GradientCard";
import { Theme, Page } from "@/types";
import client from "../../../tina/__generated__/client";
import { useLocale } from "@/lib/LocaleContext";

interface CocktailsPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface CocktailItemData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: { id: string } | null;
  order: number;
}

const CocktailsPage: React.FC<CocktailsPageProps> = ({ theme, onNavigate }) => {
  const { t } = useLocale();
  const [cocktails, setCocktails] = useState<CocktailItemData[]>([]);

  useEffect(() => {
    client.queries
      .menuItemConnection({ sort: "order", last: 50 })
      .then((res) => {
        const nodes =
          res.data.menuItemConnection.edges?.map(
            (e) => e?.node as CocktailItemData,
          ) ?? [];
        setCocktails(nodes);
      });
  }, []);

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <span className={`${theme.accent} font-semibold tracking-wider uppercase text-sm`}>
            {t("cocktails.badge")}
          </span>
          <h1 className='text-5xl font-bold mt-4 mb-6'>{t("cocktails.title")}</h1>
          <p className='text-gray-400 max-w-2xl mx-auto'>{t("cocktails.subtitle")}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {cocktails.map((drink) => (
            <DynamicGradientCard key={drink.id} theme={theme}>
              <div className='relative h-64 rounded-[inherit] overflow-hidden mb-6'>
                <img
                  src={drink.image}
                  alt={drink.title}
                  className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
              </div>
              <div className='m-6'>
                <h3 className='text-2xl font-bold mb-2'>{drink.title}</h3>
                <p className='text-gray-400 text-sm leading-relaxed'>{drink.description}</p>
              </div>
            </DynamicGradientCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailsPage;