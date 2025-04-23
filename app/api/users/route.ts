import { user } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.select().from(user);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, password, role } = await request.json();

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(user)
      .values({
        fullName,
        email,
        phone,
        password,
        role,
      })
      .returning();

    return NextResponse.json({ success: true, user: result[0] });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.message.includes("user_email_key")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    if (error.message.includes("user_phone_key")) {
      return NextResponse.json(
        { error: "Phone already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
