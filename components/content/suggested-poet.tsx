import { getRandomSuggestedPoets } from "@/app/action/poet";
import { PoetCard } from "../card/poet-card";
import CommonHeader from "../section/common-header";

export default async function SuggestedPoets() {
  const suggestedPoets = await getRandomSuggestedPoets();

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Suggested Authors" href="/authors" />

      <div className="grid grid-cols-3 gap-4">
        {suggestedPoets.map((poet) => (
          <PoetCard
            key={poet.id}
            name={poet.name}
            image={poet.imageUrl}
            slug={poet.slug}
          />
        ))}
      </div>
    </section>
  );
}
