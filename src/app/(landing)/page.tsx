"use server";
//* Libraries imports
import { Suspense } from "react";

//* Components imports
import { LandingCTA } from "./_components/landing-cta";
import { LandingFooter } from "./_components/landing-footer";
import { LanguageFilter } from "./_components/language-filter";
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
    <>
      <LandingCTA />
      <LanguageFilter />
      <Suspense fallback={<ImagesLoading />}>
        <LoadInitialGallery searchParams={props.searchParams} />
      </Suspense>
      <LandingFooter />
    </>
  );
}
