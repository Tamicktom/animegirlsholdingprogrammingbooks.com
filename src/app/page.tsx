"use server";
//* Libraries imports
import Image from "next/image";

//* Locals imports
import { animeGirlsImages } from "@/utils/images";

const MAX_IMAGES_TO_LOAD = 16;
const MAX_COLUMN_WIDTH = 440;
const MAX_ROW_HEIGHT = 600;

export default async function LandingPage() {
  const allImages = Object.values(animeGirlsImages).flat();

  return (
    <div className="w-full min-h-svh bg-black masonry p-4">
      {allImages.map((image, index) => {
        const key = `${image.language}-${image.name}-${index}`;

        // first 16 images should be loaded immediately
        const loading = index < MAX_IMAGES_TO_LOAD ? "eager" : "lazy";
        const priority = index < MAX_IMAGES_TO_LOAD;

        if (image.extension === "gif") {
          return (
            <div key={key} className="masonry-item mb-4">
              {/** biome-ignore lint/performance/noImgElement: NextImage does not support GIFs */}
              <img
                src={image.path}
                alt={image.altName}
                width={MAX_COLUMN_WIDTH}
                height={MAX_ROW_HEIGHT}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          );
        }

        return (
          <div key={key} className="masonry-item mb-4">
            <Image
              src={image.path}
              alt={image.altName}
              width={MAX_COLUMN_WIDTH}
              height={MAX_ROW_HEIGHT}
              loading={loading}
              priority={priority}
              placeholder="blur"
              blurDataURL={image.path}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
}
