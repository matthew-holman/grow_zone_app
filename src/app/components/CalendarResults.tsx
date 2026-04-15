'use client'
import type { CalendarResponse } from '@/api'
import { CalendarGrid } from './CalendarGrid'
import { Legend } from './Legend'

interface Props {
  data: CalendarResponse
  onReset: () => void
}

export function CalendarResults({ data, onReset }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back link */}
      <button
        onClick={onReset}
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 flex items-center gap-1"
      >
        &larr; Change postcode
      </button>

      {/* Climate pill */}
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[var(--gc-green-tint)] text-[var(--gc-green-mid)]">
          {data.climate.growingDays} growing days
        </span>
      </div>

      {/* Page heading */}
      <h1
        className="text-3xl text-zinc-900 mb-2"
        style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}
      >
        Your grow calendar
      </h1>

      {/* Page subheading */}
      <p className="text-sm text-zinc-500 mb-8">{data.crops.length} crops</p>

      {/* Calendar grid */}
      <CalendarGrid crops={data.crops} />

      {/* Legend */}
      <Legend />
    </div>
  )
}
