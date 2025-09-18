"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { artistSchema } from "@/lib/zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

type artistFormValues = z.infer<typeof artistSchema>;

export async function addArtist(data: artistFormValues) {
  await checkAccess();

  const parsed = artistSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const parsedData = parsed.data;

  try {
    await prisma.artist.create({
      data: parsedData,
    });
    revalidateTag("all_artists");
    return { success: true };
  } catch (err) {
    console.error("Add Artist error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function updateArtist(id: string, data: artistFormValues) {
  await checkAccess();

  const parsed = artistSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const newData = parsed.data;
  try {
    const artistToUpdate = await prisma.artist.update({
      where: { id },
      data: newData,
    });
    revalidatePath(`/artist/${artistToUpdate.slug}`);
    revalidateTag("all_artists");
    return { success: true };
  } catch (error) {
    console.error("Update artist failed:", error);
    return {
      error: "Failed to update artist. Please try again.",
    };
  }
}

export async function deleteArtist(id: string) {
  await checkAccess();

  try {
    const artistToDelete = await prisma.artist.findUnique({
      where: { id },
    });

    if (!artistToDelete) {
      return {
        error: "Artist not found.",
      };
    }

    await prisma.artist.delete({
      where: { id },
    });
    revalidatePath(`/artist/${artistToDelete.slug}`);
    revalidateTag("all_artists");
    return { success: true };
  } catch (error) {
    console.error("Delete artist failed:", error);
    return {
      error: "Failed to delete artist. Please try again.",
    };
  }
}

export const getAllArtists = unstable_cache(
  async () => {
    return prisma.artist.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  ["all_artists"],
  {
    tags: ["all_artists"],
  }
);

export const getRandomSuggestedArtists = unstable_cache(
  async (limit = 6) => {
    const allArtists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    // Shuffle array and pick first `limit` artists
    const shuffled = allArtists.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },
  ["random_suggested_artists"],
  {
    tags: ["all_artists", "random_suggested_artists"],
  }
);

export const getAllArtistsForPage = unstable_cache(
  async () => {
    return prisma.artist.findMany({
      orderBy: {
        lyrics: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: { lyrics: true },
        },
      },
    });
  },
  ["all_artists"],
  {
    tags: ["all_artists"],
  }
);

export async function getArtistBySLug(slug: string) {
  return prisma.artist.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      slug: true,
      _count: {
        select: { lyrics: true },
      },
      lyrics: {
        orderBy: {
          createdAt: "desc",
        },
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
      },
    },
  });
}
