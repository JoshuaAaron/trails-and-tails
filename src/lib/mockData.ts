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
    lat: 47.6062,
    lng: -122.3321,
    fenced: true,
    water: true,
    acres: 0.75,
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
    lat: 47.6588,
    lng: -117.4260,
    fenced: true,
    water: false,
    acres: 1.2,
    amenities: ['Fenced', 'Shade'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/meadow-1.jpg'] as const,
    hostNotes: 'Park in the gravel area by the barn.'
  },
  'tacoma-trails': {
    id: 'tacoma-trails',
    name: 'Tacoma Trail Access',
    desc: 'Large fenced area near hiking trails.',
    price: 22,
    lat: 47.2529,
    lng: -122.4443,
    fenced: true,
    water: true,
    acres: 2.0,
    amenities: ['Fenced', 'Water', 'Parking'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/tacoma-1.jpg'] as const,
    hostNotes: 'Trail access right next to the yard!'
  },
  'bellingham-bay': {
    id: 'bellingham-bay',
    name: 'Bellingham Bay View',
    desc: 'Scenic yard with water views and shade.',
    price: 25,
    lat: 48.7519,
    lng: -122.4787,
    fenced: true,
    water: false,
    acres: 1.5,
    amenities: ['Fenced', 'Shade', 'PrivateEntrance'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/bellingham-1.jpg', '/photos/bellingham-2.jpg'] as const,
    hostNotes: 'Beautiful bay views from the yard.'
  },
  'ocean-beach': {
    id: 'ocean-beach',
    name: 'Ocean Beach Paradise',
    desc: 'Beachfront access for water-loving dogs.',
    price: 35,
    lat: 47.9073,
    lng: -124.1707,
    fenced: false,
    water: true,
    acres: 0.25,
    amenities: ['Water', 'Beach'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/beach-1.jpg'] as const,
    hostNotes: 'Beach access available. No fencing - supervision required.'
  },
  'evergreen-field': {
    id: 'evergreen-field',
    name: 'Evergreen Open Field',
    desc: 'Massive open field perfect for running.',
    price: 12,
    lat: 47.4698,
    lng: -122.2331,
    fenced: false,
    water: false,
    acres: 5.0,
    amenities: ['Parking'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/field-1.jpg'] as const,
    hostNotes: 'Wide open space - bring your own water.'
  },
  'swimming-cove': {
    id: 'swimming-cove',
    name: 'Swimming Cove Resort',
    desc: 'Private pool and lake access for dogs.',
    price: 45,
    lat: 47.6205,
    lng: -121.9831,
    fenced: true,
    water: true,
    acres: 0.8,
    amenities: ['Fenced', 'Water', 'Pool', 'Lake'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/pool-1.jpg'] as const,
    hostNotes: 'Both pool and lake swimming available!'
  },
  'agility-training': {
    id: 'agility-training',
    name: 'Agility Training Ground',
    desc: 'Professional agility equipment setup.',
    price: 28,
    lat: 47.5480,
    lng: -122.1344,
    fenced: true,
    water: false,
    acres: 0.6,
    amenities: ['Fenced', 'Agility', 'Equipment'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/agility-1.jpg'] as const,
    hostNotes: 'Full agility course with jumps, tunnels, and weaves.'
  },
  'small-dog-haven': {
    id: 'small-dog-haven',
    name: 'Small Dog Haven',
    desc: 'Specially designed for dogs under 25 lbs.',
    price: 20,
    lat: 47.6740,
    lng: -122.2181,
    fenced: true,
    water: false,
    acres: 0.3,
    amenities: ['Fenced', 'SmallDogFriendly', 'Shade'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/small-1.jpg'] as const,
    hostNotes: 'Perfect size for little pups. Low fence height.'
  },
  'hiking-basecamp': {
    id: 'hiking-basecamp',
    name: 'Hiking Trail Basecamp',
    desc: 'Secure staging area for mountain hikes.',
    price: 16,
    lat: 47.4502,
    lng: -121.4779,
    fenced: true,
    water: true,
    acres: 1.0,
    amenities: ['Fenced', 'Water', 'HikingTrails', 'Parking'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/hiking-1.jpg'] as const,
    hostNotes: 'Trail access to Mount Baker National Forest.'
  },
  'indoor-pavilion': {
    id: 'indoor-pavilion',
    name: 'Indoor Play Pavilion',
    desc: 'Weather-protected indoor play space.',
    price: 30,
    lat: 47.6097,
    lng: -122.3331,
    fenced: true,
    water: false,
    acres: 0.4,
    amenities: ['Fenced', 'Indoor', 'Climate'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/indoor-1.jpg'] as const,
    hostNotes: 'Climate controlled space for all weather play.'
  },
  'luxury-estate': {
    id: 'luxury-estate',
    name: 'Luxury Estate Grounds',
    desc: 'Premium fenced estate with all amenities.',
    price: 60,
    lat: 47.6219,
    lng: -122.3563,
    fenced: true,
    water: true,
    acres: 3.5,
    amenities: ['Fenced', 'Water', 'Pool', 'Agility', 'Shade', 'Parking', 'Restroom'] as const satisfies ReadonlyArray<Amenity>,
    slots: availabilitySlots,
    photos: ['/photos/luxury-1.jpg'] as const,
    hostNotes: 'Premium experience with all amenities included.'
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
    id: y.id.toString(),
    name: y.name,
    price: y.price,
    lat: y.lat,
    lng: y.lng,
    fenced: y.fenced,
    water: y.water,
    acres: y.acres,
    amenities: y.amenities
  }));
}

export const mockYards = listYardSummaries();
