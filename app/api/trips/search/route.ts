import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trip, route } from '@/drizzle/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startLocation = searchParams.get('startLocation');
  const endLocation = searchParams.get('endLocation');
  const date = searchParams.get('date');

  if (!startLocation || !endLocation || !date) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const trips = await db
    .select()
    .from(trip)
    .innerJoin(route, eq(trip.routeId, route.id))
    .where(
      and(
        eq(route.startLocation, startLocation),
        eq(route.endLocation, endLocation),
        gte(trip.departureTime, startOfDay),
        lte(trip.departureTime, endOfDay),
        eq(trip.status, 'SCHEDULED')
      )
    );

  return NextResponse.json(trips);
}