// src/pages/AboutPage.tsx
import React from "react";
import Image from "next/image"; // Імпортуємо Image з Next.js
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Users, MapPin, Coffee } from "lucide-react";

import { Theme, Page } from "@/types";

interface AboutPageProps {
	theme: Theme;
	onNavigate: (page: Page) => void; // Змінили string на Page
}

const AboutPage: React.FC<AboutPageProps> = ({ theme, onNavigate }) => {
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
						<div className='absolute inset-0 bg-black/30 z-10'></div>{" "}
						{/* Overlay */}
					</div>

					{/* Text Content (Right Side) */}
					<div>
						{/* Виправлено: theme.accent тепер у className */}
						<h1 className={`text-6xl font-extrabold mb-6 ${theme.accent}`}>
							Our Story
						</h1>
						<div className='space-y-5 text-gray-300 text-lg leading-relaxed'>
							<p>
								Founded in 2026, our mission is to elevate your daily beverage
								ritual into an experience worth slowing down for. We blend the
								focused energy of coffee with the sophisticated relaxation of
								spirits.
							</p>
							<p>
								We source raw beans directly from carbon-neutral cooperative
								farms, ensuring transparent trade relations and exceptional bean
								selection. Our commitment extends beyond the cup to every detail
								on the menu.
							</p>
							<p>
								When dusk calls, our roastery seamlessly transitions into a
								lively cocktail bar. The roaring steam wands make way for shaker
								clinks as we pour craft elixirs until night close.
							</p>
						</div>
					</div>
				</section>

				{/* 2. Stats Section (The Cards) */}
				<section className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold mb-12 text-white'>
						Our Core Values
					</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						{/* Card 1 */}
						<DynamicGradientCard theme={theme}>
							<div className='p-8'>
								<Users className={`${theme.accent} mx-auto mb-4`} size={40} />
								<h3 className='text-xl font-bold mb-2 text-white'>
									Community First
								</h3>
								<p className='text-sm mt-2 text-gray-400'>
									Crafting a cozy local space designed for connection, laughter,
									and work.
								</p>
							</div>
						</DynamicGradientCard>

						{/* Card 2 */}
						<DynamicGradientCard theme={theme}>
							<div className='p-8'>
								<MapPin className={`${theme.accent} mx-auto mb-4`} size={40} />
								<h3 className='text-xl font-bold mb-2 text-white'>
									Locally Rooted
								</h3>
								<p className='text-sm mt-2 text-gray-400'>
									Partnering directly with regional organic dairies and pastry
									bakers.
								</p>
							</div>
						</DynamicGradientCard>

						{/* Card 3 */}
						<DynamicGradientCard theme={theme}>
							<div className='p-8'>
								<Coffee className={`${theme.accent} mx-auto mb-4`} size={40} />
								<h3 className='text-xl font-bold mb-2 text-white'>
									Zero Compromise
								</h3>
								<p className='text-sm mt-2 text-gray-400'>
									Obsessing over high-quality ingredients, from reverse-osmosis
									water to premium spirits.
								</p>
							</div>
						</DynamicGradientCard>
					</div>
				</section>

				{/* 3. Map Section (Interactive) */}
				<div className='text-center mt-16'>
					<h2 className='text-3xl md:text-4xl font-bold mb-8 text-white'>
						Find Us
					</h2>

					<div
						className='relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer'
						onClick={() => {
							window.open("https://maps.google.com", "_blank"); // Замінено ліве посилання на чистий редірект
						}}
					>
						{/* Замінено img на Next Image */}
						<Image
							src='https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200' // Тимчасове естетичне фото замість плейсхолдера карт
							alt='Cafe Location Map View'
							fill
							sizes='100vw'
							className='object-cover transition-transform duration-500 hover:scale-[1.03]'
						/>
					</div>

					{/* CTA Button below map */}
					<div className='mt-8'>
						<DynamicGradientButton
							onClick={() => onNavigate("contact")}
							theme={theme}
						>
							View Full Map & Contact Info
						</DynamicGradientButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
