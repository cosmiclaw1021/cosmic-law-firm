"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import type { ParallaxLayerMeta } from "@src/config/parallaxStars.config";

let pluginsRegistered = false;

const ensurePlugins = () => {
  if (pluginsRegistered) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
};

const getScrollRange = (section: HTMLElement, override?: number) => {
  if (typeof window === "undefined") {
    return Math.max(1, override ?? 0);
  }

  const measuredHeight = override ?? section.offsetHeight;
  const fallback = Math.max(1, measuredHeight || window.innerHeight);
  return fallback;
};

export interface LayerAnimationDefinition {
  ref: RefObject<HTMLDivElement>;
  config: ParallaxLayerMeta;
}

export interface ParallaxMotionOptions {
  section: HTMLElement;
  layers: LayerAnimationDefinition[];
  scrollRange?: number;
}

export const createParallaxMotion = (options: ParallaxMotionOptions) => {
  ensurePlugins();
  const { section, layers, scrollRange } = options;
  const cleanupTweens: gsap.core.Tween[] = [];

  if (!section) {
    return () => {};
  }

  const rangeResolver = () => getScrollRange(section, scrollRange);

  layers.forEach((layer) => {
    const element = layer.ref.current;
    if (!element) {
      return;
    }

    const tween = gsap.to(element, {
      y: () => -rangeResolver() * layer.config.speed,
      x: layer.config.horizontalDrift ?? 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: () => `+=${rangeResolver()}`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    cleanupTweens.push(tween);
  });

  return () => {
    cleanupTweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };
};
