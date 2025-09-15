"use client";

import { searchLyrics } from "@/app/action/lyrics";
import { searchPoems } from "@/app/action/poem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Music, PenTool } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

export default function SearchBar() {
  const [searchType, setSearchType] = useState<SearchType>("lyrics");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="relative container px-4 md:px-8 py-6">
      {/* Toggle Buttons */}
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
