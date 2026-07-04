import type { ReactNode } from 'react'
import saferoadLogo from '../assets/saferoad-logo.png'

interface LayoutProps {
  children: ReactNode
  subtitle?: string
}

export function Layout({ children, subtitle = 'Materialavhämtning' }: LayoutProps) {
  return (
    <div className="relative flex min-h-svh flex-col">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-saferoad-yellow/20 blur-3xl" />
        <div className="absolute -right-12 top-1/3 h-72 w-72 rounded-full bg-saferoad-forest/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-saferoad-steel/25 blur-3xl" />
      </div>

      <header className="glass-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-lg items-center gap-4 px-4 py-4">
          <img
            src={saferoadLogo}
            alt="Saferoad"
            className="h-8 w-auto max-w-[160px] object-contain object-left drop-shadow-sm"
          />
          <div className="min-w-0 border-l border-white/15 pl-4">
            <p className="truncate text-sm font-semibold text-saferoad-warm-white">{subtitle}</p>
            <p className="text-xs text-saferoad-steel/90">Trafiksäkerhet</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">{children}</main>

      <footer className="glass-footer">
        <div className="mx-auto max-w-lg px-4 py-4 text-center text-xs text-saferoad-charcoal-soft">
          <a
            href="https://www.saferoad-traffic.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-link"
          >
            saferoad-traffic.se
          </a>
        </div>
      </footer>
    </div>
  )
}
