// src/app/api/index.js

// This function handles GET requests to the root of the API
export async function GET() {
  return new Response(JSON.stringify({ message: "Server is running!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
