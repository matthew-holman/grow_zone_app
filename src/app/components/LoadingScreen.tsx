'use client'

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div
        className="w-10 h-10 rounded-full border-4 border-[var(--gc-green-tint)] border-t-[var(--gc-green-dark)] animate-spin"
      />
      <p className="text-sm text-zinc-500">
        Finding your growing zone&hellip;
      </p>
    </div>
  )
}
