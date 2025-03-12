-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_parent_id_fkey";

-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "parent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
