"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li {...props} />;
}

// ---------------- Next.js PaginationLink ----------------
type PaginationLinkProps = {
  href: string;
  isActive?: boolean;
  size?: "icon" | "default" | "sm" | "lg";
  children: React.ReactNode;
};

function PaginationLink({
  href,
  isActive,
  size = "icon",
  children,
}: PaginationLinkProps) {
  return (
    <PaginationItem>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size,
          })
        )}
      >
        {children}
      </Link>
    </PaginationItem>
  );
}

// Previous button
function PaginationPrevious({ href }: { href: string }) {
  return (
    <PaginationLink href={href} size="default">
      <ChevronLeftIcon className="mr-1" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  );
}

// Next button
function PaginationNext({ href }: { href: string }) {
  return (
    <PaginationLink href={href} size="default">
      <span className="hidden sm:inline">Next</span>
      <ChevronRightIcon className="ml-1" />
    </PaginationLink>
  );
}

// Ellipsis
function PaginationEllipsis() {
  return (
    <PaginationItem>
      <span className="flex h-9 w-9 items-center justify-center">
        <MoreHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
      </span>
    </PaginationItem>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
