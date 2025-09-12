"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { lyricsSchema } from "@/lib/zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

type lyricsFormValues = z.infer<typeof lyricsSchema>;

export async function addLyrics(data: lyricsFormValues) {
  await checkAccess();

  const parsed = lyricsSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const parsedData = parsed.data;

  try {
    await prisma.lyrics.create({
      data: parsedData,
    });
    revalidateTag("latest_lyrics");
    revalidateTag("favourite_lyrics");
    revalidateTag("popular_lyrics_tags");
    revalidateTag("lyrics_meta");
    revalidateTag("lyrics_by_page");

    return { success: true };
  } catch (err) {
    console.error("Add Lyrics error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function updateLyrics(id: string, data: lyricsFormValues) {
  await checkAccess();

  const parsed = lyricsSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const lyricsToUpdate = await prisma.lyrics.findUnique({
    where: { id },
  });

  if (!lyricsToUpdate) {
    return {
      error: "Lyrics not found.",
    };
  }

  const newData = parsed.data;
  try {
    await prisma.lyrics.update({
      where: { id },
      data: newData,
    });

    revalidatePath(`/lyric/${lyricsToUpdate.slug}`);
    revalidateTag("latest_lyrics");
    revalidateTag("favourite_lyrics");
    revalidateTag("popular_lyrics_tags");
    revalidateTag("lyrics_meta");
    revalidateTag("lyrics_by_page");
    return { success: true };
  } catch (error) {
    console.error("Update lyrics failed:", error);
    return {
      error: "Failed to update lyrics. Please try again.",
    };
  }
}
export async function updateLyricsFavourite(id: string, favourite: boolean) {
  await checkAccess();
  try {
    const lyricsToUpdate = await prisma.lyrics.findUnique({
      where: { id },
    });

    if (!lyricsToUpdate) {
      return {
        error: "Lyrics not found.",
      };
    }

    await prisma.lyrics.update({
      where: { id },
      data: { favourite },
    });

    revalidatePath(`/lyric/${lyricsToUpdate.slug}`);
    revalidateTag("latest_lyrics");
    revalidateTag("favourite_lyrics");
    revalidateTag("popular_lyrics_tags");
    revalidateTag("lyrics_meta");
    revalidateTag("lyrics_by_page");
    return { success: true };
  } catch (error) {
    console.error("Update lyrics failed:", error);
    return {
      error: "Failed to update lyrics. Please try again.",
    };
  }
}

export async function deleteLyrics(id: string) {
  await checkAccess();

  try {
    const lyricsToDelete = await prisma.lyrics.findUnique({
      where: { id },
    });

    if (!lyricsToDelete) {
      return {
        error: "Lyrics not found.",
      };
    }

    await prisma.lyrics.delete({
      where: { id },
    });

    revalidatePath(`/lyric/${lyricsToDelete.slug}`);
    revalidateTag("latest_lyrics");
    revalidateTag("favourite_lyrics");
    revalidateTag("popular_lyrics_tags");
    revalidateTag("lyrics_meta");
    revalidateTag("lyrics_by_page");

    return { success: true };
  } catch (error) {
    console.error("Delete Lyrics failed:", error);
    return {
      error: "Failed to delete lyrics. Please try again.",
    };
  }
}

export const getLatestLyrics = unstable_cache(
  async () => {
    return prisma.lyrics.findMany({
      select: {
        id: true,
        title: true,
        favourite: true,
        imageUrl: true,
        slug: true,
        artist: {
          select: { name: true, slug: true },
        },
        album: {
          select: { name: true, slug: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 12, // only get the latest 12
    });
  },
  ["latest_lyrics"],
  {
    tags: ["latest_lyrics"],
  }
);

export const getFavouriteLyrics = unstable_cache(
  async () => {
    return prisma.lyrics.findMany({
      where: { favourite: true },
      select: {
        id: true,
        title: true,
        favourite: true,
        imageUrl: true,
        slug: true,
        artist: {
          select: { name: true, slug: true },
        },
        album: {
          select: { name: true, slug: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // only get the latest 12
    });
  },
  ["favourite_lyrics"],
  {
    tags: ["favourite_lyrics"],
  }
);

export async function getLyricsBySLug(slug: string) {
  return prisma.lyrics.findUnique({
    where: { slug },
    include: {
      artist: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      album: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

export const getLyricsMeta = unstable_cache(
  async () => {
    const [count, slugs] = await Promise.all([
      prisma.lyrics.count(),
      prisma.lyrics.findMany({
        select: { slug: true },
      }),
    ]);

    return {
      count,
      slugs: slugs.map((s) => s.slug),
    };
  },
  ["lyrics_meta"],
  {
    tags: ["lyrics_meta"],
  }
);
export const getLyricsByPage = unstable_cache(
  async (page: number) => {
    const perPage = 30;
    const skip = (page - 1) * perPage;

    return prisma.lyrics.findMany({
      select: {
        id: true,
        title: true,
        favourite: true,
        imageUrl: true,
        slug: true,
        artist: {
          select: { name: true, slug: true },
        },
        album: {
          select: { name: true, slug: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: perPage,
    });
  },
  ["lyrics_by_page"],
  {
    tags: ["lyrics_by_page"],
  }
);
