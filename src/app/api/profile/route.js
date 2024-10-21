import { authenticate } from "@/middlewares/auth"; // Import the middleware

export const GET = authenticate(async (request) => {
  // Access the user info from the decoded JWT attached to the request
  const user = request.user;

  // Return the user's profile info
  return new Response(
    JSON.stringify({
      message: "Profile fetched successfully!",
      user: { id: user.userId, email: user.email, username: user.username },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
