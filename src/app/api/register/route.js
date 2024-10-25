// app/api/register/route.js

import bcrypt from "bcrypt";
import prisma from "@/Lib/Postgredb"; // Adjust the import based on your file structure

// Function to generate a random 6-character alphanumeric string
function generateAccountNumber() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let accountNumber = "";
  for (let i = 0; i < 10; i++) {
    accountNumber += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return accountNumber;
}

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random account number
    const accountNumber = generateAccountNumber(); // Generate random account number

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        accountNumber, // Include account number in the user data
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully.",
        user: newUser,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
