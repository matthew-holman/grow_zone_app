'use client'
import type { CalendarResponse } from '@/api'
import { ZONE_REGIONS } from '@/lib/zones'
import type { ZoneId } from '@/lib/zones'
import { ZoneBadge } from './ZoneBadge'
import { CalendarGrid } from './CalendarGrid'
import { Legend } from './Legend'

interface Props {
  data: CalendarResponse
  onReset: () => void
}

export function CalendarResults({ data, onReset }: Props) {
  const region = ZONE_REGIONS[data.zone as ZoneId]

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back link */}
      <button
        onClick={onReset}
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 flex items-center gap-1"
      >
        &larr; Change postcode
      </button>

      {/* Zone badge */}
      <div className="mb-4">
        <ZoneBadge zone={data.zone as ZoneId} />
      </div>

      {/* Page heading */}
      <h1
        className="text-3xl text-zinc-900 mb-2"
        style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}
      >
        Your grow calendar
      </h1>

      {/* Page subheading */}
      <p className="text-sm text-zinc-500 mb-8">
        {region} &middot; {data.crops.length} crops
      </p>

      {/* Calendar grid */}
      <CalendarGrid crops={data.crops} />

      {/* Legend */}
      <Legend />
    </div>
  )
}
