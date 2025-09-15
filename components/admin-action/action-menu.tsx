// LyricsDropdownClient.tsx
"use client";

import { deleteLyrics } from "@/app/action/lyrics";
import type { Lyrics, Poem } from "@/generated/prisma";
import LyricsForm from "../form/lyrics-form";
import PoemForm from "../form/poem-form";
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
        await deleteLyrics(item.id);
      }}
    />
  );
}
