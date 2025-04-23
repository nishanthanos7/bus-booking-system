import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seat } from '@/drizzle/schema';

export async function GET() {
  const seats = await db.select().from(seat);
  return NextResponse.json(seats);
}

export async function POST(request: Request) {
  const { tripId, seatNumber, isBooked } = await request.json();

  if (!tripId || !seatNumber) {
    return new Response('Missing required fields', { status: 400 });
  }

  const [newSeat] = await db.insert(seat).values({
    tripId,
    seatNumber,
    isBooked: isBooked ?? false,
  }).returning();

  return NextResponse.json(newSeat, { status: 201 });
}
