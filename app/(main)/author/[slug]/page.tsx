import { getAllPoets, getPoetBySLug } from "@/app/action/poet";
import { PoemCard } from "@/components/card/poem-card";
import ContentHeader from "@/components/section/content-header";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const poets = await getAllPoets();

  return poets.map((poet) => ({
    slug: poet.slug,
  }));
}
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPoetBySLug(decodeURIComponent(slug));
  if (!data) return notFound();

  return (
    <div className="mx-auto space-y-6 container py-8 px-4 md:px-8 ">
      <ContentHeader
        name={data.name}
        image={data.imageUrl}
        count={data._count.poems}
        page="poems"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {data.poems.map((poem) => (
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
    </div>
  );
}
