"use client";

import { updateLyricsFavourite } from "@/app/action/lyrics";
import { updatePoemFavourite } from "@/app/action/poem";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface SectionProps {
  favourite: boolean;
  id: string;
  variant?: "small" | "big";
  type: "poem" | "lyrics";
}

export default function Favourite({
  favourite,
  id,
  variant = "big",
  type,
}: SectionProps) {
  const { status, data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status !== "authenticated" || !data.user?.name)
    return (
      <div
        className={` ${variant === "big" ? "" : " px-1"}
        `}
      >
        <Heart
          onClick={onSubmit}
          className={` ${
            variant === "big" ? "h-5 w-5" : "w-4 h-4 mt-1 "
          }  transition-all duration-200
          ${favourite ? "text-red-500 fill-red-500" : "text-gray-400 "}
        `}
        />
      </div>
    );

  async function onSubmit() {
    if (isLoading) return; // prevent multiple clicks
    setIsLoading(true);

    try {
      if (type === "lyrics") {
        await updateLyricsFavourite(id, !favourite);
        toast.success(
          !favourite ? "Marked as Favourite" : "Removed from Favourite"
        );
      }
      if (type === "poem") {
        await updatePoemFavourite(id, !favourite);
        toast.success(
          !favourite ? "Marked as Favourite" : "Removed from Favourite"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={` ${variant === "big" ? "" : " px-1"}
        `}
    >
      <Heart
        onClick={onSubmit}
        className={` ${
          variant === "big" ? "h-5 w-5" : "w-4 h-4 mt-1 "
        } cursor-pointer transition-all duration-200
          ${
            favourite
              ? "text-red-500 fill-red-500"
              : "text-gray-400 hover:text-red-500 hover:fill-red-500"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
    </div>
  );
}
