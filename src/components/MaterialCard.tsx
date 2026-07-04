import type { Material } from '../types/material'

interface MaterialCardProps {
  material: Material
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function MaterialCard({ material, quantity, onQuantityChange }: MaterialCardProps) {
  const decrement = () => onQuantityChange(Math.max(0, quantity - 1))
  const increment = () => onQuantityChange(quantity + 1)
  const isSelected = quantity > 0

  return (
    <article
      className={`flex h-full flex-col rounded-xl border p-3 transition ${
        isSelected
          ? 'border-saferoad-yellow bg-saferoad-yellow-light/30 shadow-sm'
          : 'border-saferoad-steel/80 bg-white'
      }`}
    >
      <div className="mb-3 flex min-h-28 items-center justify-center rounded-lg border border-saferoad-steel/50 bg-saferoad-warm-white p-3">
        {material.imageUrl ? (
          <img
            src={material.imageUrl}
            alt=""
            className="max-h-24 w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-24 w-full items-center justify-center text-sm font-mono text-saferoad-charcoal-soft">
            {material.code}
          </div>
        )}
      </div>

      <div className="mb-3 min-h-0 flex-1 space-y-1">
        <span className="inline-block rounded bg-saferoad-charcoal px-1.5 py-0.5 font-mono text-xs font-semibold text-saferoad-yellow">
          {material.code}
        </span>
        <p className="line-clamp-2 text-sm font-medium leading-snug text-saferoad-charcoal">
          {material.name}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-saferoad-steel/40 pt-3">
        <button
          type="button"
          onClick={decrement}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-saferoad-steel bg-saferoad-warm-white text-lg font-medium text-saferoad-charcoal transition hover:bg-saferoad-sand"
          aria-label={`Minska ${material.name}`}
        >
          −
        </button>

        <div className="text-center">
          <span className="text-lg font-semibold tabular-nums text-saferoad-charcoal">{quantity}</span>
          <span className="block text-[10px] text-saferoad-charcoal-soft">{material.unit}</span>
        </div>

        <button
          type="button"
          onClick={increment}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-saferoad-yellow text-lg font-bold text-saferoad-charcoal transition hover:bg-saferoad-yellow-hover"
          aria-label={`Öka ${material.name}`}
        >
          +
        </button>
      </div>
    </article>
  )
}
