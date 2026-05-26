import { Utensils, Coffee, Wine, Beer, CupSoda, Apple, Sandwich, IceCream } from "lucide-react";
import { ReactNode } from "react";

export const iconMap: Record<string, (className: string) => ReactNode> = {
  Utensils: (className) => <Utensils className={className} />,
  Coffee: (className) => <Coffee className={className} />,
  Wine: (className) => <Wine className={className} />,
  Beer: (className) => <Beer className={className} />,
  CupSoda: (className) => <CupSoda className={className} />,
  Apple: (className) => <Apple className={className} />,
  Sandwich: (className) => <Sandwich className={className} />,
  IceCream: (className) => <IceCream className={className} />,
};