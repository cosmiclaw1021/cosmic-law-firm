export type DepthLayer = "far" | "mid" | "near";

export interface ParallaxStarDefinition {
  id: string;
  layer: DepthLayer;
  x: number;
  y: number;
  opacity: number;
}

export interface VerticalOffsetBoundary {
  top?: number;
  bottom?: number;
}

export interface SectionStarsSettings {
  enabledLayers?: DepthLayer[];
  density?: number;
  scrollRange?: number;
  staticOnly?: boolean;
  opacityScale?: number;
  verticalOffset?: VerticalOffsetBoundary;
}

export interface ParallaxLayerMeta {
  speed: number;
  horizontalDrift: number;
  color: string;
  opacity: number;
}

export interface ParallaxStarsConfig {
  layers: Record<DepthLayer, ParallaxLayerMeta>;
  stars: ParallaxStarDefinition[];
}

const farStars: ParallaxStarDefinition[] = [
  { id: "far-01", layer: "far", x: 8, y: 10, opacity: 0.09 },
  { id: "far-02", layer: "far", x: 18, y: 22, opacity: 0.12 },
  { id: "far-03", layer: "far", x: 6, y: 44, opacity: 0.11 },
  { id: "far-04", layer: "far", x: 12, y: 76, opacity: 0.15 },
  { id: "far-05", layer: "far", x: 22, y: 88, opacity: 0.1 },
  { id: "far-06", layer: "far", x: 25, y: 58, opacity: 0.115 },
  { id: "far-07", layer: "far", x: 78, y: 12, opacity: 0.09 },
  { id: "far-08", layer: "far", x: 86, y: 26, opacity: 0.12 },
  { id: "far-09", layer: "far", x: 92, y: 58, opacity: 0.135 },
  { id: "far-10", layer: "far", x: 70, y: 84, opacity: 0.095 },
  { id: "far-11", layer: "far", x: 82, y: 72, opacity: 0.1 },
  { id: "far-12", layer: "far", x: 94, y: 88, opacity: 0.11 },
  { id: "far-13", layer: "far", x: 45, y: 15, opacity: 0.105 },
  { id: "far-14", layer: "far", x: 55, y: 35, opacity: 0.125 },
  { id: "far-15", layer: "far", x: 35, y: 65, opacity: 0.095 },
  { id: "far-16", layer: "far", x: 65, y: 85, opacity: 0.11 },
  { id: "far-17", layer: "far", x: 40, y: 50, opacity: 0.14 },
  { id: "far-18", layer: "far", x: 60, y: 20, opacity: 0.115 },
  { id: "far-19", layer: "far", x: 5, y: 95, opacity: 0.1 },
  { id: "far-20", layer: "far", x: 95, y: 5, opacity: 0.13 },
  { id: "far-21", layer: "far", x: 30, y: 10, opacity: 0.085 },
  { id: "far-22", layer: "far", x: 70, y: 40, opacity: 0.105 },
  { id: "far-23", layer: "far", x: 15, y: 60, opacity: 0.12 },
  { id: "far-24", layer: "far", x: 85, y: 80, opacity: 0.095 },
  { id: "far-25", layer: "far", x: 50, y: 5, opacity: 0.115 },
  { id: "far-26", layer: "far", x: 50, y: 95, opacity: 0.125 },
  { id: "far-27", layer: "far", x: 2, y: 50, opacity: 0.105 },
  { id: "far-28", layer: "far", x: 98, y: 50, opacity: 0.11 },
  { id: "far-29", layer: "far", x: 33, y: 33, opacity: 0.095 },
  { id: "far-30", layer: "far", x: 66, y: 66, opacity: 0.135 },
  { id: "far-31", layer: "far", x: 12, y: 12, opacity: 0.1 },
  { id: "far-32", layer: "far", x: 88, y: 88, opacity: 0.12 },
  { id: "far-33", layer: "far", x: 42, y: 78, opacity: 0.105 },
  { id: "far-34", layer: "far", x: 58, y: 22, opacity: 0.115 },
  { id: "far-35", layer: "far", x: 28, y: 42, opacity: 0.125 },
  { id: "far-36", layer: "far", x: 72, y: 58, opacity: 0.09 },
  { id: "far-37", layer: "far", x: 10, y: 30, opacity: 0.11 },
  { id: "far-38", layer: "far", x: 90, y: 70, opacity: 0.13 },
  { id: "far-39", layer: "far", x: 20, y: 15, opacity: 0.1 },
  { id: "far-40", layer: "far", x: 80, y: 85, opacity: 0.12 },
  { id: "far-41", layer: "far", x: 15, y: 25, opacity: 0.095 },
  { id: "far-42", layer: "far", x: 85, y: 75, opacity: 0.105 },
  { id: "far-43", layer: "far", x: 25, y: 35, opacity: 0.115 },
  { id: "far-44", layer: "far", x: 75, y: 65, opacity: 0.09 },
  { id: "far-45", layer: "far", x: 35, y: 45, opacity: 0.125 },
  { id: "far-46", layer: "far", x: 65, y: 55, opacity: 0.11 },
  { id: "far-47", layer: "far", x: 45, y: 55, opacity: 0.1 },
  { id: "far-48", layer: "far", x: 55, y: 45, opacity: 0.12 },
  { id: "far-49", layer: "far", x: 5, y: 5, opacity: 0.085 },
  { id: "far-50", layer: "far", x: 95, y: 95, opacity: 0.13 },
  { id: "far-51", layer: "far", x: 50, y: 50, opacity: 0.11 },
  { id: "far-52", layer: "far", x: 10, y: 90, opacity: 0.095 },
  { id: "far-53", layer: "far", x: 90, y: 10, opacity: 0.105 },
  { id: "far-54", layer: "far", x: 30, y: 70, opacity: 0.115 },
  { id: "far-55", layer: "far", x: 70, y: 30, opacity: 0.09 },
  { id: "far-56", layer: "far", x: 40, y: 80, opacity: 0.125 },
  { id: "far-57", layer: "far", x: 60, y: 20, opacity: 0.11 },
  { id: "far-58", layer: "far", x: 20, y: 60, opacity: 0.1 },
  { id: "far-59", layer: "far", x: 80, y: 40, opacity: 0.12 },
  { id: "far-60", layer: "far", x: 50, y: 15, opacity: 0.105 },
];

const midStars: ParallaxStarDefinition[] = [
  { id: "mid-01", layer: "mid", x: 12, y: 12, opacity: 0.14 },
  { id: "mid-02", layer: "mid", x: 26, y: 24, opacity: 0.16 },
  { id: "mid-03", layer: "mid", x: 16, y: 52, opacity: 0.135 },
  { id: "mid-04", layer: "mid", x: 20, y: 80, opacity: 0.15 },
  { id: "mid-05", layer: "mid", x: 28, y: 68, opacity: 0.13 },
  { id: "mid-06", layer: "mid", x: 75, y: 16, opacity: 0.15 },
  { id: "mid-07", layer: "mid", x: 82, y: 38, opacity: 0.145 },
  { id: "mid-08", layer: "mid", x: 90, y: 60, opacity: 0.135 },
  { id: "mid-09", layer: "mid", x: 72, y: 82, opacity: 0.16 },
  { id: "mid-10", layer: "mid", x: 88, y: 72, opacity: 0.14 },
  { id: "mid-11", layer: "mid", x: 94, y: 48, opacity: 0.15 },
  { id: "mid-12", layer: "mid", x: 84, y: 8, opacity: 0.175 },
  { id: "mid-13", layer: "mid", x: 14, y: 44, opacity: 0.125 },
  { id: "mid-14", layer: "mid", x: 24, y: 92, opacity: 0.13 },
  { id: "mid-15", layer: "mid", x: 40, y: 10, opacity: 0.155 },
  { id: "mid-16", layer: "mid", x: 60, y: 30, opacity: 0.145 },
  { id: "mid-17", layer: "mid", x: 30, y: 40, opacity: 0.165 },
  { id: "mid-18", layer: "mid", x: 70, y: 60, opacity: 0.14 },
  { id: "mid-19", layer: "mid", x: 50, y: 50, opacity: 0.175 },
  { id: "mid-20", layer: "mid", x: 10, y: 70, opacity: 0.15 },
  { id: "mid-21", layer: "mid", x: 90, y: 20, opacity: 0.16 },
  { id: "mid-22", layer: "mid", x: 35, y: 85, opacity: 0.135 },
  { id: "mid-23", layer: "mid", x: 65, y: 15, opacity: 0.155 },
  { id: "mid-24", layer: "mid", x: 45, y: 75, opacity: 0.145 },
  { id: "mid-25", layer: "mid", x: 55, y: 25, opacity: 0.17 },
  { id: "mid-26", layer: "mid", x: 5, y: 15, opacity: 0.14 },
  { id: "mid-27", layer: "mid", x: 95, y: 85, opacity: 0.15 },
  { id: "mid-28", layer: "mid", x: 15, y: 95, opacity: 0.165 },
  { id: "mid-29", layer: "mid", x: 85, y: 5, opacity: 0.135 },
  { id: "mid-30", layer: "mid", x: 22, y: 44, opacity: 0.155 },
  { id: "mid-31", layer: "mid", x: 78, y: 56, opacity: 0.145 },
  { id: "mid-32", layer: "mid", x: 38, y: 62, opacity: 0.16 },
  { id: "mid-33", layer: "mid", x: 62, y: 38, opacity: 0.175 },
  { id: "mid-34", layer: "mid", x: 48, y: 18, opacity: 0.14 },
  { id: "mid-35", layer: "mid", x: 52, y: 82, opacity: 0.15 },
  { id: "mid-36", layer: "mid", x: 18, y: 32, opacity: 0.165 },
  { id: "mid-37", layer: "mid", x: 82, y: 68, opacity: 0.135 },
  { id: "mid-38", layer: "mid", x: 28, y: 12, opacity: 0.155 },
  { id: "mid-39", layer: "mid", x: 72, y: 88, opacity: 0.145 },
  { id: "mid-40", layer: "mid", x: 50, y: 5, opacity: 0.17 },
  { id: "mid-41", layer: "mid", x: 15, y: 15, opacity: 0.14 },
  { id: "mid-42", layer: "mid", x: 85, y: 85, opacity: 0.15 },
  { id: "mid-43", layer: "mid", x: 25, y: 25, opacity: 0.165 },
  { id: "mid-44", layer: "mid", x: 75, y: 75, opacity: 0.135 },
  { id: "mid-45", layer: "mid", x: 35, y: 35, opacity: 0.155 },
  { id: "mid-46", layer: "mid", x: 65, y: 65, opacity: 0.145 },
  { id: "mid-47", layer: "mid", x: 45, y: 45, opacity: 0.16 },
  { id: "mid-48", layer: "mid", x: 55, y: 55, opacity: 0.175 },
  { id: "mid-49", layer: "mid", x: 10, y: 90, opacity: 0.14 },
  { id: "mid-50", layer: "mid", x: 90, y: 10, opacity: 0.15 },
  { id: "mid-51", layer: "mid", x: 20, y: 80, opacity: 0.165 },
  { id: "mid-52", layer: "mid", x: 80, y: 20, opacity: 0.135 },
  { id: "mid-53", layer: "mid", x: 30, y: 70, opacity: 0.155 },
  { id: "mid-54", layer: "mid", x: 70, y: 30, opacity: 0.145 },
  { id: "mid-55", layer: "mid", x: 40, y: 60, opacity: 0.16 },
  { id: "mid-56", layer: "mid", x: 60, y: 40, opacity: 0.175 },
  { id: "mid-57", layer: "mid", x: 5, y: 50, opacity: 0.14 },
  { id: "mid-58", layer: "mid", x: 95, y: 50, opacity: 0.15 },
  { id: "mid-59", layer: "mid", x: 50, y: 95, opacity: 0.165 },
  { id: "mid-60", layer: "mid", x: 50, y: 15, opacity: 0.135 },
];

const nearStars: ParallaxStarDefinition[] = [
  { id: "near-01", layer: "near", x: 8, y: 16, opacity: 0.21 },
  { id: "near-02", layer: "near", x: 22, y: 32, opacity: 0.2 },
  { id: "near-03", layer: "near", x: 16, y: 64, opacity: 0.19 },
  { id: "near-04", layer: "near", x: 26, y: 84, opacity: 0.2 },
  { id: "near-05", layer: "near", x: 82, y: 18, opacity: 0.225 },
  { id: "near-06", layer: "near", x: 88, y: 34, opacity: 0.215 },
  { id: "near-07", layer: "near", x: 92, y: 68, opacity: 0.205 },
  { id: "near-08", layer: "near", x: 70, y: 86, opacity: 0.19 },
  { id: "near-09", layer: "near", x: 76, y: 60, opacity: 0.195 },
  { id: "near-10", layer: "near", x: 94, y: 82, opacity: 0.22 },
  { id: "near-11", layer: "near", x: 84, y: 80, opacity: 0.185 },
  { id: "near-12", layer: "near", x: 90, y: 12, opacity: 0.2 },
  { id: "near-13", layer: "near", x: 72, y: 50, opacity: 0.19 },
  { id: "near-14", layer: "near", x: 8, y: 88, opacity: 0.18 },
  { id: "near-15", layer: "near", x: 45, y: 45, opacity: 0.23 },
  { id: "near-16", layer: "near", x: 55, y: 55, opacity: 0.21 },
  { id: "near-17", layer: "near", x: 35, y: 25, opacity: 0.22 },
  { id: "near-18", layer: "near", x: 65, y: 75, opacity: 0.2 },
  { id: "near-19", layer: "near", x: 15, y: 15, opacity: 0.24 },
  { id: "near-20", layer: "near", x: 85, y: 85, opacity: 0.215 },
  { id: "near-21", layer: "near", x: 50, y: 10, opacity: 0.225 },
  { id: "near-22", layer: "near", x: 50, y: 90, opacity: 0.205 },
  { id: "near-23", layer: "near", x: 10, y: 50, opacity: 0.235 },
  { id: "near-24", layer: "near", x: 90, y: 50, opacity: 0.21 },
  { id: "near-25", layer: "near", x: 30, y: 70, opacity: 0.22 },
  { id: "near-26", layer: "near", x: 70, y: 30, opacity: 0.2 },
  { id: "near-27", layer: "near", x: 20, y: 80, opacity: 0.23 },
  { id: "near-28", layer: "near", x: 80, y: 20, opacity: 0.215 },
  { id: "near-29", layer: "near", x: 40, y: 60, opacity: 0.225 },
  { id: "near-30", layer: "near", x: 60, y: 40, opacity: 0.205 },
  { id: "near-31", layer: "near", x: 5, y: 5, opacity: 0.24 },
  { id: "near-32", layer: "near", x: 95, y: 95, opacity: 0.21 },
  { id: "near-33", layer: "near", x: 15, y: 40, opacity: 0.22 },
  { id: "near-34", layer: "near", x: 85, y: 60, opacity: 0.2 },
  { id: "near-35", layer: "near", x: 25, y: 15, opacity: 0.235 },
  { id: "near-36", layer: "near", x: 75, y: 85, opacity: 0.21 },
  { id: "near-37", layer: "near", x: 35, y: 85, opacity: 0.225 },
  { id: "near-38", layer: "near", x: 65, y: 15, opacity: 0.205 },
  { id: "near-39", layer: "near", x: 45, y: 10, opacity: 0.23 },
  { id: "near-40", layer: "near", x: 55, y: 90, opacity: 0.215 },
  { id: "near-41", layer: "near", x: 12, y: 88, opacity: 0.21 },
  { id: "near-42", layer: "near", x: 88, y: 12, opacity: 0.2 },
  { id: "near-43", layer: "near", x: 32, y: 78, opacity: 0.19 },
  { id: "near-44", layer: "near", x: 68, y: 22, opacity: 0.2 },
  { id: "near-45", layer: "near", x: 18, y: 42, opacity: 0.225 },
  { id: "near-46", layer: "near", x: 82, y: 58, opacity: 0.215 },
  { id: "near-47", layer: "near", x: 42, y: 18, opacity: 0.205 },
  { id: "near-48", layer: "near", x: 58, y: 82, opacity: 0.19 },
  { id: "near-49", layer: "near", x: 28, y: 52, opacity: 0.195 },
  { id: "near-50", layer: "near", x: 72, y: 48, opacity: 0.22 },
  { id: "near-51", layer: "near", x: 38, y: 32, opacity: 0.185 },
  { id: "near-52", layer: "near", x: 62, y: 68, opacity: 0.2 },
  { id: "near-53", layer: "near", x: 48, y: 92, opacity: 0.19 },
  { id: "near-54", layer: "near", x: 52, y: 8, opacity: 0.18 },
  { id: "near-55", layer: "near", x: 5, y: 95, opacity: 0.23 },
  { id: "near-56", layer: "near", x: 95, y: 5, opacity: 0.21 },
  { id: "near-57", layer: "near", x: 15, y: 85, opacity: 0.22 },
  { id: "near-58", layer: "near", x: 85, y: 15, opacity: 0.2 },
  { id: "near-59", layer: "near", x: 25, y: 75, opacity: 0.24 },
  { id: "near-60", layer: "near", x: 75, y: 25, opacity: 0.215 },
];

export const parallaxStarsConfig: ParallaxStarsConfig = {
  layers: {
    far: {
      speed: 0.15,
      horizontalDrift: 1.8,
      color: "currentColor",
      opacity: 0.17,
    },
    mid: {
      speed: 0.35,
      horizontalDrift: 2.6,
      color: "currentColor",
      opacity: 0.22,
    },
    near: {
      speed: 0.6,
      horizontalDrift: 3.5,
      color: "currentColor",
      opacity: 0.3,
    },
  },
  stars: [...farStars, ...midStars, ...nearStars],
};

export const MAX_PARALLAX_STARS = parallaxStarsConfig.stars.length;

export const DEFAULT_SECTION_STARS_SETTINGS: SectionStarsSettings = {
  enabledLayers: ["far", "mid", "near"],
  density: 0.45,
  staticOnly: false,
  opacityScale: 1,
  verticalOffset: { top: 0, bottom: 0 },
};

export const LAYER_ORDER: DepthLayer[] = ["far", "mid", "near"];
