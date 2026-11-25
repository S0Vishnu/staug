export const twinSteps = [
  { id: 'plot', label: 'Masterplan' },
  { id: 'tower', label: 'Tower' },
  { id: 'floor', label: 'Floor plate' },
  { id: 'unit', label: 'Unit plan' },
  { id: 'tour', label: '360° tour' },
] as const

export type TwinStep = (typeof twinSteps)[number]['id']

export const rooms = [
  { id: 'living', label: 'Living & Dining' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'kitchen', label: 'Kitchen' },
] as const

export type RoomId = (typeof rooms)[number]['id']

export const unitIds = [
  '08',
  '09',
  '10',
  '11',
  '12',
  '07',
  '06',
  '05',
  '04',
  '01',
  '02',
  '03',
] as const

export type UnitId = (typeof unitIds)[number]

export const unitTypes: Record<UnitId, { type: string; view: string }> = {
  '01': { type: '2 Bedroom Apartment', view: 'Garden view' },
  '02': { type: '3 Bedroom Apartment', view: 'Corner unit · Garden and pool views' },
  '03': { type: '3 Bedroom Apartment', view: 'Corner unit · Pool view' },
  '04': { type: '2 Bedroom Apartment', view: 'Courtyard view' },
  '05': { type: '1 Bedroom Apartment', view: 'Courtyard view' },
  '06': { type: '1 Bedroom Apartment', view: 'Courtyard view' },
  '07': { type: '2 Bedroom Apartment', view: 'Corner unit · Courtyard view' },
  '08': { type: '3 Bedroom Apartment', view: 'Corner unit · Boulevard view' },
  '09': { type: '1 Bedroom Apartment', view: 'Boulevard view' },
  '10': { type: '1 Bedroom Apartment', view: 'Boulevard view' },
  '11': { type: '1 Bedroom Apartment', view: 'Boulevard view' },
  '12': { type: '1 Bedroom Apartment', view: 'Boulevard view' },
}

export const floors = Array.from({ length: 14 }, (_, index) => 14 - index)

export function padFloor(n: number) {
  return n < 10 ? `0${n}` : String(n)
}
