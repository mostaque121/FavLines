"use client";

import { Badge, Music, PenTool, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AddMenuPopover from "../admin-action/add-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchResult =
  | { id: number; title: string; artist: string; type: "lyrics" }
  | { id: number; title: string; author: string; type: "poems" };

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<"lyrics" | "poems">("lyrics");
  const pathname = usePathname();

  // Mock search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const mockResults: SearchResult[] =
        searchType === "lyrics"
          ? [
              {
                id: 1,
                title: "Bohemian Rhapsody",
                artist: "Queen",
                type: "lyrics",
              },
              {
                id: 2,
                title: "Imagine",
                artist: "John Lennon",
                type: "lyrics",
              },
              {
                id: 3,
                title: "Hotel California",
                artist: "Eagles",
                type: "lyrics",
              },
            ]
          : [
              {
                id: 1,
                title: "The Road Not Taken",
                author: "Robert Frost",
                type: "poems",
              },
              {
                id: 2,
                title: "Still I Rise",
                author: "Maya Angelou",
                type: "poems",
              },
              { id: 3, title: "If", author: "Rudyard Kipling", type: "poems" },
            ];

      const filtered = mockResults.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ("artist" in item &&
            item.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
          ("author" in item &&
            item.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  return (
    <div className="relative container mx-auto px-4 md:px-8">
      <nav className="w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={200}
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/lyrics"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/lyrics"
                  ? "text-primary underline underline-offset-4"
                  : "text-muted-foreground"
              }`}
            >
              Lyrics
            </Link>
            <Link
              href="/poems"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/poems"
                  ? "text-primary underline underline-offset-4"
                  : "text-muted-foreground"
              }`}
            >
              Poems
            </Link>
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
            <AddMenuPopover />
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-background border-b shadow-lg">
          <div className="container mx-auto h-screen px-4 md:px-8 pt-6">
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

            <Input
              placeholder={`Search ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
              autoFocus
            />

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{result.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {"artist" in result ? result.artist : result.author}
                        </p>
                      </div>
                      <Badge className="capitalize">
                        {result.type === "lyrics" ? (
                          <Music className="w-3 h-3 mr-1" />
                        ) : (
                          <PenTool className="w-3 h-3 mr-1" />
                        )}
                        {result.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No {searchType} found for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
