import { getPoemsByPage, getPoemsMeta } from "@/app/action/poem";
import AllPoems from "@/components/content/all-poems";
import FavouritePoems from "@/components/content/favourite-poems";
import PopularPoemTags from "@/components/content/popular-poem-tags";
import SuggestedPoets from "@/components/content/suggested-poet";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { count } = await getPoemsMeta();
  const perPage = 30;
  const totalPages = Math.ceil(count / perPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }));
}

interface PageProps {
  params: Promise<{ pageNumber: string }>;
}

export default async function PoemPage({ params }: PageProps) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber) || 1;
  const perPage = 30;

  const { count } = await getPoemsMeta();
  const totalPages = Math.ceil(count / perPage);

  // If page number is invalid or out of range → 404
  if (page < 1 || page > totalPages) {
    notFound();
  }

  const poems = await getPoemsByPage(page);

  // If no poems for this page → 404
  if (!poems || poems.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto md:px-8 px-4 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-0 gap-16">
        <div className="lg:col-span-2 md:mr-12">
          <AllPoems page={page} totalPages={totalPages} poems={poems} />
        </div>
        <aside className="space-y-6">
          <FavouritePoems />
          <SuggestedPoets />
          <PopularPoemTags />
        </aside>
      </div>
    </div>
  );
}
