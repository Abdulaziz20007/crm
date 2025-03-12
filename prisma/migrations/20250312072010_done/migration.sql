/*
  Warnings:

  - You are about to drop the column `parent_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the `student_parents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "student_parents" DROP CONSTRAINT "student_parents_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "student_parents" DROP CONSTRAINT "student_parents_student_id_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "parent_id";

-- DropTable
DROP TABLE "student_parents";
