/** Kategorier enligt Transportstyrelsens vägmärkesindelning. */
export const signCategories = [
  { id: 'A', label: 'A. Varningsmärken', order: 1 },
  { id: 'B', label: 'B. Väjningspliktsmärken', order: 2 },
  { id: 'C', label: 'C. Förbudsmärken', order: 3 },
  { id: 'D', label: 'D. Påbudsmärken', order: 4 },
  { id: 'E', label: 'E. Anvisningsmärken', order: 5 },
  { id: 'F', label: 'F. Lokaliseringsmärken för vägvisning', order: 6 },
  {
    id: 'F_gc',
    label: 'F. Lokaliseringsmärken för vägvisning av gång- och cykeltrafik',
    order: 7,
  },
  {
    id: 'G',
    label: 'G. Lokaliseringsmärken för upplysning om allmänna inrättningar med mera',
    order: 8,
  },
  {
    id: 'H',
    label: 'H. Lokaliseringsmärken för upplysning om serviceanläggningar med mera',
    order: 9,
  },
  {
    id: 'I',
    label: 'I. Lokaliseringsmärken för turistiskt intressanta mål med mera',
    order: 10,
  },
  { id: 'J', label: 'J. Upplysningsmärken', order: 11 },
  { id: 'M', label: 'M. Vägmarkeringar', order: 12 },
  { id: 'P', label: 'P. Tecken av polisman med flera', order: 13 },
  { id: 'S', label: 'S. Symboler', order: 14 },
  { id: 'T', label: 'T. Tilläggstavlor', order: 15 },
  { id: 'SIG', label: 'SIG. Trafiksignaler', order: 16 },
  { id: 'V', label: 'V. Tecken av vakt', order: 17 },
  {
    id: 'X',
    label: 'X. Andra anordningar för anvisningar för trafiken',
    order: 18,
  },
  {
    id: 'Y',
    label: 'Y. Signaler vid korsning med järnväg eller spårväg',
    order: 19,
  },
] as const

export type SignCategoryId = (typeof signCategories)[number]['id']

export function getCategoryLabel(categoryId: SignCategoryId): string {
  return signCategories.find((category) => category.id === categoryId)?.label ?? categoryId
}

export function getCategoryOrder(categoryId: SignCategoryId): number {
  return signCategories.find((category) => category.id === categoryId)?.order ?? 999
}
