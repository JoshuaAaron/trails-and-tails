import { NextResponse } from 'next/server';
import { HostApplicationSchema } from '@/lib/types';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = HostApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid host application' }, { status: 400 });
  }

  // Demo: return a ticket id
  return NextResponse.json({ ok: true, ticket: 'HOST-' + Date.now() });
}
