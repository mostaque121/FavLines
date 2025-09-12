"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { albumSchema } from "@/lib/zod";
import { revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

type albumFormValues = z.infer<typeof albumSchema>;

export async function addAlbum(data: albumFormValues) {
  await checkAccess();

  const parsed = albumSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const parsedData = parsed.data;

  try {
    await prisma.album.create({
      data: parsedData,
    });
    revalidateTag("all_albums");
    return { success: true };
  } catch (err) {
    console.error("Add Album error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function updateAlbum(id: string, data: albumFormValues) {
  await checkAccess();

  const parsed = albumSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const newData = parsed.data;
  try {
    await prisma.album.update({
      where: { id },
      data: newData,
    });
    revalidateTag("all_albums");
    return { success: true };
  } catch (error) {
    console.error("Update album failed:", error);
    return {
      error: "Failed to update album. Please try again.",
    };
  }
}

export async function deleteAlbum(id: string) {
  await checkAccess();

  try {
    const albumToDelete = await prisma.album.findUnique({
      where: { id },
    });

    if (!albumToDelete) {
      return {
        error: "Album not found.",
      };
    }

    await prisma.album.delete({
      where: { id },
    });
    revalidateTag("all_albums");
    return { success: true };
  } catch (error) {
    console.error("Delete album failed:", error);
    return {
      error: "Failed to delete album. Please try again.",
    };
  }
}

export const getAllAlbums = unstable_cache(
  async () => {
    return prisma.album.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  ["all_albums"],
  {
    tags: ["all_albums"],
  }
);

export const getRandomSuggesteAlbums = unstable_cache(
  async (limit = 6) => {
    const allAlbums = await prisma.album.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    // Shuffle array and pick first `limit` artists
    const shuffled = allAlbums.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },
  ["random_suggested_albums"],
  {
    tags: ["all_albums", "random_suggested_albums"],
  }
);
