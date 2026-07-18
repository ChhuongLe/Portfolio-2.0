"use client";

import type { Project } from "@/data/projects";
import { useReveal } from "./useReveal";

export default function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  const content = (
    <>
      <h3 className="text-xl font-semibold tracking-tight text-ivory">
        {project.title}
      </h3>
      <p className="mt-3 text-muted">{project.description}</p>
      {project.tags && project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
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
    </>
  );

  if (project.href) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={project.href}
        style={style}
        className={`reveal ${visible ? "is-visible" : ""} block border-t border-hairline py-10 transition-opacity first:border-t-0 hover:opacity-80`}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      style={style}
      className={`reveal ${visible ? "is-visible" : ""} border-t border-hairline py-10 first:border-t-0`}
    >
      {content}
    </div>
  );
}
