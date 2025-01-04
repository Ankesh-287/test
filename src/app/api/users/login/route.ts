import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const users = await fetch(USERS_API_URL);
    const usersData = await users.json();

    const user = usersData.find((user: any) => user.email === email);
    if (!user) {
      return createErrorResponse("User does not exist", 400);
    }

    
    const token = createJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user, 
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, 
    });

    return response;
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}

function createJwtToken(payload: object): string {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET environment variable is not set");
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
