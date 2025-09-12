"use server";
import { prisma } from "@/lib/prisma";

type SuggestedPoem = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  favourite: boolean;
  poet: {
    id: string;
    name: string;
    slug: string;
  };
};
type SuggestedLyrics = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  favourite: boolean;
  artist: {
    id: string;
    name: string;
    slug: string;
  };
  album: {
    id: string;
    name: string;
    slug: string;
  };
};

export async function getSuggestedPoemsParallel(
  slug: string
): Promise<SuggestedPoem[]> {
  const poem = await prisma.poem.findUnique({
    where: { slug },
    select: { id: true, poetId: true, tags: true },
  });
  if (!poem) return [];

  const seen = new Set<string>();
  seen.add(poem.id);

  // parallel queries
  const [tagBased, samePoet, favourite, randoms] = await Promise.all([
    prisma.poem.findMany({
      where: { id: { not: poem.id }, tags: { hasSome: poem.tags } },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        poet: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.poem.findMany({
      where: { id: { not: poem.id }, poetId: poem.poetId },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        poet: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.poem.findMany({
      where: { id: { not: poem.id }, favourite: true },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        poet: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.poem.findMany({
      where: { id: { not: poem.id } },
      take: 20,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        poet: { select: { id: true, name: true, slug: true } },
      },
    }),
  ]);

  const suggestions: SuggestedPoem[] = [];

  function pickFromArray(arr: SuggestedPoem[], max: number) {
    shuffleArray(arr).some((p) => {
      if (!seen.has(p.id) && suggestions.length < max) {
        seen.add(p.id);
        suggestions.push(p);
      }
      return suggestions.length >= max;
    });
  }

  pickFromArray(tagBased, 3); // tag based
  pickFromArray(samePoet, 5); // same poet
  pickFromArray(favourite, 6); // favourite
  pickFromArray(randoms, 6); // fill remaining

  return suggestions;
}

export async function getSuggestedLyricsParallel(
  slug: string
): Promise<SuggestedLyrics[]> {
  const lyrics = await prisma.lyrics.findUnique({
    where: { slug },
    select: { id: true, artistId: true, tags: true },
  });
  if (!lyrics) return [];

  const seen = new Set<string>();
  seen.add(lyrics.id);

  // parallel queries
  const [tagBased, samePoet, favourite, randoms] = await Promise.all([
    prisma.lyrics.findMany({
      where: { id: { not: lyrics.id }, tags: { hasSome: lyrics.tags } },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        artist: { select: { id: true, name: true, slug: true } },
        album: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.lyrics.findMany({
      where: { id: { not: lyrics.id }, artistId: lyrics.artistId },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        artist: { select: { id: true, name: true, slug: true } },
        album: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.lyrics.findMany({
      where: { id: { not: lyrics.id }, favourite: true },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        artist: { select: { id: true, name: true, slug: true } },
        album: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.lyrics.findMany({
      where: { id: { not: lyrics.id } },
      take: 20,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        favourite: true,
        artist: { select: { id: true, name: true, slug: true } },
        album: { select: { id: true, name: true, slug: true } },
      },
    }),
  ]);

  const suggestions: SuggestedLyrics[] = [];

  function pickFromArray(arr: SuggestedLyrics[], max: number) {
    shuffleArray(arr).some((p) => {
      if (!seen.has(p.id) && suggestions.length < max) {
        seen.add(p.id);
        suggestions.push(p);
      }
      return suggestions.length >= max;
    });
  }

  pickFromArray(tagBased, 3); // tag based
  pickFromArray(samePoet, 5); // same poet
  pickFromArray(favourite, 6); // favourite
  pickFromArray(randoms, 6); // fill remaining

  return suggestions;
}

// shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
