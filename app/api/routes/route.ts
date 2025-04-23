import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { route } from '@/drizzle/schema';

export async function GET() {
  const routes = await db.select().from(route);
  return NextResponse.json(routes);
}

export async function POST(request: Request) {
  const { startLocation, endLocation, distanceKm, estimatedTime } = await request.json();

  if (!startLocation || !endLocation) {
    return new Response('Missing required fields', { status: 400 });
  }

  const [newRoute] = await db.insert(route).values({
    startLocation,
    endLocation,
    distanceKm,
    estimatedTime,
  }).returning();

  return NextResponse.json(newRoute, { status: 201 });
}
