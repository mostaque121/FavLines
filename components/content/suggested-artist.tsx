import { getRandomSuggestedArtists } from "@/app/action/artist";
import { ArtistCard } from "../card/artist-card";
import CommonHeader from "../section/common-header";

export default async function SuggestedArtist() {
  const suggestedArtists = await getRandomSuggestedArtists();

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Suggested Artists" href="/artists" />

      <div className="grid grid-cols-3 gap-4">
        {suggestedArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            image={artist.imageUrl}
            slug={artist.slug}
          />
        ))}
      </div>
    </section>
  );
}
