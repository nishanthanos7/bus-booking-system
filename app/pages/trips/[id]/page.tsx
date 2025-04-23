// 'use client';

// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// export default function TripDetailsPage() {
//     const searchParams = useSearchParams();
//     const tripId = searchParams.get('id');

//   const [trip, setTrip] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function fetchTripDetails() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`/api/trips?tripId=${tripId}`); // Construct URL with query param
//       if (!res.ok) throw new Error('Failed to fetch trip details');
//       const data = await res.json();
//       setTrip(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Trip Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Button onClick={fetchTripDetails} disabled={loading}>
//             {loading ? 'Loading...' : 'Show Trip Details'}
//           </Button>
//           {error && <p className="text-red-500">{error}</p>}
//           {trip && (
//             <div className="mt-4">
//               <p>Route: {trip.route.startLocation} to {trip.route.endLocation}</p>
//               <p>Departure: {trip.departureTime}</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// UUID validation helper
function isUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export default function TripDetailsPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('id');

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTripDetails() {
    if (!tripId || !isUUID(tripId)) {
      setError('Invalid or missing trip ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/trips?tripId=${tripId}`);
      if (!res.ok) throw new Error('Failed to fetch trip details');
      const data = await res.json();
      setTrip(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Optional: Auto-fetch trip details when page loads
  useEffect(() => {
    if (tripId && isUUID(tripId)) {
      fetchTripDetails();
    }
  }, [tripId]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchTripDetails} disabled={loading || !tripId || !isUUID(tripId)}>
            {loading ? 'Loading...' : 'Show Trip Details'}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {trip && (
            <div className="mt-4 space-y-2">
              <p>Route: {trip.route?.startLocation} to {trip.route?.endLocation}</p>
              <p>Departure: {trip.departureTime}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
