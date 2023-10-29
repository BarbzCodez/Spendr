/*
  Warnings:

  - You are about to drop the column `amountSpent` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `dateFrom` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `dateTill` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `spendingLimit` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BudgetDuration" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amountSpent",
DROP COLUMN "dateFrom",
DROP COLUMN "dateTill",
DROP COLUMN "spendingLimit",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "duration" "BudgetDuration" NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
