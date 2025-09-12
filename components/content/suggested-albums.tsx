import { getRandomSuggesteAlbums } from "@/app/action/album";
import { AlbumCard } from "../card/album-card";
import CommonHeader from "../section/common-header";

export default async function SuggestedAlbums() {
  const suggestedAlbums = await getRandomSuggesteAlbums();

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Suggested Albums" href="/artists" />

      <div className="grid grid-cols-3 gap-4">
        {suggestedAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            name={album.name}
            image={album.imageUrl}
            slug={album.slug}
          />
        ))}
      </div>
    </section>
  );
}
