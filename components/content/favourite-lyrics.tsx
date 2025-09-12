import { getFavouriteLyrics } from "@/app/action/lyrics";
import { LyricsCardSmall } from "../card/lyrics-card";
import CommonHeader from "../section/common-header";

export default async function FavouriteLyrics() {
  const favouriteLyrics = await getFavouriteLyrics();

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Favourite Lyrics" href="/favourite/lyrics" />

      <div className="space-y-4">
        {favouriteLyrics.map((lyric) => (
          <LyricsCardSmall
            key={lyric.id}
            title={lyric.title}
            imageUrl={lyric.imageUrl}
            artist={lyric.artist}
            album={lyric.album}
            id={lyric.id}
            favourite={lyric.favourite}
            slug={lyric.slug}
          />
        ))}
      </div>
    </section>
  );
}
