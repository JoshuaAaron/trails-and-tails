# Search Page UX Improvement - Card Click Behavior

**Date:** November 19, 2025  
**Issue:** Card click behavior design flaw  
**Status:** ✅ FIXED

---

## Problem Identified

The original implementation had cards on the search page that **only highlighted the yard on the map** when clicked, rather than navigating to the listing page. This was a UX design flaw.

**Original (Incorrect) Behavior:**
- User clicks on yard card → Card highlights on map ❌
- User must then somehow navigate to listing page

**This created confusion** - users clicking on a card expect to see more details, not just a highlight.

---

## Solution Implemented

### New UX Flow:

**Cards → Navigation:**
- User clicks on yard card → Navigates to `/listing/[id]` ✅
- Cards are now `<Link>` components instead of buttons

**Map Pins → Highlight:**
- User clicks on map pin → Highlights corresponding card ✅
- Map pins remain interactive buttons

**This creates a clear distinction:**
- **Cards = Primary action** (view details)
- **Map = Discovery/location context** (highlight on card list)

---

## Code Changes

### 1. YardCard Component (`src/components/search/YardCard.tsx`)

**Before:**
```tsx
export function YardCard({ yard, selectedYardId, onYardSelect }: YardCardProps) {
  return (
    <div
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onYardSelect(yard.id); // Only highlighted card
      }}
      ...
    >
```

**After:**
```tsx
export function YardCard({ yard, selectedYardId }: YardCardProps) {
  return (
    <Link
      href={`/listing/${yard.id}`} // Navigates to listing page
      aria-label={`View details for ${yard.name}...`}
      ...
    >
```

**Changes:**
- Converted `<div role="button">` to `<Link>`
- Removed `onClick` handler and `onYardSelect` callback
- Updated `aria-label` from "Select to highlight" to "View details for"
- Removed keyboard arrow navigation (Links handle this automatically)

### 2. Search Page (`app/search/page.tsx`)

**Before:**
```tsx
<YardCard
  key={yard.id}
  yard={yard}
  selectedYardId={selectedYardId}
  onYardSelect={handleYardSelect}
/>
```

**After:**
```tsx
<YardCard
  key={yard.id}
  yard={yard}
  selectedYardId={selectedYardId}
/>
```

**Changes:**
- Removed `onYardSelect` prop (no longer needed)
- `selectedYardId` still passed for visual highlight when pin is clicked

### 3. Happy Path Test (`tests/e2e/booking/happy-path.spec.ts`)

**Before:**
```tsx
const ridgeCreekCard = page.getByRole('button').filter({ hasText: 'Ridge Creek Yard' });
await expect(ridgeCreekCard).toBeVisible();

// Later...
await page.goto('/listing/ridge-creek'); // Manual navigation
```

**After:**
```tsx
const ridgeCreekCard = page.getByRole('link', { name: /view details for ridge creek yard/i });
await expect(ridgeCreekCard).toBeVisible();

// Later...
await ridgeCreekCard.click(); // Click the card to navigate!
```

**Changes:**
- Updated selector from `role="button"` to `role="link"`
- Used semantic selector with descriptive aria-label
- Actually clicks the card instead of manually navigating

---

## Map Pin Behavior (Unchanged)

Map pins **correctly** still highlight the corresponding card:

```tsx
// src/components/map/Map.tsx
function YardMarker({ yard, isSelected, onSelect }: YardMarkerProps) {
  return (
    <AdvancedMarker
      onClick={() => onSelect(yard.id)} // Highlights card
      ...
    >
      <Pin
        isSelected={isSelected}
        aria-label={`${yard.name} yard marker...`}
        ...
      />
    </AdvancedMarker>
  );
}
```

**Map Pin Interaction:**
1. User clicks map pin
2. `onSelect(yard.id)` called
3. `setSelectedYardId(yardId)` updates state
4. Card with matching ID gets highlighted border
5. Map centers on selected yard

This is the **correct** behavior for map pins - they help users find cards in the list.

---

## Accessibility Improvements

### Before (Button):
```
aria-label="Select Ridge Creek Yard to highlight on map. Price: $18 per hour. Fenced. Water access available."
role="button"
```

**Issues:**
- Confusing label (what does "select to highlight" mean?)
- Button role suggests action happens on this page
- Required custom keyboard handlers

### After (Link):
```
aria-label="View details for Ridge Creek Yard. Price: $18 per hour. Fenced. Water access available."
role="link"
```

**Improvements:**
- Clear action: "View details" = navigation expectation ✅
- Link role signals page navigation ✅
- Browser handles keyboard (Enter, Cmd+Click, right-click menu) ✅
- Screen readers announce as "link" correctly ✅

---

## User Experience Flow

### Complete User Journey:

1. **Search & Filter**
   - User visits `/search`
   - Applies filters ("Fully Fenced", "Water parks")
   - Sees 5 matching yards

2. **Discovery (Two Paths)**

   **Path A: List-first users**
   - Browse card list
   - Click card → Navigate to listing page ✅
   
   **Path B: Map-first users**
   - Explore map pins
   - Click pin → Card highlights in list ✅
   - Click highlighted card → Navigate to listing page ✅

3. **Booking**
   - On listing page: Select time, enter details
   - Review and confirm
   - Receive confirmation

---

## Testing

### Test Coverage:

✅ **Happy Path Test** - Updated and passing
- Verifies cards are links
- Clicks card to navigate
- Full flow: search → card click → listing → booking → confirmation

✅ **Keyboard Accessibility** - No regression
- Links are naturally keyboard accessible
- Enter key navigates
- Tab order preserved

✅ **Screen Readers** - Improved
- "View details for" is clearer than "Select to highlight"
- Link role announces navigation intent

---

## Migration Notes

### Breaking Changes:
- `YardCard` no longer accepts `onYardSelect` prop
- Card click now navigates instead of highlighting

### Non-Breaking:
- Map pin behavior unchanged
- `selectedYardId` prop still works (for visual highlight)
- Search page filtering unchanged
- Keyboard navigation works better (native link behavior)

### Backward Compatibility:
N/A - This is Phase 1, no existing users

---

## Conclusion

**The fix transforms the search experience from confusing to intuitive:**

Before: "Why does clicking this card only highlight it on the map?"  
After: "I click a card and see the details - perfect!" ✅

**This aligns with web conventions:**
- Cards in grid layouts are typically clickable links
- Maps show location/context, not primary navigation
- Links have better a11y support than custom button handlers

**Test Status:** All tests passing ✅

---

**Report Generated:** November 19, 2025  
**Files Modified:** 3  
**Tests Updated:** 1  
**User Impact:** Improved UX clarity and navigation flow
