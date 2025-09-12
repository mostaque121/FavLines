import { getLyricsBySLug } from "@/app/action/lyrics";
import { LyricsDisplay } from "@/components/section/lyrics-display";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LyricsPage({ params }: PageProps) {
  const { slug } = await params;
  const lyrics = await getLyricsBySLug(decodeURIComponent(slug));
  if (!lyrics) return notFound();
  return (
    <div className="mx-auto container px-4 md:px-8 ">
      <LyricsDisplay slug={decodeURIComponent(slug)} lyrics={lyrics} />
    </div>
  );
}
