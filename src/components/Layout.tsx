import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  subtitle?: string
}

export function Layout({ children, subtitle = 'Materialavhämtning' }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b-2 border-saferoad-yellow bg-saferoad-charcoal">
        <div className="mx-auto flex max-w-lg items-center gap-4 px-4 py-4">
          <img
            src="/saferoad-logo.png"
            alt="Saferoad"
            className="h-8 w-auto max-w-[160px] object-contain object-left"
          />
          <div className="min-w-0 border-l border-saferoad-charcoal-soft pl-4">
            <p className="truncate text-sm font-semibold text-saferoad-warm-white">{subtitle}</p>
            <p className="text-xs text-saferoad-steel">Trafiksäkerhet</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">{children}</main>

      <footer className="border-t border-saferoad-steel/60 bg-saferoad-sand/50">
        <div className="mx-auto max-w-lg px-4 py-4 text-center text-xs text-saferoad-charcoal-soft">
          <a
            href="https://www.saferoad-traffic.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-saferoad-forest underline decoration-saferoad-yellow decoration-2 underline-offset-2"
          >
            saferoad-traffic.se
          </a>
        </div>
      </footer>
    </div>
  )
}
