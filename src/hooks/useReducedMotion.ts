"use client";

import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_VIEWPORT_QUERY = "(max-width: 1023px)";
const TOUCH_DEVICE_QUERY = "(hover: none) and (pointer: coarse)";

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileViewportQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY);
    const touchDeviceQuery = window.matchMedia(TOUCH_DEVICE_QUERY);
    return reducedMotionQuery.matches || mobileViewportQuery.matches || touchDeviceQuery.matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileViewportQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY);
    const touchDeviceQuery = window.matchMedia(TOUCH_DEVICE_QUERY);
    const updatePreference = () => {
      setPrefersReducedMotion(
        reducedMotionQuery.matches || mobileViewportQuery.matches || touchDeviceQuery.matches
      );
    };

    updatePreference();
    reducedMotionQuery.addEventListener("change", updatePreference);
    mobileViewportQuery.addEventListener("change", updatePreference);
    touchDeviceQuery.addEventListener("change", updatePreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", updatePreference);
      mobileViewportQuery.removeEventListener("change", updatePreference);
      touchDeviceQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
};
