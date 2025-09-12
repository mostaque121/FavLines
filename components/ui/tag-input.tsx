"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface TagInputProps {
  tags: string[]; // state from parent
  onChangeTags: (tags: string[]) => void; // updater from parent
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChangeTags,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChangeTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChangeTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="w-full">
      {/* Display tags */}
      <div className="flex flex-wrap gap-2 my-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-200 text-blue-800 px-2 py-1 rounded-full"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="ml-1 text-red-500 font-bold"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input and Add button */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Add a tag"}
        />
        <Button type="button" onClick={handleAddTag}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagInput;
