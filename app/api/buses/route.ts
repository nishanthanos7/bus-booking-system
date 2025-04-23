import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bus } from '@/drizzle/schema';

export async function GET() {
  const buses = await db.select().from(bus);
  return NextResponse.json(buses);
}

export async function POST(request: Request) {
  const { operatorId, numberPlate, busModel, totalSeats } = await request.json();

  if (!operatorId || !numberPlate || !totalSeats) {
    return new Response('Missing required fields', { status: 400 });
  }

  const [newBus] = await db.insert(bus).values({ operatorId, numberPlate, busModel, totalSeats }).returning();
  return NextResponse.json(newBus, { status: 201 });
}
