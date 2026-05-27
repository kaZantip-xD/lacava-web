import React from "react";
import { GradientCardProps } from "@/types";

interface DynamicGradientCardProps extends GradientCardProps {
	theme: { gradFrom: string; gradTo: string };
}

const DynamicGradientCard: React.FC<DynamicGradientCardProps> = ({
	children,
	className = "",
	theme,
}) => (
	<div className='group relative rounded-3xl p-[1px] transition-all duration-300 active:scale-[0.98] hover:-translate-y-2 active:-translate-y-1 hover:shadow-2xl active:shadow-lg'>
		{/* Animated gradient border layer */}
		<div
			className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.gradFrom} ${theme.gradTo} opacity-30 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500`}
		></div>
		{/* Main content area */}
		<div
			className={`relative h-full w-full bg-[#110e0d]/90 backdrop-blur-md rounded-[inherit] overflow-hidden active:bg-[#1a1513]/90 transition-colors duration-300 ${className}`}
		>
			{children}
		</div>
	</div>
);

export default DynamicGradientCard;
