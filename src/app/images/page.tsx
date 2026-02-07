"use server";
//* Libraries imports
import { Suspense } from "react";

//* Components imports
import { LoadInitialGallery } from "./_components/load-initial-gallery";
import ImagesLoading from "./loading";

type ImagesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    language?: string;
  }>;
};

export default async function ImagesPage(props: ImagesPageProps) {
  return (
    <Suspense fallback={<ImagesLoading />}>
      <LoadInitialGallery searchParams={props.searchParams} />
    </Suspense>
  );
}
