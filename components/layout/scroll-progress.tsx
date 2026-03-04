'use client'

type ScrollProgressProps = {
  progress: number
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/15 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full accent-bg transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
