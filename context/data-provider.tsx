"use client";

import { createContext, useContext, type ReactNode } from "react";

interface Artist {
  id: string;
  name: string;
  slug: string;
}
interface Poet {
  id: string;
  name: string;
  slug: string;
}

// Define the context type
export interface DataContextType {
  tags: string[];
  artists: Artist[];
  poets: Poet[];
}

// Create the context with a default empty value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export function DataProvider({
  children,
  initialArtists,
  initialPoets,
  initialTags,
}: {
  children: ReactNode;
  initialArtists: Artist[];
  initialPoets: Poet[];
  initialTags: string[];
}) {
  // The value we'll provide to consumers
  const value: DataContextType = {
    artists: initialArtists,
    poets: initialPoets,
    tags: initialTags,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Custom hook for client components to use the context
export function useData() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
}
