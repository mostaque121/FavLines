import { getLatestLyrics } from "@/app/action/lyrics";
import { LyricsCard } from "../card/lyrics-card";
import CommonHeader from "../section/common-header";

export default async function RecentLyrics() {
  const latestLyrics = await getLatestLyrics();
  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Recently Added Lyrics" href="/lyrics/page/1" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestLyrics.map((lyric) => (
          <LyricsCard
            key={lyric.id}
            title={lyric.title}
            artist={lyric.artist}
            album={lyric.album}
            imageUrl={lyric.imageUrl}
            id={lyric.id}
            favourite={lyric.favourite}
            slug={lyric.slug}
          />
        ))}
      </div>
    </section>
  );
}
