import { NextResponse } from 'next/server';
import { BookingRequestSchema } from '@/lib/types';
import { isYardId, getYard } from '@/lib/mockData';
import { isWithinSlots } from '@/lib/availability';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Validate JSON payload structure
  const parsed = BookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
    return NextResponse.json({ 
      error: `Invalid booking payload: ${errorMessages.join(', ')}` 
    }, { status: 400 });
  }

  const { yardId, start, end, guestNotes, guests, dogNames } = parsed.data;

  // Validate yard exists
  if (!isYardId(yardId)) {
    return NextResponse.json({ 
      error: 'Yard not found' 
    }, { status: 404 });
  }

  const yard = getYard(yardId);

  // Validate date/time format and convert to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return NextResponse.json({ 
      error: 'Invalid date format. Please use ISO datetime strings.' 
    }, { status: 400 });
  }

  // Validate start < end
  if (startDate >= endDate) {
    return NextResponse.json({ 
      error: 'Start time must be before end time' 
    }, { status: 400 });
  }

  // Validate duration (30-180 minutes)
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationMin = durationMs / (1000 * 60);
  
  if (durationMin < 30) {
    return NextResponse.json({ 
      error: 'Minimum booking duration is 30 minutes' 
    }, { status: 400 });
  }
  
  if (durationMin > 180) {
    return NextResponse.json({ 
      error: 'Maximum booking duration is 180 minutes (3 hours)' 
    }, { status: 400 });
  }

  // Validate booking is not in the past
  const now = new Date();
  if (startDate < now) {
    return NextResponse.json({ 
      error: 'Cannot book times in the past' 
    }, { status: 400 });
  }

  // Validate against yard availability and time grid rules
  if (!isWithinSlots(yard, start, end)) {
    return NextResponse.json({ 
      error: 'Selected time slot is not available. Please ensure your booking falls within available hours and uses 30-minute intervals.' 
    }, { status: 400 });
  }

  // Validate guest count
  if (guests !== undefined && (guests < 1 || guests > 10)) {
    return NextResponse.json({ 
      error: 'Number of dogs must be between 1 and 10' 
    }, { status: 400 });
  }

  // Validate dog names array (if provided)
  if (dogNames !== undefined && dogNames.some(name => typeof name !== 'string' || name.trim().length === 0)) {
    return NextResponse.json({ 
      error: 'Dog names must be non-empty strings' 
    }, { status: 400 });
  }

  // In a real implementation, you would:
  // 1. Check for actual availability conflicts with existing bookings
  // 2. Store the booking in a database
  // 3. Send confirmation emails
  // 4. Handle payment processing
  
  // For now, simulate a successful booking
  const confirmationId = 'BB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  
  return NextResponse.json({ 
    ok: true, 
    confirmationId 
  });
}
