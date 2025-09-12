"use client";

import React from "react";
import CreatableSelect from "react-select/creatable";

interface TagSelectProps {
  value?: string[]; // selected tags (strings)
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  options?: string[]; // available tags
}

const TagSelect: React.FC<TagSelectProps> = ({
  value = [],
  onChange,
  placeholder = "Select or create tags",
  options = [],
}) => {
  // Convert simple string array to { value, label }
  const formatOptions = (opts: string[]) =>
    opts.map((o) => ({ value: o, label: o }));

  return (
    <CreatableSelect
      isMulti
      value={formatOptions(value)}
      onChange={(newValue) => {
        const tags = (newValue || []).map((v) => v.value);
        onChange?.(tags);
      }}
      options={formatOptions(options)}
      placeholder={placeholder}
      isClearable
      blurInputOnSelect={false} // ✅ prevent blur after selecting
      closeMenuOnSelect={false} // ✅ keep menu open for multiple select
      captureMenuScroll={false}
      menuPlacement={"bottom"}
      menuShouldScrollIntoView={false}
      /*       styles={{
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#e0e0e0",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#333",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#555",
          ":hover": { backgroundColor: "#ccc", color: "#000" },
        }),
      }} */
      noOptionsMessage={() => "Type to create a tag"}
    />
  );
};

export default TagSelect;
