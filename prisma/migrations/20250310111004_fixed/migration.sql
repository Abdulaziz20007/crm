/*
  Warnings:

  - You are about to drop the column `sign_language_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `contracts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "contracts_uuid_key";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "is_creator" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "sign_language_id",
DROP COLUMN "uuid",
ALTER COLUMN "file_id" DROP NOT NULL,
ALTER COLUMN "is_signed" SET DEFAULT false;
