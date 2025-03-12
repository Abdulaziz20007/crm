/*
  Warnings:

  - You are about to drop the column `username` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `parents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_photo_id_fkey";

-- DropIndex
DROP INDEX "admins_username_key";

-- DropIndex
DROP INDEX "parents_username_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "username",
ADD COLUMN     "admin_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "username",
ADD COLUMN     "parent_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "teachers" ALTER COLUMN "photo_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
