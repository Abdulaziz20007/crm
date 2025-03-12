/*
  Warnings:

  - You are about to drop the column `finishes` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `starts` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "finishes",
DROP COLUMN "starts",
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL,
ALTER COLUMN "is_exam" DROP NOT NULL;
