"use client";

import type { Project } from "@/data/projects";
import { useReveal } from "./useReveal";

export default function ProjectCaseStudy({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? "is-visible" : ""} border-t border-hairline py-10 first:border-t-0`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Featured project
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ivory">
        {project.title}
      </h3>
      <p className="mt-3 text-muted">{project.description}</p>

      {project.diagram && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-hairline bg-ink-raised">
          <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-muted">architecture.txt</span>
          </div>
          <pre className="px-4 py-4 font-mono text-xs leading-relaxed text-ivory sm:text-sm">
            {project.diagram}
          </pre>
        </div>
      )}

      {project.problem && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Problem
          </p>
          <p className="mt-2 text-muted">{project.problem}</p>
        </div>
      )}

      {project.approach && project.approach.length > 0 && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Approach
          </p>
          <ul className="mt-2 space-y-2">
            {project.approach.map((step, index) => (
              <li key={index} className="flex gap-3 text-muted">
                <span className="text-accent">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.outcome && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Outcome
          </p>
          <p className="mt-2 text-ivory">{project.outcome}</p>
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <li
              key={`${tag}-${index}`}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
