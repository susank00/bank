// app/api/balance/route.js
import { NextResponse } from "next/server";
import prisma from "@/Lib/Postgredb"; // Adjust the import based on your file structure

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountNumber = searchParams.get("accountNumber");

  // Validate account number
  if (!accountNumber) {
    return NextResponse.json(
      { error: "Account number is required." },
      { status: 400 }
    );
  }

  try {
    // First, try to fetch the account balance from the `account` schema
    let account = await prisma.account.findUnique({
      where: {
        accountNumber: accountNumber,
      },
    });

    // If not found in `account`, look up in the `user` schema
    if (!account) {
      account = await prisma.user.findUnique({
        where: {
          accountNumber: accountNumber,
        },
      });
    }

    // If still not found, return an error
    if (!account) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 }
      );
    }

    // Return the balance if found in either schema
    return NextResponse.json({ balance: account.balance });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
