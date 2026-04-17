'use client'
import React, { useState } from 'react'

interface Props {
  onSubmit: (postcode: string) => void
  inlineError?: string
}

export function PostcodeEntry({ onSubmit, inlineError }: Props) {
  const [digits, setDigits] = useState('')
  const [display, setDisplay] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 5)
      console.log(raw)
    setDigits(raw)
      console.log(digits)
    const formatted = raw.length > 3 ? raw.slice(0, 3) + ' ' + raw.slice(3) : raw
    setDisplay(formatted)
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (digits.length === 5) {
      onSubmit(digits)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* App name */}
      <div className="flex items-center gap-2 mb-10">
        <div
          className="w-5 h-5 rounded-full flex-shrink-0"
          style={{ backgroundColor: 'var(--gc-green-dark)' }}
        />
        <span
          className="text-base tracking-wide text-zinc-600"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Odlingskalendern
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-4xl text-zinc-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}
      >
        When should you sow, where you are?
      </h1>

      {/* Subheading */}
      <p className="text-sm text-zinc-500 mb-12 leading-relaxed">
        Enter your postcode for a personalised growing calendar calibrated to your local micro climate in Sweden.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Postcode input */}
        <div className="mb-3">
          <input
            type="text"
            inputMode="numeric"
            value={display}
            onChange={handleChange}
            placeholder="XXX XX"
            maxLength={6}
            className="w-full text-3xl bg-transparent border-0 border-b-2 border-zinc-200 focus:border-[var(--gc-green-dark)] outline-none pb-2 transition-colors placeholder-zinc-300"
            style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}
            aria-label="Swedish postcode"
          />
        </div>

        {/* Inline error */}
        <div className="h-8 mb-8 flex items-center">
          {inlineError && (
            <p role="alert" className="text-sm text-red-500">
              {inlineError}
            </p>
          )}
        </div>

        {/* CTA button */}
        <button
          type="submit"
          disabled={digits.length !== 5}
          className="w-full py-3 px-6 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--gc-green-dark)' }}
        >
          Show my calendar
        </button>
      </form>
    </div>
  )
}
