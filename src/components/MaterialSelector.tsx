import { useMemo, useState } from 'react'
import { materials } from '../data/materials'
import { MaterialRow } from './MaterialRow'

interface MaterialSelectorProps {
  quantities: Record<string, number>
  onQuantityChange: (materialId: string, quantity: number) => void
}

interface CategoryGroup {
  category: string
  categoryOrder: number
  items: typeof materials
  selectedCount: number
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase()
}

function matchesSearch(material: (typeof materials)[number], query: string): boolean {
  if (!query) return true
  return (
    material.code.toLowerCase().includes(query) ||
    material.name.toLowerCase().includes(query)
  )
}

export function MaterialSelector({ quantities, onQuantityChange }: MaterialSelectorProps) {
  const [search, setSearch] = useState('')
  const query = normalizeSearch(search)

  const groups = useMemo<CategoryGroup[]>(() => {
    const map = new Map<string, CategoryGroup>()

    for (const material of materials) {
      if (!matchesSearch(material, query)) continue

      const existing = map.get(material.category)
      const quantity = quantities[material.id] ?? 0

      if (existing) {
        existing.items.push(material)
        if (quantity > 0) existing.selectedCount += 1
      } else {
        map.set(material.category, {
          category: material.category,
          categoryOrder: material.categoryOrder,
          items: [material],
          selectedCount: quantity > 0 ? 1 : 0,
        })
      }
    }

    return [...map.values()].sort((a, b) => a.categoryOrder - b.categoryOrder)
  }, [quantities, query])

  const totalSelected = useMemo(
    () => Object.values(quantities).filter((qty) => qty > 0).length,
    [quantities],
  )

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-saferoad-charcoal">Vad har hämtats?</h2>
        <p className="mt-1 text-sm text-saferoad-charcoal-soft">
          Välj vägmärken och ange antal. Katalogen följer Transportstyrelsens indelning.
        </p>
      </div>

      <label className="block">
        <span className="sr-only">Sök vägmärke</span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök på kod eller namn, t.ex. A20 eller vägarbete"
          className="w-full rounded-lg border border-saferoad-steel bg-white px-3 py-2.5 text-sm text-saferoad-charcoal outline-none transition placeholder:text-saferoad-charcoal-soft/70 focus:border-saferoad-yellow focus:ring-2 focus:ring-saferoad-yellow/30"
        />
      </label>

      {totalSelected > 0 && (
        <p className="text-sm font-medium text-saferoad-forest">
          {totalSelected} {totalSelected === 1 ? 'märke valt' : 'märken valda'}
        </p>
      )}

      {groups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-saferoad-steel bg-white p-6 text-center text-sm text-saferoad-charcoal-soft">
          Inga vägmärken matchar sökningen.
        </p>
      ) : (
        <div className="space-y-2">
          {groups.map((group) => {
            const isOpen = query.length > 0 || group.selectedCount > 0

            return (
              <details
                key={group.category}
                open={isOpen}
                className="group rounded-xl border border-saferoad-steel/80 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 marker:content-none">
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-semibold text-saferoad-charcoal">{group.category}</p>
                    <p className="text-xs text-saferoad-charcoal-soft">
                      {group.items.length} märken
                      {group.selectedCount > 0 && ` · ${group.selectedCount} valda`}
                    </p>
                  </div>
                  <span className="shrink-0 text-saferoad-charcoal-soft transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>

                <div className="space-y-2 border-t border-saferoad-steel/50 px-3 py-3">
                  {group.items.map((material) => (
                    <MaterialRow
                      key={material.id}
                      material={material}
                      quantity={quantities[material.id] ?? 0}
                      onQuantityChange={(qty) => onQuantityChange(material.id, qty)}
                    />
                  ))}
                </div>
              </details>
            )
          })}
        </div>
      )}
    </section>
  )
}
