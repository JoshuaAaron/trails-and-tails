import { NextResponse } from 'next/server';
import { BookingRequestSchema } from '@/lib/types';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const parsed = BookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid booking payload' }, { status: 400 });
  }

  // Simple demo: pretend the slot is available and confirm
  const confirmationId = 'BB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  return NextResponse.json({ ok: true, confirmationId });
}
