"use client";

import { searchLyrics } from "@/app/action/lyrics";
import { searchPoems } from "@/app/action/poem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Music, PenTool, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export interface LyricsSearchResult {
  id: string;
  title: string;
  slug: string;
  artist: { name: string };
}

export interface PoemSearchResult {
  id: string;
  title: string;
  slug: string;
  poet: { name: string };
}

type SearchType = "lyrics" | "poems";

interface SectionProps {
  closeSearchBar: () => void;
}

export default function SearchBar({ closeSearchBar }: SectionProps) {
  const [searchType, setSearchType] = useState<SearchType>("lyrics");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchResults = [], isFetching } = useQuery<
    LyricsSearchResult[] | PoemSearchResult[]
  >({
    queryKey: ["search", searchType, debouncedSearchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      return searchType === "lyrics"
        ? await searchLyrics(debouncedSearchQuery)
        : await searchPoems(debouncedSearchQuery);
    },
    enabled: !!debouncedSearchQuery.trim(),
  });

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Add a small delay (e.g., 50ms) before closing
        setTimeout(() => {
          closeSearchBar();
        }, 300);
      }
    },
    [closeSearchBar]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={containerRef} className="relative container px-4 md:px-8 py-6">
      {/* Toggle Buttons */}
      <div className="flex justify-between gap-3 items-center">
        <div className="flex gap-2 mb-4">
          <Button
            variant={searchType === "lyrics" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchType("lyrics")}
          >
            <Music className="h-4 w-4 mr-2" />
            Lyrics
          </Button>
          <Button
            variant={searchType === "poems" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchType("poems")}
          >
            <PenTool className="h-4 w-4 mr-2" />
            Poems
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => closeSearchBar()}
          className="p-2"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Input */}
      <Input
        placeholder={`Search ${searchType}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
        autoFocus
      />

      {isFetching && (
        <p className="text-sm text-center py-5 text-muted-foreground">
          Searching...
        </p>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchResults.map((result) => (
            <Link
              href={
                searchType === "lyrics"
                  ? `/lyric/${result.slug}`
                  : `/poem/${result.slug}`
              }
              prefetch={false}
              key={result.id}
              onClick={closeSearchBar}
            >
              <div className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{result.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {searchType === "lyrics"
                        ? (result as LyricsSearchResult).artist.name
                        : (result as PoemSearchResult).poet.name}
                    </p>
                  </div>
                  <Badge className="capitalize flex items-center">
                    {searchType === "lyrics" ? (
                      <Music className="w-3 h-3 mr-1" />
                    ) : (
                      <PenTool className="w-3 h-3 mr-1" />
                    )}
                    {searchType}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {searchQuery && !isFetching && searchResults.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No {searchType} found for &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  );
}
