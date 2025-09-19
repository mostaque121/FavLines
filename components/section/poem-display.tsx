import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "react-quill-new/dist/quill.snow.css";
import { PoemAction } from "../admin-action/action-menu";
import Favourite from "../card/heart";
import PopularPoemTags from "../content/popular-poem-tags";
import SuggestedPoem from "../content/suggested-poems";
import SuggestedPoets from "../content/suggested-poet";

interface Poet {
  id: string;
  name: string;
  slug: string;
}

interface Poem {
  id: string;
  slug: string;
  title: string;
  body: string;
  imageUrl: string;
  ytLink: string | null;
  favourite: boolean;
  poet: Poet;
  poetId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface PoemDisplayProps {
  poem: Poem;
  slug: string;
}

export function PoemDisplay({ poem, slug }: PoemDisplayProps) {
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

  return (
    <article className="py-16">
      {/* Header */}
      <header className="text-center mb-12 relative">
        <div className="flex items-center gap-4 justify-center  mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            {poem.title}
          </h1>
          <PoemAction poem={poem} />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 text-muted-foreground mb-8">
          <Link
            href={`/author/${poem.poet.slug}`}
            prefetch={false}
            className="flex hover:text-primary text-muted-foreground transition-colors duration-200 items-center gap-2"
          >
            <User className="h-4 w-4" />
            <span className="font-medium">{poem.poet.name}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(poem.createdAt)}</span>
            <Favourite
              type="poem"
              variant="big"
              favourite={poem.favourite}
              id={poem.id}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-0 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 lg:mr-16 space-y-12">
          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={poem.imageUrl}
              alt={`Illustration for ${poem.title}`}
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>

          {/* Poem Body */}
          <Card className=" bg-card border-0 shadow-lg">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: poem.body }}
            />
          </Card>

          {/* Tags */}
          {poem.tags.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {poem.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="bg-accent text-accent-foreground hover:bg-accent/80 transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* YouTube Video */}
          {poem.ytLink && (
            <section>
              <h3 className="text-lg font-semibold text-primary mb-6">
                Poetry Reading
              </h3>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={poem.ytLink}
                  title={`Poetry reading of ${poem.title}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Suggested Poems */}
        <aside className="w-full space-y-8">
          <SuggestedPoem slug={slug} />
          <SuggestedPoets />
          <PopularPoemTags />
        </aside>
      </div>
    </article>
  );
}
