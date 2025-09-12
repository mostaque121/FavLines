-- CreateTable
CREATE TABLE "public"."Artist" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Album" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Poet" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Poet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lyrics" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ytLink" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "artistSlug" TEXT NOT NULL,
    "albumSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lyrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Poem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ytLink" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "poetSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_LyricsToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LyricsToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PoemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PoemToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_slug_key" ON "public"."Artist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "public"."Album"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Poet_slug_key" ON "public"."Poet"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "public"."Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lyrics_slug_key" ON "public"."Lyrics"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Poem_slug_key" ON "public"."Poem"("slug");

-- CreateIndex
CREATE INDEX "_LyricsToTag_B_index" ON "public"."_LyricsToTag"("B");

-- CreateIndex
CREATE INDEX "_PoemToTag_B_index" ON "public"."_PoemToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."Lyrics" ADD CONSTRAINT "Lyrics_artistSlug_fkey" FOREIGN KEY ("artistSlug") REFERENCES "public"."Artist"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lyrics" ADD CONSTRAINT "Lyrics_albumSlug_fkey" FOREIGN KEY ("albumSlug") REFERENCES "public"."Album"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Poem" ADD CONSTRAINT "Poem_poetSlug_fkey" FOREIGN KEY ("poetSlug") REFERENCES "public"."Poet"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LyricsToTag" ADD CONSTRAINT "_LyricsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Lyrics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LyricsToTag" ADD CONSTRAINT "_LyricsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PoemToTag" ADD CONSTRAINT "_PoemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Poem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PoemToTag" ADD CONSTRAINT "_PoemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
