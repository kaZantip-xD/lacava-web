// src/pages/CoffeePage.tsx
import React from "react";
import { DrinkItem } from "@/types"; // Import the data model type
import Image from "next/image"; // ІМПОРТ КОМПОНЕНТА NEXT.JS
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Theme, FeatureItem, Page } from "@/types";

interface CoffeePageProps {
	theme: Theme;
	onNavigate: (page: Page) => void; // Змінили string на Page
}

// Helper function to generate the coffee item array, using theme context
const getCoffeeItems = (theme: Theme): DrinkItem[] => [
	{
		id: 1,
		name: "Espresso",
		desc: "Double shot of our rich single-origin espresso.",
		image:
			"https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 2,
		name: "Latte Macchiato",
		desc: "Velvety steamed milk with a rich espresso pour.",
		image:
			"https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 3,
		name: "Cold Brew",
		desc: "Slow-steeped for 18 hours, served over artisanal ice.",
		image:
			"https://images.unsplash.com/photo-1461023058943-0708e522b10a?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 4,
		name: "Cappuccino",
		desc: "Perfect harmony of espresso, steamed milk, and airy foam.",
		image:
			"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 5,
		name: "Flat White",
		desc: "Creamy micro-foam poured delicately over double-shot espresso.",
		image:
			"https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 6,
		name: "Pour Over V60",
		desc: "Locally hand-brewed coffee bringing out delicate floral tasting notes.",
		image:
			"https://images.unsplash.com/photo-1495474472204-518605ec2187?auto=format&fit=crop&q=80&w=400",
	},
];

const CoffeePage: React.FC<CoffeePageProps> = ({ theme, onNavigate }) => {
	// Generate data using the theme context
	const coffees = getCoffeeItems(theme);

	return (
		<div className='pt-32 pb-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header Section */}
				<div className='text-center mb-16'>
					<span
						className={`${theme.accent} font-semibold tracking-wider uppercase text-sm`}
					>
						Daytime Menu
					</span>
					<h1 className='text-5xl font-bold mt-4 mb-6'>Specialty Coffee</h1>
					<p className='text-gray-400 max-w-2xl mx-auto'>
						Sourced ethically, roasted with love, and engineered with precision.
					</p>
				</div>

				{/* Grid Layout */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{coffees.map((drink) => (
						// Pass theme down to the card component
						<DynamicGradientCard key={drink.id} theme={theme}>
							<div className='relative h-64 rounded-[inherit] overflow-hidden mb-6'>
								{/* Use Next/Image for optimization */}
								<Image
									src={drink.image}
									alt={drink.name}
									fill // Fill parent container
									sizes='(max-w-768px) 100vw, 50vw'
									className='object-cover group-hover:scale-105 transition-transform duration-700'
								/>
							</div>
							<div className='m-6'>
								<h3 className='text-2xl font-bold mb-2'>{drink.name}</h3>
								<p className='text-gray-400 text-sm leading-relaxed'>
									{drink.desc}
								</p>
							</div>
						</DynamicGradientCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoffeePage;
