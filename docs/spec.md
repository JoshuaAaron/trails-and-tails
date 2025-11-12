# Brook & Bone — Copilot Master Prompt (Next.js + TS + Flutter Web)

**ROLE:** You are my senior front-end tech lead + designer.

**GOAL:** Create **Brook & Bone** — a premium, nature-first Sniffspot-style app — in **Next.js 14 (App Router) + TypeScript** using the **exact brand tokens** below. Meet **WCAG 2.2 AA**. Include a minimal **Flutter Web** demo page that mirrors the same tokens.

**CANONICAL CONTEXT (follow):** Primary FE is React+TS; clear REST contracts; prefer Next.js API routes for this demo (Python optional but not required). Accessibility matters. You may selectively use Canonical’s Vanilla Framework utilities **only** if they don’t alter visual identity.

---

## ACCEPTANCE CRITERIA (must pass)

- Pages: **Home**, **Search** (list + map toggle), **Listing Detail**, **Booking Flow** (mock), **Host** (apply), **Account** (auth stub), and **/flutter-demo** (embed or link to Flutter Web build).  
- **Brand tokens applied everywhere** (colors, type, radii). **No hard-coded hex** outside of the provided tokens.  
- **axe-core** audit clean; color contrast **AA**.  
- Lighthouse desktop: **Perf ≥ 90**, **Best Practices ≥ 95**, **A11y ≥ 95**.  
- Typed API client + typed route handlers for:
  - `GET /api/yards?lat=&lng=&radius=&fenced=&water=&price_min=&price_max=`
  - `GET /api/yards/:id`
  - `POST /api/bookings`
  - `POST /api/hosts/apply`
- Map pins use brand colors (selected = **Brook** with **Bone** dot).  
- Motion: micro **160ms**, overlays **250ms**, optional hero “wave” reveal.

---

## BRAND TOKENS (use exactly)

### `src/styles/brand.css`
```css
:root{
--bb-brook:#1F6A68;--bb-ridge:#0D3B3A;--bb-bone:#EADDCB;--bb-moss:#3D7C59;--bb-ember:#C75C3B;--bb-foam:#D9F1EF;--bb-mist:#F5F7F6;--bb-night:#111317;--bb-slate:#D3D9D9;
--bb-bg-primary:var(--bb-mist);--bb-bg-surface:#FFFFFF;--bb-text-primary:var(--bb-night);--bb-text-on-brand:var(--bb-mist);--bb-brand:var(--bb-brook);--bb-brand-2:var(--bb-ridge);--bb-accent:var(--bb-bone);--bb-border:var(--bb-slate);
--bb-radius-card:12px;--bb-radius-input:8px;--bb-radius-pill:999px;--bb-shadow-card:0 4px 14px rgba(0,0,0,0.08);
--bb-font-heading:"Libre Baskerville",serif;--bb-font-body:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Helvetica Neue",sans-serif;}
```

### `brand_tokens.json`
```json
{"brand":{"name":"Brook & Bone","spoken_name":"Brook and Bone","tagline_primary":"Private nature yards for happy dogs.","voice":{"tone":["warm","confident","outdoorsy","precise"],"avoid":["baby talk","excessive emojis","cutesy puns"]}},"colors":{"palette":{"brook":"#1F6A68","ridge":"#0D3B3A","bone":"#EADDCB","moss":"#3D7C59","ember":"#C75C3B","foam":"#D9F1EF","mist":"#F5F7F6","night":"#111317","slate":"#D3D9D9","white":"#FFFFFF"},"semantics":{"bg_primary":"mist","bg_surface":"white","text_primary":"night","text_on_brand":"mist","brand_primary":"brook","brand_secondary":"ridge","accent":"bone","info_bg":"foam","success":"moss","warning":"ember","border":"slate"}},"typography":{"headings":{"family":"Libre Baskerville","fallbacks":["Times New Roman","serif"],"weights":{"h1":700,"h2":700,"h3":600}},"body":{"family":"Inter","fallbacks":["system-ui","Segoe UI","Roboto","Arial","sans-serif"],"weights":{"regular":400,"medium":500,"semibold":600}},"scale":{"h1":"48px","h2":"36px","h3":"28px","body":"16px","small":"14px"},"line_height":{"heading":1.2,"body":1.6}},"logo":{"wordmark_usage":{"min_width_px":120,"clearspace_rule":">= cap-height of 'B'","dark_on_light":{"fill":"ridge"},"light_on_dark":{"fill":"bone"}},"spoken_name":"Brook and Bone"},"icons":{"style":"outline","stroke_width":2,"corner":"rounded","examples":["map-pin","shield","leaf","clock","bone","wave"]},"layout":{"grid":{"base_unit":8,"container_max_px":1144,"cols_desktop":12,"cols_mobile":4},"radii":{"card":12,"input":8,"pill":999},"elevation":{"card":"0 4px 14px rgba(0,0,0,0.08)"}},"components":{"button":{"primary":{"bg":"brook","fg":"mist","hover_bg":"#195857","radius":12,"padding":"12px 16px"},"secondary":{"bg":"bone","fg":"ridge","hover_bg":"#D9CEBC","radius":12,"padding":"12px 16px"},"tertiary":{"bg":"transparent","fg":"ridge","hover_bg":"mist","radius":12,"padding":"8px 12px"}},"input":{"bg":"white","fg":"night","border":"slate","radius":8,"focus":{"ring":"2px","ring_color":"brook","halo_color":"foam"}},"card":{"bg":"white","border":"slate","radius":12,"shadow":"card"},"badge":{"success":{"bg":"moss","fg":"mist"},"warning":{"bg":"ember","fg":"mist"},"default":{"bg":"ridge","fg":"mist"},"subtle":{"bg":"foam","fg":"ridge"}},"map_pin":{"selected":{"fill":"brook","dot":"bone"},"default":{"fill":"bone","dot":"ridge"}}},"motion":{"durations_ms":{"micro":160,"overlay":250},"easing":{"default":"cubic-bezier(0.2,0.8,0.2,1)"},"motif":"subtle horizontal wave reveal for hero media"},"a11y":{"target":"WCAG 2.2 AA","tests":["axe-core","keyboard_traps","focus_visible","color_contrast"]}}
```

**Logos/SVGs** (already in your project):  
`/public/emblem.svg`, `/public/wordmark.svg`, `/public/app_icon.svg`

**COPY (use verbatim):**
- **H1:** Private nature yards for happy dogs.  
- **H2:** Book secure, serene spaces by the hour—fenced, shaded, host-verified.  
- **CTAs:** Find a yard, Become a Host  
- **Microcopy:** “Secure fencing and shade by the creek.” “Hosts typically reply within 2 hours.” “Free cancellation up to 24 hours before your booking.”

---

## IMPLEMENTATION RULES (with shared types)

1) **Use shared domain types** at `src/lib/types.ts` (readonly arrays for `amenities`, `slots`, `photos`).  
2) Centralize mock data in `src/lib/mockData.ts` and import from API routes.  
3) Configure path alias in `tsconfig.json`:
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }
```
4) **No hard-coded hex values** in components/pages. Use only CSS vars from `brand.css`.  
5) Add a guard script to prevent stray hex:
```json
"check:brand": "grep -R --line-number -E '#[0-9A-Fa-f]{6}' src | grep -vE '--bb-|brand.css' && echo 'Found hard-coded hex (disallowed)' && exit 1 || echo 'No stray hex.'"
```

---

## INSTRUCTIONS

- Scaffold a Next.js 14 + TS repo; install `axios`, `zod`, `eslint`, `prettier`, `axe-core` (dev).  
- Create `src/styles/brand.css` from the tokens above and import it in `src/app/layout.tsx`.  
- Use App Router with pages: `/`, `/search`, `/listing/[id]`, `/booking/confirm`, `/host`, `/account`, `/flutter-demo`.  
- Create **design-system components** using tokens: Button, Input, Card, Badge, MapPin (selected pin = Brook with Bone dot).  
- Implement **API route handlers** using **`src/lib/mockData.ts`** + **`src/lib/types.ts`**:
  - `src/app/api/yards/route.ts` lists **typed `YardSummary[]`** (filter by `fenced`, `water`, `price_min`, `price_max`).  
  - `src/app/api/yards/[id]/route.ts` returns **typed `Yard`** (use `isYardId()` to narrow).  
  - `src/app/api/bookings/route.ts` validates with **`BookingRequestSchema`** and returns **`BookingConfirmation`**.  
  - `src/app/api/hosts/apply/route.ts` validates with **`HostApplicationSchema`** and returns **`HostApplicationResponse`**.
- Add **typed client** in `src/lib/api.ts` that parses responses with Zod schemas.  
- Accessibility: keyboard focus, visible focus ring (Brook + Foam halo), semantic landmarks, labels/aria; integrate **axe-core** in a dev script.  
- Performance: code-split pages, preload fonts, lazy-load images; hit Lighthouse targets.  
- **Flutter Web**: create `/flutter-app` that reproduces a listing card with the same hex colors and radii (redeclare constants or read `brand_tokens.json`). Build to `/flutter-app/build/web` and serve as static under `/public/flutter-demo` or embed via iframe at `/flutter-demo`.

---

## OUTPUT NOW

1) **File tree**.  
2) Exact file contents for (new or refactored):  
   - `package.json`, `next.config.mjs`, `tsconfig.json` (with `@/*` alias)  
   - `src/app/layout.tsx`, `src/app/page.tsx`  
   - `src/app/search/page.tsx` (skeleton), `src/app/listing/[id]/page.tsx` (skeleton), `src/app/host/page.tsx`, `src/app/account/page.tsx`  
   - `src/app/api/yards/route.ts`, `src/app/api/yards/[id]/route.ts`, `src/app/api/bookings/route.ts`, `src/app/api/hosts/apply/route.ts`  
   - `src/lib/types.ts` (**readonly arrays in types**)  
   - `src/lib/mockData.ts` (**const data; `isYardId`, `getYard`, `listYards`, `listYardSummaries`**)  
   - `src/lib/api.ts` (axios + Zod parsing)  
   - `src/styles/brand.css` (from tokens)  
   - `public/emblem.svg`, `public/wordmark.svg`, `public/app_icon.svg`  
   - `README.md` with how tokens are consumed by React and Flutter, run scripts, and where to extend.  
3) Add npm scripts:
   - `"dev:a11y": "echo 'Run axe programmatically or via Playwright integration (suggest a script)'"`  
   - `"check:brand": "grep -R --line-number -E '#[0-9A-Fa-f]{6}' src | grep -vE '--bb-|brand.css' && echo 'Found hard-coded hex (disallowed)' && exit 1 || echo 'No stray hex.'"`

4) Then propose **follow-up tasks** to complete the booking flow, map styling/theme, and Flutter Web integration.

---

**Voice & usage reminders:**  
- Voice: warm, confident, outdoorsy, precise.  
- Avoid cartoon paws/neon greens; use subtle brook/water motif.  
- In audio/SEO, prefer **“Brook and Bone”**; in UI wordmark: **“Brook & Bone.”**

---

**END OF PROMPT**
