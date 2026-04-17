'use client'
import { useState } from 'react'
import type { CropWithMethods, CropMethod } from '@/api'

interface Props {
  crops: CropWithMethods[]
  onEditCrop: (crop: CropWithMethods) => void
  onDeleteCrop: (id: string) => void
  onAddMethod: (cropId: string) => void
  onEditMethod: (cropId: string, method: CropMethod) => void
  onDeleteMethod: (cropId: string, methodId: string) => void
}

export function CropList({ crops, onEditCrop, onDeleteCrop, onAddMethod, onEditMethod, onDeleteMethod }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (crops.length === 0) {
    return <p className="text-sm text-zinc-400 py-4">No crops yet. Add one below.</p>
  }

  return (
    <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-lg overflow-hidden">
      {crops.map(crop => (
        <div key={crop.id}>
          {/* Crop row */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-zinc-50 transition-colors">
            {/* Expand toggle */}
            <button
              onClick={() => toggle(crop.id)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors text-xs w-4 text-center shrink-0"
              title={expanded.has(crop.id) ? 'Collapse' : 'Expand methods'}
            >
              {expanded.has(crop.id) ? '▼' : '▶'}
            </button>

            {/* Crop identity */}
            <div className="flex-1 min-w-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 items-center">
              <span className="text-xs font-mono text-zinc-400 truncate">{crop.id}</span>
              <span className="text-sm text-zinc-800 truncate">{crop.nameSv} / {crop.nameEn}</span>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--gc-green-tint)] text-[var(--gc-green-dark)]">
                  {crop.lifecycle}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500">
                  frost: {crop.frostTolerance}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-zinc-400">{crop.methods.length} method{crop.methods.length !== 1 ? 's' : ''}</span>
              <button
                onClick={() => onEditCrop(crop)}
                className="text-xs text-[var(--gc-green-dark)] hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteCrop(crop.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Methods panel */}
          {expanded.has(crop.id) && (
            <div className="bg-zinc-50 border-t border-zinc-100 px-8 py-3 space-y-2">
              {crop.methods.length === 0 && (
                <p className="text-xs text-zinc-400">No methods yet.</p>
              )}
              {crop.methods.map(method => (
                <div
                  key={method.id}
                  className="flex items-center gap-3 py-1.5 border-b border-zinc-100 last:border-0"
                >
                  <div className="flex-1 min-w-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-x-4 items-center">
                    <span className="text-xs font-mono text-zinc-400 truncate">{method.id}</span>
                    <span className="text-xs text-zinc-700 truncate">{method.labelSv} / {method.labelEn}</span>
                    <div className="flex gap-1.5">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-500">
                        {method.transplantTolerance}
                      </span>
                      <span className="text-xs text-zinc-400">#{method.sortOrder}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onEditMethod(crop.id, method)}
                      className="text-xs text-[var(--gc-green-dark)] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteMethod(crop.id, method.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => onAddMethod(crop.id)}
                className="mt-1 text-xs text-[var(--gc-green-dark)] hover:underline"
              >
                + Add method
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
