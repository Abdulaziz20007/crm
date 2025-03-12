-- DropForeignKey
ALTER TABLE "homework_student_files" DROP CONSTRAINT "homework_student_files_file_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_teachers" DROP CONSTRAINT "homework_teachers_file_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_photo_id_fkey";

-- AlterTable
ALTER TABLE "homework_student_files" ALTER COLUMN "file_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "homework_teachers" ALTER COLUMN "file_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "photo_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_teachers" ADD CONSTRAINT "homework_teachers_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework_student_files" ADD CONSTRAINT "homework_student_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
