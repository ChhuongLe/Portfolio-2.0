import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudy from "./ProjectCaseStudy";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="bg-ink-raised px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-ivory">
            Projects
          </h2>
        </Reveal>
        <div className="mt-6">
          {projects.map((project, index) =>
            project.featured ? (
              <ProjectCaseStudy
                key={project.title}
                project={project}
                delay={index * 60}
              />
            ) : (
              <ProjectCard
                key={project.title}
                project={project}
                delay={index * 60}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
