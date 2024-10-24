// src/app/api/auth/logout/route.js

export async function POST(req) {
  // You can perform any necessary session cleanup here (e.g., invalidate session in database)

  // Create a response that clears the token cookie
  const res = new Response(
    JSON.stringify({ success: true, message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "token=; Max-Age=0; path=/; HttpOnly; SameSite=Lax;", // Clearing the token cookie
      },
    }
  );

  return res;
}
