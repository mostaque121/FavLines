"use client";

import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

// 🔹 Utility function to generate slug
function generateSlug(text: string) {
  return (
    text
      .replace(/[^a-zA-Z0-9\u0980-\u09FF\u09E6-\u09EF\s-]/g, "")
      // Remove unwanted characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens
      .toLowerCase()
      .trim()
      .replace(/^[-]+|[-]+$/g, "")
  ); // Trim starting/ending hyphens
}

interface SlugInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onGenerate?: (slug: string) => void;
  initialValue?: string;
}

export function SlugInput({
  className,
  onGenerate,
  initialValue,
  ...props
}: SlugInputProps) {
  const [value, setValue] = React.useState(initialValue ?? "");

  const handleChange = (value: string) => {
    setValue(value);
    onGenerate?.(value);
  };

  const handleGenerate = () => {
    const slug = generateSlug(value);
    setValue(slug);
    onGenerate?.(slug);
  };

  const isButtonEnabled = Boolean(value);

  // 🔹 Check if current value is already a proper slug
  const isDirty = value !== generateSlug(value);

  return (
    <div className="relative flex items-center gap-2">
      <Input
        {...props}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={cn("pr-12", className)}
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={!isButtonEnabled}
        className={cn(
          "absolute right-2 flex items-center rounded-md p-1 transition-colors",
          isDirty
            ? "text-amber-500 hover:text-amber-600" // 🔸 highlight when regenerate needed
            : "text-gray-400 hover:text-gray-600",
          !isButtonEnabled && "opacity-50 cursor-not-allowed"
        )}
        title={isDirty ? "Regenerate slug" : "Slug is clean"}
      >
        <RefreshCcw
          className={cn(
            "h-4 w-4 transition-transform",
            isDirty && "animate-spin-slow" // subtle spin if dirty
          )}
        />
      </button>
    </div>
  );
}
