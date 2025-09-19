"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Favourite from "./heart";

interface Poet {
  name: string;
  slug: string;
}

type PoemCardProps = {
  title: string;
  poet: Poet;
  imageUrl: string;
  favourite: boolean;
  id: string;
  slug: string;
};

export function PoemCard({
  title,
  poet,
  imageUrl,
  favourite,
  id,
  slug,
}: PoemCardProps) {
  return (
    <div className="bg-card relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <Badge className="absolute top-2 left-2 z-50">Poem</Badge>
      {/* Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={1280}
          height={720}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <Link prefetch={false} href={`/poem/${slug}`}>
          <h3 className=" text-base md:text-lg hover:text-primary font-bold text-foreground transition-color duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        <div className="flex justify-between items-start gap-2 mt-1">
          <Link
            href={`/author/${poet.slug}`}
            prefetch={false}
            className="flex flex-wrap items-center  text-sm text-gray-600 hover:text-primary transition-colors duration-200 dark:text-gray-300"
          >
            <span className="mr-2">{poet.name}</span>
          </Link>

          {/* Heart icon */}
          <Favourite type="poem" id={id} favourite={favourite} />
        </div>
      </div>
    </div>
  );
}

export function PoemCardSmall({
  title,
  imageUrl,
  poet,
  id,
  favourite,
  slug,
}: PoemCardProps) {
  return (
    <div className="group flex items-start gap-3 bg-card relative rounded-md overflow-hidden">
      <Link
        href={`/poem/${slug}`}
        prefetch={false}
        className="flex flex-1 items-start gap-3"
      >
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        <div className="w-full py-2 pr-3">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-start gap-2 mt-1">
            <span className="mr-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
              {poet.name}
            </span>
          </div>
        </div>
      </Link>

      {/* Favourite stays independent (not part of link) */}
      <div className="absolute top-2 right-2">
        <Favourite type="poem" variant="small" id={id} favourite={favourite} />
      </div>

      {/* underline hover effect */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
