// src/pages/HomePage.tsx
import React from "react";
import { Award, MapPin, Gift, ChevronRight } from "lucide-react";
import Image from "next/image"; // ІМПОРТ КОМПОНЕНТА NEXT.JS
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Theme, FeatureItem, Page } from "@/types";

interface HomePageProps {
	theme: Theme;
	onNavigate: (page: Page) => void; // Змінили string на Page
}

const getFeatures = (theme: Theme): FeatureItem[] => [
	{
		title: "Best Quality",
		desc: "Sourced from the best organic farms globally.",
		icon: <Award size={32} className={`${theme.accent} `} />,
	},
	{
		title: "Fast Delivery",
		desc: "Fresh coffee and treats delivered hot.",
		icon: <MapPin size={32} className={`${theme.accent}`} />,
	},
	{
		title: "Great Rewards",
		desc: "Unlock exclusive menu items and discounts.",
		icon: <Gift size={32} className={`${theme.accent} `} />,
	},
];

const HomePage: React.FC<HomePageProps> = ({ theme, onNavigate }) => {
	const features = getFeatures(theme);

	return (
		<>
			{/* 1. Hero Section */}
			<section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						{/* Left Content */}
						<div className='text-center lg:text-left'>
							<h1 className='text-5xl lg:text-7xl font-bold leading-tight mb-6'>
								Coffee by day. <br />{" "}
								<span className={theme.accent}>Spirits by night.</span>
							</h1>
							<p className='text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0'>
								Two unique experiences under one roof. Fuel your focus with
								artisanal coffee during daylight, and unwind with bespoke
								spirits when darkness falls.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
								<DynamicGradientButton
									onClick={() => onNavigate("coffee")}
									active={true}
									theme={theme}
								>
									Morning Menu
								</DynamicGradientButton>
								<DynamicGradientButton
									onClick={() => onNavigate("cocktails")}
									theme={theme}
								>
									Evening Menu
								</DynamicGradientButton>
							</div>
						</div>
						{/* Right Image */}
						<div className='relative mt-10 lg:mt-0 w-full h-[400px] lg:h-[600px]'>
							<div
								className={`absolute inset-0 ${theme.bgAccent} rounded-full blur-[100px] opacity-10 animate-pulse`}
							></div>
							{/* Головне зображення екрану (Hero) оптимізоване через Next Image */}
							<Image
								src='https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'
								alt='Aesthetic coffee pour'
								fill
								priority // Завантажується миттєво для покращення LCP
								sizes='(max-w-1024px) 100vw, 50vw'
								className='relative z-10 rounded-[2rem] shadow-2xl object-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* 2. Features Section */}
			<section className='py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-3 gap-8'>
					{features.map((item, idx) => (
						<DynamicGradientCard key={idx} theme={theme}>
							<div className='flex items-center gap-6 p-6 rounded-2xl bg-t border border-white/10 backdrop-blur-sm h-[stretch]'>
								<div>
									<h3 className='text-xl font-semibold mb-2 text-white'>
										{item.title}
									</h3>
									<p className='text-gray-400'>{item.desc}</p>
								</div>
								<div>
									<div className='flex-shrink-0'>{item.icon}</div>
								</div>
							</div>
						</DynamicGradientCard>
					))}
				</div>
			</section>

			{/* 3. Experience Choices */}
			<section className='py-20 bg-black/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid md:grid-cols-2 gap-8'>
						{[0, 1].map((idx) => (
							<DynamicGradientCard key={idx} theme={theme}>
								<div
									onClick={() => onNavigate(idx === 0 ? "coffee" : "cocktails")}
									className='group/img relative h-96 cursor-pointer overflow-hidden rounded-[2rem]'
								>
									<Image
										src={
											idx === 0
												? "https://images.unsplash.com/photo-1495474472204-518605ec2187?auto=format&fit=crop&q=80&w=800"
												: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
										}
										alt={
											idx === 0
												? "Specialty Coffee Bar"
												: "Cocktail Spirits Bar"
										}
										fill
										sizes='(max-w-768px) 100vw, 50vw'
										className='object-cover group-hover/img:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10'></div>
									<div className='absolute bottom-8 left-8 right-8 z-20'>
										<h3 className='text-3xl font-bold mb-2 text-white'>
											{idx === 0 ? "The Coffee Bar" : "The Night Bar"}
										</h3>
										<p className='text-gray-300 mb-4'>
											{idx === 0
												? "Open 7 AM - 4 PM. Featuring single-origin beans roasted locally, artisan pastries, and a cozy workspace."
												: "Open 5 PM - 1 AM. Dimly lit atmosphere, ambient vinyl tunes, and spirits crafted by expert mixologists."}
										</p>
										<span
											className={`${idx === 0 ? "text-orange-500" : "text-fuchsia-500"} font-semibold flex items-center gap-2 group-hover/img:gap-4 transition-all`}
										>
											Explore {idx === 0 ? "Coffee" : "Cocktails"}{" "}
											<ChevronRight size={20} />
										</span>
									</div>
								</div>
							</DynamicGradientCard>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
