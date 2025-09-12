import { getPopularTagsForLyrics } from "@/app/action/tag";
import { Badge } from "@/components/ui/badge";
import CommonHeader from "../section/common-header";

export default async function PopularLyricsTags() {
  const data = await getPopularTagsForLyrics();
  if (data.length === 0) return null;

  return (
    <section className="space-y-6">
      <CommonHeader subHeading="Popular Tags" />
      <div className="flex flex-wrap gap-2">
        {data.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-accent text-accent-foreground hover:bg-accent/80 transition-colors cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  );
}
