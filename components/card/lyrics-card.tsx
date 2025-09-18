"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Favourite from "./heart";

interface Artist {
  name: string;
  slug: string;
}
interface Album {
  name: string;
  slug: string;
}

type LyricsCardProps = {
  title: string;
  artist: Artist;
  album: Album;
  imageUrl: string;
  favourite: boolean;
  id: string;
  slug: string;
};

export function LyricsCard({
  title,
  artist,
  album,
  imageUrl,
  favourite,
  id,
  slug,
}: LyricsCardProps) {
  return (
    <div className="bg-card relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <Badge className="absolute top-2 left-2 z-10">Lyrics</Badge>
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
        <Link href={`/lyric/${slug}`} prefetch={false}>
          <h3 className="text-base md:text-lg hover:text-primary font-bold text-foreground transition-color duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        <div className="flex justify-between items-start gap-2 mt-1">
          <div className="flex flex-wrap items-center  text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2">{artist.name}</span>
            <span>{album.name}</span>
          </div>

          {/* Heart icon */}
          <Favourite type="lyrics" id={id} favourite={favourite} />
        </div>
      </div>
    </div>
  );
}

export function LyricsCardSmall({
  title,
  imageUrl,
  artist,
  album,
  id,
  favourite,
  slug,
}: LyricsCardProps) {
  return (
    <div className="group flex items-start gap-3 bg-card relative rounded-lg overflow-hidden ">
      <Link
        href={`/lyric/${slug}`}
        prefetch={false}
        className="flex flex-1 items-start gap-3"
      >
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="w-full py-2 pr-3">
          {/* Title with its own style */}
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>

          <div className="flex w-full justify-between items-start gap-2 mt-1">
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="mr-2 line-clamp-1">{artist.name}</span>
              <span className="line-clamp-1">{album.name}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Favourite is independent (not part of Link) */}
      <div className="absolute top-2 right-2">
        <Favourite
          type="lyrics"
          variant="small"
          id={id}
          favourite={favourite}
        />
      </div>

      {/* underline hover effect */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
