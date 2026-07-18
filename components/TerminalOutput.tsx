"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "IT Systems Engineer @ Neuralink",
  "Coffee Lover",
  "Cat dad of two furballs",
];

const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const HOLD_TIME = 1600;
const GAP_TIME = 400;

export default function TerminalOutput() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (!deleting) {
        charIndex++;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timeoutId = setTimeout(tick, HOLD_TIME);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          timeoutId = setTimeout(tick, GAP_TIME);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    };

    setText("");
    charIndex = 0;
    timeoutId = setTimeout(tick, TYPE_SPEED);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <p className="mt-2 min-h-[1.5em] text-ivory">
      {text}
      <span className="cursor-blink">_</span>
    </p>
  );
}
