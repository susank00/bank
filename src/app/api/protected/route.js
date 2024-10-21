// app/api/protected/route.js
import { authenticate } from "../../../middlewares/auth"; // Import the middleware

export const GET = authenticate(async (request) => {
  return new Response(
    JSON.stringify({
      message: "Protected data accessed!",
      user: request.user, // Access user info from the request
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});
