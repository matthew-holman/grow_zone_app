import type { CropCalendarEntry } from '@/api'
import type { TrackRow } from '@/types'

export function buildTracks(crop: CropCalendarEntry): TrackRow[] {
  const tracks: TrackRow[] = []

  if (crop.sow.length > 0) {
    tracks.push({
      label: crop.plant ? 'Sow indoors' : 'Sow',
      type: crop.plant ? 'sow' : 'plant',
      activeMonths: crop.sow,
    })
  }

  if (crop.plant && crop.plant.length > 0) {
    tracks.push({
      label: 'Plant out',
      type: 'plant',
      activeMonths: crop.plant,
    })
  }

  if (crop.harvest.length > 0) {
    tracks.push({
      label: 'Harvest',
      type: 'harvest',
      activeMonths: crop.harvest,
    })
  }

  return tracks
}
