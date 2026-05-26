import React from "react";
import { GradientButtonProps } from "@/types";
interface DynamicGradientButtonProps extends GradientButtonProps {
	theme: { gradFrom: string; gradTo: string };
}

const DynamicGradientButton: React.FC<DynamicGradientButtonProps> = ({
	children,
	onClick,
	active = false,
	className = "",
	theme,
}) => (
	<button
		onClick={onClick}
		className={`group relative rounded-full p-[1px] transition-all transform hover:scale-105 w-full sm:w-auto ${className}`}
	>
		<div
			className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.gradFrom} ${theme.gradTo} ${active ? "opacity-100" : "opacity-40 group-hover:opacity-100"} transition-opacity duration-300`}
		></div>
		<div
			className={`relative h-full w-full rounded-[inherit] px-8 py-4 font-bold text-lg flex items-center justify-center ${active ? "bg-black/40 text-white" : "bg-black/90 text-gray-300 group-hover:text-white"} backdrop-blur-sm transition-colors`}
		>
			{children}
		</div>
	</button>
);

export default DynamicGradientButton;
