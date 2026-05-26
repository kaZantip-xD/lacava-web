// src/pages/CoffeePage.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DynamicGradientCard from "@/components/GradientCard";
import { Theme, Page } from "@/types";
import client from "../../../tina/__generated__/client";
import { useLocale } from "@/lib/LocaleContext";

interface CoffeePageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface CoffeeItemData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: { id: string } | null;
  order: number;
}

const CoffeePage: React.FC<CoffeePageProps> = ({ theme, onNavigate }) => {
  const { t } = useLocale();
  const [coffees, setCoffees] = useState<CoffeeItemData[]>([]);

  useEffect(() => {
    client.queries
      .menuItemConnection({ sort: "order", last: 50 })
      .then((res) => {
        const nodes =
          res.data.menuItemConnection.edges?.map(
            (e) => e?.node as CoffeeItemData,
          ) ?? [];
        setCoffees(nodes);
      });
  }, []);

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
          {coffees.map((drink) => (
            <DynamicGradientCard key={drink.id} theme={theme}>
              <div className='relative h-64 rounded-[inherit] overflow-hidden mb-6'>
                <Image
                  src={drink.image}
                  alt={drink.title}
                  fill
                  sizes='(max-w-768px) 100vw, 50vw'
                  className='object-cover group-hover:scale-105 transition-transform duration-700'
                />
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

export default CoffeePage;