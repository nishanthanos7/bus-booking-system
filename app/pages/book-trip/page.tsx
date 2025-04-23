// 'use client';

// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// export default function BookTripPage() {
//   const searchParams = useSearchParams();
//   const tripId = searchParams.get('tripId'); // get tripId from URL

//   const [trip, setTrip] = useState<any>(null);
//   const [loadingTrip, setLoadingTrip] = useState(false);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

//   // Fetch trip details by tripId
//   async function fetchTripDetails() {
//     if (!tripId) {
//       setError('No trip ID provided');
//       return;
//     }

//     setLoadingTrip(true);
//     setError(null);
//     setBookingSuccess(null);

//     try {
//       const res = await fetch(`/api/trips?tripId=${tripId}`);
//       if (!res.ok) throw new Error('Failed to fetch trip details');
//       const data = await res.json();
//       setTrip(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoadingTrip(false);
//     }
//   }

//   // Handle booking the trip
//   async function handleBookTrip() {
//     if (!tripId) {
//       setError('No trip ID provided');
//       return;
//     }

//     setBookingLoading(true);
//     setError(null);
//     setBookingSuccess(null);

//     try {
//       // Example booking payload - adjust as per your API
//       const bookingPayload = {
//         tripId,
//         // You can add userId or other booking details here
//       };

//       const res = await fetch('/api/bookings', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookingPayload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Booking failed');
//       }

//       const data = await res.json();
//       setBookingSuccess('Booking successful! Your booking ID: ' + data.id);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setBookingLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Book Trip</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {!trip && (
//             <Button onClick={fetchTripDetails} disabled={loadingTrip}>
//               {loadingTrip ? 'Loading trip details...' : 'Load Trip Details'}
//             </Button>
//           )}

//           {error && <p className="text-red-600 mt-4">{error}</p>}

//           {trip && (
//             <div className="space-y-4">
//               <p>
//                 <strong>Route:</strong> {trip.route.startLocation} → {trip.route.endLocation}
//               </p>
//               <p>
//                 <strong>Departure:</strong> {new Date(trip.departureTime).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Arrival:</strong>{' '}
//                 {trip.arrivalTime ? new Date(trip.arrivalTime).toLocaleString() : 'N/A'}
//               </p>
//               <p>
//                 <strong>Price:</strong> ${trip.price}
//               </p>
//               <p>
//                 <strong>Available Seats:</strong> {trip.availableSeats}
//               </p>

//               <Button onClick={handleBookTrip} disabled={bookingLoading || trip.availableSeats === 0}>
//                 {bookingLoading ? 'Booking...' : trip.availableSeats === 0 ? 'Sold Out' : 'Confirm Booking'}
//               </Button>

//               {bookingSuccess && <p className="text-green-600 mt-2">{bookingSuccess}</p>}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BookTripPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId');

  const [trip, setTrip] = useState<any>(null);
  const [loadingTrip, setLoadingTrip] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  async function fetchTripDetails() {
    if (!tripId) {
      setError('No trip ID provided');
      return;
    }

    setLoadingTrip(true);
    setError(null);
    setBookingSuccess(null);

    try {
      const res = await fetch(`/api/trips?tripId=${tripId}`);
      if (!res.ok) throw new Error('Failed to fetch trip details');
      const data = await res.json();
      setTrip(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingTrip(false);
    }
  }

  async function handleBookTrip() {
    if (!tripId) {
      setError('No trip ID provided');
      return;
    }

    setBookingLoading(true);
    setError(null);
    setBookingSuccess(null);

    try {
      const bookingPayload = { tripId };
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Booking failed');
      }

      const data = await res.json();
      setBookingSuccess('Booking successful! Your booking ID: ' + data.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Book Trip</CardTitle>
        </CardHeader>
        <CardContent>
          {!trip && (
            <Button onClick={fetchTripDetails} disabled={loadingTrip}>
              {loadingTrip ? 'Loading trip details...' : 'Load Trip Details'}
            </Button>
          )}

          {error && <p className="text-red-600 mt-4">{error}</p>}

          {trip && (
            <div className="space-y-4">
              <p>
                <strong>Route:</strong> {trip.route.startLocation} → {trip.route.endLocation}
              </p>
              <p>
                <strong>Departure:</strong> {new Date(trip.departureTime).toLocaleString()}
              </p>
              <p>
                <strong>Arrival:</strong>{' '}
                {trip.arrivalTime ? new Date(trip.arrivalTime).toLocaleString() : 'N/A'}
              </p>
              <p>
                <strong>Price:</strong> ${trip.price}
              </p>
              <p>
                <strong>Available Seats:</strong> {trip.availableSeats}
              </p>

              <Button onClick={handleBookTrip} disabled={bookingLoading || trip.availableSeats === 0}>
                {bookingLoading ? 'Booking...' : trip.availableSeats === 0 ? 'Sold Out' : 'Confirm Booking'}
              </Button>

              {bookingSuccess && <p className="text-green-600 mt-2">{bookingSuccess}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
