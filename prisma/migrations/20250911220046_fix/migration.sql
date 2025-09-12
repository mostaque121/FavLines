/*
  Warnings:

  - You are about to drop the column `albumSlug` on the `Lyrics` table. All the data in the column will be lost.
  - You are about to drop the column `artistSlug` on the `Lyrics` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `Poem` table. All the data in the column will be lost.
  - You are about to drop the column `poetSlug` on the `Poem` table. All the data in the column will be lost.
  - Added the required column `albumId` to the `Lyrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistId` to the `Lyrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poetId` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Lyrics" DROP CONSTRAINT "Lyrics_albumSlug_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lyrics" DROP CONSTRAINT "Lyrics_artistSlug_fkey";

-- DropForeignKey
ALTER TABLE "public"."Poem" DROP CONSTRAINT "Poem_poetSlug_fkey";

-- AlterTable
ALTER TABLE "public"."Lyrics" DROP COLUMN "albumSlug",
DROP COLUMN "artistSlug",
ADD COLUMN     "albumId" TEXT NOT NULL,
ADD COLUMN     "artistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Poem" DROP COLUMN "favorite",
DROP COLUMN "poetSlug",
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "poetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Lyrics" ADD CONSTRAINT "Lyrics_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lyrics" ADD CONSTRAINT "Lyrics_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Poem" ADD CONSTRAINT "Poem_poetId_fkey" FOREIGN KEY ("poetId") REFERENCES "public"."Poet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
