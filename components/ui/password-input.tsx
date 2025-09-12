"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
    inputRef.current?.focus(); // keep focus when toggling
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        className="pr-10" // padding for eye button
        {...props}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-400" />
        ) : (
          <Eye className="h-4 w-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}

export { Input, PasswordInput };
