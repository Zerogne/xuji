'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Projects() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Sunrise Mongolia',
      description: 'Educational platform focused on Mongolian culture and language learning.',
      tech: ['Next.js', 'TypeScript', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Win Academy',
      description: 'Learning management system with interactive courses and progress tracking.',
      tech: ['Next.js', 'Tailwind', 'ShadCN'],
    },
    {
      id: 3,
      title: 'HanEducation',
      description: 'Developer community platform for sharing code snippets and resources.',
      tech: ['Next.js', 'TypeScript', 'Cloudinary'],
    },
    {
      id: 4,
      title: 'NewEra',
      description: 'E-commerce platform with modern UI and seamless payment integration.',
      tech: ['Next.js', 'BYL/QPay', 'MongoDB'],
    },
    {
      id: 5,
      title: 'TellU',
      description: 'AI-powered content system for automated workflows and content generation.',
      tech: ['Next.js', 'AI Integration', 'Automation'],
    },
    {
      id: 6,
      title: 'Sengee',
      description: 'Custom operating system interface built with modern web technologies.',
      tech: ['Next.js', 'TypeScript', 'Custom UI'],
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-6 px-6 py-2 border border-foreground/30 bg-background/90 backdrop-blur-sm">
          <Link href="/" className="text-xs font-mono opacity-80 hover:opacity-100 transition-all duration-200 hover:text-[oklch(0.60_0.18_25)]">
            HOME
          </Link>
          <div className="h-3 w-px bg-foreground/40"></div>
          <Link href="/projects" className="text-xs font-mono opacity-100 text-[oklch(0.60_0.18_25)]">
            PROJECTS
          </Link>
          <div className="h-3 w-px bg-foreground/40"></div>
          <Link href="/contact" className="text-xs font-mono opacity-80 hover:opacity-100 transition-all duration-200 hover:text-[oklch(0.60_0.18_25)]">
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/15 z-50">
        <div 
          className="h-full accent-bg transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide font-semibold">Projects</h1>
          <p className="text-base tracking-widest font-light opacity-80">
            Things I've built
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-foreground/10 p-6 hover:border-foreground/30 transition-all duration-300 group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono opacity-40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-foreground/10"></div>
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

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-20 border-t border-foreground/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60">
          <p className="hover:opacity-100 transition-opacity duration-200">
            Portfolio of Xuji — built with code and vision.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <span className="font-mono opacity-50">2024</span>
            <div className="h-3 w-px bg-foreground/20"></div>
            <span className="font-mono opacity-50">Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

