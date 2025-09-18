import Image from "next/image";
import Link from "next/link";

interface ArtistCardProps {
  name: string;
  image: string | null;
  slug: string;
}

export function ArtistCard({ name, image, slug }: ArtistCardProps) {
  return (
    <Link
      href={`/artist/${slug}`}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      prefetch={false}
    >
      {/* Square container for the image */}
      <div className="aspect-square relative w-full">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}

        {/* Bottom overlay with gradient background */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-white font-semibold text-sm truncate">{name}</h3>
        </div>
      </div>
    </Link>
  );
}

interface AuthorCardProps {
  name: string;
  image: string | null;
  slug: string;
  lyricsCount?: number;
}

export function ArtistCardWithCount({
  name,
  image,
  slug,
  lyricsCount = 0,
}: AuthorCardProps) {
  return (
    <Link
      href={`/artist/${slug}`}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      prefetch={false}
    >
      {/* Square container for the image */}
      <div className="aspect-square relative w-full">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}

        {/* Bottom overlay with gradient background */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-white font-semibold text-sm truncate">{name}</h3>
          <p className="text-gray-200 text-xs mt-1">
            {lyricsCount} {lyricsCount === 1 ? "lyric" : "lyrics"}
          </p>
        </div>
      </div>
    </Link>
  );
}
