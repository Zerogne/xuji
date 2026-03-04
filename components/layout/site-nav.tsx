'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/contact', label: 'CONTACT' },
] as const

const linkClass =
  'text-xs font-mono opacity-80 hover:opacity-100 transition-all duration-200 hover:accent-text'
const activeLinkClass = 'opacity-100 accent-text'

type SiteNavProps = {
  activePath?: string
}

export function SiteNav({ activePath = '' }: SiteNavProps) {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-6 px-6 py-2 border border-foreground/30 bg-background/90 backdrop-blur-sm">
        {navLinks.map(({ href, label }, i) => (
          <span key={href} className="flex items-center gap-6">
            <Link
              href={href}
              className={
                activePath === href ? `${linkClass} ${activeLinkClass}` : linkClass
              }
            >
              {label}
            </Link>
            {i < navLinks.length - 1 && (
              <div className="h-3 w-px bg-foreground/40" aria-hidden />
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
