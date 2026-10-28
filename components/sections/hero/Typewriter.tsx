"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterProps = {
  words: readonly string[];
  className?: string;
};

/**
 * Efek mesin tik untuk daftar peran.
 * Teks lengkap tetap tersedia untuk screen reader, dan reduced motion
 * menampilkan peran pertama tanpa animasi.
 */
export default function Typewriter({ words, className }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  const visibleText = reduceMotion ? (words[0] ?? "") : text;

  useEffect(() => {
    if (reduceMotion) return;

    const current = words[wordIndex % words.length] ?? "";
    let timeout = 0;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text.length === 0) {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      }, 280);
    } else {
      timeout = window.setTimeout(
        () => {
          setText(
            current.slice(0, text.length + (deleting ? -1 : 1)),
          );
        },
        deleting ? 32 : 68,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, reduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {visibleText}
        <span className="ml-0.5 inline-block h-[1.05em] w-[0.48ch] translate-y-[0.12em] animate-caret bg-accent motion-reduce:hidden" />
      </span>
    </span>
  );
}
