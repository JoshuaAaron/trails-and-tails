# Brook & Bone

**Private nature yards for happy dogs.**

A premium, nature-first Sniffspot-style application built with Next.js 14 + TypeScript, following strict brand token guidelines and WCAG 2.2 AA accessibility standards.

## 🎨 Brand Tokens

This project uses a comprehensive design system with consistent tokens across both React and Flutter Web implementations:

### Colors
- **Brook** (`#1F6A68`) - Primary brand color
- **Ridge** (`#0D3B3A`) - Secondary brand color  
- **Bone** (`#EADDCB`) - Accent color
- **Moss** (`#3D7C59`) - Success states
- **Ember** (`#C75C3B`) - Warning states
- **Foam** (`#D9F1EF`) - Info backgrounds
- **Mist** (`#F5F7F6`) - Primary background
- **Slate** (`#D3D9D9`) - Borders

### Typography
- **Headings**: Libre Baskerville (serif)
- **Body**: Inter (sans-serif)

### Layout
- **Border Radius**: Cards (12px), Inputs (8px), Pills (999px)
- **Shadows**: `0 4px 14px rgba(0,0,0,0.08)`
- **Motion**: Micro transitions (160ms), Overlays (250ms)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd brook-and-bone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Available Pages

- **Home** (`/`) - Hero landing page with brand messaging
- **Search** (`/search`) - Yard listing with filters and map toggle
- **Listing Detail** (`/listing/[id]`) - Individual yard details and booking
- **Booking Confirmation** (`/booking/confirm`) - Post-booking success page
- **Host Application** (`/host`) - Host onboarding form
- **Account Dashboard** (`/account`) - User profile and booking management
- **Flutter Demo** (`/flutter-demo`) - Cross-platform brand token showcase

## 🏗 Architecture

### Project Structure
```
brook-and-bone/
├── app/                    # Next.js 14 App Router pages
│   ├── layout.tsx         # Root layout with brand fonts
│   ├── page.tsx           # Homepage
│   ├── search/            # Yard search and filtering
│   ├── listing/[id]/      # Dynamic yard detail pages
│   ├── booking/confirm/   # Booking confirmation
│   ├── host/              # Host application
│   ├── account/           # User dashboard
│   └── flutter-demo/      # Cross-platform demo
├── src/
│   ├── app/api/           # API route handlers
│   │   ├── yards/         # Yard listing and details
│   │   ├── bookings/      # Booking creation
│   │   └── hosts/apply/   # Host applications
│   ├── lib/
│   │   ├── types.ts       # Shared TypeScript types with Zod schemas
│   │   ├── mockData.ts    # Demo data with type guards
│   │   └── api.ts         # Typed API client with validation
│   └── styles/
│       └── brand.css      # CSS custom properties for brand tokens
├── public/
│   ├── wordmark.svg       # Brand wordmark
│   ├── emblem.svg         # Brand emblem
│   └── app_icon.svg       # App icon
└── package.json           # Dependencies and scripts
```

### API Endpoints

#### Yards
- `GET /api/yards?fenced=true&water=false&price_min=10&price_max=25` - Search yards
- `GET /api/yards/[id]` - Get yard details

#### Bookings  
- `POST /api/bookings` - Create new booking

#### Hosts
- `POST /api/hosts/apply` - Submit host application

All endpoints include comprehensive TypeScript types and Zod validation.

### Type Safety

The application uses strict TypeScript with:
- **Shared domain types** in `src/lib/types.ts` 
- **Readonly arrays** for immutable data structures
- **Zod schemas** for runtime validation
- **Type guards** for safe data access
- **Typed API client** with automatic parsing

## 🎯 Brand Token Usage

### React/Next.js
Brand tokens are defined in `src/styles/brand.css` as CSS custom properties:

```css
:root {
  --bb-brook: #1F6A68;
  --bb-bone: #EADDCB;
  /* ... */
}
```

Components use tokens exclusively (no hard-coded hex values):

```tsx
<button 
  style={{
    backgroundColor: "var(--bb-brand)",
    color: "var(--bb-text-on-brand)",
    borderRadius: "var(--bb-radius-card)"
  }}
>
  Book Now
</button>
```

### Flutter Web
The same brand tokens from `brand_tokens.json` can be consumed by Flutter:

```dart
// In a full Flutter implementation
const Color brookColor = Color(0xFF1F6A68);
const double cardRadius = 12.0;
```

## 🧪 Quality Assurance

### Brand Compliance
```bash
# Check for hard-coded hex values (should show no violations)
npm run check:brand
```

### Accessibility Testing  
```bash
# Placeholder for axe-core integration
npm run dev:a11y
```

### Lighthouse Targets
- **Performance**: ≥ 90
- **Best Practices**: ≥ 95  
- **Accessibility**: ≥ 95

## 🛠 Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run start           # Start production server

# Quality Assurance  
npm run lint            # ESLint checking
npm run check:brand     # Verify no hard-coded colors
npm run dev:a11y        # Accessibility testing (placeholder)
```

## 📋 Acceptance Criteria Status

- ✅ **Pages**: Home, Search, Listing Detail, Booking, Host, Account, Flutter Demo
- ✅ **Brand Tokens**: All colors use CSS custom properties from brand.css
- ✅ **API Routes**: Typed endpoints for yards, bookings, host applications
- ✅ **TypeScript**: Comprehensive typing with Zod validation
- ✅ **Accessibility**: Semantic HTML, keyboard navigation, focus management
- ✅ **Performance**: Optimized fonts, code splitting, lazy loading

## 🔄 Extension Points

To extend this application:

1. **Add new pages**: Create in `app/` directory following existing patterns
2. **Extend API**: Add routes in `src/app/api/` with proper typing
3. **New components**: Use brand tokens from `src/styles/brand.css`
4. **Flutter integration**: Consume `brand_tokens.json` for cross-platform consistency
5. **Authentication**: Integrate with the account page stub
6. **Maps**: Add real map functionality to search page
7. **Payment**: Extend booking flow with payment processing

## 🎨 Design System

The application implements a complete design system with:

- **Consistent spacing** using 8px base unit grid
- **Typography hierarchy** with Libre Baskerville headings and Inter body text  
- **Color semantics** for different UI states and contexts
- **Component patterns** for buttons, inputs, cards, and badges
- **Motion design** with consistent easing and timing
- **Accessibility** built-in with proper focus states and contrast ratios

## 📚 Learn More

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Validation](https://github.com/colinhacks/zod)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Flutter Web](https://flutter.dev/web)
