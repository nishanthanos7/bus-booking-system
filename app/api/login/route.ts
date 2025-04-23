import { db } from "@/lib/db";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch user by email
    const foundUsers = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    const foundUser = foundUsers[0];

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Very basic password check (in real apps use hashing!)
    if (foundUser.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Optionally return token/session data
    return NextResponse.json({
      success: true,
      user: {
        id: foundUser.id,
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
