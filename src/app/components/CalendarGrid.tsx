'use client'
import type { CropCalendarEntry } from '@/api'
import { buildTracks } from '@/lib/calendar'
import type { TrackType } from '@/types'

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const TRACK_COLOURS: Record<TrackType, string> = {
  sow: '#c0dd97',
  plant: '#4a7c3f',
  harvest: '#ef9f27',
}

interface Props {
  crops: CropCalendarEntry[]
}

export function CalendarGrid({ crops }: Props) {
  return (
    <div className="overflow-x-auto -mx-2">
      <div className="min-w-[520px] px-2">
        {/* Month header row */}
        <div
          className="grid mb-2"
          style={{ gridTemplateColumns: '80px repeat(12, 1fr)' }}
        >
          <div />
          {MONTH_LABELS.map((label, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-medium tracking-wider text-zinc-400 uppercase"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Crop rows */}
        {crops.map((crop, cropIndex) => {
          const tracks = buildTracks(crop)
          return (
            <div key={crop.id}>
              {/* Crop name row */}
              <div
                className={`grid py-2 ${cropIndex > 0 ? 'border-t border-zinc-100' : ''}`}
                style={{ gridTemplateColumns: '80px repeat(12, 1fr)' }}
              >
                <div className="sticky left-0 bg-white text-sm font-medium text-zinc-800 pr-2">
                  {crop.name}
                </div>
                {MONTHS.map((m) => (
                  <div key={m} />
                ))}
              </div>

              {/* Track rows */}
              {tracks.map((track) => (
                <div
                  key={track.label}
                  className="grid mb-1"
                  style={{ gridTemplateColumns: '80px repeat(12, 1fr)' }}
                >
                  <div className="sticky left-0 bg-white text-[11px] text-zinc-400 pr-2 flex items-center">
                    {track.label}
                  </div>
                  {MONTHS.map((month) => {
                    const active = track.activeMonths.includes(month)
                    return (
                      <div
                        key={month}
                        style={{
                          height: 14,
                          backgroundColor: active ? TRACK_COLOURS[track.type] : 'transparent',
                          borderRadius: active ? 2 : 0,
                          margin: '0 1px',
                        }}
                      />
                    )
                  })}
                </div>
              ))}

              {/* Spacer after tracks */}
              <div className="h-2" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
