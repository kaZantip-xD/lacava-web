// src/pages/AboutPage.tsx
import React from "react";
import Image from "next/image";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Users, MapPin, Coffee } from "lucide-react";
import { Theme, Page } from "@/types";
import { useTranslation } from "react-i18next";

interface AboutPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 1. Our Story Section */}
        <section className='grid lg:grid-cols-2 gap-16 items-center mb-20'>
          <div className='relative rounded-[2rem] overflow-hidden h-[500px] shadow-xl'>
            <Image
              src='https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800'
              alt='Cafe interior'
              fill
              sizes='(max-w-1024px) 100vw, 50vw'
              className='object-cover transition-transform duration-500 hover:scale-[1.02]'
            />
            <div className='absolute inset-0 bg-black/30 z-10'></div>
          </div>
          <div>
            <h1 className={`text-6xl font-extrabold mb-6 ${theme.accent}`}>
              {t("about.title")}
            </h1>
            <div className='space-y-5 text-gray-300 text-lg leading-relaxed'>
              <p>{t("about.paragraph_1")}</p>
              <p>{t("about.paragraph_2")}</p>
              <p>{t("about.paragraph_3")}</p>
            </div>
          </div>
        </section>

        {/* 2. Stats Section */}
        <section className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-12 text-white'>
            {t("about.values_title")}
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <DynamicGradientCard theme={theme}>
              <div className='p-8'>
                <Users className={`${theme.accent} mx-auto mb-4`} size={40} />
                <h3 className='text-xl font-bold mb-2 text-white'>{t("about.value_1_title")}</h3>
                <p className='text-sm mt-2 text-gray-400'>{t("about.value_1_desc")}</p>
              </div>
            </DynamicGradientCard>

            <DynamicGradientCard theme={theme}>
              <div className='p-8'>
                <MapPin className={`${theme.accent} mx-auto mb-4`} size={40} />
                <h3 className='text-xl font-bold mb-2 text-white'>{t("about.value_2_title")}</h3>
                <p className='text-sm mt-2 text-gray-400'>{t("about.value_2_desc")}</p>
              </div>
            </DynamicGradientCard>

            <DynamicGradientCard theme={theme}>
              <div className='p-8'>
                <Coffee className={`${theme.accent} mx-auto mb-4`} size={40} />
                <h3 className='text-xl font-bold mb-2 text-white'>{t("about.value_3_title")}</h3>
                <p className='text-sm mt-2 text-gray-400'>{t("about.value_3_desc")}</p>
              </div>
            </DynamicGradientCard>
          </div>
        </section>

        {/* 3. Map Section */}
        <div className='text-center mt-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-white'>
            {t("about.find_us_title")}
          </h2>
          <div
            className='relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer'
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            <Image
              src='https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200'
              alt='Cafe Location Map View'
              fill
              sizes='100vw'
              className='object-cover transition-transform duration-500 hover:scale-[1.03]'
            />
          </div>
          <div className='mt-8'>
            <DynamicGradientButton
              onClick={() => onNavigate("contact")}
              theme={theme}
            >
              {t("about.btn_map")}
            </DynamicGradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;