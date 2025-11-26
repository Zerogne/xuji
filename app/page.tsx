'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PixelGame from '@/components/pixel-game'
import TechTimeline from '@/components/tech-timeline'
import SkillGrid from '@/components/skill-grid'
import GoalTracker from '@/components/goal-tracker'
import PathVisualizer from '@/components/path-visualizer'
import Typewriter from '@/components/typewriter'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-story-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

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
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-6 px-6 py-2 border border-foreground/30 bg-background/90 backdrop-blur-sm">
          <Link href="/" className="text-xs font-mono opacity-80 hover:opacity-100 transition-opacity duration-200">
            HOME
          </Link>
          <div className="h-3 w-px bg-foreground/40"></div>
          <Link href="/projects" className="text-xs font-mono opacity-80 hover:opacity-100 transition-opacity duration-200">
            PROJECTS
          </Link>
          <div className="h-3 w-px bg-foreground/40"></div>
          <Link href="/contact" className="text-xs font-mono opacity-80 hover:opacity-100 transition-opacity duration-200">
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/15 z-50">
        <div 
          className="h-full bg-foreground/50 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-12">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide animate-crack font-semibold">
            Xuji
          </h1>
          <p className="text-xl tracking-widest font-light opacity-90">
            scroll down
          </p>
          
          {/* Animated scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-0.5 h-12 bg-foreground/60 animate-pulse"></div>
            <div className="text-sm opacity-60 tracking-tight">—</div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <main className="max-w-2xl mx-auto px-6 py-20 space-y-16">
        
        {/* Who I Am */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-70 tracking-widest">01</span>
            <div className="flex-1 h-px bg-foreground/30"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">Who I Am</h2>
          <p className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300 mb-6">
            Student-developer at XP Digital. I build things that work, look clean, and feel alive. Code, design, creativity — learned through curiosity, not textbooks.
          </p>
          
          {/* Game Component */}
          <PixelGame />
        </section>

        {/* How I Started */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-40 tracking-widest">02</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">How I Started</h2>
          <p className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300 mb-6">
            Small builds. Random experiments. 2AM debugging sessions. One project at a time, I built myself into this.
          </p>
          
          {/* Tech Timeline */}
          <TechTimeline />
        </section>

        {/* What I Do Now */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-40 tracking-widest">03</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">What I Do Now</h2>
          <p className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300 mb-6">
            Full-stack development with design. AI-powered workflows, automation, modern aesthetics. Building faster, smoother, smarter.
          </p>
          
          {/* Skill Grid */}
          <SkillGrid />
        </section>

        {/* My Vision */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-40 tracking-widest">04</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">My Vision</h2>
          <p className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300 mb-6">
            Master everything I touch. Build projects that outlive me. Open-source. Tools people use. XP Digital global-ready. Not "good enough" — undeniable.
          </p>
          
          {/* Goal Tracker */}
          <GoalTracker />
        </section>

        {/* Where I'm Going */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-40 tracking-widest">05</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">Where I'm Going</h2>
          <p className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300 mb-6">
            QUT Mechanical Engineering. Building dev career in parallel. Software, AI, open-source. Becoming a builder who leaves footprints. Still writing the story.
          </p>
          
          {/* Path Visualizer */}
          <PathVisualizer />
        </section>

        {/* Closing */}
        <section
          data-story-section
          className="story-section group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono opacity-40 tracking-widest">06</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">Closing Line</h2>
          
          {/* Typewriter Effect */}
          <Typewriter />
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-6 py-20 border-t border-foreground/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <p className="hover:opacity-100 transition-opacity duration-200">
            Portfolio of Xuji — built with code and vision.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <span className="font-mono opacity-70">2024</span>
            <div className="h-3 w-px bg-foreground/40"></div>
            <span className="font-mono opacity-70">Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
