"use client";

import { useEffect, useState } from "react";

const isClient = typeof window !== "undefined";

const createMediaQueryList = (query: string) => (isClient ? window.matchMedia(query) : null);

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (!isClient) {
      return false;
    }
    const mediaQuery = window.matchMedia(query);
    return mediaQuery.matches;
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const mediaQuery = createMediaQueryList(query);
    if (!mediaQuery) {
      return;
    }

    const updateMatch = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatch();

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", updateMatch);
      return () => {
        mediaQuery.removeEventListener("change", updateMatch);
      };
    }

    mediaQuery.addListener(updateMatch);
    return () => {
      mediaQuery.removeListener(updateMatch);
    };
  }, [query]);

  return matches;
};

export const useMinWidth = (width: number) => useMediaQuery(`(min-width: ${width}px)`);
