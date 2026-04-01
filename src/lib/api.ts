import { CalendarService, OpenAPI, ApiError } from '@/api'
import type { CalendarResponse } from '@/api'

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export type CalendarResult =
  | { ok: true; data: CalendarResponse }
  | { ok: false; kind: 'inline'; message: string }
  | { ok: false; kind: 'error'; message: string }

export async function fetchCalendar(postcode: string): Promise<CalendarResult> {
  try {
    const data = await CalendarService.getCalendar({ postcode })
    return { ok: true, data }
  } catch (err) {
    if (err instanceof ApiError) {
      const errorCode = err.body?.error as string | undefined
      if (err.status === 400 && errorCode === 'invalid_postcode') {
        return {
          ok: false,
          kind: 'inline',
          message: "We couldn't find that postcode. Please check and try again.",
        }
      }
      if (err.status === 404 && errorCode === 'outside_sweden') {
        return {
          ok: false,
          kind: 'inline',
          message: "This postcode doesn't appear to be in Sweden.",
        }
      }
    }
    return {
      ok: false,
      kind: 'error',
      message: 'Something went wrong. Please try again.',
    }
  }
}
