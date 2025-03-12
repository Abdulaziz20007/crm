/*
  Warnings:

  - The `lesson_days` column on the `groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "sign_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "lesson_days",
ADD COLUMN     "lesson_days" INTEGER[];
