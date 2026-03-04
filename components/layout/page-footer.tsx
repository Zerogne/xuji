type PageFooterProps = {
  containerClassName?: string
  className?: string
}

const defaultContainer =
  'max-w-2xl mx-auto px-6 py-20 border-t border-foreground/30'
const defaultInner =
  'flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80'

export function PageFooter({
  containerClassName = defaultContainer,
  className = defaultInner,
}: PageFooterProps) {
  return (
    <footer className={containerClassName}>
      <div className={className}>
        <p className="hover:opacity-100 transition-opacity duration-200">
          Portfolio of Xuji — built with code and vision.
        </p>
        <div className="flex items-center gap-6 text-xs">
          <span className="font-mono opacity-70">2024</span>
          <div className="h-3 w-px bg-foreground/40" aria-hidden />
          <span className="font-mono opacity-70">Next.js</span>
        </div>
      </div>
    </footer>
  )
}
