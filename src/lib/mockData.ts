import type { Yard, YardSummary, Amenity } from './types';

/** Demo mock data shared across API routes */
// Generate availability for the next 30 days starting from Nov 13, 2025
function generateAvailabilitySlots(): ReadonlyArray<string> {
  const slots: string[] = [];
  
  // Start from November 13, 2025 (a known future date) for consistent testing
  const startDate = new Date('2025-11-13T00:00:00');
  
  // Generate slots for the next 30 days
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + dayOffset);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // Available time windows: 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM
    // Each represents a 2-hour window
    const availableHours = [8, 10, 12, 14, 16];
    
    for (const hour of availableHours) {
      slots.push(`${dateStr}T${hour.toString().padStart(2, '0')}:00:00`);
    }
  }
  
  return slots;
}

const availabilitySlots = generateAvailabilitySlots();

const YARDS = {
  'ridge-creek': {
    id: 'ridge-creek',
    name: 'Ridge Creek Yard',
    desc: 'Secure fencing and shade by the creek.',
    price: 18,
    lat: 47.61,
    lng: -122.33,
    fenced: true,
    water: true,
    amenities: ['Fenced', 'Shade', 'Water'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/ridge-1.jpg', '/photos/ridge-2.jpg'] as const,
    hostNotes: 'Please keep the gate latched.'
  },
  'meadow-shade': {
    id: 'meadow-shade',
    name: 'Meadow Shade Acre',
    desc: 'Open meadow with trees and privacy fence.',
    price: 15,
    lat: 47.63,
    lng: -122.31,
    fenced: true,
    water: false,
    amenities: ['Fenced', 'Shade'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/meadow-1.jpg'] as const,
    hostNotes: 'Park in the gravel area by the barn.'
  }
} as const;

export type YardId = keyof typeof YARDS;

export function isYardId(x: string): x is YardId {
  return x in YARDS;
}

export function getYard(id: YardId): Yard {
  // Safe because Yard now accepts readonly arrays
  return YARDS[id] as unknown as Yard;
}

export function listYards(): ReadonlyArray<Yard> {
  return Object.values(YARDS) as ReadonlyArray<Yard>;
}

export function listYardSummaries(): ReadonlyArray<YardSummary> {
  const ys = listYards();
  return ys.map<YardSummary>((y) => ({
    id: y.id,
    name: y.name,
    price: y.price,
    lat: y.lat,
    lng: y.lng,
    fenced: y.fenced,
    water: y.water
  }));
}
