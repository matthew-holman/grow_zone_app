import type { CalendarResponse } from '@/api'

export type AppState =
  | { screen: 'entry' }
  | { screen: 'loading' }
  | { screen: 'results'; data: CalendarResponse }
  | { screen: 'error'; message: string }

export type TrackType = 'sow' | 'plant' | 'harvest'

export interface TrackRow {
  label: string
  type: TrackType
  activeMonths: number[]
}
