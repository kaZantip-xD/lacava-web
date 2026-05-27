"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Theme, Page } from "@/types";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "@/lib/sanity";
import groq from "groq";
import { iconMap } from "@/lib/iconMap";

interface HomePageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface FeatureData {
  title: string;
  description: string;
  icon: string;
}

interface HeroButton {
  label: string;
  linkPage: string;
  icon?: string;
  showIcon?: boolean;
}

interface HomeData {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroImage?: { asset?: { _ref?: string }; imageUrl?: string };
  heroButtons: HeroButton[];
  features: FeatureData[];
}

interface ExpCard {
  title: string;
  description: string;
  linkLabel: string;
  linkPage: string;
  image?: { asset?: { _ref?: string }; imageUrl?: string };
}

interface ExpData {
  cards: ExpCard[];
}

const homeQuery = groq`*[_type == "homePageSettings"][0]`;
const expQuery = groq`*[_type == "experienceCards"][0]`;

const HomePage: React.FC<HomePageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();
  const [home, setHome] = useState<HomeData | null>(null);
  const [exp, setExp] = useState<ExpData | null>(null);

  useEffect(() => {
    Promise.all([
      client.fetch<HomeData>(homeQuery),
      client.fetch<ExpData>(expQuery),
    ]).then(([h, e]) => {
      setHome(h);
      setExp(e);
    });
  }, []);

  const getImgSrc = (img?: { asset?: { _ref?: string }; imageUrl?: string }) => {
    if (img?.asset?._ref) return urlFor(img).width(800).url();
    if (img?.imageUrl) return img.imageUrl;
    return null;
  };

  const heroImg = getImgSrc(home?.heroImage);

  return (
    <>
      <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl lg:text-7xl font-bold leading-tight mb-6'>
                {home?.heroTitleLine1 || t("home.hero_title")}<br />
                <span className={theme.accent}>{home?.heroTitleLine2 || t("home.hero_title_highlight")}</span>
              </h1>
              <p className='text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0'>
                {home?.heroSubtitle || t("home.hero_subtitle")}
              </p>
              {(home?.heroButtons?.length ?? 0) > 0 && (
                <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                  {home!.heroButtons.map((btn, idx) => (
                    <DynamicGradientButton
                      key={idx}
                      onClick={() => onNavigate(btn.linkPage as Page)}
                      active={idx === 0}
                      theme={theme}
                    >
                      {btn.showIcon !== false && btn.icon ? (
                        <span className='flex items-center gap-2'>{iconMap[btn.icon]?.(theme.accent)}{btn.label}</span>
                      ) : (
                        btn.label
                      )}
                    </DynamicGradientButton>
                  ))}
                </div>
              )}
            </div>
            <div className='relative mt-10 lg:mt-0 w-full h-[400px] lg:h-[600px]'>
              <div className={`absolute inset-0 ${theme.bgAccent} rounded-full blur-[100px] opacity-10 animate-pulse`}></div>
              {heroImg && (
                <Image src={heroImg} alt='Hero' fill priority sizes='(max-w-1024px) 100vw, 50vw'
                  className='relative z-10 rounded-[2rem] shadow-2xl object-cover' />
              )}
            </div>
          </div>
        </div>
      </section>

      {(home?.features?.length ?? 0) > 0 && (
        <section className='py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-8'>
            {home!.features.map((item, idx) => (
              <DynamicGradientCard key={idx} theme={theme}>
                <div className='flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm'>
                  <div>
                    <h3 className='text-xl font-semibold mb-2 text-white'>{item.title}</h3>
                    <p className='text-gray-400'>{item.description}</p>
                  </div>
                  <div className='flex-shrink-0'>{iconMap[item.icon]?.(theme.accent)}</div>
                </div>
              </DynamicGradientCard>
            ))}
          </div>
        </section>
      )}

      {(exp?.cards?.length ?? 0) > 0 && (
        <section className='py-20 bg-black/20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid md:grid-cols-2 gap-8'>
              {exp!.cards.map((card, idx) => {
                const src = getImgSrc(card.image);
                return (
                  <DynamicGradientCard key={idx} theme={theme}>
                    <div onClick={() => onNavigate(card.linkPage as Page)} className='group/img relative h-96 cursor-pointer overflow-hidden rounded-[2rem]'>
                      {src && <img src={src} alt={card.title} className='absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700' />}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10'></div>
                      <div className='absolute bottom-8 left-8 right-8 z-20'>
                        <h3 className='text-3xl font-bold mb-2 text-white'>{card.title}</h3>
                        <p className='text-gray-300 mb-4'>{card.description}</p>
                        <span className={`${idx === 0 ? "text-orange-500" : "text-fuchsia-500"} font-semibold flex items-center gap-2 group-hover/img:gap-4 transition-all`}>
                          {card.linkLabel} <ChevronRight size={20} />
                        </span>
                      </div>
                    </div>
                  </DynamicGradientCard>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;