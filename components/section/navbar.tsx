"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddMenuPopover from "../admin-action/add-menu";
import { Button } from "../ui/button";
import SearchBar from "./search-bar";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();

  return (
    <div className="relative ">
      <nav className="w-full container mx-auto px-4 md:px-8 border-b bg-background">
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

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href="/lyric/page/1"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/lyrics")
                  ? "text-primary underline underline-offset-4"
                  : "text-muted-foreground"
              }`}
            >
              Lyrics
            </Link>
            <Link
              href="/poem/page/1"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/poems")
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
          <SearchBar />
        </div>
      )}
    </div>
  );
}
