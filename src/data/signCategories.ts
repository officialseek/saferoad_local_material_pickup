/** Kategorier enligt Transportstyrelsens vägmärkesindelning. */
export const signCategories = [
  { id: 'A', label: 'A. Varningsmärken', order: 1 },
  { id: 'B', label: 'B. Väjningspliktsmärken', order: 2 },
  { id: 'C', label: 'C. Förbudsmärken', order: 3 },
  { id: 'D', label: 'D. Påbudsmärken', order: 4 },
  { id: 'E', label: 'E. Anvisningsmärken', order: 5 },
  { id: 'M', label: 'M. Vägmarkeringar', order: 6 },
  { id: 'S', label: 'S. Symboler', order: 7 },
  { id: 'T', label: 'T. Tilläggstavlor', order: 8 },
  {
    id: 'X',
    label: 'X. Andra anordningar för anvisningar för trafiken',
    order: 9,
  },
] as const

export type SignCategoryId = (typeof signCategories)[number]['id']

export function getCategoryLabel(categoryId: SignCategoryId): string {
  return signCategories.find((category) => category.id === categoryId)?.label ?? categoryId
}

export function getCategoryOrder(categoryId: SignCategoryId): number {
  return signCategories.find((category) => category.id === categoryId)?.order ?? 999
}
