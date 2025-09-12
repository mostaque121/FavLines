"use client";

import React from "react";
import Select from "react-select";

interface Option {
  id: string;
  name: string;
}

interface SingleSelectProps {
  value?: string;
  onChange?: (id: string | null) => void;
  placeholder?: string;
  options: Option[];
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  onChange,
  placeholder = "Select an option",
  options,
}) => {
  const formattedOptions = options.map((o) => ({ value: o.id, label: o.name }));
  const selected = formattedOptions.find((o) => o.value === value) || null;

  return (
    <Select
      value={selected}
      onChange={(newValue) => onChange?.(newValue ? newValue.value : null)}
      options={formattedOptions}
      placeholder={placeholder}
      isClearable
      blurInputOnSelect={false} // keep input focus
      captureMenuScroll={false}
      menuPlacement={"bottom"}
      menuShouldScrollIntoView={false}
    />
  );
};

export default SingleSelect;
