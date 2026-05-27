import React from "react";
import { set } from "sanity";
import {
  Coffee, Wine, Beer, Utensils, CupSoda, Apple, Sandwich, IceCream,
  Pizza, Salad, Fish, Beef, CakeSlice, Egg, ChefHat, CookingPot,
  Martini, GlassWater, Milk, Grape, Citrus, Cherry, Popcorn, Thermometer,
  BottleWine,
} from "lucide-react";

const ICONS = [
  { name: "Utensils", component: Utensils },
  { name: "Coffee", component: Coffee },
  { name: "Wine", component: Wine },
  { name: "Beer", component: Beer },
  { name: "Martini", component: Martini },
  { name: "CupSoda", component: CupSoda },
  { name: "Thermometer", component: Thermometer },
  { name: "BottleWine", component: BottleWine },
  { name: "GlassWater", component: GlassWater },
  { name: "Milk", component: Milk },
  { name: "Apple", component: Apple },
  { name: "Grape", component: Grape },
  { name: "Citrus", component: Citrus },
  { name: "Cherry", component: Cherry },
  { name: "Sandwich", component: Sandwich },
  { name: "Pizza", component: Pizza },
  { name: "Salad", component: Salad },
  { name: "Fish", component: Fish },
  { name: "Beef", component: Beef },
  { name: "CakeSlice", component: CakeSlice },
  { name: "IceCream", component: IceCream },
  { name: "Egg", component: Egg },
  { name: "ChefHat", component: ChefHat },
  { name: "CookingPot", component: CookingPot },
  { name: "Popcorn", component: Popcorn },
];

export function IconPicker(props: any) {
  const { value, onChange } = props;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "8px 0" }}>
      {ICONS.map(({ name, component: Icon }) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(set(name))}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "10px 6px",
            width: 80,
            border: value === name ? "2px solid #2276FC" : "1px solid #e0e0e0",
            borderRadius: 8,
            cursor: "pointer",
            background: value === name ? "#EBF2FF" : "#fff",
            color: "#333",
            fontSize: 11,
            fontFamily: "sans-serif",
            transition: "all 0.15s",
          }}
        >
          <Icon size={28} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}