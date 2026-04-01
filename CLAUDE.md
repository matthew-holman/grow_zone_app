# Grow Zone App

A Next.js frontend for looking up Swedish grow zone calendars by postcode — showing month-by-month sow, plant, and harvest windows for each supported crop.

## Tech Stack

- **Next.js 16** with React 19 and TypeScript (strict mode)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax in `globals.css`
- **Axios** via auto-generated OpenAPI client in `src/api/`

## Project Structure

```
src/
  api/             Auto-generated OpenAPI client — do NOT edit manually
    core/          HTTP request plumbing (Axios-based)
    models/        TypeScript types for all API responses
    services/      Static service classes with typed API methods
  app/
    components/    UI components (PostcodeEntry, CalendarGrid, etc.)
    globals.css    Global styles (Tailwind import + brand colour tokens)
    layout.tsx     Root layout with Playfair Display + DM Sans fonts
    page.tsx       Server shell rendering <GrowZoneApp />
  lib/
    api.ts         fetchCalendar() wrapper — sets OpenAPI.BASE, maps errors
    calendar.ts    buildTracks() helper for CalendarGrid
    zones.ts       Zone ID → label/region lookup, getZoneHint()
  types/
    index.ts       AppState, TrackType, TrackRow
```

## API Client

The `src/api/` directory is auto-generated from the backend OpenAPI spec:

```bash
npm run generate:api   # Regenerates from http://localhost:8000/openapi.json
```

**Key services:**
- `CalendarService.getCalendar({ postcode })` — fetch the grow calendar for a 5-digit Swedish postcode

**Key models:**
- `CalendarResponse` — `{ postcode, zone, crops }` — top-level calendar response
- `CropCalendarEntry` — `{ id, name, sow, plant, harvest }` — month arrays (1–12) for each crop; `plant` is nullable
- `Error` — `{ error, message }` — API error shape

**Zone values:** 1–5, where 1 is the southernmost (warmest) Swedish climate zone.

**Month arrays** use integers 1–12 representing calendar months (e.g. `[4, 5]` = April–May).

## Environment

- `NEXT_PUBLIC_API_URL` — Backend API base URL (defaults to `http://localhost:8000` in development)
- Set in `.env.local` for local overrides

## Development

```bash
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
```

The backend must be running for API calls to work. Start it separately and ensure `NEXT_PUBLIC_API_URL` points to it.
