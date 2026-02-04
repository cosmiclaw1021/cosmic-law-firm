'use client';

import React from 'react';

interface ProcessedTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text and processes citation markers (e.g., citeturnXsearchY)
 * replacing them with styled superscript indicators.
 */
export default function ProcessedText({ text, className }: ProcessedTextProps) {
  if (!text) return null;

  // Regex to find citation markers
  // These look like citeturnXsearchY...
  const citationRegex = /cite(?:turn\d+(?:search|news)\d+?)+/g;

  const parts = text.split(citationRegex);
  const matches = text.match(citationRegex) || [];

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {matches[i] && (
            <sup className="ml-0.5 px-1 rounded bg-primary/10 text-primary dark:text-primary-light text-[10px] font-bold select-none">
              REF
            </sup>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
