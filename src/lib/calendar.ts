import { MethodCalendar } from '@/api'
import type { CalendarWindow } from '@/api'
import type { TrackRow, TrackType } from '@/types'

function windowToMonths(w: CalendarWindow | null): number[] {
  if (w === null || w.startMonth === 0) return []
  const months: number[] = []
  let m = w.startMonth
  while (true) {
    months.push(m)
    if (m === w.endMonth) break
    m = (m % 12) + 1
  }
  return months
}

export function buildTracksForMethod(method: MethodCalendar): TrackRow[] {
  const tracks: TrackRow[] = []
  const windows: Array<{ window: CalendarWindow | null; type: TrackType; label: string }> = [
    { window: method.sowIndoors, type: 'sow',     label: 'Sow indoors' },
    { window: method.directSow,  type: 'sow',     label: 'Direct sow'  },
    { window: method.transplant, type: 'plant',   label: 'Transplant'  },
    { window: method.harvest,    type: 'harvest', label: 'Harvest'     },
  ]
  for (const { window, type, label } of windows) {
    const activeMonths = windowToMonths(window)
    if (activeMonths.length > 0) {
      tracks.push({ label, type, activeMonths })
    }
  }
  return tracks
}
