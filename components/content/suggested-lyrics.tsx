"use client";

import { getSuggestedLyricsParallel } from "@/app/action/suggestion";
import { useQuery } from "@tanstack/react-query";
import { LyricsCardSmall } from "../card/lyrics-card";
import CommonHeader from "../section/common-header";
import { LyricsSmallCardSkeleton } from "../skeleton/lyrics-small-card";

interface Artist {
  id: string;
  name: string;
  slug: string;
}
interface Album {
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
  album: Album;
}

interface SectionProps {
  slug: string;
}

export default function SuggestedLyrics({ slug }: SectionProps) {
  const { data = [], isLoading } = useQuery<SuggestedLyricsType[]>({
    queryKey: ["suggested_lyrics", slug],
    queryFn: () => getSuggestedLyricsParallel(slug),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="space-y-6  ">
      <CommonHeader subHeading="Suggested Lyrics" href="/lyrics/page/1" />,
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <LyricsSmallCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((lyric) => (
            <LyricsCardSmall
              key={lyric.id}
              id={lyric.id}
              slug={lyric.slug}
              title={lyric.title}
              imageUrl={lyric.imageUrl}
              favourite={lyric.favourite}
              artist={lyric.artist}
              album={lyric.album}
            />
          ))}
        </div>
      )}
    </section>
  );
}
