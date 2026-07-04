interface ReporterFieldsProps {
  reporterName: string
  reporterPhone: string
  notes: string
  onReporterNameChange: (value: string) => void
  onReporterPhoneChange: (value: string) => void
  onNotesChange: (value: string) => void
}

export function ReporterFields({
  reporterName,
  reporterPhone,
  notes,
  onReporterNameChange,
  onReporterPhoneChange,
  onNotesChange,
}: ReporterFieldsProps) {
  return (
    <section className="glass-panel-strong space-y-4 p-4">
      <div>
        <h2 className="text-base font-semibold text-saferoad-charcoal">Dina uppgifter</h2>
        <p className="mt-1 text-sm text-saferoad-charcoal-soft">
          Behövs för bekräftelse och uppföljning.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-saferoad-charcoal">
            Namn <span className="text-saferoad-orange">*</span>
          </span>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => onReporterNameChange(e.target.value)}
            placeholder="För- och efternamn"
            className="glass-input"
            autoComplete="name"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-saferoad-charcoal">Telefon</span>
          <input
            type="tel"
            value={reporterPhone}
            onChange={(e) => onReporterPhoneChange(e.target.value)}
            placeholder="07X XXX XX XX"
            className="glass-input"
            autoComplete="tel"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-saferoad-charcoal">Anteckningar</span>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="T.ex. skador, avvikelser eller kompletterande info"
            rows={3}
            className="glass-input resize-none"
          />
        </label>
      </div>
    </section>
  )
}
