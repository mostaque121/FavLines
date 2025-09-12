/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LyricsToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PoemToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_LyricsToTag" DROP CONSTRAINT "_LyricsToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_LyricsToTag" DROP CONSTRAINT "_LyricsToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PoemToTag" DROP CONSTRAINT "_PoemToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PoemToTag" DROP CONSTRAINT "_PoemToTag_B_fkey";

-- AlterTable
ALTER TABLE "public"."Lyrics" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "public"."Poem" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."_LyricsToTag";

-- DropTable
DROP TABLE "public"."_PoemToTag";

-- CreateTable
CREATE TABLE "public"."AdditionalData" (
    "id" TEXT NOT NULL DEFAULT 'additional_data',
    "tags" TEXT[],

    CONSTRAINT "AdditionalData_pkey" PRIMARY KEY ("id")
);
