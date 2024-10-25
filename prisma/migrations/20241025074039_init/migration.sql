/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_accountNumber_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("accountNumber");

-- CreateTable
CREATE TABLE "Account" (
    "accountNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountNumber")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountNumber_fkey" FOREIGN KEY ("accountNumber") REFERENCES "User"("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
