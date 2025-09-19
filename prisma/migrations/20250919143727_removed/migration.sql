/*
  Warnings:

  - You are about to drop the column `albumId` on the `Lyrics` table. All the data in the column will be lost.
  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Lyrics" DROP CONSTRAINT "Lyrics_albumId_fkey";

-- AlterTable
ALTER TABLE "public"."Lyrics" DROP COLUMN "albumId";

-- DropTable
DROP TABLE "public"."Album";
