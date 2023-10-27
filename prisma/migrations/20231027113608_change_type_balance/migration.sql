/*
  Warnings:

  - You are about to alter the column `balance` on the `Bank_accounts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bank_accounts" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
