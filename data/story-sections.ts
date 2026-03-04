export type StorySectionItem = {
  number: string
  title: string
  body: string
  highlight?: boolean
}

export const storySections: StorySectionItem[] = [
  {
    number: '01',
    title: 'Who I Am',
    body: 'Student-developer at XP Digital. I build things that work, look clean, and feel alive. Code, design, creativity — learned through curiosity, not textbooks.',
    highlight: true,
  },
  {
    number: '02',
    title: 'How I Started',
    body: "Small builds. Random experiments. 2AM debugging sessions. One project at a time, I built myself into this.",
  },
  {
    number: '03',
    title: "What I Do Now",
    body: 'Full-stack development with design. AI-powered workflows, automation, modern aesthetics. Building faster, smoother, smarter.',
  },
  {
    number: '04',
    title: 'My Vision',
    body: 'Master everything I touch. Build projects that outlive me. Open-source. Tools people use. XP Digital global-ready. Not "good enough" — undeniable.',
  },
  {
    number: '05',
    title: "Where I'm Going",
    body: 'QUT Mechanical Engineering. Building dev career in parallel. Software, AI, open-source. Becoming a builder who leaves footprints. Still writing the story.',
  },
  {
    number: '06',
    title: 'Closing Line',
    body: 'A learner. A builder. A creator. Still beginning, pushing forward.',
  },
]
