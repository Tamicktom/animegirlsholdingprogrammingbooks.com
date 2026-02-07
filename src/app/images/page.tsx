"use server";

//* Local imports
import { getImages } from "@/services/image-service";

//* Components imports
import { Gallery } from "./_components/gallery";

type ImagesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    language?: string;
  }>;
};

export default async function ImagesPage(props: ImagesPageProps) {
  const { page, limit, language } = await props.searchParams;

  const images = await getImages({
    page: Number(page ?? 1),
    limit: Number(limit ?? 10),
    language: language ?? null,
  });

  return <Gallery initialData={images} />;
}
