import React, { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  // Initialize with empty string or scrambled text to prevent layout shift if needed
  // We'll initialize with non-breaking spaces to reserve width
  const [displayText, setDisplayText] = useState(text.replace(/./g, '\u00A0'));

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 4;
      }, 45);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}
