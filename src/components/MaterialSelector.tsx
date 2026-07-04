import { useEffect, useMemo, useState } from 'react'
import {
  featuredCategoryLabel,
  featuredCategoryOrder,
  featuredSignCodes,
} from '../data/featuredSigns'
import { materials } from '../data/materials'
import { MaterialCard } from './MaterialCard'

const PAGE_SIZE = 24

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

function CategorySection({
  group,
  defaultOpen,
  featured = false,
  quantities,
  onQuantityChange,
}: {
  group: CategoryGroup
  defaultOpen: boolean
  featured?: boolean
  quantities: Record<string, number>
  onQuantityChange: (materialId: string, quantity: number) => void
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [group.category, group.items.length])

  const visibleItems = group.items.slice(0, visibleCount)
  const remainingCount = group.items.length - visibleItems.length

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={featured ? 'group glass-panel-accent' : 'group glass-panel'}
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

      {open && (
        <div className="border-t border-white/35 px-3 py-3">
          <div className="grid grid-cols-2 gap-3">
            {visibleItems.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                quantity={quantities[material.id] ?? 0}
                onQuantityChange={(qty) => onQuantityChange(material.id, qty)}
              />
            ))}
          </div>

          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="glass-btn mt-3 w-full py-2.5 text-sm font-medium"
            >
              Visa fler ({remainingCount} kvar)
            </button>
          )}
        </div>
      )}
    </details>
  )
}

export function MaterialSelector({ quantities, onQuantityChange }: MaterialSelectorProps) {
  const [search, setSearch] = useState('')
  const query = normalizeSearch(search)

  const featuredGroup = useMemo<CategoryGroup | null>(() => {
    const items = featuredSignCodes
      .map((code) => materials.find((material) => material.code === code))
      .filter((material): material is (typeof materials)[number] => Boolean(material))
      .filter((material) => matchesSearch(material, query))

    if (items.length === 0) return null

    const selectedCount = items.filter((material) => (quantities[material.id] ?? 0) > 0).length

    return {
      category: featuredCategoryLabel,
      categoryOrder: featuredCategoryOrder,
      items,
      selectedCount,
    }
  }, [quantities, query])

  const featuredIds = useMemo(
    () => new Set(featuredGroup?.items.map((material) => material.id) ?? []),
    [featuredGroup],
  )

  const groups = useMemo<CategoryGroup[]>(() => {
    const map = new Map<string, CategoryGroup>()

    for (const material of materials) {
      if (featuredIds.has(material.id)) continue
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
  }, [featuredIds, quantities, query])

  const totalSelected = useMemo(
    () => Object.values(quantities).filter((qty) => qty > 0).length,
    [quantities],
  )

  const hasResults = featuredGroup !== null || groups.length > 0

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-saferoad-charcoal">Vad har hämtats?</h2>
        <p className="mt-1 text-sm text-saferoad-charcoal-soft">
          Börja med vanligaste skyltar eller sök i hela katalogen.
        </p>
      </div>

      <label className="block">
        <span className="sr-only">Sök vägmärke</span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök på kod eller namn, t.ex. A20 eller vägarbete"
          className="glass-input"
        />
      </label>

      {totalSelected > 0 && (
        <p className="glass-panel inline-block px-3 py-1.5 text-sm font-medium text-saferoad-forest">
          {totalSelected} {totalSelected === 1 ? 'märke valt' : 'märken valda'}
        </p>
      )}

      {!hasResults ? (
        <p className="glass-panel border-dashed p-6 text-center text-sm text-saferoad-charcoal-soft">
          Inga vägmärken matchar sökningen.
        </p>
      ) : (
        <div className="space-y-3">
          {featuredGroup && (
            <CategorySection
              group={featuredGroup}
              defaultOpen={query.length === 0 || featuredGroup.selectedCount > 0}
              featured
              quantities={quantities}
              onQuantityChange={onQuantityChange}
            />
          )}

          {groups.map((group) => (
            <CategorySection
              key={group.category}
              group={group}
              defaultOpen={query.length > 0 || group.selectedCount > 0}
              quantities={quantities}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      )}
    </section>
  )
}
