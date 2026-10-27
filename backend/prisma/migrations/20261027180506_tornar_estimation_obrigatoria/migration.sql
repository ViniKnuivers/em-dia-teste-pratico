/*
  Warnings:

  - Made the column `estimation` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "estimation" SET NOT NULL;
