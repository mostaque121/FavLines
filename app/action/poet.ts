"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { poetSchema } from "@/lib/zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

type poetFormValues = z.infer<typeof poetSchema>;

export async function addPoet(data: poetFormValues) {
  await checkAccess();

  const parsed = poetSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const parsedData = parsed.data;

  try {
    await prisma.poet.create({
      data: parsedData,
    });
    revalidateTag("all_poets");
    return { success: true };
  } catch (err) {
    console.error("Add Poet error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function updatePoet(id: string, data: poetFormValues) {
  await checkAccess();

  const parsed = poetSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const newData = parsed.data;
  try {
    const poetToUpdate = await prisma.poet.update({
      where: { id },
      data: newData,
    });
    revalidatePath(`/author/${poetToUpdate.slug}`);
    revalidateTag("all_poets");
    return { success: true };
  } catch (error) {
    console.error("Update poet failed:", error);
    return {
      error: "Failed to update poet. Please try again.",
    };
  }
}

export async function deletePoet(id: string) {
  await checkAccess();

  try {
    const poetToDelete = await prisma.poet.findUnique({
      where: { id },
    });

    if (!poetToDelete) {
      return {
        error: "Poet not found.",
      };
    }

    await prisma.poet.delete({
      where: { id },
    });
    revalidatePath(`/author/${poetToDelete.slug}`);
    revalidateTag("all_poets");
    return { success: true };
  } catch (error) {
    console.error("Delete poet failed:", error);
    return {
      error: "Failed to delete poet. Please try again.",
    };
  }
}

export const getAllPoets = unstable_cache(
  async () => {
    return prisma.poet.findMany({
      orderBy: {
        poems: {
          _count: "desc", // or 'asc' if you want ascending order
        },
      },
    });
  },
  ["all_poets"],
  {
    tags: ["all_poets"],
  }
);

export const getRandomSuggestedPoets = unstable_cache(
  async (limit = 6) => {
    const allPoets = await prisma.poet.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    // Shuffle array and pick first `limit` artists
    const shuffled = allPoets.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },
  ["random_suggested_poets"],
  {
    tags: ["all_poets", "random_suggested_poets"],
  }
);

export const getAllPoetsForPage = unstable_cache(
  async () => {
    return prisma.poet.findMany({
      orderBy: {
        poems: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: { poems: true },
        },
      },
    });
  },
  ["all_poets"],
  {
    tags: ["all_poets"],
  }
);

export async function getPoetBySLug(slug: string) {
  return prisma.poet.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      slug: true,
      _count: {
        select: { poems: true },
      },
      poems: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          favourite: true,
          imageUrl: true,
          slug: true,
          poet: {
            select: { name: true, slug: true },
          },
        },
      },
    },
  });
}
