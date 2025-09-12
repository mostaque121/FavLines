"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export async function updateTags(tags: string[]) {
  await checkAccess();
  try {
    await prisma.additionalData.upsert({
      where: { id: "additional_data" },
      update: {
        tags: tags,
      },
      create: {
        id: "additional_data",
        tags: tags,
      },
    });
    revalidateTag("tags");
    return { success: true };
  } catch (err) {
    console.error("Add Tags error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
export const getAllTags = unstable_cache(
  async () => {
    const data = await prisma.additionalData.findUnique({
      where: { id: "additional_data" },
      select: { tags: true },
    });
    if (data) {
      return data.tags;
    } else {
      return [];
    }
  },
  ["tags"],
  {
    tags: ["tags"],
  }
);

export const getPopularTagsForPoem = unstable_cache(
  async () => {
    const poems = await prisma.poem.findMany({
      select: { tags: true },
    });

    const tagCount: Record<string, number> = {};

    poems.forEach((poem) => {
      poem.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    // Convert to array and sort by count
    const sortedTags = Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => tag);

    return sortedTags.slice(0, 20);
  },
  ["popular_poem_tags"],
  {
    tags: ["popular_poem_tags"],
  }
);
export const getPopularTagsForLyrics = unstable_cache(
  async () => {
    const lyrics = await prisma.lyrics.findMany({
      select: { tags: true },
    });

    const tagCount: Record<string, number> = {};

    lyrics.forEach((lyric) => {
      lyric.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    // Convert to array and sort by count
    const sortedTags = Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => tag);

    return sortedTags.slice(0, 20);
  },
  ["popular_lyrics_tags"],
  {
    tags: ["popular_lyrics_tags"],
  }
);
