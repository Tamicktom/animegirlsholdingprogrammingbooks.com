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
  let allImages: AnimeGirlImages[] = [];

  if (props.language) {
    allImages =
      animeGirlsImages[props.language as keyof typeof animeGirlsImages] ?? [];
  } else {
    allImages = Object.values(animeGirlsImages).flat();
  }

  const totalCount = allImages.length;
  const totalPages = Math.ceil(totalCount / props.limit);
  const start = (props.page - 1) * props.limit;
  const end = props.page * props.limit;
  const data = allImages.slice(start, end);

  const response: ImagesResponse = {
    data,
    total: totalCount,
    page: props.page,
    limit: props.limit,
    totalPages,
    currentPage: props.page,
    nextPage: props.page + 1,
    previousPage: props.page - 1,
    hasNextPage: props.page < totalPages,
    hasPreviousPage: props.page > 1,
  };

  return response;
}