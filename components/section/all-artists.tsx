import { getAllArtistsForPage } from "@/app/action/artist";
import { ArtistCardWithCount } from "../card/artist-card";
import CommonHeader from "../section/common-header";

export default async function AllArtists() {
  const artists = await getAllArtistsForPage();
  return (
    <section>
      <CommonHeader heading="All Artists" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {artists.map((artist) => (
          <ArtistCardWithCount
            key={artist.id}
            lyricsCount={artist._count.lyrics}
            name={artist.name}
            image={artist.imageUrl}
            slug={artist.slug}
          />
        ))}
      </div>
    </section>
  );
}
