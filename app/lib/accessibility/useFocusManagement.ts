import { useEffect, useRef, useCallback, type RefObject } from 'react';
import { A11Y_CONFIG } from './a11yConfig';

type FocusTrapOptions = {
  /**
   * When true, focuses the first focusable element inside the trap on activation.
   * This is desirable for modals but can cause jank on iOS for lightweight menus.
   */
  autoFocus?: boolean;
};

/**
 * Hook to trap focus within an element (e.g., for modals)
 */
export const useFocusTrap = (isActive: boolean, options?: FocusTrapOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoFocus = options?.autoFocus ?? true;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive || !containerRef.current || e.key !== 'Tab') return;

    const focusableElements = containerRef.current.querySelectorAll(A11Y_CONFIG.FOCUSABLE_ELEMENTS);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
      if (autoFocus) {
        const focusableElements = containerRef.current?.querySelectorAll(A11Y_CONFIG.FOCUSABLE_ELEMENTS);
        if (focusableElements && focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown, autoFocus]);

  return containerRef;
};

/**
 * Hook to restore focus to a previous element
 */
export const useFocusRestoration = (isActive: boolean) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      previousFocus.current = document.activeElement as HTMLElement;
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isActive]);
};

/**
 * Hook to focus an element on mount
 */
export const useFocusOnMount = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
};
