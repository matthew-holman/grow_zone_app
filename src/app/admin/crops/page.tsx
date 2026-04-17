'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import type { CropWithMethods, CropMethod } from '@/api'
import {
  listCrops,
  createCrop,
  updateCrop,
  deleteCrop,
  createMethod,
  updateMethod,
  deleteMethod,
} from '@/lib/adminApi'
import { CropList } from './components/CropList'
import { CropForm } from './components/CropForm'
import { MethodForm } from './components/MethodForm'

type AdminState =
  | { mode: 'list' }
  | { mode: 'add-crop' }
  | { mode: 'edit-crop'; crop: CropWithMethods }
  | { mode: 'add-method'; cropId: string }
  | { mode: 'edit-method'; cropId: string; method: CropMethod }

export default function AdminCropsPage() {
  const [crops, setCrops] = useState<CropWithMethods[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [state, setState] = useState<AdminState>({ mode: 'list' })

  const reload = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await listCrops()
      setCrops(data)
    } catch {
      setLoadError('Failed to load crops. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { reload() }, [reload])

  async function handleSaveCrop(data: Parameters<typeof createCrop>[0]) {
    if (state.mode === 'edit-crop') {
      const { id, ...body } = data
      await updateCrop(id, body)
    } else {
      await createCrop(data)
    }
    setState({ mode: 'list' })
    await reload()
  }

  async function handleDeleteCrop(id: string) {
    if (!confirm(`Delete crop "${id}" and all its methods?`)) return
    await deleteCrop(id)
    await reload()
  }

  async function handleSaveMethod(data: Parameters<typeof createMethod>[1]) {
    if (state.mode === 'edit-method') {
      const { id, ...body } = data
      await updateMethod(state.cropId, id, body)
    } else if (state.mode === 'add-method') {
      await createMethod(state.cropId, data)
    }
    setState({ mode: 'list' })
    await reload()
  }

  async function handleDeleteMethod(cropId: string, methodId: string) {
    if (!confirm(`Delete method "${methodId}"?`)) return
    await deleteMethod(cropId, methodId)
    await reload()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-2 flex items-center gap-1"
          >
            &larr; Back to app
          </Link>
          <h1
            className="text-3xl text-zinc-900 mt-2"
            style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}
          >
            Crop admin
          </h1>
          {!loading && !loadError && (
            <p className="text-sm text-zinc-400 mt-1">{crops.length} crop{crops.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {state.mode === 'list' && (
          <button
            onClick={() => setState({ mode: 'add-crop' })}
            className="text-sm px-4 py-2 rounded bg-[var(--gc-green-dark)] text-white hover:opacity-90 transition-opacity"
          >
            + Add crop
          </button>
        )}
      </div>

      {/* Load state */}
      {loading && (
        <p className="text-sm text-zinc-400 py-8 text-center">Loading…</p>
      )}
      {loadError && (
        <div className="text-center py-8">
          <p className="text-sm text-red-500 mb-3">{loadError}</p>
          <button
            onClick={reload}
            className="text-sm underline text-[var(--gc-green-dark)] hover:opacity-75"
          >
            Retry
          </button>
        </div>
      )}

      {/* Crop list */}
      {!loading && !loadError && (
        <CropList
          crops={crops}
          onEditCrop={crop => setState({ mode: 'edit-crop', crop })}
          onDeleteCrop={handleDeleteCrop}
          onAddMethod={cropId => setState({ mode: 'add-method', cropId })}
          onEditMethod={(cropId, method) => setState({ mode: 'edit-method', cropId, method })}
          onDeleteMethod={handleDeleteMethod}
        />
      )}

      {/* Forms */}
      {(state.mode === 'add-crop' || state.mode === 'edit-crop') && (
        <div className="mt-6">
          <CropForm
            initial={state.mode === 'edit-crop' ? state.crop : undefined}
            onSave={handleSaveCrop}
            onCancel={() => setState({ mode: 'list' })}
          />
        </div>
      )}

      {(state.mode === 'add-method' || state.mode === 'edit-method') && (
        <div className="mt-6">
          <MethodForm
            cropId={state.cropId}
            initial={state.mode === 'edit-method' ? state.method : undefined}
            onSave={handleSaveMethod}
            onCancel={() => setState({ mode: 'list' })}
          />
        </div>
      )}
    </div>
  )
}
