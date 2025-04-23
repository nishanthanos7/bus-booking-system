"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!form.email || !form.password) {
//       setError("Please fill in both fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Login failed");
//       }

//       // Redirect to home on success
//       router.push("/pages/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//         Login
//       </h1>

//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-lg p-6 space-y-4"
//       >
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && <div className="text-red-500 text-center">{error}</div>}
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// export default function LoginPage() {
//   const router = useRouter();

//   // Form state
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle login form submission
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!form.email || !form.password) {
//       setError("Please fill in both fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Sending login request to API
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Login failed");
//       }

//       // Redirect on successful login
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message); // Display error message if login fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <Card className="shadow-lg rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-indigo-600 mb-4">
//             Login
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <Input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {error && (
//               <div className="text-red-500 text-center mt-2">{error}</div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export default function LoginPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!form.email || !form.password) {
//       setError('Please fill in both fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Login failed');
//       }

//       router.push('/');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">
//       <Card className="w-full max-w-md bg-gray-900 shadow-xl rounded-xl border border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-4xl font-extrabold text-center text-white tracking-wide">
//             Login
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-5">
//             <Input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
//             />
//             <Input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
//             />

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold tracking-wide shadow-lg"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             {error && (
//               <div className="text-red-500 text-center font-medium">{error}</div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export default function LoginPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!form.email || !form.password) {
//       setError('Please fill in both fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Login failed');
//       }

//       router.push('/');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-6">
//       <Card className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-300">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-black tracking-tight">
//             Login
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <Input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />
//             <Input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black hover:bg-gray-900 text-white font-semibold tracking-wide shadow-sm"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             {error && (
//               <div className="text-red-600 text-center font-medium">{error}</div>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.email || !form.password) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await res.json();
      // Assuming API returns user object with id
      const userId = data.user?.id;
      if (!userId) throw new Error('User ID not found');

      // Redirect to dashboard with userId as query param
      router.push(`/pages/dashboard?id=${userId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-black tracking-tight">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold tracking-wide shadow-sm"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {error && (
              <div className="text-red-600 text-center font-medium">{error}</div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
