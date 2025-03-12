/*
  Warnings:

  - You are about to drop the column `file_id` on the `homework_results` table. All the data in the column will be lost.
  - You are about to drop the column `result_id` on the `homework_results` table. All the data in the column will be lost.
  - You are about to drop the `HomeworkResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ball` to the `homework_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `homework_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_homework_id` to the `homework_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xp` to the `homework_results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HomeworkResult" DROP CONSTRAINT "HomeworkResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "HomeworkResult" DROP CONSTRAINT "HomeworkResult_student_homework_id_fkey";

-- DropForeignKey
ALTER TABLE "HomeworkResult" DROP CONSTRAINT "HomeworkResult_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkStudentFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkStudentFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToHomeworkTeacherFiles" DROP CONSTRAINT "_HomeworkResultToHomeworkTeacherFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "homework_results" DROP CONSTRAINT "homework_results_file_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_results" DROP CONSTRAINT "homework_results_result_id_fkey";

-- AlterTable
ALTER TABLE "homework_results" DROP COLUMN "file_id",
DROP COLUMN "result_id",
ADD COLUMN     "ball" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "lesson_id" INTEGER,
ADD COLUMN     "student_homework_id" INTEGER NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL;

-- DropTable
DROP TABLE "HomeworkResult";

-- CreateTable
CREATE TABLE "homework_result_files" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "file_id" INTEGER,
    "result_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homework_result_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "homework_results" ADD CONSTRAINT "homework_results_student_homework_id_fkey" FOREIGN KEY ("student_homework_id") REFERENCES "student_homeworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_results" ADD CONSTRAINT "homework_results_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_result_files" ADD CONSTRAINT "homework_result_files_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_result_files" ADD CONSTRAINT "homework_result_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_result_files" ADD CONSTRAINT "homework_result_files_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "homework_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomeworkResultToHomeworkTeacherFiles" ADD CONSTRAINT "_HomeworkResultToHomeworkTeacherFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "homework_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomeworkResultToHomeworkStudentFiles" ADD CONSTRAINT "_HomeworkResultToHomeworkStudentFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "homework_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;
