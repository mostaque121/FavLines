"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { AddBtn } from "../ui/add-btn";

import { useSession } from "next-auth/react";
import AlbumForm from "../form/album-form";
import ArtistForm from "../form/artist-form";
import LyricsForm from "../form/lyrics-form";
import PoemForm from "../form/poem-form";
import PoetForm from "../form/poet-form";
import TagForm from "../form/tag-form";

export default function AddMenuPopover() {
  const { data, status } = useSession();
  if (status !== "authenticated" || !data.user?.name) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-2">
        <div className="flex flex-col gap-2">
          <AddBtn title="Add Album" FormComponent={AlbumForm} />
          <AddBtn title="Add Artist" FormComponent={ArtistForm} />
          <AddBtn title="Add Lyrics" FormComponent={LyricsForm} />
          <AddBtn title="Add Poem" FormComponent={PoemForm} />
          <AddBtn title="Add Poet" FormComponent={PoetForm} />
          <AddBtn title="Add Tags" FormComponent={TagForm} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
