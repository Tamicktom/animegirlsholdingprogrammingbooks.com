"use server";

//* Local imports
import { getImages } from "@/services/image-service";

//* Components imports
import { Gallery } from "./gallery";

const DEFAULT_LIMIT = 20;

type LoadInitialGalleryProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    language?: string;
  }>;
};

export async function LoadInitialGallery(props: LoadInitialGalleryProps) {
  const { page, limit, language } = await props.searchParams;

  const images = await getImages({
    page: Number(page ?? 1),
    limit: Number(limit ?? DEFAULT_LIMIT),
    language: language ?? null,
  });

  return (
    <Gallery
      initialData={images}
      language={language ?? undefined}
      limit={Number(limit ?? DEFAULT_LIMIT)}
    />
  );
}
