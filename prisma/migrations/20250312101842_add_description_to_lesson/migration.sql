/*
  Warnings:

  - Added the required column `date` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_exam` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "is_exam" SET NOT NULL;
