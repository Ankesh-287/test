// pages/api/auth/register.ts
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../utils/api";
export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    const savedUser = await createUser(username, email, password);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
