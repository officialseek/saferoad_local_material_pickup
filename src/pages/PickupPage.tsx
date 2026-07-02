import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { MaterialSelector } from '../components/MaterialSelector'
import { PickupSummary } from '../components/PickupSummary'
import { ReporterFields } from '../components/ReporterFields'
import { SuccessScreen } from '../components/SuccessScreen'
import { getLocationById } from '../data/locations'
import { usePickupForm } from '../hooks/usePickupForm'
import { submitPickupReport } from '../services/pickupService'

export function PickupPage() {
  const { platsId } = useParams<{ platsId: string }>()
  const location = platsId ? getLocationById(platsId) : undefined

  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = usePickupForm({
    location: location ?? { id: platsId ?? '', name: 'Okänd plats' },
  })

  if (!platsId || !location) {
    return (
      <Layout>
        <div className="py-8 text-center">
          <h1 className="text-xl font-semibold text-saferoad-charcoal">Platsen hittades inte</h1>
          <p className="mt-2 text-sm text-saferoad-charcoal-soft">
            QR-koden verkar peka på en okänd plats. Kontrollera koden eller kontakta ansvarig.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block text-sm font-medium text-saferoad-forest underline decoration-saferoad-yellow decoration-2 underline-offset-2"
          >
            Till startsidan
          </Link>
        </div>
      </Layout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.canSubmit || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitPickupReport(form.buildReport())
      setSuccessMessage(result.message)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Något gick fel.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
    setSuccessMessage('')
    setError(null)
  }

  if (submitted) {
    return (
      <Layout subtitle={location.name}>
        <SuccessScreen message={successMessage} onReset={handleReset} />
      </Layout>
    )
  }

  return (
    <Layout subtitle={location.name}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-saferoad-forest">Plats</p>
          <h1 className="mt-1 text-2xl font-semibold text-saferoad-charcoal">{location.name}</h1>
          {location.address && (
            <p className="mt-1 text-sm text-saferoad-charcoal-soft">{location.address}</p>
          )}
        </div>

        <MaterialSelector quantities={form.quantities} onQuantityChange={form.setQuantity} />

        <ReporterFields
          reporterName={form.reporterName}
          reporterPhone={form.reporterPhone}
          notes={form.notes}
          onReporterNameChange={form.setReporterName}
          onReporterPhoneChange={form.setReporterPhone}
          onNotesChange={form.setNotes}
        />

        <PickupSummary items={form.selectedItems} />

        {error && (
          <p
            className="rounded-lg border border-saferoad-orange/30 bg-saferoad-orange/10 px-3 py-2 text-sm text-saferoad-charcoal"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!form.canSubmit || isSubmitting}
          className="w-full rounded-xl bg-saferoad-yellow px-4 py-3.5 text-sm font-bold text-saferoad-charcoal transition hover:bg-saferoad-yellow-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Skickar rapport…' : 'Skicka avhämtningsrapport'}
        </button>
      </form>
    </Layout>
  )
}
