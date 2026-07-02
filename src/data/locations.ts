import type { Location } from '../types/location'

/** Platser kopplade till QR-koder. Utöka när fler platser läggs till. */
export const locations: Location[] = [
  {
    id: 'demo',
    name: 'Demoplats',
    address: 'Exempelgatan 1, Stockholm',
  },
]

export function getLocationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id)
}
