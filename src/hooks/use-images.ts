"use client";

//* Libraries imports
import { useInfiniteQuery } from "@tanstack/react-query";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";

type FetchImagesProps = {
  page: number;
  limit: number;
  language?: string;
};

interface UseImagesProps extends Omit<FetchImagesProps, "page"> {
  initialData?: ImagesResponse;
}

async function fetchImages(props: FetchImagesProps): Promise<ImagesResponse> {
  const url = new URL("/api/images", window.location.origin);

  url.searchParams.set("page", props.page.toString());
  url.searchParams.set("limit", props.limit.toString());

  if (props.language) {
    url.searchParams.set("language", props.language);
  }

  const response = await fetch(url.toString());
  return await response.json();
}

export function useImages(props: UseImagesProps) {
  const limit = props.limit;
  const language = props.language;

  return useInfiniteQuery({
    queryKey: ["images", "infinite", limit, language],
    queryFn: (context) =>
      fetchImages({
        page: context.pageParam,
        limit,
        language,
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour - data considered fresh
    gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache when unused
    getNextPageParam: (lastPage) => {
      const hasMore =
        lastPage.hasNextPage ?? lastPage.data.length >= lastPage.limit;
      return hasMore ? lastPage.nextPage : undefined;
    },
    initialData: props.initialData
      ? {
        pages: [props.initialData],
        pageParams: [1],
      }
      : undefined,
  });
}
