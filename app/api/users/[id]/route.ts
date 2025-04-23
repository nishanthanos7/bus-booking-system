// // app/api/users/route.ts
// import { user } from "@/drizzle/schema";
// import { db } from "@/lib/db";

// import { NextResponse } from "next/server";

// // export async function GET() {
// //   try {
// //     const users = await db.query.user.findMany(); // Replace 'users' with your actual table
// //     return Response.json(users);
// //   } catch (error) {
// //     console.error("Error fetching users:", error);
// //     return new Response("Internal Server Error", { status: 500 });
// //   }
// // }

// //this is a get method

// export async function GET() {
//   try {
//     const users = await db.select().from(user);
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/users - create a new user
// export async function POST(request: Request) {
//   try {
//     const { fullName, email, phone, password, role } = await request.json();

//     // Basic validation (add more as needed)
//     if (!fullName || !email || !phone || !password) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Insert user
//     const result = await db
//       .insert(user)
//       .values({
//         fullName,
//         email,
//         phone,
//         password,
//         role, // optional, defaults to 'PASSENGER'
//       })
//       .returning();

//     return NextResponse.json({ success: true, user: result[0] });
//   } catch (error: any) {
//     console.error("Error creating user:", error);

//     // Handle unique constraint violation (email or phone)
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

//minimal version

// export async function POST(req: Request) {
//   const { fullName, email, phone, password, role } = await req.json();

//   if (!fullName || !email || !phone || !password) {
//     return new Response('Missing fields', { status: 400 });
//   }

//   try {
//     await db.insert(user).values({ fullName, email, phone, password, role });
//     return new Response('User created', { status: 201 });
//   } catch {
//     return new Response('Error creating user', { status: 500 });
//   }
// }



// import { user } from "@/drizzle/schema";
// import { db } from "@/lib/db";

// import { NextResponse } from "next/server";

// interface Params {
//   params: { id: string };
// }

// export async function GET(request: Request, { params }: Params) {
//   const { id } = params;

//   try {
//     const users = await db.select().from(user).where(user.id.eq(Number(id)));
//     if (users.length === 0) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(users[0]);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch user" },
//       { status: 500 }
//     );
//   }
// }



import { user } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // Only if your Drizzle version uses this

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    // For UUID/string id
    const users = await db.select().from(user).where(eq(user.id, id));
    // Or, if your Drizzle supports object syntax:
    // const users = await db.select().from(user).where({ id });

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
