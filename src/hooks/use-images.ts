"use client";

//* Libraries imports
import { useQuery } from "@tanstack/react-query";

//* Locals imports
import type { ImagesResponse } from "@/app/api/images/route";

async function fetchImages(page: number, limit: number, language?: string): Promise<ImagesResponse> {
  const url = new URL("/api/images", window.location.origin);
  
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  
  if (language) {
    url.searchParams.set("language", language);
  }

  const response = await fetch(url.toString());
  return await response.json();
}

export function useImages(page: number, limit: number, language?: string) {
  return useQuery({
    queryKey: ["images", page, limit, language],
    queryFn: () => fetchImages(page, limit, language),
  });
}