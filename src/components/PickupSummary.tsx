import type { PickupLine } from '../types/material'

interface PickupSummaryProps {
  items: PickupLine[]
}

export function PickupSummary({ items }: PickupSummaryProps) {
  if (items.length === 0) return null

  return (
    <section className="glass-panel-accent p-4">
      <h2 className="text-sm font-semibold text-saferoad-forest">Sammanfattning</h2>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.materialId} className="flex justify-between gap-2 text-sm text-saferoad-charcoal">
            <span>
              <span className="font-mono text-xs text-saferoad-charcoal-soft">{item.materialCode}</span>{' '}
              {item.materialName}
            </span>
            <span className="shrink-0 font-medium tabular-nums">
              {item.quantity} {item.unit}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
