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
}

const SectionWithStars = ({ settings, className = "", overflow = "hidden", children, ...rest }: SectionWithStarsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
  }, [settings]);

  const overflowClass = overflow === "visible" ? "overflow-visible" : "overflow-hidden";
  const isPositioned = /relative|absolute|fixed|sticky/.test(className);
  const positionClass = isPositioned ? "" : "relative";

  return (
    <section ref={sectionRef} className={`${positionClass} ${overflowClass} ${className}`} {...rest}>
      <ParallaxStars sectionRef={sectionRef} settings={mergedSettings} reducedMotion={prefersReducedMotion} />
      {children}
    </section>
  );
};

export default SectionWithStars;
