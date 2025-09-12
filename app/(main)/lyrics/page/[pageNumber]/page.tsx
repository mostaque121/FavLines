import { getLyricsByPage, getLyricsMeta } from "@/app/action/lyrics";
import AllLyrics from "@/components/content/all-lyrics";
import FavouriteLyrics from "@/components/content/favourite-lyrics";
import PopularLyricsTags from "@/components/content/popular-lyrics-tag";
import SuggestedAlbums from "@/components/content/suggested-albums";
import SuggestedArtist from "@/components/content/suggested-artist";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { count } = await getLyricsMeta();
  const perPage = 30;
  const totalPages = Math.ceil(count / perPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }));
}

interface PageProps {
  params: Promise<{ pageNumber: string }>;
}

export default async function LyricsPage({ params }: PageProps) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber) || 1;
  const perPage = 30;

  const { count } = await getLyricsMeta();
  const totalPages = Math.ceil(count / perPage);

  // If page number is invalid or out of range → 404
  if (page < 1 || page > totalPages) {
    notFound();
  }

  const lyrics = await getLyricsByPage(page);

  // If no lyrics for this page → 404
  if (!lyrics || lyrics.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto md:px-8 px-4 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-0 gap-16">
        <div className="lg:col-span-2 md:mr-12">
          <AllLyrics page={page} totalPages={totalPages} lyrics={lyrics} />
        </div>
        <aside className="space-y-6">
          <SuggestedArtist />
          <SuggestedAlbums />
          <FavouriteLyrics />
          <PopularLyricsTags />
        </aside>
      </div>
    </div>
  );
}
