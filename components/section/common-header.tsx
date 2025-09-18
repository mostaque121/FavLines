import { ChevronsRight } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  heading?: string;
  subHeading?: string;
  href?: string;
}

export default function CommonHeader({
  heading,
  subHeading,
  href,
}: SectionProps) {
  // Decide which text to show: heading first, fallback to subHeading
  const title = heading || subHeading;

  if (!title && !href) return null; // nothing to show

  return (
    <div className="bg-gray-700 text-sm flex items-center justify-between flex-wrap gap-3 py-1.5 rounded-md px-4 mb-4">
      {title && <h1 className="text-white font-semibold">{title}</h1>}

      {href && (
        <Link
          prefetch={false}
          href={href}
          aria-label={`View all ${title || "items"}`}
        >
          <span className="text-white flex items-center hover:text-gray-300 transition-colors">
            View All <ChevronsRight className="ml-1 w-4 h-4" />
          </span>
        </Link>
      )}
    </div>
  );
}
