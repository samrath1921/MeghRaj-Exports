import { useEffect, useRef, useState } from 'react';

export function useStaggerReveal(staggerMs: number = 90, threshold: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasRevealed.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      hasRevealed.current = true;
      setIsRevealed(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      hasRevealed.current = true;
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          const children = Array.from(element.children) as HTMLElement[];
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * staggerMs}ms`;
          });
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [staggerMs, threshold]);

  return { ref, isRevealed };
}
