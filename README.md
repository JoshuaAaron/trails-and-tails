# Trails & Tails

Private yards. Big adventures.

A modern yard booking platform built with **Next.js 16 + TypeScript**, featuring a token-driven design system, runtime type validation, and production-ready Google Maps integration.

## Demo

🔗 **Live Site:** [View Demo](http://localhost:3000) *(Start locally with `npm run dev`)*

## Features

- 🎨 **Design System** - CSS custom properties for consistent theming
- 🗺️ **Google Maps Integration** - Interactive map with custom markers and keyboard navigation
- ♿ **WCAG 2.2 AA Compliant** - Full keyboard navigation and screen reader support
- 📝 **Multi-Step Booking** - Complete reservation flow with validation
- 🔒 **Type Safety** - Runtime validation with Zod schemas
- ⚡ **Performance** - Optimized bundle size and lazy loading

## Quick Start

```bash
# Install dependencies
npm install

# Set up Google Maps API key (optional)
cp .env.example .env.local
# Add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Framework:** Next.js 16 + React 19
- **Language:** TypeScript 5
- **Styling:** CSS Custom Properties + Tailwind CSS 4
- **Validation:** Zod 4
- **Maps:** Google Maps (`@vis.gl/react-google-maps`)
- **HTTP Client:** Axios
- **Testing:** Playwright + axe-core (accessibility)

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API routes
│   ├── api/          # REST endpoints (yards, bookings, hosts)
│   ├── search/       # Search page with map integration
│   ├── listing/      # Dynamic yard detail pages
│   └── booking/      # Multi-step booking flow
├── components/       # Reusable React components
│   ├── map/          # Google Maps components
│   ├── booking/      # Booking stepper components
│   └── search/       # Search and filter components
├── lib/
│   ├── types.ts      # TypeScript types + Zod schemas
│   ├── mockData.ts   # Static data fixtures
│   └── api.ts        # Typed HTTP client
└── styles/
    └── brand.css     # Design token definitions
```

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run check:brand # Verify no hard-coded colors (macOS/Linux)
```

## API Endpoints

All endpoints use Zod schemas for runtime validation.

### Get Yards
```
GET /api/yards?fenced=true&water=true&price_min=10&price_max=30
```

### Get Yard Details
```
GET /api/yards/:id
```

### Create Booking
```
POST /api/bookings
Body: { yardId, start, end, guestNotes?, guests?, dogNames? }
```

### Submit Host Application
```
POST /api/hosts/apply
Body: { name, email, phone?, address?, yardSizeSqft?, fenced?, water?, notes? }
```

## Accessibility

- ✅ Keyboard navigation for all interactive elements
- ✅ ARIA labels and semantic HTML
- ✅ WCAG 2.2 AA color contrast
- ✅ Focus visible states with brand colors
- ✅ Screen reader support

## Environment Variables

```bash
# Optional: Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

## License

MIT