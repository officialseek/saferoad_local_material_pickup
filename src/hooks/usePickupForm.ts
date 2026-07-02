import { useCallback, useMemo, useState } from 'react'
import { materials } from '../data/materials'
import type { PickupLine, PickupReport } from '../types/material'
import type { Location } from '../types/location'

interface UsePickupFormOptions {
  location: Location
}

export function usePickupForm({ location }: UsePickupFormOptions) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [reporterName, setReporterName] = useState('')
  const [reporterPhone, setReporterPhone] = useState('')
  const [notes, setNotes] = useState('')

  const setQuantity = useCallback((materialId: string, quantity: number) => {
    setQuantities((prev) => {
      if (quantity <= 0) {
        const next = { ...prev }
        delete next[materialId]
        return next
      }
      return { ...prev, [materialId]: quantity }
    })
  }, [])

  const selectedItems = useMemo<PickupLine[]>(() => {
    return materials
      .filter((material) => (quantities[material.id] ?? 0) > 0)
      .map((material) => ({
        materialId: material.id,
        materialCode: material.code,
        materialName: material.name,
        unit: material.unit,
        quantity: quantities[material.id],
      }))
  }, [quantities])

  const canSubmit = reporterName.trim().length > 0 && selectedItems.length > 0

  const buildReport = useCallback((): PickupReport => {
    return {
      locationId: location.id,
      locationName: location.name,
      pickedUpAt: new Date().toISOString(),
      reporterName: reporterName.trim(),
      reporterPhone: reporterPhone.trim() || undefined,
      notes: notes.trim() || undefined,
      items: selectedItems,
    }
  }, [location, notes, reporterName, reporterPhone, selectedItems])

  const reset = useCallback(() => {
    setQuantities({})
    setReporterName('')
    setReporterPhone('')
    setNotes('')
  }, [])

  return {
    quantities,
    setQuantity,
    reporterName,
    setReporterName,
    reporterPhone,
    setReporterPhone,
    notes,
    setNotes,
    selectedItems,
    canSubmit,
    buildReport,
    reset,
  }
}
