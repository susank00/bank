import { NextResponse } from "next/server";
import prisma from "@/Lib/Postgredb"; // Import the custom Prisma client
import { authenticate } from "@/middlewares/auth"; // Import the authentication middleware

const addBalanceHandler = async (request) => {
  const { username, accountNumber, amountToAdd } = await request.json();

  // Validate input
  if (!username || !accountNumber || typeof amountToAdd !== "number") {
    return NextResponse.json(
      { message: "username, accountNumber, and amountToAdd are required." },
      { status: 400 }
    );
  }

  try {
    // Check if the account exists in the User model with both username and accountNumber
    const user = await prisma.user.findUnique({
      where: {
        accountNumber,
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Account with the provided username and account number not found.",
        },
        { status: 404 }
      );
    }

    // Check if the corresponding account exists in the Account model
    let account = await prisma.account.findUnique({
      where: { accountNumber },
    });

    // If the account doesn't exist, create a new account with the initial balance
    if (!account) {
      account = await prisma.account.create({
        data: {
          accountNumber,
          balance: amountToAdd,
        },
      });

      return NextResponse.json(
        { message: "Account created and balance added successfully.", account },
        { status: 201 }
      );
    }

    // Calculate the new balance by adding amountToAdd to the current balance
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
    console.error("Error updating balance:", error);
    return NextResponse.json(
      { message: "Error updating balance.", error: error.message },
      { status: 500 }
    );
  }
};

// Wrap the handler with the authentication middleware
export const POST = authenticate(addBalanceHandler);
