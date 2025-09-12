/*
  Warnings:

  - You are about to drop the column `favorite` on the `Lyrics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Lyrics" DROP COLUMN "favorite",
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false;
