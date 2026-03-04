type StorySectionProps = {
  number: string
  title: string
  children: React.ReactNode
  className?: string
  /** Use for first section (stronger number/line); default for rest */
  highlight?: boolean
}

export function StorySection({
  number,
  title,
  children,
  className = 'story-section group',
  highlight = false,
}: StorySectionProps) {
  const numberOpacity = highlight ? 'opacity-70' : 'opacity-40'
  const lineBg = highlight ? 'bg-foreground/30' : 'bg-foreground/10'

  return (
    <section data-story-section className={className}>
      <div className="flex items-center gap-4 mb-6">
        <span
          className={`text-sm font-mono ${numberOpacity} tracking-widest`}
        >
          {number}
        </span>
        <div className={`flex-1 h-px ${lineBg}`} />
      </div>
      <h2 className="font-rouge text-4xl mb-6 tracking-wide font-medium group-hover:opacity-100 transition-opacity duration-300">
        {title}
      </h2>
      <div className="text-sm leading-relaxed opacity-90 text-balance group-hover:opacity-100 transition-opacity duration-300">
        {children}
      </div>
    </section>
  )
}
