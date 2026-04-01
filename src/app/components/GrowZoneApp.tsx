'use client'
import { useState } from 'react'
import type { AppState } from '@/types'
import { fetchCalendar } from '@/lib/api'
import { PostcodeEntry } from './PostcodeEntry'
import { LoadingScreen } from './LoadingScreen'
import { CalendarResults } from './CalendarResults'

export function GrowZoneApp() {
  const [state, setState] = useState<AppState>({ screen: 'entry' })
  const [inlineError, setInlineError] = useState<string | undefined>()

  async function handleSubmit(postcode: string) {
    setInlineError(undefined)
    const startTime = Date.now()
    setState({ screen: 'loading' })

    const result = await fetchCalendar(postcode)

    const elapsed = Date.now() - startTime
    await new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, 400 - elapsed)))

    if (result.ok) {
      setState({ screen: 'results', data: result.data })
    } else if (result.kind === 'inline') {
      setState({ screen: 'entry' })
      setInlineError(result.message)
    } else {
      setState({ screen: 'error', message: result.message })
    }
  }

  function handleReset() {
    setState({ screen: 'entry' })
    setInlineError(undefined)
  }

  if (state.screen === 'loading') {
    return <LoadingScreen />
  }

  if (state.screen === 'results') {
    return <CalendarResults data={state.data} onReset={handleReset} />
  }

  if (state.screen === 'error') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16">
        <p className="text-zinc-600 mb-6">{state.message}</p>
        <button
          onClick={handleReset}
          className="text-sm font-medium underline text-[var(--gc-green-dark)] hover:opacity-75 transition-opacity"
        >
          Try again
        </button>
      </div>
    )
  }

  return <PostcodeEntry onSubmit={handleSubmit} inlineError={inlineError} />
}
