"use client";

//* Libraries imports
import { useQuery } from "@tanstack/react-query";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";

type FetchImagesProps = {
  page: number;
  limit: number;
  language?: string;
};

interface UseImagesProps extends FetchImagesProps {
  initialData?: ImagesResponse;
};

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
  return useQuery({
    queryKey: ["images", props.page, props.limit, props.language],
    queryFn: () => fetchImages(props),
    initialData: props.initialData,
  });
}