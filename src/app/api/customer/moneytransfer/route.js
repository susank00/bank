import { NextResponse } from "next/server";
import prisma from "@/Lib/Postgredb"; // Custom Prisma client
import { authenticate } from "@/middlewares/auth"; // Authentication middleware

const transferBalanceHandler = async (request) => {
  const { userName, sourceAccountNumber, targetAccountNumber, transferAmount } =
    await request.json();

  // Validate input
  if (
    !userName ||
    !sourceAccountNumber ||
    !targetAccountNumber ||
    typeof transferAmount !== "number"
  ) {
    return NextResponse.json(
      {
        message:
          "username, sourceAccountNumber, targetAccountNumber, and transferAmount are required.",
      },
      { status: 400 }
    );
  }

  // Prevent self-transfer
  if (sourceAccountNumber === targetAccountNumber) {
    return NextResponse.json(
      { message: "Self-transfer is not allowed." },
      { status: 400 }
    );
  }

  try {
    // Check if the user exists with both username and source account number
    const user = await prisma.user.findUnique({
      where: {
        accountNumber: sourceAccountNumber,
        username: userName,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Account with the provided username and source account number not found.",
        },
        { status: 404 }
      );
    }

    // Fetch the source account details
    const sourceAccount = await prisma.account.findUnique({
      where: { accountNumber: sourceAccountNumber },
    });

    if (!sourceAccount) {
      return NextResponse.json(
        { message: "Source account not found." },
        { status: 404 }
      );
    }

    // Ensure the source account has enough balance
    if (sourceAccount.balance < transferAmount) {
      return NextResponse.json(
        { message: "Insufficient balance in the source account." },
        { status: 400 }
      );
    }

    // Fetch the target account details
    const targetAccount = await prisma.account.findUnique({
      where: { accountNumber: targetAccountNumber },
    });

    if (!targetAccount) {
      return NextResponse.json(
        { message: "Target account not found." },
        { status: 404 }
      );
    }

    // Begin transaction for the transfer
    await prisma.$transaction([
      // Deduct from source account
      prisma.account.update({
        where: { accountNumber: sourceAccountNumber },
        data: { balance: sourceAccount.balance - transferAmount },
      }),
      // Add to target account
      prisma.account.update({
        where: { accountNumber: targetAccountNumber },
        data: { balance: targetAccount.balance + transferAmount },
      }),
    ]);

    return NextResponse.json(
      { message: "Transfer successful.", transferAmount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error transferring balance:", error);
    return NextResponse.json(
      { message: "Error transferring balance.", error: error.message },
      { status: 500 }
    );
  }
};

// Wrap the handler with the authentication middleware
export const POST = authenticate(transferBalanceHandler);
