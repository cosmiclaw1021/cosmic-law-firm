"use client";

import { useMemo, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { SectionStarsSettings } from "@src/config/parallaxStars.config";
import { DEFAULT_SECTION_STARS_SETTINGS } from "@src/config/parallaxStars.config";
import ParallaxStars from "@src/components/backgrounds/ParallaxStars";
import { useReducedMotion } from "@src/hooks/useReducedMotion";

interface SectionWithStarsProps extends HTMLAttributes<HTMLElement> {
  settings?: SectionStarsSettings;
  className?: string;
  overflow?: "hidden" | "visible";
  children: ReactNode;
  trigger?: HTMLElement | null;
}

const SectionWithStars = ({ settings, className = "", overflow = "hidden", children, trigger, ...rest }: SectionWithStarsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const enabledLayersKey = (settings?.enabledLayers ?? DEFAULT_SECTION_STARS_SETTINGS.enabledLayers ?? [])
    .join(',');
  const density = settings?.density;
  const scrollRange = settings?.scrollRange;
  const verticalOffsetTop = settings?.verticalOffset?.top;
  const verticalOffsetBottom = settings?.verticalOffset?.bottom;

  const mergedSettings = useMemo<SectionStarsSettings>(() => {
    const enabledLayers =
      settings?.enabledLayers ?? DEFAULT_SECTION_STARS_SETTINGS.enabledLayers;
    const verticalOffset = {
      ...DEFAULT_SECTION_STARS_SETTINGS.verticalOffset,
      ...settings?.verticalOffset,
    };

    return {
      ...DEFAULT_SECTION_STARS_SETTINGS,
      ...settings,
      enabledLayers,
      density: settings?.density ?? DEFAULT_SECTION_STARS_SETTINGS.density,
      verticalOffset,
    };
  }, [enabledLayersKey, density, scrollRange, verticalOffsetTop, verticalOffsetBottom]);

  const overflowClass = overflow === "visible" ? "overflow-visible" : "overflow-hidden";
  const isPositioned = /relative|absolute|fixed|sticky/.test(className);
  const positionClass = isPositioned ? "" : "relative";

  return (
    <section ref={sectionRef} className={`${positionClass} ${overflowClass} ${className}`} {...rest}>
      <ParallaxStars sectionRef={sectionRef} settings={mergedSettings} reducedMotion={prefersReducedMotion} trigger={trigger} />
      {children}
    </section>
  );
};

export default SectionWithStars;
