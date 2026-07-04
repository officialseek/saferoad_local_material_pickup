import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

export function HomePage() {
  return (
    <Layout>
      <div className="space-y-6 py-4">
        <div className="glass-panel-strong p-5">
          <h1 className="text-2xl font-semibold text-saferoad-charcoal">Materialavhämtning</h1>
          <p className="mt-2 text-sm leading-relaxed text-saferoad-charcoal-soft">
            Skanna QR-koden på platsen för att registrera avhämtade vägmärken. Rapporten skickas
            automatiskt så att teamet får direkt feedback på vad som hämtats.
          </p>
        </div>

        <div className="glass-panel p-5">
          <h2 className="text-sm font-semibold text-saferoad-charcoal">Så fungerar det</h2>
          <ol className="mt-3 space-y-2 text-sm text-saferoad-charcoal-soft">
            <li>1. Skanna QR-koden vid avhämtningsplatsen</li>
            <li>2. Ange vad som hämtats och dina kontaktuppgifter</li>
            <li>3. Skicka – bekräftelse går ut via e-post</li>
          </ol>
        </div>

        <p className="text-xs text-saferoad-charcoal-soft">
          Testa demoflödet:{' '}
          <Link to="/plats/demo" className="glass-link">
            TESTA DEMOFLÖDET HÄR
          </Link>
        </p>
      </div>
    </Layout>
  )
}
