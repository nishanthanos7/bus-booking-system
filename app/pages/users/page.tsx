// app/users/page.tsx

import { revalidatePath } from "next/cache";

// Fetch users from API (server-side)
async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Server action for posting a new user
async function createUser(formData: FormData) {
  "use server";
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const role = formData.get("role");

  await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, phone, password, role }),
  });

  revalidatePath("/users");
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main style={{ padding: 20 }}>
      <h1>Users</h1>
      <form action={createUser} style={{ marginBottom: 20 }}>
        <input name="fullName" placeholder="Full Name" required style={{ marginRight: 10 }} />
        <input name="email" type="email" placeholder="Email" required style={{ marginRight: 10 }} />
        <input name="phone" placeholder="Phone" required style={{ marginRight: 10 }} />
        <input name="password" type="password" placeholder="Password" required style={{ marginRight: 10 }} />
        <select name="role" defaultValue="PASSENGER" style={{ marginRight: 10 }}>
          <option value="PASSENGER">Passenger</option>
          <option value="ADMIN">Admin</option>
          <option value="AGENT">Agent</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.fullName} - {user.email} - {user.phone} - {user.role}
          </li>
        ))}
      </ul>
    </main>
  );
}
