import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payment } from '@/drizzle/schema';

export async function GET() {
  const payments = await db.select().from(payment);
  return NextResponse.json(payments);
}

export async function POST(request: Request) {
  const { bookingId, amount, method, status } = await request.json();

  if (!bookingId || !amount || !method) {
    return new Response('Missing required fields', { status: 400 });
  }

  const [newPayment] = await db.insert(payment).values({
    bookingId,
    amount,
    method,
    status,
  }).returning();

  return NextResponse.json(newPayment, { status: 201 });
}
