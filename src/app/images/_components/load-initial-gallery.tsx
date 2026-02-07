"use server";

//* Libraries imports
import { cookies } from "next/headers";

//* Local imports
import {
  VIEWPORT_WIDTH_COOKIE_NAME,
  getColumnCount,
} from "@/lib/column-count";
import { getImages } from "@/services/image-service";

//* Components imports
import { Gallery } from "./gallery";

const DEFAULT_LIMIT = 32;

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

  let initialColumnCount: number | undefined;
  const cookieStore = await cookies();
  const viewportWidth = cookieStore.get(VIEWPORT_WIDTH_COOKIE_NAME)?.value;
  if (viewportWidth) {
    const width = Number.parseInt(viewportWidth, 10);
    if (!Number.isNaN(width) && width > 0) {
      initialColumnCount = getColumnCount(width);
    }
  }

  return (
    <Gallery
      initialData={images}
      initialColumnCount={initialColumnCount}
      language={language ?? undefined}
      limit={Number(limit ?? DEFAULT_LIMIT)}
    />
  );
}
