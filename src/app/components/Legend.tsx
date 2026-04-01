'use client'

const ITEMS = [
  { colour: '#c0dd97', label: 'Sow indoors' },
  { colour: '#4a7c3f', label: 'Sow / Plant out' },
  { colour: '#ef9f27', label: 'Harvest' },
] as const

export function Legend() {
  return (
    <div className="flex flex-wrap gap-5 mt-6">
      {ITEMS.map(({ colour, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className="w-4 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: colour }}
          />
          <span className="text-xs text-zinc-500">{label}</span>
        </div>
      ))}
    </div>
  )
}
