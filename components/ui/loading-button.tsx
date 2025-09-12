"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "./button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

/**
 * Reusable LoadingButton component
 * - Supports all Button variants/sizes from shadcn-style Button
 * - Automatically disables button when loading
 * - Shows loader icon and optional loadingText
 */
const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { className, children, loading = false, loadingText, disabled, ...props },
    ref
  ) => {
    return (
      <Button
        className={cn("flex items-center justify-center gap-2", className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{loading ? loadingText || children : children}</span>
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
