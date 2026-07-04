interface SuccessScreenProps {
  message: string
  onReset: () => void
}

export function SuccessScreen({ message, onReset }: SuccessScreenProps) {
  return (
    <div className="glass-panel-strong flex flex-col items-center p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-saferoad-yellow/50 bg-saferoad-yellow/35 text-3xl font-bold text-saferoad-charcoal shadow-lg shadow-saferoad-yellow/20 backdrop-blur-md">
        ✓
      </div>
      <h1 className="mt-4 text-xl font-semibold text-saferoad-charcoal">Tack!</h1>
      <p className="mt-2 max-w-sm text-sm text-saferoad-charcoal-soft">{message}</p>
      <button type="button" onClick={onReset} className="glass-btn mt-8 px-5 py-2.5 text-sm font-medium">
        Registrera ny avhämtning
      </button>
    </div>
  )
}
