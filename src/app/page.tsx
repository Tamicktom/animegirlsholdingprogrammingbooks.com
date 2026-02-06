"use server";
//* Libraries imports
import Image from "next/image";

//* Locals imports
import { animeGirlsImages, animeGirlsLanguages } from "@/utils/images";

const COLUMN_WIDTH = 16 * 4; // 16rem * 4 = 64px

export default async function LandingPage() {
  return (
    <div className="w-full h-svh bg-black masonry p-4">
      {Object.entries(animeGirlsImages).map(([_language, images], index) => {
        return images.map((image) => {
          const key = `${image.language}-${image.name}`;
          const aspectRatio = image.width / image.height;

          // first 16 images should be loaded immediately
          const loading = index < 16 ? "eager" : "lazy";

          return (
            <Image
              key={key}
              src={image.path}
              alt={image.name}
              width={image.width}
              height={image.height}
              loading={loading}
              priority={index < 16}
              blurDataURL={image.path}
              className="size-full object-cover col-span-1 row-span-1 overflow-hidden rounded-lg"
            />
          );
        });
      })}
    </div>
  );
}
