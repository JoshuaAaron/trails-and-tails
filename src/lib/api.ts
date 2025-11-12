import axios from 'axios';
import {
  YardSchema,
  YardSummarySchema,
  BookingRequestSchema,
  BookingConfirmationSchema,
  HostApplicationSchema,
  HostApplicationResponseSchema
} from './types';

export async function getYards(params?: {
  lat?: number;
  lng?: number;
  radius?: number;
  fenced?: boolean;
  water?: boolean;
  price_min?: number;
  price_max?: number;
}) {
  const res = await axios.get('/api/yards', { params });
  const parsed = YardSummarySchema.array().parse(res.data);
  return parsed;
}

export async function getYard(id: string) {
  const res = await axios.get(`/api/yards/${encodeURIComponent(id)}`);
  const parsed = YardSchema.parse(res.data);
  return parsed;
}

export async function createBooking(input: {
  yardId: string;
  start: string;
  end: string;
  guestNotes?: string;
}) {
  const safe = BookingRequestSchema.parse(input);
  const res = await axios.post('/api/bookings', safe);
  const parsed = BookingConfirmationSchema.parse(res.data);
  return parsed;
}

export async function applyHost(input: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  yardSizeSqft?: number;
  fenced?: boolean;
  water?: boolean;
  notes?: string;
}) {
  const safe = HostApplicationSchema.parse(input);
  const res = await axios.post('/api/hosts/apply', safe);
  const parsed = HostApplicationResponseSchema.parse(res.data);
  return parsed;
}
