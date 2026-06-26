import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?/><';

export function useTextScramble(text: string, speed = 32) {
  const [display, setDisplay] = useState('');
  const [isDone, setIsDone] = useState(false);
  const iterRef = useRef(0);

  useEffect(() => {
    iterRef.current = 0;
    setIsDone(false);
    setDisplay('');

    const chars = text.split('');
    const tick = setInterval(() => {
      const iter = iterRef.current;
      setDisplay(
        chars.map((char, i) => {
          if (char === '\n') return char;
          if (char === ' ') return ' ';
          if (i < Math.floor(iter)) return chars[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iterRef.current += 0.45;
      if (iter >= text.length) {
        setDisplay(text);
        setIsDone(true);
        clearInterval(tick);
      }
    }, speed);

    return () => clearInterval(tick);
  }, [text, speed]);

  return { display, isDone };
}
