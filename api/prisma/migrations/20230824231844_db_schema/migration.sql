-- CreateEnum
CREATE TYPE "LABEL" AS ENUM ('URGENT', 'POSTPONED', 'IRRELEVANT');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "label" "LABEL" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
