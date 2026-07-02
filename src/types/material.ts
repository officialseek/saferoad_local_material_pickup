export interface Material {
  id: string
  code: string
  name: string
  unit: string
  category: string
  categoryOrder: number
  imageUrl?: string
}

export interface PickupLine {
  materialId: string
  materialCode: string
  materialName: string
  unit: string
  quantity: number
}

export interface PickupReport {
  locationId: string
  locationName: string
  pickedUpAt: string
  reporterName: string
  reporterPhone?: string
  notes?: string
  items: PickupLine[]
}
