# Trails & Tails

Private yards. Big adventures.

Nature-first yard booking in **React (Next.js 14) + TypeScript** with a **token-driven design system**, **typed REST** (Zod + MSW), and **WCAG 2.2 AA** accessibility.

> **Why this repo matters:** it demonstrates modern front-end practice: design tokens applied across components, typed API boundaries, accessibility by default, and a Flutter Web demo that reuses the same tokens.

---

## ✨ Highlights

- **Design system:** brand tokens (colors, type, radii, motion) consumed in React components — no hard-coded hex.
- **Typed REST boundary:** route handlers + Zod schemas, plus **MSW** in dev to simulate `/api/*`.
- **Accessibility:** focus visible, keyboard paths, AA color contrast, semantic landmarks.
- **Performance:** font preloads, code splitting, image lazy-loading; Lighthouse targets documented.
- **Cross-stack demo:** minimal **Flutter Web** page that mirrors the React card using the same tokens.

---

## 🧭 What to review first

1. `src/styles/brand.css` – token source of truth  
2. `src/lib/types.ts` & `src/lib/mockData.ts` – shared types + readonly data  
3. `src/lib/api.ts` – typed client (axios + Zod parsing)  
4. `src/app/api/*` – REST endpoints (yards, bookings, host apply)  
5. `src/app/search` & `src/app/listing/[id]` – tokenized UI, a11y behaviors

---

## 🚀 Quickstart

```bash
npm i
npm run dev
# open http://localhost:3000
```

Dev mocks are powered by **MSW**; in production you can point the client at a real API.

---

## 🔧 Tech stack

- React (Next.js 14) + TypeScript
- Zod (runtime validation), Axios (client)
- MSW (mock REST), ESLint/Prettier
- Flutter Web (demo parity)
- Map placeholder ready for Mapbox/Google Maps

---

## 🧪 Scripts

```bash
npm run lint           # lint + formatting
npm run check:brand    # blocks hard-coded hex outside brand.css
# optional: add axe in your test runner for a11y checks
```

*Note:* `check:brand` uses `grep` (macOS/Linux). On Windows, use Git Bash or adapt to PowerShell.

---

## ♿ Accessibility details (WCAG 2.2 AA)

- Visible focus states (brand **Brook** ring with **Foam** halo)
- Keyboard-only navigation for primary flows
- Semantic headings and landmarks
- Color contrast verified against AA for text/UI

---

## 🔌 API surface (dev)

- `GET /api/yards?fenced=&water=&price_min=&price_max=` → list (typed)
- `GET /api/yards/:id` → details (typed)
- `POST /api/bookings` → validates payload and returns confirmation
- `POST /api/hosts/apply` → validates application

See `src/app/api/*` and Zod schemas in `src/lib/types.ts`.

---

## 🧱 Architecture at a glance

```
src/
  app/            # App Router pages + API routes
  lib/            # types, mock data, typed API client
  styles/         # brand.css (design tokens)
public/           # SVGs, assets
```

Design tokens drive all components; utilities are CSS variables (no theme provider required).

---

## 🌉 Flutter Web demo

A minimal Flutter page reproduces the listing card using the same tokens.  
Build and serve under `/flutter-demo` (see `/docs/spec-phase-3-flutter-web.md`).

---

## 📈 Roadmap snapshot

- Phase 1: multi-step booking w/ validation  
- Phase 2: interactive map + brand-styled pins  
- Phase 3: Flutter token parity page  
- Phase 4: Auth/DB/Payments baseline  
- Phase 5: Messaging, reviews, advanced filters

Full specs in `/docs/`.

---

## 📸 Social preview

Set a repo **Social preview** so links on LinkedIn/Twitter look polished. (Repo → Settings → Social preview.) Include project title and subtitle.

---

## License

MIT