// src/pages/CocktailsPage.tsx
import React from "react";
import { DrinkItem } from "@/types";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { Theme, FeatureItem, Page } from "@/types";

interface CocktailsPageProps {
	theme: Theme;
	onNavigate: (page: Page) => void; // Змінили string на Page
}

// Helper function to generate the cocktail item array, using theme context
const getCocktailItems = (theme: Theme): DrinkItem[] => [
	{
		id: 1,
		name: "Espresso Martini",
		desc: "Premium vodka, fresh espresso, homemade coffee liqueur.",
		image:
			"https://images.unsplash.com/photo-1625904835711-098863f68d37?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 2,
		name: "Classic Negroni",
		desc: "Artisanal gin, sweet vermouth, Campari, fresh orange peel.",
		image:
			"https://images.unsplash.com/photo-1568644396922-5c3bfae12521?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 3,
		name: "Smoked Old Fashioned",
		desc: "Double oak bourbon, bitters, sugar, smoked cedar wood.",
		image:
			"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 4,
		name: "Aperol Spritz",
		desc: "Prosecco, Aperol, splash of soda, slice of blood orange.",
		image:
			"https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 5,
		name: "Craft Margarita",
		desc: "Pure blue agave tequila, fresh key lime juice, organic agave nectar.",
		image:
			"https://images.unsplash.com/photo-1574653816568-7c8585ea150c?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: 6,
		name: "Whiskey Sour",
		desc: "Bourbon, fresh lemon, organic egg white, classic angostura mist.",
		image:
			"https://images.unsplash.com/photo-1605338161966-2244246961ea?auto=format&fit=crop&q=80&w=400",
	},
];

const CocktailsPage: React.FC<CocktailsPageProps> = ({ theme, onNavigate }) => {
	// Generate data using the theme context
	const cocktails = getCocktailItems(theme);

	return (
		<div className='pt-32 pb-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header Section */}
				<div className='text-center mb-16'>
					<span
						className={`${theme.accent} font-semibold tracking-wider uppercase text-sm`}
					>
						Evening Menu
					</span>
					<h1 className='text-5xl font-bold mt-4 mb-6'>Signature Cocktails</h1>
					<p className='text-gray-400 max-w-2xl mx-auto'>
						Sophisticated evening cocktails featuring premium clean spirits and
						hand-squeezed pure juices.
					</p>
				</div>

				{/* Grid Layout */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{cocktails.map((drink) => (
						// Pass theme down to the card component
						<DynamicGradientCard key={drink.id} theme={theme}>
							<div className='relative h-64 rounded-[inherit] overflow-hidden mb-6'>
								{/* Use Next/Image for optimization */}
								<img
									src={drink.image}
									alt={drink.name}
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
								/>
								{/* Gradient overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
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

export default CocktailsPage;
