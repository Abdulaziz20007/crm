/*
  Warnings:

  - You are about to drop the column `end_month` on the `group_teachers` table. All the data in the column will be lost.
  - Changed the type of `phone` on the `admins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start_month` on the `group_teachers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phone` on the `parents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phone` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phone` on the `teachers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "group_teachers" DROP COLUMN "end_month",
DROP COLUMN "start_month",
ADD COLUMN     "start_month" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admins_phone_key" ON "admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "parents_phone_key" ON "parents"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "students_phone_key" ON "students"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_phone_key" ON "teachers"("phone");
