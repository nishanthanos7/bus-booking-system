// "use client";

// import React from "react";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-4 text-gray-800">
//         Welcome to Your Dashboard
//       </h1>
//       <p className="text-gray-600 mb-8">
//         This is a simple dashboard for the bus booking system.
//       </p>
//       <button
//         onClick={() => alert("Feature coming soon!")}
//         className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//       >
//         Book a Bus
//       </button>
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// export default function DashboardPage() {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get('id');

//   const [user, setUser] = useState<{
//     id: string;
//     fullName: string;
//     email: string;
//     phone: string;
//     role: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId) {
//       setError('User ID is missing in URL');
//       return;
//     }

//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/users/${userId}`);
//         if (!res.ok) throw new Error('Failed to fetch user data');
//         const data = await res.json();
//         setUser(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-6">
//       <Card className="w-full max-w-lg bg-white shadow-md rounded-lg border border-gray-300">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-black tracking-tight">
//             Dashboard
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading && <p className="text-center text-gray-600">Loading user data...</p>}

//           {error && (
//             <p className="text-center text-red-600 font-medium">{error}</p>
//           )}

//           {user && (
//             <div className="space-y-4 text-black">
//               <p>
//                 <strong>Full Name:</strong> {user.fullName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {user.phone}
//               </p>
//               <p>
//                 <strong>Role:</strong> {user.role}
//               </p>
//               <Button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-black hover:bg-gray-900 text-white w-full"
//               >
//                 Refresh
//               </Button>
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

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUser() {
    if (!userId) {
      setError('User ID is missing in URL');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-white shadow-md rounded-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-black tracking-tight">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user && (
            <Button
              onClick={fetchUser}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white"
            >
              {loading ? 'Loading...' : 'Load User Data'}
            </Button>
          )}

          {loading && user && (
            <p className="text-center text-gray-600">Loading user data...</p>
          )}

          {error && <p className="text-center text-red-600 font-medium">{error}</p>}

          {user && (
            <div className="space-y-4 text-black">
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <Button
                onClick={fetchUser}
                disabled={loading}
                className="mt-4 bg-black hover:bg-gray-900 text-white w-full"
              >
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
