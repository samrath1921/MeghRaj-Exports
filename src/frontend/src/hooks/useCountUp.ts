import { useState, useEffect } from 'react';

export function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger || target === 0) return;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}
