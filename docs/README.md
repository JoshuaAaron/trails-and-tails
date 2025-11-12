# Brook & Bone

Premium, nature‑first Sniffspot‑style app built with **Next.js 14 (App Router) + TypeScript**.  
Brand system: **Brook & Bone** tokens (colors, typography, radii) with strict a11y targets (WCAG 2.2 AA).

> **Spec:** The full build brief for developers and AI agents lives in **[`/docs/spec.md`](./docs/spec.md)**. Treat it as the single source of truth.

---

## Quick Start

```bash
# 1) Install
npm i

# 2) Dev
npm run dev

# 3) Quality checks
npm run lint
npm run check:brand   # blocks hard-coded hex outside brand.css

# 4) Build
npm run build
npm run start
```

### Folder Structure (high level)

```
src/
  app/                      # App Router pages + API routes
    api/                    # Typed route handlers using lib/mockData + lib/types
  lib/
    api.ts                  # Typed API client (axios + zod parsing)
    mockData.ts             # Central mock data + helpers (readonly arrays)
    types.ts                # Shared domain types + zod schemas
  styles/
    brand.css               # Brand tokens as CSS variables
public/
  emblem.svg  wordmark.svg  app_icon.svg
docs/
  spec.md                   # Master build brief for Copilot/agents
```

---

## Working With AI Agents (Copilot, etc.)

**Always** include `/docs/spec.md` as context. Three easy options in VS Code:
1. **Attach file in Copilot Chat:** click the paperclip → *Add workspace file* → `docs/spec.md` → *Send*: “Follow spec.md exactly.”
2. **Editor Selection:** open `docs/spec.md`, `Cmd/Ctrl+A`, then in Copilot Chat click *Include Editor Selection* and send your instruction.
3. **Right‑click → Ask Copilot:** right‑click inside `docs/spec.md` → *Copilot: Chat* → “Execute the OUTPUT NOW section.”

If a generated change diverges from branding (hard‑coded colors, wrong fonts), run:
```bash
npm run check:brand
```
and ask the agent to fix the reported files.

---

## Brand & A11y Guardrails

- **No hard-coded hex** in components/pages. Use only variables from `src/styles/brand.css`.
- Focus styles: Brook ring with Foam halo.
- Contrast: AA or better. Run axe-core in dev and fix violations.

---

## Flutter Web Demo

A minimal Flutter Web UI should reproduce the listing card with identical tokens. Build to `flutter-app/build/web` and serve statically under `/public/flutter-demo` or embed via iframe on `/flutter-demo` page.

---

## Licensing

This project is a personal portfolio/demo. Replace or extend tokens and copy as needed.
