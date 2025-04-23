// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { trip } from '@/drizzle/schema';

// export async function GET() {
//   const trips = await db.select().from(trip);
//   return NextResponse.json(trips);
// }

// export async function POST(request: Request) {
//   const { busId, routeId, departureTime, arrivalTime, price, availableSeats, status } = await request.json();

//   if (!busId || !routeId || !departureTime || !price || !availableSeats) {
//     return new Response('Missing required fields', { status: 400 });
//   }

//   const [newTrip] = await db.insert(trip).values({
//     busId,
//     routeId,
//     departureTime,
//     arrivalTime,
//     price,
//     availableSeats,
//     status,
//   }).returning();

//   return NextResponse.json(newTrip, { status: 201 });
// }


// import { user } from "@/drizzle/schema";
// import { db } from "@/lib/db";
// import { NextResponse, NextRequest } from "next/server";
// import { eq } from "drizzle-orm";
// import { trip, route } from "@/drizzle/schema";

// export async function GET(req: NextRequest) {
//   const tripId = req.nextUrl.searchParams.get("tripId");

//   try {
//     if (tripId) {
//       // Fetch single trip by ID
//       const trips = await db
//         .select({
//           id: trip.id,
//           departureTime: trip.departureTime,
//           arrivalTime: trip.arrivalTime,
//           price: trip.price,
//           availableSeats: trip.availableSeats,
//           route: {
//             startLocation: route.startLocation,
//             endLocation: route.endLocation,
//           },
//         })
//         .from(trip)
//         .innerJoin(route, eq(trip.routeId, route.id))
//         .where(eq(trip.id, tripId));

//       if (trips.length === 0) {
//         return NextResponse.json({ error: "Trip not found" }, { status: 404 });
//       }
//       return NextResponse.json(trips[0]); // Return single trip object
//     } else {
//       // Fetch all trips
//       const trips = await db
//         .select({
//           id: trip.id,
//           departureTime: trip.departureTime,
//           arrivalTime: trip.arrivalTime,
//           price: trip.price,
//           availableSeats: trip.availableSeats,
//           route: {
//             startLocation: route.startLocation,
//             endLocation: route.endLocation,
//           },
//         })
//         .from(trip)
//         .innerJoin(route, eq(trip.routeId, route.id));

//       return NextResponse.json(trips);
//     }
//   } catch (error) {
//     console.error("Error fetching trips:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch trips" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { fullName, email, phone, password, role } = await request.json();

//     if (!fullName || !email || !phone || !password) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const result = await db
//       .insert(user)
//       .values({
//         fullName,
//         email,
//         phone,
//         password,
//         role,
//       })
//       .returning();

//     return NextResponse.json({ success: true, user: result[0] });
//   } catch (error: any) {
//     console.error("Error creating user:", error);

//     if (error.message.includes("user_email_key")) {
//       return NextResponse.json(
//         { error: "Email already exists" },
//         { status: 409 }
//       );
//     }
//     if (error.message.includes("user_phone_key")) {
//       return NextResponse.json(
//         { error: "Phone already exists" },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Failed to create user" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trip, route, seat } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get('tripId');

  if (tripId) {
    try {
      const tripData = await db
        .select({
          trip: {
            id: trip.id,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            price: trip.price,
            availableSeats: trip.availableSeats,
            status: trip.status,
          },
          route: {
            startLocation: route.startLocation,
            endLocation: route.endLocation,
          },
        })
        .from(trip)
        .innerJoin(route, eq(trip.routeId, route.id))
        .where(eq(trip.id, tripId))
        .limit(1);

      if (!tripData[0]) {
        return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
      }

      const seats = await db
        .select({
          id: seat.id,
          seatNumber: seat.seatNumber,
          isBooked: seat.isBooked,
        })
        .from(seat)
        .where(eq(seat.tripId, tripId));

      return NextResponse.json({
        ...tripData[0].trip,
        route: tripData[0].route,
        seats,
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Failed to fetch trip' }, { status: 500 });
    }
  }

  // Default: return all trips
  const trips = await db.select().from(trip);
  return NextResponse.json(trips);
}
