'use client'
import { useState } from 'react'
import type { CropMethod } from '@/api'

type MethodBody = {
  id: string
  labelSv: string
  labelEn: string
  germinationMinSoilTempC: number | null
  germinationOptSoilTempC: number | null
  daysToGerminationMin: number | null
  daysToGerminationMax: number | null
  daysToMaturityMin: number | null
  daysToMaturityMax: number | null
  transplantTolerance: 'good' | 'poor' | 'none' | 'direct-only'
  gddRequired: number | null
  plantBeforeFirstFrostDays: number | null
  sortOrder?: number
}

interface Props {
  cropId: string
  initial?: CropMethod
  onSave: (data: MethodBody) => Promise<void>
  onCancel: () => void
}

const inputCls = 'border border-zinc-200 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[var(--gc-green-dark)]'
const labelCls = 'block text-xs font-medium text-zinc-500 mb-1'

function numField(val: number | null | undefined): string {
  return val != null ? String(val) : ''
}

function toNullableNum(s: string): number | null {
  return s.trim() === '' ? null : Number(s)
}

export function MethodForm({ cropId, initial, onSave, onCancel }: Props) {
  const editing = !!initial

  const [id, setId] = useState(initial?.id ?? '')
  const [labelSv, setLabelSv] = useState(initial?.labelSv ?? '')
  const [labelEn, setLabelEn] = useState(initial?.labelEn ?? '')
  const [transplantTolerance, setTransplantTolerance] = useState<MethodBody['transplantTolerance']>(
    (initial?.transplantTolerance as MethodBody['transplantTolerance']) ?? 'good',
  )
  const [germinationMinSoilTempC, setGerminationMinSoilTempC] = useState(numField(initial?.germinationMinSoilTempC))
  const [germinationOptSoilTempC, setGerminationOptSoilTempC] = useState(numField(initial?.germinationOptSoilTempC))
  const [daysToGerminationMin, setDaysToGerminationMin] = useState(numField(initial?.daysToGerminationMin))
  const [daysToGerminationMax, setDaysToGerminationMax] = useState(numField(initial?.daysToGerminationMax))
  const [daysToMaturityMin, setDaysToMaturityMin] = useState(numField(initial?.daysToMaturityMin))
  const [daysToMaturityMax, setDaysToMaturityMax] = useState(numField(initial?.daysToMaturityMax))
  const [gddRequired, setGddRequired] = useState(numField(initial?.gddRequired))
  const [plantBeforeFirstFrostDays, setPlantBeforeFirstFrostDays] = useState(numField(initial?.plantBeforeFirstFrostDays))
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder != null ? String(initial.sortOrder) : '')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!id.trim() || !labelSv.trim() || !labelEn.trim()) {
      setError('ID, Swedish label, and English label are required.')
      return
    }
    setSaving(true)
    try {
      await onSave({
        id: id.trim(),
        labelSv: labelSv.trim(),
        labelEn: labelEn.trim(),
        transplantTolerance,
        germinationMinSoilTempC: toNullableNum(germinationMinSoilTempC),
        germinationOptSoilTempC: toNullableNum(germinationOptSoilTempC),
        daysToGerminationMin: toNullableNum(daysToGerminationMin),
        daysToGerminationMax: toNullableNum(daysToGerminationMax),
        daysToMaturityMin: toNullableNum(daysToMaturityMin),
        daysToMaturityMax: toNullableNum(daysToMaturityMax),
        gddRequired: toNullableNum(gddRequired),
        plantBeforeFirstFrostDays: toNullableNum(plantBeforeFirstFrostDays),
        sortOrder: sortOrder.trim() !== '' ? Number(sortOrder) : undefined,
      })
    } catch (err: unknown) {
      const e = err as { body?: { message?: string } }
      setError(e?.body?.message ?? 'Save failed. Please try again.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-medium text-zinc-700">
        {editing ? 'Edit method' : `Add method to ${cropId}`}
      </h3>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>ID</label>
          <input
            className={inputCls}
            value={id}
            onChange={e => setId(e.target.value)}
            disabled={editing}
            placeholder="e.g. direct-sow"
          />
        </div>
        <div>
          <label className={labelCls}>Transplant tolerance</label>
          <select className={inputCls} value={transplantTolerance} onChange={e => setTransplantTolerance(e.target.value as MethodBody['transplantTolerance'])}>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
            <option value="none">None</option>
            <option value="direct-only">Direct only</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Label (Swedish)</label>
          <input className={inputCls} value={labelSv} onChange={e => setLabelSv(e.target.value)} placeholder="e.g. Direktsådd" />
        </div>
        <div>
          <label className={labelCls}>Label (English)</label>
          <input className={inputCls} value={labelEn} onChange={e => setLabelEn(e.target.value)} placeholder="e.g. Direct sow" />
        </div>

        <div>
          <label className={labelCls}>Min germination soil temp (°C)</label>
          <input className={inputCls} type="number" value={germinationMinSoilTempC} onChange={e => setGerminationMinSoilTempC(e.target.value)} placeholder="optional" />
        </div>
        <div>
          <label className={labelCls}>Opt germination soil temp (°C)</label>
          <input className={inputCls} type="number" value={germinationOptSoilTempC} onChange={e => setGerminationOptSoilTempC(e.target.value)} placeholder="optional" />
        </div>

        <div>
          <label className={labelCls}>Days to germination (min)</label>
          <input className={inputCls} type="number" value={daysToGerminationMin} onChange={e => setDaysToGerminationMin(e.target.value)} placeholder="optional" />
        </div>
        <div>
          <label className={labelCls}>Days to germination (max)</label>
          <input className={inputCls} type="number" value={daysToGerminationMax} onChange={e => setDaysToGerminationMax(e.target.value)} placeholder="optional" />
        </div>

        <div>
          <label className={labelCls}>Days to maturity (min)</label>
          <input className={inputCls} type="number" value={daysToMaturityMin} onChange={e => setDaysToMaturityMin(e.target.value)} placeholder="optional" />
        </div>
        <div>
          <label className={labelCls}>Days to maturity (max)</label>
          <input className={inputCls} type="number" value={daysToMaturityMax} onChange={e => setDaysToMaturityMax(e.target.value)} placeholder="optional" />
        </div>

        <div>
          <label className={labelCls}>GDD required</label>
          <input className={inputCls} type="number" value={gddRequired} onChange={e => setGddRequired(e.target.value)} placeholder="optional" />
        </div>
        <div>
          <label className={labelCls}>Plant before first frost (days)</label>
          <input className={inputCls} type="number" value={plantBeforeFirstFrostDays} onChange={e => setPlantBeforeFirstFrostDays(e.target.value)} placeholder="optional" />
        </div>

        <div>
          <label className={labelCls}>Sort order</label>
          <input className={inputCls} type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} placeholder="optional" />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="text-sm px-4 py-1.5 rounded bg-[var(--gc-green-dark)] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Add method'}
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
