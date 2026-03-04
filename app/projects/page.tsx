'use client'

import { PageLayout } from '@/components/layout'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <PageLayout
      footerContainerClassName="max-w-4xl mx-auto px-6 py-20 border-t border-foreground/10"
      footerClassName="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60"
    >
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide font-semibold">
            Projects
          </h1>
          <p className="text-base tracking-widest font-light opacity-80">
            Things I&apos;ve built
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-foreground/10 p-6 hover:border-foreground/30 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono opacity-40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-foreground/10" />
              </div>
              <h3 className="font-rouge text-2xl mb-3 tracking-wide font-medium group-hover:opacity-90 transition-opacity duration-300">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-70 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 border border-foreground/10 opacity-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageLayout>
  )
}
