/*
  Warnings:

  - Added the required column `price_per_lesson` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "price_per_lesson" DECIMAL(65,30) NOT NULL;
