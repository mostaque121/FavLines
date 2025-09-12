export function LyricsSmallCardSkeleton() {
  return (
    <div className="flex items-start gap-3 bg-card relative rounded-lg shadow-md overflow-hidden p-2">
      {/* Image skeleton */}
      <div className="relative h-16 w-16 flex-shrink-0">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="w-full">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-3/4" />

        <div className="flex w-full justify-between items-start gap-2 mt-1">
          {/* Author skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
          {/* Album skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />

          {/* Heart icon skeleton */}
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
