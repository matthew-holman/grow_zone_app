'use client'
import { useState } from 'react'
import type { CropWithMethods } from '@/api'

type CropBody = {
  id: string
  nameSv: string
  nameEn: string
  lifecycle: 'annual' | 'overwintered' | 'biennial' | 'perennial'
  frostTolerance: 'none' | 'light' | 'hard'
  minNightTempC: number | null
  daylengthRequirement: 'neutral' | 'long' | 'short'
  notesSv?: string | null
  notesEn?: string | null
}

interface Props {
  initial?: CropWithMethods
  onSave: (data: CropBody) => Promise<void>
  onCancel: () => void
}

const inputCls = 'border border-zinc-200 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[var(--gc-green-dark)]'
const labelCls = 'block text-xs font-medium text-zinc-500 mb-1'

export function CropForm({ initial, onSave, onCancel }: Props) {
  const editing = !!initial

  const [id, setId] = useState(initial?.id ?? '')
  const [nameSv, setNameSv] = useState(initial?.nameSv ?? '')
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? '')
  const [lifecycle, setLifecycle] = useState<CropBody['lifecycle']>(
    (initial?.lifecycle as CropBody['lifecycle']) ?? 'annual',
  )
  const [frostTolerance, setFrostTolerance] = useState<CropBody['frostTolerance']>(
    (initial?.frostTolerance as CropBody['frostTolerance']) ?? 'none',
  )
  const [minNightTempC, setMinNightTempC] = useState<string>(
    initial?.minNightTempC != null ? String(initial.minNightTempC) : '',
  )
  const [daylengthRequirement, setDaylengthRequirement] = useState<CropBody['daylengthRequirement']>(
    (initial?.daylengthRequirement as CropBody['daylengthRequirement']) ?? 'neutral',
  )
  const [notesSv, setNotesSv] = useState(initial?.notesSv ?? '')
  const [notesEn, setNotesEn] = useState(initial?.notesEn ?? '')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!id.trim() || !nameSv.trim() || !nameEn.trim()) {
      setError('ID, Swedish name, and English name are required.')
      return
    }
    setSaving(true)
    try {
      await onSave({
        id: id.trim(),
        nameSv: nameSv.trim(),
        nameEn: nameEn.trim(),
        lifecycle,
        frostTolerance,
        minNightTempC: minNightTempC !== '' ? Number(minNightTempC) : null,
        daylengthRequirement,
        notesSv: notesSv.trim() || null,
        notesEn: notesEn.trim() || null,
      })
    } catch (err: unknown) {
      const e = err as { body?: { message?: string } }
      setError(e?.body?.message ?? 'Save failed. Please try again.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--gc-green-tint)] rounded-lg p-5 space-y-4">
      <h2 className="text-base font-medium text-zinc-800">
        {editing ? 'Edit crop' : 'Add crop'}
      </h2>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>ID</label>
          <input
            className={inputCls}
            value={id}
            onChange={e => setId(e.target.value)}
            disabled={editing}
            placeholder="e.g. tomato"
          />
        </div>
        <div>
          <label className={labelCls}>Lifecycle</label>
          <select className={inputCls} value={lifecycle} onChange={e => setLifecycle(e.target.value as CropBody['lifecycle'])}>
            <option value="annual">Annual</option>
            <option value="overwintered">Overwintered</option>
            <option value="biennial">Biennial</option>
            <option value="perennial">Perennial</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Name (Swedish)</label>
          <input className={inputCls} value={nameSv} onChange={e => setNameSv(e.target.value)} placeholder="e.g. Tomat" />
        </div>
        <div>
          <label className={labelCls}>Name (English)</label>
          <input className={inputCls} value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="e.g. Tomato" />
        </div>
        <div>
          <label className={labelCls}>Frost tolerance</label>
          <select className={inputCls} value={frostTolerance} onChange={e => setFrostTolerance(e.target.value as CropBody['frostTolerance'])}>
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Min night temp (°C)</label>
          <input
            className={inputCls}
            type="number"
            value={minNightTempC}
            onChange={e => setMinNightTempC(e.target.value)}
            placeholder="optional"
          />
        </div>
        <div>
          <label className={labelCls}>Daylength requirement</label>
          <select className={inputCls} value={daylengthRequirement} onChange={e => setDaylengthRequirement(e.target.value as CropBody['daylengthRequirement'])}>
            <option value="neutral">Neutral</option>
            <option value="long">Long day</option>
            <option value="short">Short day</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Notes (Swedish)</label>
          <textarea className={inputCls} rows={2} value={notesSv ?? ''} onChange={e => setNotesSv(e.target.value)} placeholder="optional" />
        </div>
        <div>
          <label className={labelCls}>Notes (English)</label>
          <textarea className={inputCls} rows={2} value={notesEn ?? ''} onChange={e => setNotesEn(e.target.value)} placeholder="optional" />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="text-sm px-4 py-1.5 rounded bg-[var(--gc-green-dark)] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create crop'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm px-4 py-1.5 rounded border border-zinc-300 text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
