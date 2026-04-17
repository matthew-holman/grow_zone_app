import type { Crop, CropMethod, CropWithMethods, Deleted } from '@/api'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

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

type CropUpdateBody = Omit<CropBody, 'id'>

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

type MethodUpdateBody = Omit<MethodBody, 'id'>

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    let body: unknown
    try { body = await res.json() } catch { body = null }
    const err = new Error(`API error ${res.status}`) as Error & { status: number; body: unknown }
    err.status = res.status
    err.body = body
    throw err
  }
  // 204 No Content
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export async function listCrops(): Promise<CropWithMethods[]> {
  return apiFetch('/admin/crops')
}

export async function createCrop(body: CropBody): Promise<Crop> {
  return apiFetch('/admin/crops', { method: 'POST', body: JSON.stringify(body) })
}

export async function getCrop(id: string): Promise<CropWithMethods> {
  return apiFetch(`/admin/crops/${encodeURIComponent(id)}`)
}

export async function updateCrop(id: string, body: CropUpdateBody): Promise<Crop> {
  return apiFetch(`/admin/crops/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export async function deleteCrop(id: string): Promise<Deleted> {
  return apiFetch(`/admin/crops/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function listMethods(cropId: string): Promise<CropMethod[]> {
  return apiFetch(`/admin/crops/${encodeURIComponent(cropId)}/methods`)
}

export async function createMethod(cropId: string, body: MethodBody): Promise<CropMethod> {
  return apiFetch(`/admin/crops/${encodeURIComponent(cropId)}/methods`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function updateMethod(
  cropId: string,
  methodId: string,
  body: MethodUpdateBody,
): Promise<CropMethod> {
  return apiFetch(
    `/admin/crops/${encodeURIComponent(cropId)}/methods/${encodeURIComponent(methodId)}`,
    { method: 'PUT', body: JSON.stringify(body) },
  )
}

export async function deleteMethod(cropId: string, methodId: string): Promise<Deleted> {
  return apiFetch(
    `/admin/crops/${encodeURIComponent(cropId)}/methods/${encodeURIComponent(methodId)}`,
    { method: 'DELETE' },
  )
}
