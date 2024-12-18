import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/Lib/Postgredb"; // Adjust the import based on your structure

const JWT_SECRET = process.env.JWT_SECRET; // Ensure your .env has a strong secret

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Compare password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token using accountNumber instead of id
    const token = jwt.sign(
      {
        accountNumber: user.accountNumber,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "360s" }
    );

    // Set the token in cookies
    const response = new Response(
      JSON.stringify({
        message: "Login successful!",
        user: {
          accountNumber: user.accountNumber,
          email: user.email,
          username: user.username,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    // Set the JWT token as an HTTP-only cookie
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=360; SameSite=Lax;`
    );

    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
