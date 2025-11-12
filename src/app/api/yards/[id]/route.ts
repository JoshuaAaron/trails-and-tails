import { NextResponse } from 'next/server';
import { isYardId, getYard } from '@/lib/mockData';
import type { Yard } from '@/lib/types';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!isYardId(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const yard: Yard = getYard(id);
  return NextResponse.json(yard);
}
