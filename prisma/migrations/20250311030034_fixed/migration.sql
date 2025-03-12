-- DropForeignKey
ALTER TABLE "homework_results" DROP CONSTRAINT "homework_results_file_id_fkey";

-- AlterTable
ALTER TABLE "homework_results" ALTER COLUMN "file_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "homework_results" ADD CONSTRAINT "homework_results_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
