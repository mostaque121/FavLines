import { getLatestLyrics } from "@/app/action/lyrics";
import { getLatestPoems } from "@/app/action/poem";
import { ChevronsRight } from "lucide-react";
import { LyricsCard } from "../card/lyrics-card";
import { PoemCard } from "../card/poem-card";

export default async function RecentPost() {
  const latestLyrics = await getLatestLyrics();
  const latestPoems = await getLatestPoems();
  return (
    <section className="space-y-6 bg-muted/30">
      <div className="bg-gray-700 flex item justify-between mb-4 flex-wrap gap-3 py-2 px-4">
        <h2 className="text-white">Recently Added Lyrics</h2>
        <span className="text-white flex items-center">
          View All <ChevronsRight className="ml-1" />
        </span>
      </div>

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
      <div className="bg-gray-700 flex item justify-between mb-4 flex-wrap gap-3 py-2 px-4">
        <h2 className="text-white">Recently Added Poem</h2>
        <span className="text-white flex items-center">
          View All <ChevronsRight className="ml-1" />
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPoems.map((poem) => (
          <PoemCard
            key={poem.id}
            title={poem.title}
            poet={poem.poet}
            imageUrl={poem.imageUrl}
            id={poem.id}
            favourite={poem.favourite}
            slug={poem.slug}
          />
        ))}
      </div>
    </section>
  );
}
