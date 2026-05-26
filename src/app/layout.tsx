// src/app/layout.tsx
"use client"; // 1. ПЕРЕВЕЛИ В РЕЖИМ CLIENT COMPONENT (бо використовуємо useState)

import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { getTheme, NavLinks, Page, SITE_NAME, Theme } from "../types";
// ДОДАНО ІМПОРТ ІКОНОК:
import { Coffee, Globe, Share2 } from "lucide-react";

// Імпорти сторінок
import HomePage from "../pages/HomePage";
import CoffeePage from "../pages/CoffeePage";
import CocktailsPage from "../pages/CocktailsPage";
import MenuPage from "../pages/MenuPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

const inter = Inter({ subsets: ["latin"] }); // Ініціалізація шрифту

function RootLayout({ children }: { children: React.ReactNode }) {
	const [currentPage, setCurrentPage] = useState<Page>("home");
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

	// Навігація
	const handleNavigation = (page: Page): void => {
		if (page === currentPage) return;
		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentPage(page);
			window.scrollTo(0, 0);
			setIsTransitioning(false);
		}, 300);
	};

	const currentTheme: Theme = getTheme(currentPage);

	// Роутер свитч (виправлено одрук в handleNavigatsbion)
	const renderPage = (): React.ReactNode => {
		switch (currentPage) {
			case "home":
				return <HomePage theme={currentTheme} onNavigate={handleNavigation} />;
			case "coffee":
				return (
					<CoffeePage theme={currentTheme} onNavigate={handleNavigation} />
				);
			case "cocktails":
				return (
					<CocktailsPage theme={currentTheme} onNavigate={handleNavigation} />
				);
			case "menu":
				return <MenuPage theme={currentTheme} onNavigate={handleNavigation} />;
			case "about":
				return <AboutPage theme={currentTheme} onNavigate={handleNavigation} />;
			case "contact":
				return (
					<ContactPage theme={currentTheme} onNavigate={handleNavigation} />
				);
			default:
				return <HomePage theme={currentTheme} onNavigate={handleNavigation} />;
		}
	};

	return (
		<html lang='en'>
			{/* Додано inter.className для підключення шрифту */}
			<body
				suppressHydrationWarning
				className={`${inter.className} ${currentTheme.bg} text-white font-sans transition-colors duration-700 ease-in-out min-h-screen flex flex-col`}
			>
				{/* Navigation Bar */}
				<header
					className={`fixed w-full z-50 ${currentTheme.bg}/90 backdrop-blur-md border-b border-gray-800 transition-colors duration-700`}
				>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex justify-between items-center h-20'>
							{/* Logo */}
							<button
								onClick={() => handleNavigation("home")}
								className='flex items-center gap-2 cursor-pointer relative z-50'
							>
								<Coffee className='text-orange-500' size={32} />
								<span className='font-bold text-2xl tracking-tighter text-white'>
									{SITE_NAME}
									<span className='text-orange-500'>.</span>
								</span>
							</button>

							{/* Desktop Menu */}
							<div className='hidden md:flex items-center space-x-8'>
								{NavLinks.map((link) => (
									<button
										key={link.id}
										onClick={() => handleNavigation(link.id)}
										className={`text-sm transition-colors duration-200 ${
											currentPage === link.id
												? "text-white font-bold"
												: "text-gray-400 font-medium"
										} hover:text-white`}
									>
										{link.label}
									</button>
								))}
							</div>

							{/* Social Media */}
							<div className='hidden md:flex items-center space-x-6'>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors duration-200'
								>
									<Globe size={22} />
								</a>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors duration-200'
								>
									<Share2 size={22} />
								</a>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content Area */}
				{/* Виправлено незакритий тег <div> на початку секції */}
				<main
					className={`flex-grow transition-all duration-500 ease-in-out transform ${
						isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
					}`}
				>
					{renderPage()}
				</main>

				{/* Footer */}
				<footer className='bg-black/60 border-t border-gray-900 mt-auto'>
					<div className='flex justify-between py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<button
							onClick={() => handleNavigation("home")}
							className='gap-2 mb-6 cursor-pointer inline-flex'
						>
							<Coffee className='text-orange-500' size={28} />
							<span className='font-bold text-xl text-white'>
								la cava<span className='text-orange-500'>.</span>
							</span>
						</button>
						<p className='text-gray-500 text-sm self-center'>
							© 2026 Coff. All rights reserved. Designed with modern responsive
							principles.
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}

export default RootLayout;
