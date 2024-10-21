// src/lib/postgredb.js
import { Client } from "pg";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectionString = process.env.POSTGRES_CONNECTION_STRING;

export async function connectToDatabase() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false, // This option allows self-signed certificates
    },
  });

  try {
    await client.connect();
    console.log("Successfully connected to the database!");
    return client;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
export default prisma;
