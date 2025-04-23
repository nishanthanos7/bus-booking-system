// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { trip, route, seat } from '@/drizzle/schema';
// import { eq } from 'drizzle-orm';

// export async function GET(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split('/').pop(); // Get the last segment which is the ID

//     if (!id) {
//       return NextResponse.json({ error: 'Missing trip ID' }, { status: 400 });
//     }

//     const tripData = await db
//       .select({
//         trip: {
//           id: trip.id,
//           departureTime: trip.departureTime,
//           arrivalTime: trip.arrivalTime,
//           price: trip.price,
//           availableSeats: trip.availableSeats,
//           status: trip.status,
//         },
//         route: {
//           startLocation: route.startLocation,
//           endLocation: route.endLocation,
//         },
//       })
//       .from(trip)
//       .innerJoin(route, eq(trip.routeId, route.id))
//       .where(eq(trip.id, id))
//       .limit(1);

//     if (!tripData[0]) {
//       return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
//     }

//     const seats = await db
//       .select({
//         id: seat.id,
//         seatNumber: seat.seatNumber,
//         isBooked: seat.isBooked,
//       })
//       .from(seat)
//       .where(eq(seat.tripId, id));

//     return NextResponse.json({
//       trip: tripData[0],
//       seats,
//     });
//   } catch (error) {
//     console.error('Error fetching trip:', error);
//     return NextResponse.json({ error: 'Failed to fetch trip' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trip } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get('tripId');

  // If tripId is provided and is a valid UUID
  if (tripId && isValidUUID(tripId)) {
    try {
      const tripData = await db.select().from(trip).where(eq(trip.id, tripId));
      return NextResponse.json(tripData.length > 0 ? tripData[0] : null);
    } catch (err) {
      return new Response('Error fetching trip', { status: 500 });
    }
  } else {
    // If tripId is not provided, return all trips
    const allTrips = await db.select().from(trip);
    return NextResponse.json(allTrips);
  }
}

// Helper to validate UUID format
function isValidUUID(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}
