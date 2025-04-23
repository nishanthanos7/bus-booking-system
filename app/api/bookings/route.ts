import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { booking } from '@/drizzle/schema';

export async function GET() {
  const bookings = await db.select().from(booking);
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const { userId, tripId, seatId, status } = await request.json();

  if (!userId || !tripId || !seatId) {
    return new Response('Missing required fields', { status: 400 });
  }

  const [newBooking] = await db.insert(booking).values({
    userId,
    tripId,
    seatId,
    status,
  }).returning();

  return NextResponse.json(newBooking, { status: 201 });
}
