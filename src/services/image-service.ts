"use server";

//* Locals imports
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";
import { animeGirlsImages } from "@/utils/images";

export type ImagesResponse = {
  data: AnimeGirlImages[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type GetImagesProps = {
  page: number;
  limit: number;
  language?: string | null;
};

export async function getImages(props: GetImagesProps): Promise<ImagesResponse> {
  let filteredImages: AnimeGirlImages[] = [];

  if (props.language) {
    filteredImages = animeGirlsImages[props.language as keyof typeof animeGirlsImages] || [];
  } else {
    filteredImages = Object.values(animeGirlsImages).flat();
  }

  if (props.page && props.limit) {
    filteredImages = filteredImages.slice((props.page - 1) * props.limit, props.page * props.limit);
  }

  const response: ImagesResponse = {
    data: filteredImages,
    total: filteredImages.length,
    page: props.page,
    limit: props.limit,
    totalPages: Math.ceil(filteredImages.length / props.limit),
    currentPage: props.page,
    nextPage: props.page + 1,
    previousPage: props.page - 1,
    hasNextPage: props.page < Math.ceil(filteredImages.length / props.limit),
    hasPreviousPage: props.page > 1,
  };

  return response;
}