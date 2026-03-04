'use client'

import { useState, useEffect } from 'react'
import { PageLayout } from '@/components/layout'

export default function Contact() {
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

  const contactCards = [
    {
      id: 'email',
      label: 'EMAIL',
      value: 'k2naysaa@gmail.com',
      href: 'mailto:k2naysaa@gmail.com',
      sub: 'Click to send',
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'zerogne',
      href: 'https://github.com/zerogne',
      sub: 'View my code',
    },
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      value: 'xuji877',
      href: 'https://instagram.com/xuji877',
      sub: 'Follow along',
    },
  ]

  return (
    <PageLayout
      footerContainerClassName="max-w-2xl mx-auto px-6 py-20 border-t border-foreground/10"
      footerClassName="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60"
    >
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide font-semibold">
            Contact
          </h1>
          <p className="text-base tracking-widest font-light opacity-80">
            Let&apos;s connect
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono opacity-40 tracking-widest">
                01
              </span>
              <div className="w-24 h-px bg-foreground/10" />
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-xl mx-auto mb-12">
              Pick your preferred way to reach out. Let&apos;s make something
              happen.
            </p>
          </div>

          <div
            className="relative mb-16"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative border-2 border-foreground/30 p-12 overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    isHovering
                      ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)`
                      : 'transparent',
                }}
              />
              <div className="absolute inset-0 border-2 border-foreground/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative text-center space-y-4">
                <div className="text-4xl md:text-5xl font-rouge tracking-wide font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                  Let&apos;s Build Together
                </div>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="w-2 h-2 accent-bg rounded-full animate-pulse" />
                  <div
                    className="w-2 h-2 accent-bg rounded-full animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 accent-bg rounded-full animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
                <div className="text-xs font-mono opacity-60 mt-4 group-hover:opacity-80 transition-opacity">
                  Hover to interact
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card) => (
              <a
                key={card.id}
                href={card.href}
                target={card.id !== 'email' ? '_blank' : undefined}
                rel={card.id !== 'email' ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative border-2 border-foreground/30 hover:border-[oklch(0.60_0.18_25)] p-8 transition-all duration-300 hover:scale-105"
              >
                <div
                  className="absolute inset-0 border-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    transform:
                      hoveredCard === card.id
                        ? 'translate(4px, 4px)'
                        : 'translate(0, 0)',
                  }}
                />
                <div className="relative">
                  <div className="text-xs font-mono opacity-60 mb-4 group-hover:opacity-100 transition-opacity">
                    {card.label}
                  </div>
                  <div className="text-lg font-mono opacity-80 group-hover:opacity-100 transition-opacity mb-2">
                    {card.value}
                  </div>
                  <div className="text-xs font-mono opacity-40 group-hover:opacity-60 transition-opacity mt-4">
                    {card.sub}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-12 border-t border-foreground/30">
            <div className="text-center space-y-4">
              <div className="text-xs font-mono opacity-60">AVAILABLE FOR</div>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-mono opacity-80">
                {['Freelance', 'Collaborations', 'Projects', 'Consulting'].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-4 py-2 border border-foreground/20"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}
