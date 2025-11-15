import { z } from 'zod';

/** ---------- Core domain types ---------- */

export type Amenity =
  | 'Fenced'
  | 'Shade'
  | 'Water'
  | 'Lighting'
  | 'Parking'
  | 'PrivateEntrance'
  | 'Beach'
  | 'Pool'
  | 'Lake'
  | 'Agility'
  | 'Equipment'
  | 'SmallDogFriendly'
  | 'HikingTrails'
  | 'Indoor'
  | 'Climate'
  | 'Restroom';

export type IsoDateTime = string; // e.g., 2025-11-13T10:00

export interface AvailabilitySlot {
  start: IsoDateTime;
  end: IsoDateTime;
}

export interface YardSummary {
  id: string;
  name: string;
  price: number; // hourly USD
  lat: number;
  lng: number;
  fenced: boolean;
  water: boolean;
  acres: number;
  amenities?: ReadonlyArray<Amenity>;
}

export interface Yard extends YardSummary {
  desc: string;
  amenities: ReadonlyArray<Amenity>;
  slots: ReadonlyArray<IsoDateTime>;     // <-- readonly
  photos?: ReadonlyArray<string>;        // <-- readonly
  hostNotes?: string;
}

export interface BookingRequest {
  yardId: string;
  start: IsoDateTime;
  end: IsoDateTime;
  guestNotes?: string;
  guests?: number;
  dogNames?: ReadonlyArray<string>;
}

export interface BookingConfirmation {
  ok: true;
  confirmationId: string;
}

export interface ApiError {
  error: string;
}

export interface HostApplication {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  yardSizeSqft?: number;
  fenced?: boolean;
  water?: boolean;
  notes?: string;
}

export interface HostApplicationResponse {
  ok: true;
  ticket: string;
}

/** ---------- Zod schemas (runtime validation) ---------- */

export const YardSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  lat: z.number(),
  lng: z.number(),
  fenced: z.boolean(),
  water: z.boolean(),
  acres: z.number()
});

export const YardSchema: z.ZodType<Yard> = YardSummarySchema.extend({
  desc: z.string(),
  amenities: z.array(
    z.enum([
      'Fenced',
      'Shade',
      'Water',
      'Lighting',
      'Parking',
      'PrivateEntrance',
      'Beach',
      'Pool',
      'Lake',
      'Agility',
      'Equipment',
      'SmallDogFriendly',
      'HikingTrails',
      'Indoor',
      'Climate',
      'Restroom'
    ])
  ),
  slots: z.array(z.string()),
  photos: z.array(z.string()).optional(),
  hostNotes: z.string().optional()
});

export const BookingRequestSchema: z.ZodType<BookingRequest> = z.object({
  yardId: z.string(),
  start: z.string(),
  end: z.string(),
  guestNotes: z.string().optional(),
  guests: z.number().optional(),
  dogNames: z.array(z.string()).optional()
});

export const BookingConfirmationSchema: z.ZodType<BookingConfirmation> = z.object({
  ok: z.literal(true),
  confirmationId: z.string()
});

export const ApiErrorSchema: z.ZodType<ApiError> = z.object({
  error: z.string()
});

export const HostApplicationSchema: z.ZodType<HostApplication> = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  yardSizeSqft: z.number().optional(),
  fenced: z.boolean().optional(),
  water: z.boolean().optional(),
  notes: z.string().optional()
});

export const HostApplicationResponseSchema: z.ZodType<HostApplicationResponse> =
  z.object({
    ok: z.literal(true),
    ticket: z.string()
  });
