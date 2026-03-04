'use client'

import { storySections } from '@/data/story-sections'
import {
  HorizontalStoryPanel,
  HorizontalStoryZone,
  PageLayout,
  StorySection,
} from '@/components/layout'

export default function Home() {
  return (
    <PageLayout>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-12">
          <h1 className="text-6xl md:text-7xl font-rouge tracking-wide animate-crack font-semibold">
            Xuji
          </h1>
          <p className="text-xl tracking-widest font-light opacity-90">
            scroll down
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-0.5 h-12 bg-foreground/60 animate-pulse" />
            <div className="text-sm opacity-60 tracking-tight">—</div>
          </div>
        </div>
      </section>

      <HorizontalStoryZone
        sectionCount={storySections.length}
        scrollHeightVh={4}
        bufferVh={2.5}
      >
        {storySections.map((section, index) => (
          <HorizontalStoryPanel key={section.number} isFirst={index === 0}>
            <StorySection
              number={section.number}
              title={section.title}
              highlight={true}
            >
              <p className="mb-0">{section.body}</p>
            </StorySection>
          </HorizontalStoryPanel>
        ))}
      </HorizontalStoryZone>
    </PageLayout>
  )
}
