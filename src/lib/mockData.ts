import type { Yard, YardSummary, Amenity } from './types';

/** Demo mock data shared across API routes */
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
    amenities: ['Fenced', 'Shade', 'Water'] as Amenity[],
    slots: ['2025-11-13T10:00', '2025-11-13T12:00'],
    photos: ['/photos/ridge-1.jpg', '/photos/ridge-2.jpg'],
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
    amenities: ['Fenced', 'Shade'] as Amenity[],
    slots: ['2025-11-13T09:00', '2025-11-13T11:00'],
    photos: ['/photos/meadow-1.jpg'],
    hostNotes: 'Park in the gravel area by the barn.'
  }
} as const;

export type YardId = keyof typeof YARDS;

export function isYardId(x: string): x is YardId {
  return x in YARDS;
}

export function getYard(id: YardId): Yard {
  return YARDS[id];
}

export function listYards(): Yard[] {
  return Object.values(YARDS) as Yard[];
}

export function listYardSummaries(): YardSummary[] {
  return listYards().map((y) => ({
    id: y.id,
    name: y.name,
    price: y.price,
    lat: y.lat,
    lng: y.lng,
    fenced: y.fenced,
    water: y.water
  }));
}
