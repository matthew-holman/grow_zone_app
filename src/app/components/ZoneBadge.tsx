'use client'
import type { ZoneId } from '@/lib/zones'
import { ZONE_LABELS } from '@/lib/zones'

interface Props {
  zone: ZoneId
  className?: string
}

export function ZoneBadge({ zone, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[var(--gc-green-tint)] text-[var(--gc-green-mid)] ${className}`}
    >
      Zone {zone} &middot; {ZONE_LABELS[zone]}
    </span>
  )
}
