"use client";

import { getSuggestedPoemsParallel } from "@/app/action/suggestion";
import { useQuery } from "@tanstack/react-query";
import { PoemCardSmall } from "../card/poem-card";
import CommonHeader from "../section/common-header";
import { PoemSmallCardSkeleton } from "../skeleton/poem-small-card";

interface Poet {
  id: string;
  name: string;
  slug: string;
}

interface SuggestedPoemType {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  favourite: boolean;
  poet: Poet;
}

interface SectionProps {
  slug: string;
}

export default function SuggestedPoem({ slug }: SectionProps) {
  const { data = [], isLoading } = useQuery<SuggestedPoemType[]>({
    queryKey: ["suggested_poem", slug],
    queryFn: () => getSuggestedPoemsParallel(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Suggested Poems" href="/poems/page/1" />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <PoemSmallCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((poem) => (
            <PoemCardSmall
              key={poem.id}
              id={poem.id}
              slug={poem.slug}
              title={poem.title}
              imageUrl={poem.imageUrl}
              favourite={poem.favourite}
              poet={poem.poet}
            />
          ))}
        </div>
      )}
    </section>
  );
}
