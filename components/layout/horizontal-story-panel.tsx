'use client'

const panelStyle = { width: '100vw', minWidth: '100vw' } as const
const panelClass =
  'flex-shrink-0 h-full flex items-center justify-center px-6 overflow-y-auto'
const contentClass = 'max-w-2xl w-full mx-auto py-8'

type HorizontalStoryPanelProps = {
  children: React.ReactNode
  /** First section uses story-section + data-visible; rest use horizontal-panel */
  isFirst?: boolean
}

export function HorizontalStoryPanel({
  children,
  isFirst = false,
}: HorizontalStoryPanelProps) {
  const Wrapper = isFirst ? 'section' : 'div'
  const visibilityClass = isFirst
    ? 'story-section'
    : 'horizontal-panel'

  return (
    <Wrapper
      data-story-section
      data-visible="true"
      className={`${visibilityClass} group ${panelClass}`}
      style={panelStyle}
    >
      <div className={contentClass}>{children}</div>
    </Wrapper>
  )
}
