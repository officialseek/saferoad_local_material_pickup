import { getCategoryLabel, getCategoryOrder } from './signCategories'
import { vagmarken } from './vagmarken'
import type { Material } from '../types/material'

/** Materialkatalog baserad på Transportstyrelsens vägmärken. */
export const materials: Material[] = vagmarken.map((sign) => ({
  id: sign.id,
  code: sign.code,
  name: sign.name,
  unit: sign.unit,
  category: getCategoryLabel(sign.categoryId),
  categoryOrder: getCategoryOrder(sign.categoryId),
}))

export function getMaterialById(id: string): Material | undefined {
  return materials.find((material) => material.id === id)
}

export function getMaterialByCode(code: string): Material | undefined {
  return materials.find((material) => material.code === code)
}
