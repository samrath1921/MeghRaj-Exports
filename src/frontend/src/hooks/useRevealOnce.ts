import { useEffect, useRef, useState } from 'react';

export function useRevealOnce(threshold: number = 0.1) {
  const ref         = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasRevealed.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      hasRevealed.current = true;
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]); // isRevealed removed from deps — ref guards re-entry

  return { ref, isRevealed };
}
