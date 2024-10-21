// src/app/api/db/route.js
import { connectToDatabase } from "../../../Lib/Postgredb"; // Adjust the import based on your directory structure

export async function GET() {
  let client;

  try {
    // Connect to the database
    client = await connectToDatabase();

    // Execute a query (this example fetches the current time)
    const result = await client.query("SELECT NOW()");

    // Return the result as JSON response
    return new Response(JSON.stringify({ serverTime: result.rows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query error:", error);

    return new Response(JSON.stringify({ error: "Database query error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Ensure the client is closed if it was created
    if (client) {
      await client.end();
    }
  }
}
