export type ZoneId = 1 | 2 | 3 | 4 | 5

export const ZONE_LABELS: Record<ZoneId, string> = {
  1: 'South Sweden',
  2: 'South-Central Sweden',
  3: 'Central Sweden',
  4: 'North-Central Sweden',
  5: 'North Sweden',
}

export const ZONE_REGIONS: Record<ZoneId, string> = {
  1: 'Southern Sweden',
  2: 'South-Central Sweden',
  3: 'Central Sweden',
  4: 'Northern Sweden',
  5: 'Far North Sweden',
}

export function getZoneHint(digits: string): ZoneId | null {
  if (digits.length !== 5) return null
  const prefix = parseInt(digits[0], 10)
  if (prefix === 1) return 3
  if (prefix === 2 || prefix === 3) return 1
  if (prefix === 4 || prefix === 5) return 2
  if (prefix === 6 || prefix === 7) return 3
  if (prefix === 8) return 4
  if (prefix === 9) return 5
  return null
}
