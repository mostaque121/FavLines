import { LyricsCard } from "../card/lyrics-card";
import CommonHeader from "../section/common-header";
import { Pager } from "../ui/pager";

type Lyrics = {
  title: string;
  artist: Artist;
  album: Album;
  imageUrl: string;
  favourite: boolean;
  id: string;
  slug: string;
};
interface Artist {
  name: string;
  slug: string;
}
interface Album {
  name: string;
  slug: string;
}
interface SectionProps {
  lyrics: Lyrics[];
  page: number;
  totalPages: number;
}
export default function AllLyrics({ lyrics, page, totalPages }: SectionProps) {
  return (
    <section>
      {/* Page Title */}
      <CommonHeader heading="Lyrics Collection" />

      {/* Lyrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lyrics.map((lyric) => (
          <LyricsCard
            imageUrl={lyric.imageUrl}
            id={lyric.id}
            title={lyric.title}
            artist={lyric.artist}
            album={lyric.album}
            slug={lyric.slug}
            favourite={lyric.favourite}
            key={lyric.id}
          />
        ))}
      </div>

      <Pager
        currentPage={page}
        totalPages={totalPages}
        basePath="/lyrics/page"
      />
    </section>
  );
}
