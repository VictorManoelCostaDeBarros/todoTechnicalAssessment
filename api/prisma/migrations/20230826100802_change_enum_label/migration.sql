/*
  Warnings:

  - The values [IRRELEVANT] on the enum `LABEL` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LABEL_new" AS ENUM ('URGENT', 'POSTPONED', 'NOTIMPORTANT');
ALTER TABLE "Task" ALTER COLUMN "label" TYPE "LABEL_new" USING ("label"::text::"LABEL_new");
ALTER TYPE "LABEL" RENAME TO "LABEL_old";
ALTER TYPE "LABEL_new" RENAME TO "LABEL";
DROP TYPE "LABEL_old";
COMMIT;
