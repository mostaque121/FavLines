import { getAllPoetsForPage } from "@/app/action/poet";
import { AuthorCard } from "../card/poet-card";
import CommonHeader from "../section/common-header";

export default async function AllAuthors() {
  const authors = await getAllPoetsForPage();
  return (
    <section>
      {/* Page Title */}
      <CommonHeader heading="All Authors" />

      {/* Lyrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            poemCount={author._count.poems}
            name={author.name}
            image={author.imageUrl}
            slug={author.slug}
          />
        ))}
      </div>
    </section>
  );
}
