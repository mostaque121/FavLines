import { getLatestPoems } from "@/app/action/poem";
import { PoemCard } from "../card/poem-card";
import CommonHeader from "../section/common-header";

export default async function RecentPoems() {
  const latestPoems = await getLatestPoems();
  return (
    <section className="space-y-6 ">
      <CommonHeader subHeading="Recently Added Poems" href="/poems/page/1" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPoems.map((poem) => (
          <PoemCard
            key={poem.id}
            title={poem.title}
            poet={poem.poet}
            imageUrl={poem.imageUrl}
            id={poem.id}
            favourite={poem.favourite}
            slug={poem.slug}
          />
        ))}
      </div>
    </section>
  );
}
