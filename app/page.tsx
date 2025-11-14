'use client'

import { useEffect } from 'react'

export default function Home() {
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

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-12">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-tighter animate-crack">
            Xuji
          </h1>
          <p className="text-xl tracking-widest font-light opacity-80">
            scroll down
          </p>
          
          {/* Animated scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-0.5 h-12 bg-foreground/30 animate-pulse"></div>
            <div className="text-sm opacity-40 tracking-tight">—</div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <main className="max-w-2xl mx-auto px-6 py-20 space-y-24">
        
        {/* Who I Am */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">1 — Who I Am</h2>
          <p className="text-lg leading-relaxed opacity-80 text-balance">
            My name is Xuji, a student-developer who grew up obsessed with making things work, look clean, and feel alive. I'm part of a small but hungry team called XP Digital, where we build websites, brands, and digital experiences with the type of ambition that feels way bigger than our age. My world mixes code, design, and creativity — three things I never learned from textbooks, but from pure curiosity and hours of experimenting.
          </p>
        </section>

        {/* How I Started */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">2 — How I Started</h2>
          <p className="text-lg leading-relaxed opacity-80 text-balance">
            I didn't begin with "big dreams of tech." I started with small builds. Random experiments. Frustrated debugging sessions at 2AM. Posting things online even when I didn't know if anyone would care. What pushed me forward was simple: the idea that one project can change someone's life — or even my own. Over time, that turned into real projects. Client sites. Landing pages. Dashboards. And eventually, fully functional products built with Next.js, TypeScript, MongoDB, Cloudinary, Bunny, BYL/QPay, and whatever else the project demanded. I wasn't born into this. I built myself into it.
          </p>
        </section>

        {/* What I Do Now */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">3 — What I Do Now</h2>
          <div className="text-lg leading-relaxed opacity-80 text-balance space-y-4">
            <p>
              Right now, my lane is full-stack web development mixed with design, but with a twist — almost everything I create leans into AI-powered workflows, automation, speed, and modern aesthetics.
            </p>
            <div>
              <p className="mb-3 opacity-90">I build:</p>
              <ul className="space-y-2 ml-4">
                <li>— Clean, responsive Next.js websites</li>
                <li>— Minimalistic, modern landing pages</li>
                <li>— Admin dashboards and payment integrations</li>
                <li>— AI-assisted content systems</li>
                <li>— Brand-consistent UI/UX with Tailwind + ShadCN</li>
              </ul>
            </div>
            <p>
              Outside XP Digital, I work on multiple personal projects: Sunrise Mongolia, Win Academy, Han Education, New Era, Sengee (Dow Mastery Academy), ByteHub, Hootwear, CozyCart, TellU, Danny-OS, and more — each one sharpening a new part of who I am.
            </p>
            <p>
              I'm not just learning tech. I'm shaping a future where tech lets me build things faster, smoother, and smarter.
            </p>
          </div>
        </section>

        {/* My Vision */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">4 — My Vision</h2>
          <p className="text-lg leading-relaxed opacity-80 text-balance">
            My goal is simple: To master everything I touch — code, design, products, even storytelling — and to build projects that outlive me. I want to work on open-source systems, build tools people actually use, and create digital experiences that feel effortless. I want to grow XP Digital into a global-ready creative team. And I want to keep pushing until my skills match the vision in my head. This journey isn't about becoming "good enough." It's about becoming undeniable.
          </p>
        </section>

        {/* Where I'm Going */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">5 — Where I'm Going</h2>
          <p className="text-lg leading-relaxed opacity-80 text-balance">
            In the near future, I'm stepping into university life at QUT (Mechanical Engineering) while building my dev career in parallel. I'm aiming for opportunities in software, AI, and open-source — places where I can contribute, learn, and evolve fast. I'm also leveling up my portfolio, my coding skills, my content creation, and my businesses — because my dream isn't just to get a job. It's to become a builder who can step into any field and leave a footprint. Every project I finish, every bug I fix, every design I refine — it's all part of the same story. A story I'm still writing.
          </p>
        </section>

        {/* Closing */}
        <section
          data-story-section
          className="story-section"
        >
          <h2 className="font-rouge text-5xl mb-8 tracking-tight">6 — Closing Line</h2>
          <p className="text-lg leading-relaxed opacity-80 text-balance">
            This is me — Xuji. A learner, a builder, a creator. Still at the beginning, but pushing like I'm already halfway there.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-6 py-20 text-center border-t border-foreground/10">
        <p className="text-sm opacity-60">
          Portfolio of Xuji — built with code and vision.
        </p>
      </footer>
    </div>
  )
}
