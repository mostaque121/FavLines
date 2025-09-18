import { getFavouritePoems } from "@/app/action/poem";
import { PoemCardSmall } from "../card/poem-card";
import CommonHeader from "../section/common-header";

export default async function FavouritePoems() {
  const favouritePoems = await getFavouritePoems();

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Favourite Poems" href="/favourite/poems" />

      <div className="space-y-2">
        {favouritePoems.map((poem) => (
          <PoemCardSmall
            key={poem.id}
            title={poem.title}
            imageUrl={poem.imageUrl}
            poet={poem.poet}
            id={poem.id}
            favourite={poem.favourite}
            slug={poem.slug}
          />
        ))}
      </div>
    </section>
  );
}
