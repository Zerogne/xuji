'use client'

import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll'

const SLIDE_TRACK_CLASS =
  'flex h-full flex-row will-change-transform'

type HorizontalStoryZoneProps = {
  children: React.ReactNode
  sectionCount: number
  scrollHeightVh?: number
  bufferVh?: number
}

export function HorizontalStoryZone({
  children,
  sectionCount,
  scrollHeightVh = 4,
  bufferVh = 2.5,
}: HorizontalStoryZoneProps) {
  const { translateXVw, zoneHeightVh } = useHorizontalScroll({
    scrollHeightVh,
    bufferVh,
    sectionCount,
  })

  return (
    <div
      className="relative"
      style={{ height: `${zoneHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div
          className={SLIDE_TRACK_CLASS}
          style={{
            width: `${sectionCount * 100}vw`,
            minWidth: `${sectionCount * 100}vw`,
            transform: `translate3d(${translateXVw}vw, 0, 0)`,
            transition: 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
