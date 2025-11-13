import { NextResponse } from 'next/server';
import { listYardSummaries } from '@/lib/mockData';
import type { YardSummary } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const fencedParam = searchParams.get('fenced');
  const waterParam = searchParams.get('water');
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');

  let items: YardSummary[] = [...listYardSummaries()];

  if (fencedParam !== null) {
    const val = fencedParam === 'true';
    items = items.filter((y) => y.fenced === val);
  }
  if (waterParam !== null) {
    const val = waterParam === 'true';
    items = items.filter((y) => y.water === val);
  }
  if (priceMin !== null) {
    const min = Number(priceMin);
    if (!Number.isNaN(min)) items = items.filter((y) => y.price >= min);
  }
  if (priceMax !== null) {
    const max = Number(priceMax);
    if (!Number.isNaN(max)) items = items.filter((y) => y.price <= max);
  }

  return NextResponse.json(items);
}
