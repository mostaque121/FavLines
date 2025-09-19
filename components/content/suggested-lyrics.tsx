"use client";

import { getSuggestedLyricsFlexible } from "@/app/action/suggestion";
import { useQuery } from "@tanstack/react-query";
import { LyricsCardSmall } from "../card/lyrics-card";
import CommonHeader from "../section/common-header";
import { LyricsSmallCardSkeleton } from "../skeleton/lyrics-small-card";

interface Artist {
  id: string;
  name: string;
  slug: string;
}

interface SuggestedLyricsType {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  favourite: boolean;
  artist: Artist;
}

interface SectionProps {
  slug: string;
}

export default function SuggestedLyrics({ slug }: SectionProps) {
  const { data = [], isLoading } = useQuery<SuggestedLyricsType[]>({
    queryKey: ["suggested_lyrics", slug],
    queryFn: () => getSuggestedLyricsFlexible(slug),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="space-y-6  ">
      <CommonHeader subHeading="Suggested Lyrics" href="/lyrics/page/1" />,
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <LyricsSmallCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((lyric) => (
            <LyricsCardSmall
              key={lyric.id}
              id={lyric.id}
              slug={lyric.slug}
              title={lyric.title}
              imageUrl={lyric.imageUrl}
              favourite={lyric.favourite}
              artist={lyric.artist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
