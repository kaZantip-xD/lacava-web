"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Theme, Page } from "@/types";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "@/lib/sanity";
import groq from "groq";
import { iconMap } from "@/lib/iconMap";

interface AboutPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface AboutData {
  headline: string;
  storyImage?: { asset?: { _ref?: string }; imageUrl?: string };
  storyParagraphs: string[];
  valuesHeadline: string;
  values: ValueItem[];
  findUsHeadline: string;
  mapImage?: { asset?: { _ref?: string }; imageUrl?: string };
  ctaText: string;
  ctaLinkPage: string;
}

const query = groq`*[_type == "aboutPageSettings"][0]`;

const AboutPage: React.FC<AboutPageProps> = ({ theme, onNavigate }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    client.fetch<AboutData>(query).then(setData);
  }, []);

  const getImg = (img?: { asset?: { _ref?: string }; imageUrl?: string }) => {
    if (img?.asset?._ref) return urlFor(img).width(800).url();
    return img?.imageUrl ?? null;
  };

  const storyImg = getImg(data?.storyImage);
  const paragraphs = data?.storyParagraphs?.filter(Boolean) ?? [];
  const values = data?.values ?? [];

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <section className='grid lg:grid-cols-2 gap-16 items-center mb-20'>
          {storyImg && (
            <div className='relative rounded-[2rem] overflow-hidden h-[500px] shadow-xl'>
              <Image src={storyImg} alt='' fill sizes='(max-w-1024px) 100vw, 50vw'
                className='object-cover transition-transform duration-500 hover:scale-[1.02]' />
              <div className='absolute inset-0 bg-black/30 z-10'></div>
            </div>
          )}
          <div>
            <h1 className={`text-6xl font-extrabold mb-6 ${theme.accent}`}>
              {data?.headline || t("about.title")}
            </h1>
            {paragraphs.length > 0 && (
              <div className='space-y-5 text-gray-300 text-lg leading-relaxed'>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </div>
        </section>

        {values.length > 0 && (
          <section className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-12 text-white'>{data?.valuesHeadline || t("about.values_title")}</h2>
            <div className='grid md:grid-cols-3 gap-8'>
              {values.map((v, idx) => (
                <DynamicGradientCard key={idx} theme={theme}>
                  <div className='p-8'>
                    <div className='mx-auto mb-4 flex justify-center'>{iconMap[v.icon]?.("mx-auto " + theme.accent)}</div>
                    <h3 className='text-xl font-bold mb-2 text-white'>{v.title}</h3>
                    <p className='text-sm mt-2 text-gray-400'>{v.description}</p>
                  </div>
                </DynamicGradientCard>
              ))}
            </div>
          </section>
        )}

        <div className='text-center mt-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-white'>{data?.findUsHeadline || t("about.find_us_title")}</h2>
          <div className='relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer'
            onClick={() => window.open("https://maps.google.com", "_blank")}>
            {getImg(data?.mapImage) && (
              <Image src={getImg(data?.mapImage)!} alt='Map' fill sizes='100vw'
                className='object-cover transition-transform duration-500 hover:scale-[1.03]' />
            )}
          </div>
          <div className='mt-8'>
            <DynamicGradientButton onClick={() => onNavigate((data?.ctaLinkPage || "contact") as Page)} theme={theme}>
              {data?.ctaText || t("about.btn_map")}
            </DynamicGradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;