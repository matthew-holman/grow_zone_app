import Link from 'next/link'
import { GrowZoneApp } from './components/GrowZoneApp'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-4 py-12">
      <GrowZoneApp />
      <Link
        href="/admin/crops"
        className="fixed bottom-4 right-4 text-xs px-3 py-1.5 rounded-full bg-[var(--gc-green-tint)] text-[var(--gc-green-dark)] hover:bg-[var(--gc-green-light)] transition-colors"
      >
        Admin
      </Link>
    </main>
  )
}
