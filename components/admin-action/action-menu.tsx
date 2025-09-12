// LyricsDropdownClient.tsx
"use client";

import { deleteLyrics } from "@/app/action/lyrics";
import type { Lyrics } from "@/generated/prisma";
import LyricsForm from "../form/lyrics-form";
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
