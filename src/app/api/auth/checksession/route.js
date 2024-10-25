// /src/app/api/auth/checksession/route.js

import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Use a strong secret

// Named export for the GET method
export async function GET(req) {
  try {
    // Parse cookies from the request headers
    const cookieHeader = req.headers.get("cookie");
    const { token } = parse(cookieHeader || "");

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the token using your secret
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return the user data if the token is valid
    return new Response(
      JSON.stringify({
        success: true,
        user: { id: decoded.id, username: decoded.username }, // Customize based on your token data
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid or expired token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
