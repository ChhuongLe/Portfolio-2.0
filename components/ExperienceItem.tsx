"use client";

import type { ExperienceEntry } from "@/data/experience";
import { useReveal } from "./useReveal";

export default function ExperienceItem({
  entry,
  delay = 0,
}: {
  entry: ExperienceEntry;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} flex flex-col gap-1 border-t border-hairline py-6 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <p className="text-ivory">
        {entry.role}
        {entry.company && <span className="text-muted"> — {entry.company}</span>}
      </p>
      <p className="whitespace-nowrap text-sm text-muted">
        {entry.start} – {entry.end}
      </p>
    </li>
  );
}
