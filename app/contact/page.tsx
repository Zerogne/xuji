'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

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

  return (
    <div className="bg-background text-foreground min-h-screen">
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
          <Link href="/contact" className="text-xs font-mono opacity-100">
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

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide font-semibold">Contact</h1>
          <p className="text-base tracking-widest font-light opacity-80">
            Let's connect
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono opacity-40 tracking-widest">01</span>
              <div className="w-24 h-px bg-foreground/10"></div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-xl mx-auto mb-12">
              Pick your preferred way to reach out. Let's make something happen.
            </p>
          </div>

          {/* Eye-catching animated element */}
          <div 
            className="relative mb-16"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative border-2 border-foreground/30 p-12 overflow-hidden group cursor-pointer">
              {/* Animated background effect */}
              <div 
                className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isHovering 
                    ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)`
                    : 'transparent'
                }}
              />
              
              {/* Pulsing border effect */}
              <div className="absolute inset-0 border-2 border-foreground/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative text-center space-y-4">
                <div className="text-4xl md:text-5xl font-rouge tracking-wide font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                  Let's Build Together
                </div>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="text-xs font-mono opacity-60 mt-4 group-hover:opacity-80 transition-opacity">
                  Hover to interact
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:k2naysaa@gmail.com"
              onMouseEnter={() => setHoveredCard('email')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative border-2 border-foreground/30 hover:border-foreground/60 p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 border-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ transform: hoveredCard === 'email' ? 'translate(4px, 4px)' : 'translate(0, 0)' }}></div>
              <div className="relative">
                <div className="text-xs font-mono opacity-60 mb-4 group-hover:opacity-100 transition-opacity">EMAIL</div>
                <div className="text-lg font-mono opacity-80 group-hover:opacity-100 transition-opacity mb-2">k2naysaa@gmail.com</div>
                <div className="text-xs font-mono opacity-40 group-hover:opacity-60 transition-opacity mt-4">Click to send</div>
              </div>
            </a>

            <a
              href="https://github.com/zerogne"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredCard('github')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative border-2 border-foreground/30 hover:border-foreground/60 p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 border-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ transform: hoveredCard === 'github' ? 'translate(4px, 4px)' : 'translate(0, 0)' }}></div>
              <div className="relative">
                <div className="text-xs font-mono opacity-60 mb-4 group-hover:opacity-100 transition-opacity">GITHUB</div>
                <div className="text-lg font-mono opacity-80 group-hover:opacity-100 transition-opacity mb-2">zerogne</div>
                <div className="text-xs font-mono opacity-40 group-hover:opacity-60 transition-opacity mt-4">View my code</div>
              </div>
            </a>

            <a
              href="https://instagram.com/xuji877"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredCard('instagram')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative border-2 border-foreground/30 hover:border-foreground/60 p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 border-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ transform: hoveredCard === 'instagram' ? 'translate(4px, 4px)' : 'translate(0, 0)' }}></div>
              <div className="relative">
                <div className="text-xs font-mono opacity-60 mb-4 group-hover:opacity-100 transition-opacity">INSTAGRAM</div>
                <div className="text-lg font-mono opacity-80 group-hover:opacity-100 transition-opacity mb-2">xuji877</div>
                <div className="text-xs font-mono opacity-40 group-hover:opacity-60 transition-opacity mt-4">Follow along</div>
              </div>
            </a>
          </div>

          <div className="pt-12 border-t border-foreground/30">
            <div className="text-center space-y-4">
              <div className="text-xs font-mono opacity-60">AVAILABLE FOR</div>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-80">
                <span className="px-4 py-2 border border-foreground/20">Freelance</span>
                <span className="px-4 py-2 border border-foreground/20">Collaborations</span>
                <span className="px-4 py-2 border border-foreground/20">Projects</span>
                <span className="px-4 py-2 border border-foreground/20">Consulting</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-6 py-20 border-t border-foreground/10">
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

