"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { poemSchema } from "@/lib/zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

type poemFormValues = z.infer<typeof poemSchema>;

export async function addPoem(data: poemFormValues) {
  await checkAccess();

  const parsed = poemSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false };
  }

  const parsedData = parsed.data;

  try {
    await prisma.poem.create({
      data: parsedData,
    });

    revalidateTag("latest_poems");
    revalidateTag("favourite_poems");
    revalidateTag("popular_poem_tags");
    revalidateTag("poems_meta");
    revalidateTag("poems_by_page");

    return { success: true };
  } catch (err) {
    console.error("Add poem error:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function updatePoem(id: string, data: poemFormValues) {
  await checkAccess();

  const parsed = poemSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const PoemToUpdate = await prisma.poem.findUnique({
    where: { id },
  });

  if (!PoemToUpdate) {
    return {
      error: "Poem not found.",
    };
  }

  const newData = parsed.data;
  try {
    await prisma.poem.update({
      where: { id },
      data: newData,
    });

    revalidatePath(`/poem/${PoemToUpdate.slug}`);
    revalidateTag("latest_poems");
    revalidateTag("favourite_poems");
    revalidateTag("popular_poem_tags");
    revalidateTag("poems_meta");
    revalidateTag("poems_by_page");

    return { success: true };
  } catch (error) {
    console.error("Update poem failed:", error);
    return {
      error: "Failed to update poem. Please try again.",
    };
  }
}
export async function updatePoemFavourite(id: string, favourite: boolean) {
  await checkAccess();
  try {
    const PoemToUpdate = await prisma.poem.findUnique({
      where: { id },
    });

    if (!PoemToUpdate) {
      return {
        error: "Poem not found.",
      };
    }

    await prisma.poem.update({
      where: { id },
      data: { favourite },
    });

    revalidatePath(`/poem/${PoemToUpdate.slug}`);
    revalidateTag("latest_poems");
    revalidateTag("favourite_poems");
    revalidateTag("popular_poem_tags");
    revalidateTag("poems_meta");
    revalidateTag("poems_by_page");

    return { success: true };
  } catch (error) {
    console.error("Update poem failed:", error);
    return {
      error: "Failed to update poem. Please try again.",
    };
  }
}

export async function deletePoem(id: string) {
  await checkAccess();

  try {
    const poemToDelete = await prisma.poem.findUnique({
      where: { id },
    });

    if (!poemToDelete) {
      return {
        error: "Poem not found.",
      };
    }

    await prisma.poem.delete({
      where: { id },
    });

    revalidatePath(`/poem/${poemToDelete.slug}`);
    revalidateTag("latest_poems");
    revalidateTag("favourite_poems");
    revalidateTag("popular_poem_tags");
    revalidateTag("poems_meta");
    revalidateTag("poems_by_page");
    return { success: true };
  } catch (error) {
    console.error("Delete poem failed:", error);
    return {
      error: "Failed to delete poem. Please try again.",
    };
  }
}

export const getLatestPoems = unstable_cache(
  async () => {
    return prisma.poem.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
      take: 12, // only get the latest 12
    });
  },
  ["latest_poems"],
  {
    tags: ["latest_poems"],
  }
);

export const getFavouritePoems = unstable_cache(
  async () => {
    return prisma.poem.findMany({
      where: { favourite: true },
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
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // only get the latest 12
    });
  },
  ["favourite_poems"],
  {
    tags: ["favourite_poems"],
  }
);

export async function getPoemBySLug(slug: string) {
  return prisma.poem.findUnique({
    where: { slug },
    include: {
      poet: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

export const getPoemsMeta = unstable_cache(
  async () => {
    const [count, slugs] = await Promise.all([
      prisma.poem.count(),
      prisma.poem.findMany({
        select: { slug: true },
      }),
    ]);

    return {
      count,
      slugs: slugs.map((s) => s.slug),
    };
  },
  ["poems_meta"],
  {
    tags: ["poems_meta"],
  }
);
export const getPoemsByPage = unstable_cache(
  async (page: number) => {
    const perPage = 30;
    const skip = (page - 1) * perPage;

    return prisma.poem.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: perPage,
    });
  },
  ["poems_by_page"],
  {
    tags: ["poems_by_page"],
  }
);
