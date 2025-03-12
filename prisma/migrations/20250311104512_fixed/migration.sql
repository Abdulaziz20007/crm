/*
  Warnings:

  - You are about to drop the column `admin_id` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `teachers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_student_id_fkey";

-- DropIndex
DROP INDEX "admins_admin_id_key";

-- DropIndex
DROP INDEX "parents_parent_id_key";

-- DropIndex
DROP INDEX "students_student_id_key";

-- DropIndex
DROP INDEX "teachers_teacher_id_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "admin_id";

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "parent_id";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "student_id";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "teacher_id";

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
