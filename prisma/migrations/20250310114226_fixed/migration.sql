/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `HomeworkResult` table. All the data in the column will be lost.
  - You are about to drop the `_HomeworkResultToStudentHomework` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `student_homework_id` to the `HomeworkResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HomeworkResult" DROP CONSTRAINT "HomeworkResult_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToStudentHomework" DROP CONSTRAINT "_HomeworkResultToStudentHomework_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeworkResultToStudentHomework" DROP CONSTRAINT "_HomeworkResultToStudentHomework_B_fkey";

-- AlterTable
ALTER TABLE "HomeworkResult" DROP COLUMN "lesson_id",
ADD COLUMN     "lessonId" INTEGER,
ADD COLUMN     "student_homework_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_HomeworkResultToStudentHomework";

-- AddForeignKey
ALTER TABLE "HomeworkResult" ADD CONSTRAINT "HomeworkResult_student_homework_id_fkey" FOREIGN KEY ("student_homework_id") REFERENCES "student_homeworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeworkResult" ADD CONSTRAINT "HomeworkResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
