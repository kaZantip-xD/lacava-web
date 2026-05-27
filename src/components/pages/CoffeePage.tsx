// src/pages/CoffeePage.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DynamicGradientCard from "@/components/GradientCard";
import { Theme, Page } from "@/types";
import { client, urlFor } from "@/lib/sanity";
import groq from "groq";
import { useTranslation } from "react-i18next";

interface CoffeePageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface MenuItem {
  name: string;
  description?: string;
  image?: { asset?: { _ref?: string } };
  imageUrl?: string;
}

const query = groq`*[_type == "menuCategory" && title match "Coffee" && locale == "en"][0].items`;

const CoffeePage: React.FC<CoffeePageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    client.fetch<MenuItem[]>(query).then((data) => setItems(data ?? []));
  }, []);

  const getImageSrc = (item: MenuItem): string | null => {
    if (item.image?.asset?._ref) return urlFor(item.image).width(400).url();
    if (item.imageUrl) return item.imageUrl;
    return null;
  };

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <span className={`${theme.accent} font-semibold tracking-wider uppercase text-sm`}>
            {t("coffee.badge")}
          </span>
          <h1 className='text-5xl font-bold mt-4 mb-6'>{t("coffee.title")}</h1>
          <p className='text-gray-400 max-w-2xl mx-auto'>{t("coffee.subtitle")}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {items.map((item, idx) => {
            const src = getImageSrc(item);
            return (
              <DynamicGradientCard key={idx} theme={theme}>
                {src && (
                  <div className='relative h-64 rounded-[inherit] overflow-hidden mb-6'>
                    <Image
                      src={src}
                      alt={item.name}
                      fill
                      sizes='(max-w-768px) 100vw, 50vw'
                      className='object-cover group-hover:scale-105 transition-transform duration-700'
                    />
                  </div>
                )}
                <div className='p-6'>
                  <h3 className='text-2xl font-bold mb-2'>{item.name}</h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>{item.description}</p>
                </div>
              </DynamicGradientCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoffeePage;