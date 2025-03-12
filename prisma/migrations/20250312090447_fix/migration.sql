/*
  Warnings:

  - You are about to drop the column `file_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `photo_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_HomeworkResultToHomeworkStudentFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HomeworkResultToHomeworkTeacherFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HomeworkTeacherFilesToStudentHomework` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homework_result_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homework_student_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homework_teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkStudentFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkStudentFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkStudentFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkStudentFiles_B_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkTeacherFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkTeacherFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkTeacherFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkTeacherFiles_B_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkTeacherFilesToStudentHomework" DROP CONSTRAINT "_HomeworkTeacherFilesToStudentHomework_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkTeacherFilesToStudentHomework" DROP CONSTRAINT "_HomeworkTeacherFilesToStudentHomework_B_fkey";

-- DropForeignKey
ALTER TABLE "homework_result_files" DROP CONSTRAINT "homework_result_files_file_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_result_files" DROP CONSTRAINT "homework_result_files_result_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_result_files" DROP CONSTRAINT "homework_result_files_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_student_files" DROP CONSTRAINT "homework_student_files_file_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_student_files" DROP CONSTRAINT "homework_student_files_student_homework_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_teachers" DROP CONSTRAINT "homework_teachers_file_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_teachers" DROP CONSTRAINT "homework_teachers_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_teachers" DROP CONSTRAINT "homework_teachers_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_photo_id_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "file_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "photo_id";

-- DropTable
DROP TABLE "_HomeworkResultToHomeworkStudentFiles";

-- DropTable
DROP TABLE "_HomeworkResultToHomeworkTeacherFiles";

-- DropTable
DROP TABLE "_HomeworkTeacherFilesToStudentHomework";

-- DropTable
DROP TABLE "files";

-- DropTable
DROP TABLE "homework_result_files";

-- DropTable
DROP TABLE "homework_student_files";

-- DropTable
DROP TABLE "homework_teachers";
