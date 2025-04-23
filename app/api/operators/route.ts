import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { operator } from '@/drizzle/schema';



//get method

export async function GET() {
  const operators = await db.select().from(operator);
  return NextResponse.json(operators);
}



//post method for operator

export async function POST(request: Request) {
  const { fullName, contact, email, logoUrl } = await request.json();

  if (!fullName) return new Response('Missing fullName', { status: 400 });

  const [newOperator] = await db.insert(operator).values({ fullName, contact, email, logoUrl }).returning();
  return NextResponse.json(newOperator, { status: 201 });
}
