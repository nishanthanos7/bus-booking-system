// "use client"

// import React, { useState } from 'react';

// export default function SignUp() {
//   const [fullName, setFullName] = useState('');
//   const [contact, setContact] = useState('');
//   const [email, setEmail] = useState('');
//   const [logoUrl, setLogoUrl] = useState('');
//   const [error, setError] = useState(null);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!fullName) {
//       setError('Please enter your full name.');
//       return;
//     }

//     const url = '/api/operators'; // Assuming your API endpoint is at /api/operators
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ fullName, contact, email, logoUrl }),
//       });

//       if (response.ok) {
//         setError(null);
//         setFullName('');
//         setContact('');
//         setEmail('');
//         setLogoUrl('');
//         alert('Registration successful!');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to register');
//       }
//     } catch (error) {
//       setError('Error occurred while submitting form.');
//     }
//   }

//   return (
//     <div className="signUpForm">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Contact:
//           <input
//             type="tel"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Logo URL:
//           <input
//             type="url"
//             value={logoUrl}
//             onChange={(e) => setLogoUrl(e.target.value)}
//           />
//         </label>
//         <br />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";

// export default function UsersPage() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "PASSENGER",
//   });
//   const [error, setError] = useState<string | null>(null);

//   // Fetch users (async/await, called on demand)
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/users");
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submit (async/await POST)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || "Failed to create user");
//       }
//       setForm({ fullName: "", email: "", phone: "", password: "", role: "PASSENGER" });
//       await fetchUsers();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Users</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 flex flex-col gap-4"
//       >
//         <input
//           name="fullName"
//           type="text"
//           placeholder="Full Name"
//           value={form.fullName}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full"
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full"
//         />
//         <input
//           name="phone"
//           type="text"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="input input-bordered w-full"
//         />
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="select select-bordered w-full"
//         >
//           <option value="PASSENGER">Passenger</option>
//           <option value="ADMIN">Admin</option>
//           <option value="AGENT">Agent</option>
//         </select>
//         <button
//           type="submit"
//           disabled={loading}
//           className="btn btn-primary w-full"
//         >
//           {loading ? "Processing..." : "Create User"}
//         </button>
//         {error && <div className="text-red-500 text-center">{error}</div>}
//       </form>

//       <button
//         onClick={fetchUsers}
//         className="btn btn-outline btn-accent w-full mb-4"
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Show Users"}
//       </button>

//       <ul className="divide-y divide-gray-200 bg-white rounded shadow">
//         {users.length === 0 && (
//           <li className="p-4 text-center text-gray-400">No users loaded.</li>
//         )}
//         {users.map((user) => (
//           <li key={user.id} className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2">
//             <span className="font-semibold">{user.fullName}</span>
//             <span className="text-gray-600">{user.email}</span>
//             <span className="text-gray-600">{user.phone}</span>
//             <span className="text-blue-500">{user.role}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";

// export default function UsersPage() {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "PASSENGER",
//   });
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Users
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/users");
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit New User
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Something went wrong.");
//       }

//       setForm({
//         fullName: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "PASSENGER",
//       });

//       await fetchUsers();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Input Changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">User Registration</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-6 space-y-4"
//       >
//         <div className="grid grid-cols-1 gap-4">
//           <input
//             name="fullName"
//             type="text"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//           />
//           <input
//             name="phone"
//             type="tel"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full border-gray-300 rounded px-4 py-2"
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="select select-bordered w-full border-gray-300 rounded px-4 py-2"
//           >
//             <option value="PASSENGER">Passenger</option>
//             <option value="ADMIN">Admin</option>
//             <option value="AGENT">Agent</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
//           disabled={loading}
//         >
//           {loading ? "Creating..." : "Create User"}
//         </button>

//         {error && (
//           <div className="text-red-500 text-center mt-2">{error}</div>
//         )}
//       </form>

//       <div className="mt-8">
//         <button
//           onClick={fetchUsers}
//           disabled={loading}
//           className="btn w-full border border-indigo-500 text-indigo-600 hover:bg-indigo-100 py-2 rounded transition"
//         >
//           {loading ? "Loading users..." : "Show All Users"}
//         </button>
//       </div>

//       <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
//         {users.length === 0 ? (
//           <p className="text-center text-gray-500 p-4">No users to display.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm"
//               >
//                 <span className="font-medium text-gray-900">{user.fullName}</span>
//                 <span className="text-gray-600">{user.email}</span>
//                 <span className="text-gray-600">{user.phone}</span>
//                 <span className="text-indigo-500">{user.role}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
// } from '@/components/ui/select'
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     role: 'PASSENGER',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle signup form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!form.fullName || !form.email || !form.password || !form.phone) {
//       setError('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Signup failed');
//       }

//       // Redirect after successful signup
//       router.push('/login');
//     } catch (err: any) {
//       setError(err.message); // Display error message if signup fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <Card className="shadow-lg rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-indigo-600 mb-4">Create Account</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="fullName"
//               type="text"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="phone"
//               type="tel"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />

//             <Select name="role" value={form.role} onChange={handleChange} className="w-full">
//               <SelectTrigger>
//                 <SelectValue>{form.role}</SelectValue>
//               </SelectTrigger>
//               <SelectItem value="PASSENGER">Passenger</SelectItem>
//               <SelectItem value="ADMIN">Admin</SelectItem>
//               <SelectItem value="AGENT">Agent</SelectItem>
//             </Select>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
//             >
//               {loading ? 'Creating account...' : 'Sign Up'}
//             </Button>

//             {error && <div className="text-red-500 text-center mt-2">{error}</div>}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';

// export default function SignupPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     role: 'PASSENGER',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Handle text inputs
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle role select
//   const handleRoleChange = (value: string) => {
//     setForm({ ...form, role: value });
//   };

//   // Submit form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { fullName, email, phone, password } = form;
//     if (!fullName || !email || !phone || !password) {
//       setError('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Signup failed');
//       }
//       router.push('/login');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <Card className="shadow-lg rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center text-indigo-600">
//             Create Account
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="fullName"
//               type="text"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="phone"
//               type="tel"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />

//             <Select value={form.role} onValueChange={handleRoleChange}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="PASSENGER">Passenger</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="AGENT">Agent</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//             >
//               {loading ? 'Creating account…' : 'Sign Up'}
//             </Button>

//             {error && <p className="text-red-500 text-center">{error}</p>}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';

// export default function UsersPage() {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     role: 'PASSENGER',
//   });
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Users
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/users');
//       if (!res.ok) throw new Error('Failed to fetch users');
//       const data = await res.json();
//       setUsers(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit New User
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { fullName, email, phone, password } = form;
//     if (!fullName || !email || !phone || !password) {
//       setError('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Something went wrong.');
//       }

//       setForm({
//         fullName: '',
//         email: '',
//         phone: '',
//         password: '',
//         role: 'PASSENGER',
//       });

//       await fetchUsers();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle Role Change
//   const handleRoleChange = (value: string) => {
//     setForm({ ...form, role: value });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Card className="shadow-lg rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-4xl font-bold text-center text-indigo-600">
//             User Registration
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="fullName"
//               type="text"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="phone"
//               type="tel"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />

//             <Select value={form.role} onValueChange={handleRoleChange}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="PASSENGER">Passenger</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="AGENT">Agent</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//             >
//               {loading ? 'Creating...' : 'Create User'}
//             </Button>

//             {error && (
//               <p className="text-red-500 text-center mt-2">{error}</p>
//             )}
//           </form>
//         </CardContent>
//       </Card>

//       <div className="mt-8">
//         <Button
//           onClick={fetchUsers}
//           disabled={loading}
//           className="w-full border border-indigo-500 text-indigo-600 hover:bg-indigo-100"
//         >
//           {loading ? 'Loading users...' : 'Show All Users'}
//         </Button>
//       </div>

//       <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
//         {users.length === 0 ? (
//           <p className="text-center text-gray-500 p-4">
//             No users to display.
//           </p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm"
//               >
//                 <span className="font-medium text-gray-900">
//                   {user.fullName}
//                 </span>
//                 <span className="text-gray-600">{user.email}</span>
//                 <span className="text-gray-600">{user.phone}</span>
//                 <span className="text-indigo-500">{user.role}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';

// export default function UsersPage() {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     role: 'PASSENGER',
//   });
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Users
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/users');
//       if (!res.ok) throw new Error('Failed to fetch users');
//       const data = await res.json();
//       setUsers(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit New User
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { fullName, email, phone, password } = form;
//     if (!fullName || !email || !phone || !password) {
//       setError('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Something went wrong.');
//       }

//       setForm({
//         fullName: '',
//         email: '',
//         phone: '',
//         password: '',
//         role: 'PASSENGER',
//       });

//       await fetchUsers();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Input Changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle Role Change
//   const handleRoleChange = (value: string) => {
//     setForm({ ...form, role: value });
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
//       <Card className="w-full max-w-3xl bg-white shadow-md rounded-lg border border-gray-300">
//         <CardHeader>
//           <CardTitle className="text-4xl font-bold text-center text-black tracking-tight">
//             User Registration
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <Input
//               name="fullName"
//               type="text"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />
//             <Input
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />
//             <Input
//               name="phone"
//               type="tel"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />
//             <Input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
//             />

//             <Select value={form.role} onValueChange={handleRoleChange}>
//               <SelectTrigger className="w-full bg-white border border-gray-300 text-black focus:border-black focus:ring-black">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent className="bg-white text-black border border-gray-300">
//                 <SelectItem value="PASSENGER">Passenger</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="AGENT">Agent</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black hover:bg-gray-900 text-white font-semibold tracking-wide shadow-sm"
//             >
//               {loading ? 'Creating...' : 'Create User'}
//             </Button>

//             {error && (
//               <p className="text-red-600 text-center font-medium mt-2">{error}</p>
//             )}
//           </form>
//         </CardContent>
//       </Card>

//       <div className="mt-8 w-full max-w-3xl">
//         <Button
//           onClick={fetchUsers}
//           disabled={loading}
//           className="w-full border border-black text-white hover:bg-gray-100"
//         >
//           {loading ? 'Loading users...' : 'Show All Users'}
//         </Button>
//       </div>

//       <div className="mt-6 w-full max-w-3xl bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
//         {users.length === 0 ? (
//           <p className="text-center text-gray-600 p-6">
//             No users to display.
//           </p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm"
//               >
//                 <span className="font-medium text-black">
//                   {user.fullName}
//                 </span>
//                 <span className="text-gray-700">{user.email}</span>
//                 <span className="text-gray-700">{user.phone}</span>
//                 <span className="text-black font-semibold">{user.role}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function UsersPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'PASSENGER',
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Users using async/await
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching users...');
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      console.log('Users fetched:', data);
      setUsers(data);
    } catch (err: any) {
      console.error('Fetch users error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Submit New User using async/await
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { fullName, email, phone, password } = form;
    if (!fullName || !email || !phone || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      console.log('Creating user with data:', form);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      const createdUser = await res.json();
      console.log('User created:', createdUser);

      setForm({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: 'PASSENGER',
      });

      await fetchUsers();
    } catch (err: any) {
      console.error('Create user error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Role Change
  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-3xl bg-white shadow-md rounded-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-black tracking-tight">
            User Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-white text-black placeholder-gray-500 border border-gray-300 focus:border-black focus:ring-black"
            />

            <Select value={form.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black focus:border-black focus:ring-black">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-gray-300">
                <SelectItem value="PASSENGER">Passenger</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="AGENT">Agent</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold tracking-wide shadow-sm"
            >
              {loading ? 'Creating...' : 'Create User'}
            </Button>

            {error && (
              <p className="text-red-600 text-center font-medium mt-2">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-3xl">
        <Button
          onClick={fetchUsers}
          disabled={loading}
          className="w-full border border-black text-black hover:bg-gray-100"
        >
          {loading ? 'Loading users...' : 'Show All Users'}
        </Button>
      </div>

      <div className="mt-6 w-full max-w-3xl bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
        {users.length === 0 ? (
          <p className="text-center text-gray-600 p-6">
            No users to display.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm"
              >
                <span className="font-medium text-black">
                  {user.fullName}
                </span>
                <span className="text-gray-700">{user.email}</span>
                <span className="text-gray-700">{user.phone}</span>
                <span className="text-black font-semibold">{user.role}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
