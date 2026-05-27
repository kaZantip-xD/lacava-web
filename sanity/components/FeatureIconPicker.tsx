import React from "react";
import { set } from "sanity";
import {
  Award, Star, Heart, ThumbsUp, Sparkles, Gem, Shield, Zap, Clock, Sun, MapPin, Gift,
} from "lucide-react";

const ICONS = [
  { name: "Award", component: Award },
  { name: "Star", component: Star },
  { name: "Heart", component: Heart },
  { name: "ThumbsUp", component: ThumbsUp },
  { name: "Sparkles", component: Sparkles },
  { name: "Gem", component: Gem },
  { name: "Shield", component: Shield },
  { name: "Zap", component: Zap },
  { name: "Clock", component: Clock },
  { name: "Sun", component: Sun },
  { name: "MapPin", component: MapPin },
  { name: "Gift", component: Gift },
];

export function FeatureIconPicker(props: any) {
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