import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a strong secret

export const authenticate = (handler) => {
  return async (request) => {
    try {
      // Extract JWT token from cookies
      const cookieHeader = request.headers.get("cookie");
      if (!cookieHeader) {
        return new Response(
          JSON.stringify({ message: "No token provided in cookies." }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => cookie.split("="))
      );
      const token = cookies.token; // Get the JWT from cookies

      if (!token) {
        return new Response(JSON.stringify({ message: "No token provided." }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user info to the request object
      request.user = decoded;
      console.log(decoded);

      // Pass the modified request to the original handler
      return handler(request);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Unauthorized! Invalid token." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
};
