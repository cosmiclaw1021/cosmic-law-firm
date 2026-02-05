"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import type { SectionStarsSettings, DepthLayer } from "@src/config/parallaxStars.config";
import { parallaxStarsConfig, DEFAULT_SECTION_STARS_SETTINGS, LAYER_ORDER } from "@src/config/parallaxStars.config";
import { createParallaxMotion } from "@src/lib/gsap/parallax";

const STAR_SHAPE_ID = "parallax-star-point";

const clampDensity = (value?: number) => {
  if (typeof value !== "number") {
    return DEFAULT_SECTION_STARS_SETTINGS.density ?? 0.6;
  }
  return Math.min(1, Math.max(0, value));
};

const isDepthLayer = (value: string): value is DepthLayer => LAYER_ORDER.includes(value as DepthLayer);

interface ParallaxStarsProps {
  sectionRef: RefObject<HTMLElement>;
  settings: SectionStarsSettings;
  reducedMotion: boolean;
  className?: string;
  trigger?: HTMLElement | null;
}

const toPx = (value?: number) => (typeof value === "number" ? `${value}px` : undefined);

const buildLayerStars = (layer: DepthLayer, density: number) => {
  const allStars = parallaxStarsConfig.stars.filter((star) => star.layer === layer);
  const count = Math.floor(allStars.length * density);
  return allStars.slice(0, Math.max(0, count));
};

const ParallaxStars = ({ sectionRef, settings, reducedMotion, className = "", trigger }: ParallaxStarsProps) => {
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const nearLayerRef = useRef<HTMLDivElement>(null);

  const shouldAnimate = !reducedMotion && !settings.staticOnly;

  const density = clampDensity(settings.density);
  const preferredLayers =
    settings.enabledLayers ?? DEFAULT_SECTION_STARS_SETTINGS.enabledLayers ?? LAYER_ORDER;
  const preferredLayersKey = preferredLayers.join(',');
  const opacityScale = settings.opacityScale ?? DEFAULT_SECTION_STARS_SETTINGS.opacityScale ?? 1;
  const enabledLayers = useMemo(() => {
    const layers = preferredLayersKey ? preferredLayersKey.split(',') : [];
    const unique = Array.from(new Set(layers));
    return unique.filter(isDepthLayer);
  }, [preferredLayersKey]);

  const layerStars = useMemo(() => {
    return enabledLayers
      .map((layer) => ({
        layer,
        stars: buildLayerStars(layer, density),
      }))
      .filter((item) => item.stars.length > 0);
  }, [enabledLayers, density]);

  useEffect(() => {
    if (!shouldAnimate || !sectionRef.current || layerStars.length === 0) {
      return;
    }

    let cleanupFn: (() => void) | undefined;
    let observer: ResizeObserver | undefined;

    // Use a small timeout to ensure refs are fully populated and layout is stable
    const timer = setTimeout(() => {
      const currentSection = sectionRef.current;
      if (!currentSection) return;

      const motionLayers = layerStars
        .map((layer) => {
          const ref =
            layer.layer === "far"
              ? farLayerRef
              : layer.layer === "mid"
              ? midLayerRef
              : nearLayerRef;
          return {
            ref,
            config: parallaxStarsConfig.layers[layer.layer],
          };
        })
        .filter((entry) => entry.ref.current !== null);

      if (motionLayers.length === 0) {
        return;
      }

      cleanupFn = createParallaxMotion({
        section: currentSection,
        layers: motionLayers,
        scrollRange: settings.scrollRange,
        trigger: trigger || undefined,
      });

      // Refresh ScrollTrigger when section size changes (e.g. images loading)
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => {
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });
        });
        observer.observe(currentSection);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupFn) {
        cleanupFn();
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [shouldAnimate, sectionRef, layerStars, settings.scrollRange, trigger]);

  const containerStyle = {
    top: toPx(settings.verticalOffset?.top) ?? "0px",
    bottom: toPx(settings.verticalOffset?.bottom) ?? "0px",
  };

  if (layerStars.length === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={containerStyle}
    >
      <svg className="hidden" role="presentation">
        <defs>
          <symbol id={STAR_SHAPE_ID} viewBox="0 0 6 6">
            <path d="M3 0 L3.5 2.2 L6 2.7 L4.3 3.8 L4.9 6 L3 4.8 L1.1 6 L1.7 3.8 L0 2.7 L2.5 2.2 Z" />
          </symbol>
        </defs>
      </svg>

      {layerStars.map((layer) => {
        const ref =
          layer.layer === "far"
            ? farLayerRef
            : layer.layer === "mid"
            ? midLayerRef
            : nearLayerRef;
        const layerConfig = parallaxStarsConfig.layers[layer.layer];

        return (
          <div key={layer.layer} ref={ref} className="absolute inset-0" style={{ willChange: "transform" }}>
            {layer.stars.map((star) => (
              <svg
                key={star.id}
                role="presentation"
                width={12}
                height={12}
                className="absolute pointer-events-none"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: (star.opacity ?? layerConfig.opacity) * 0.5 * opacityScale,
                }}
              >
                <use href={`#${STAR_SHAPE_ID}`} fill={layerConfig.color} />
              </svg>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxStars;
