import { getAllArtists, getArtistBySLug } from "@/app/action/artist";
import { ArtistAction } from "@/components/admin-action/action-menu";
import { LyricsCard } from "@/components/card/lyrics-card";
import ContentHeader from "@/components/section/content-header";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const artists = await getAllArtists();

  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getArtistBySLug(decodeURIComponent(slug));
  if (!data) return notFound();

  return (
    <div className="mx-auto space-y-6 container py-8 px-4 md:px-8 ">
      <ContentHeader
        name={data.name}
        image={data.imageUrl}
        count={data._count.lyrics}
        page="lyrics"
        Action={<ArtistAction artist={data} />}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {data.lyrics.map((lyric) => (
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
    </div>
  );
}
