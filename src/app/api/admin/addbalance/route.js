// src/app/api/admin/addbalance/route.js
import { NextResponse } from "next/server";
import prisma from "@/Lib/Postgredb"; // Import the custom Prisma client
import { authenticate } from "@/middlewares/auth"; // Import the middleware

const addBalanceHandler = async (request) => {
  const { accountNumber, amountToAdd } = await request.json();

  // Validate input
  if (!accountNumber || typeof amountToAdd !== "number") {
    return NextResponse.json(
      { message: "Account number and amount are required." },
      { status: 400 }
    );
  }

  try {
    // Check if the account exists in the User model
    const user = await prisma.user.findUnique({
      where: { accountNumber },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account not found in User model." },
        { status: 404 }
      );
    }

    // Check if the corresponding account exists
    let account = await prisma.account.findUnique({
      where: { accountNumber },
    });

    // If the account doesn't exist, create a new account
    if (!account) {
      account = await prisma.account.create({
        data: {
          accountNumber,
          balance: amountToAdd, // Start with the initial amount
        },
      });

      return NextResponse.json(
        { message: "Account created and balance added successfully.", account },
        { status: 201 } // Created status
      );
    }

    // Calculate new balance
    const newBalance = account.balance + amountToAdd;

    // Update the existing account balance
    const updatedAccount = await prisma.account.update({
      where: { accountNumber },
      data: { balance: newBalance },
    });

    return NextResponse.json(
      { message: "Balance updated successfully.", account: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating balance.", error: error.message },
      { status: 500 }
    );
  }
};

// Wrap the handler with the authentication middleware
export const POST = authenticate(addBalanceHandler);
