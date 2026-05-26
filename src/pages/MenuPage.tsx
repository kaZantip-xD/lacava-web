"use client";

import React from "react";
import { Utensils, Coffee } from "lucide-react";
import { Theme, Page } from "@/types";
import { t } from "@/lib/i18n";
import menuData from "@/data/menu.json";

interface MenuPageProps {
	theme: Theme;
	onNavigate: (page: Page) => void;
}

const iconMap: Record<string, (className: string) => React.ReactNode> = {
	Utensils: (className) => <Utensils className={className} />,
	Coffee: (className) => <Coffee className={className} />,
};

const MenuPage: React.FC<MenuPageProps> = ({ theme, onNavigate }) => {
	return (
		<div className='pt-32 pb-20'>
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h1 className='text-5xl font-bold mb-6'>{t(menuData.titleKey)}</h1>
					<p className='text-gray-400'>{t(menuData.subtitleKey)}</p>
				</div>

				<div className='grid md:grid-cols-2 gap-16'>
					{menuData.sections.map((section) => (
						<div key={section.id}>
							<div className='flex items-center gap-3 mb-8 pb-4 border-b border-emerald-900/50'>
								{iconMap[section.icon]?.(theme.accent)}
								<h2 className='text-3xl font-bold'>{t(section.titleKey)}</h2>
							</div>
							<ul className='space-y-6'>
								{section.items.map((item, idx) => {
									const basePath = `menu.sections.${section.id}.items.${idx}`;
									return (
										<li
											key={idx}
											className='relative rounded-xl p-4 -mx-4 transition-all duration-300 hover:bg-white/[0.03] active:bg-white/[0.03] cursor-default overflow-hidden group'
										>
											<div className='absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-transparent opacity-0 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-500 pointer-events-none' />
											<div className='relative z-10'>
												<div className='flex justify-between items-baseline mb-2'>
													<h3 className='text-xl font-semibold'>
														{t(`${basePath}.name`)}
													</h3>
													<div className='border-b border-dotted border-gray-700 flex-grow mx-4 relative top-[-4px]'></div>
													<span className={`${theme.accent} font-bold text-lg`}>
														{item.price}
													</span>
												</div>
												<p className='text-gray-400 text-sm'>
													{t(`${basePath}.desc`)}
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MenuPage;
