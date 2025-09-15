import { getPoemBySLug, getPoemsMeta } from "@/app/action/poem";
import { PoemDisplay } from "@/components/section/poem-display";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { slugs } = await getPoemsMeta();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PoemPage({ params }: PageProps) {
  const { slug } = await params;
  const poem = await getPoemBySLug(decodeURIComponent(slug));
  if (!poem) return notFound();
  return (
    <div className="mx-auto container px-4 md:px-8 ">
      <PoemDisplay slug={decodeURIComponent(slug)} poem={poem} />
    </div>
  );
}
