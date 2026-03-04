'use client'

import { usePathname } from 'next/navigation'
import { useScrollProgress } from '@/hooks/use-scroll-progress'
import { PageFooter } from './page-footer'
import { ScrollProgress } from './scroll-progress'
import { SiteNav } from './site-nav'

type PageLayoutProps = {
  children: React.ReactNode
  footerContainerClassName?: string
  footerClassName?: string
}

export function PageLayout({
  children,
  footerContainerClassName,
  footerClassName,
}: PageLayoutProps) {
  const pathname = usePathname()
  const scrollProgress = useScrollProgress()

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteNav activePath={pathname ?? ''} />
      <ScrollProgress progress={scrollProgress} />
      {children}
      <PageFooter
        containerClassName={footerContainerClassName}
        className={footerClassName}
      />
    </div>
  )
}
