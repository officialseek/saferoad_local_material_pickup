import type { Material } from '../types/material'

interface MaterialRowProps {
  material: Material
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function MaterialRow({ material, quantity, onQuantityChange }: MaterialRowProps) {
  const decrement = () => onQuantityChange(Math.max(0, quantity - 1))
  const increment = () => onQuantityChange(quantity + 1)

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
        quantity > 0
          ? 'border-saferoad-yellow bg-saferoad-yellow-light/40'
          : 'border-saferoad-steel/80 bg-white'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded bg-saferoad-charcoal px-1.5 py-0.5 font-mono text-xs font-semibold text-saferoad-yellow">
            {material.code}
          </span>
          <p className="text-sm font-medium text-saferoad-charcoal">{material.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-saferoad-steel bg-saferoad-warm-white text-base font-medium text-saferoad-charcoal transition hover:bg-saferoad-sand"
          aria-label={`Minska ${material.name}`}
        >
          −
        </button>

        <div className="w-14 text-center">
          <span className="text-base font-semibold tabular-nums text-saferoad-charcoal">
            {quantity}
          </span>
          <span className="block text-[10px] text-saferoad-charcoal-soft">{material.unit}</span>
        </div>

        <button
          type="button"
          onClick={increment}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-saferoad-yellow text-base font-bold text-saferoad-charcoal transition hover:bg-saferoad-yellow-hover"
          aria-label={`Öka ${material.name}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
