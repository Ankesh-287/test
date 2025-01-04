import { NextRequest, NextResponse } from "next/server";

// This is the API URL where you want to fetch the user data (e.g., from an external API or database)
const USERS_API_URL = "https://jsonplaceholder.typicode.com/users"; // You can replace this with your actual API endpoint

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract the email
    const { email } = await request.json();

    // Fetch users data from the external API
    const usersResponse = await fetch(USERS_API_URL);
    const usersData = await usersResponse.json();

    // Find the user in the fetched data based on the provided email
    const user = usersData.find((user: any) => user.email === email);
    
    // If the user is not found, return an error response
    if (!user) {
      return createErrorResponse("User does not exist", 400);
    }

    // Return the user data (excluding password) as part of the response
    return NextResponse.json({
      message: "User found",
      success: true,
      user: {
        email: user.email,
        username: user.username,
        // Do not return password in a real-world scenario
      },
    });
  } catch (error: any) {
    // If there was an error, return a general error response
    return createErrorResponse(error.message, 500);
  }
}

// Helper function to create error responses
function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
