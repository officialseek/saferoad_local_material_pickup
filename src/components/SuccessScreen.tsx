interface SuccessScreenProps {
  message: string
  onReset: () => void
}

export function SuccessScreen({ message, onReset }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-saferoad-yellow text-3xl font-bold text-saferoad-charcoal">
        ✓
      </div>
      <h1 className="mt-4 text-xl font-semibold text-saferoad-charcoal">Tack!</h1>
      <p className="mt-2 max-w-sm text-sm text-saferoad-charcoal-soft">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-lg border border-saferoad-steel bg-white px-5 py-2.5 text-sm font-medium text-saferoad-charcoal transition hover:bg-saferoad-sand"
      >
        Registrera ny avhämtning
      </button>
    </div>
  )
}
