/*
  Warnings:

  - A unique constraint covering the columns `[parent_id]` on the table `parents` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE teachers_teacher_id_seq;
ALTER TABLE "teachers" ALTER COLUMN "teacher_id" SET DEFAULT nextval('teachers_teacher_id_seq');
ALTER SEQUENCE teachers_teacher_id_seq OWNED BY "teachers"."teacher_id";

-- CreateIndex
CREATE UNIQUE INDEX "parents_parent_id_key" ON "parents"("parent_id");
