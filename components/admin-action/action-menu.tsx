// LyricsDropdownClient.tsx
"use client";

import { deleteArtist } from "@/app/action/artist";
import { deleteLyrics } from "@/app/action/lyrics";
import { deletePoem } from "@/app/action/poem";
import { deletePoet } from "@/app/action/poet";
import type { Artist, Lyrics, Poem, Poet } from "@/generated/prisma";
import ArtistForm from "../form/artist-form";
import LyricsForm from "../form/lyrics-form";
import PoemForm from "../form/poem-form";
import PoetForm from "../form/poet-form";
import { ItemActionDropdown } from "./item-action-dropdown";

interface Props {
  lyrics: Lyrics;
}

export function LyricsAction({ lyrics }: Props) {
  return (
    <ItemActionDropdown
      name="Lyrics"
      item={lyrics}
      EditForm={LyricsForm}
      onDelete={async (item) => {
        await deleteLyrics(item.id);
      }}
    />
  );
}
export function PoemAction({ poem }: { poem: Poem }) {
  return (
    <ItemActionDropdown
      name="Poem"
      item={poem}
      EditForm={PoemForm}
      onDelete={async (item) => {
        await deletePoem(item.id);
      }}
    />
  );
}
export function PoetAction({ poet }: { poet: Poet }) {
  return (
    <ItemActionDropdown
      name="Poet"
      item={poet}
      EditForm={PoetForm}
      onDelete={async (item) => {
        await deletePoet(item.id);
      }}
    />
  );
}
export function ArtistAction({ artist }: { artist: Artist }) {
  return (
    <ItemActionDropdown
      name="Artist"
      item={artist}
      EditForm={ArtistForm}
      onDelete={async (item) => {
        await deleteArtist(item.id);
      }}
    />
  );
}
