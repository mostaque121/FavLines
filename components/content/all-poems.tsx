import { PoemCard } from "../card/poem-card";
import CommonHeader from "../section/common-header";
import { Pager } from "../ui/pager";

type Poem = {
  title: string;
  poet: Poet;
  imageUrl: string;
  favourite: boolean;
  id: string;
  slug: string;
};
interface Poet {
  name: string;
  slug: string;
}

interface SectionProps {
  poems: Poem[];
  page: number;
  totalPages: number;
}
export default function AllPoems({ poems, page, totalPages }: SectionProps) {
  return (
    <section>
      {/* Page Title */}
      <CommonHeader heading="Poems Collection" />

      {/* Lyrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <PoemCard
            imageUrl={poem.imageUrl}
            id={poem.id}
            title={poem.title}
            poet={poem.poet}
            slug={poem.slug}
            favourite={poem.favourite}
            key={poem.id}
          />
        ))}
      </div>

      <Pager
        currentPage={page}
        totalPages={totalPages}
        basePath="/poems/page"
      />
    </section>
  );
}
