// 'use client';

// import { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default function TripsPage() {
//   const [trips, setTrips] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function fetchTrips() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/trips');
//       if (!res.ok) throw new Error('Failed to fetch trips');
//       const data = await res.json();
//       setTrips(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Available Trips</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Button onClick={fetchTrips} disabled={loading}>
//             {loading ? 'Loading...' : 'Show Trips'}
//           </Button>
//           {error && <p className="text-red-500">{error}</p>}
//           {trips.length > 0 && (
//             <ul className="mt-4">
//               {trips.map(trip => (
//                 <li key={trip.id} className="py-2 border-b">
//                   {trip.route.startLocation} to {trip.route.endLocation} - {trip.departureTime}
//                   <Link href={`/pages/book-trip?tripId=${trip.id}`}>
//                     <Button size="sm" className="ml-2">Book Trip</Button>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




'use client';

import { useState } from 'react';
import Link from 'next/link';
// import SeatSelector from '@/components/SeatSelector';

export default function TripDetails({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<any>(null);
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/trips/${params.id}`);
      if (!res.ok) throw new Error('Failed to fetch trip');
      const data = await res.json();
      setTrip(data.trip);
      setSeats(data.seats);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <button
          onClick={fetchTrip}
          disabled={loading}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load Trip Details'}
        </button>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {trip && (
          <>
            <h1 className="text-2xl font-bold mb-4">
              {trip.route.startLocation} to {trip.route.endLocation}
            </h1>
            <p className="text-gray-600 mb-2">
              Departure: {new Date(trip.trip.departureTime).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">Price: NPR {trip.trip.price}</p>
            <p className="text-gray-600 mb-4">Available Seats: {trip.trip.availableSeats}</p>
            <SeatSelector seats={seats} tripId={params.id} />
            <Link href={`/trips/${params.id}/booking`}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Proceed to Booking
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}