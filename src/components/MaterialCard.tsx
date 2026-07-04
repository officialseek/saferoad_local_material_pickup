import { useSignImage } from '../hooks/useSignImage'
import type { Material } from '../types/material'

interface MaterialCardProps {
  material: Material
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function MaterialCard({ material, quantity, onQuantityChange }: MaterialCardProps) {
  const imageUrl = useSignImage(material.id)
  const decrement = () => onQuantityChange(Math.max(0, quantity - 1))
  const increment = () => onQuantityChange(quantity + 1)
  const isSelected = quantity > 0

  return (
    <article
      className={`flex h-full flex-col p-3 transition ${
        isSelected ? 'glass-panel-selected' : 'glass-panel'
      }`}
    >
      <div className="glass-inset mb-3 flex min-h-28 items-center justify-center p-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="max-h-24 w-full object-contain drop-shadow-sm"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-24 w-full items-center justify-center text-sm font-mono text-saferoad-charcoal-soft">
            {material.code}
          </div>
        )}
      </div>

      <div className="mb-3 min-h-0 flex-1 space-y-1">
        <span className="glass-badge">{material.code}</span>
        <p className="line-clamp-2 text-sm font-medium leading-snug text-saferoad-charcoal">
          {material.name}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-white/40 pt-3">
        <button
          type="button"
          onClick={decrement}
          className="glass-btn h-9 w-9 text-lg font-medium"
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
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-saferoad-yellow/90 text-lg font-bold text-saferoad-charcoal shadow-md shadow-saferoad-yellow/20 backdrop-blur-sm transition hover:bg-saferoad-yellow active:scale-95"
          aria-label={`Öka ${material.name}`}
        >
          +
        </button>
      </div>
    </article>
  )
}
