'use client'

import { useEffect, useState } from 'react'

const DEFAULT_SCROLL_HEIGHT_VH = 4
const DEFAULT_BUFFER_VH = 2.5

type UseHorizontalScrollOptions = {
  /** Viewport heights of scroll that drive 0→1 progress */
  scrollHeightVh?: number
  /** Extra vh after progress=1 so last section stays visible before footer */
  bufferVh?: number
  /** Number of sections (used to compute translateX) */
  sectionCount?: number
}

export function useHorizontalScroll({
  scrollHeightVh = DEFAULT_SCROLL_HEIGHT_VH,
  bufferVh = DEFAULT_BUFFER_VH,
  sectionCount = 1,
}: UseHorizontalScrollOptions = {}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight: vh, scrollY } = window
      const triggerStart = vh
      const triggerEnd = vh + vh * scrollHeightVh
      if (scrollY <= triggerStart) {
        setProgress(0)
        return
      }
      if (scrollY >= triggerEnd) {
        setProgress(1)
        return
      }
      setProgress((scrollY - triggerStart) / (triggerEnd - triggerStart))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollHeightVh])

  const zoneHeightVh = (scrollHeightVh + bufferVh) * 100
  const translateXVw = -progress * (sectionCount - 1) * 100

  return { progress, translateXVw, zoneHeightVh }
}
