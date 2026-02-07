"use client";

//* Libraries imports
import Image from "next/image";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";

//* Hooks imports
import { useImages } from "@/hooks/use-images";

const MAX_IMAGES_TO_LOAD = 16;

type GalleryProps = {
  initialData: ImagesResponse;
};

export function Gallery(props: GalleryProps) {
  const images = useImages({
    page: 1,
    limit: 10,
    initialData: props.initialData,
  });
  return (
    <div className="w-full min-h-svh bg-black masonry p-4">
      {images.data?.data.map((image, index) => {
        const key = `${image.language}-${image.name}-${index}`;
        const aspectRatio = image.width / image.height;

        // first 16 images should be loaded immediately
        const loading = index < MAX_IMAGES_TO_LOAD ? "eager" : "lazy";
        const priority = index < MAX_IMAGES_TO_LOAD;

        if (image.extension === "gif") {
          return (
            <div
              key={key}
              className="masonry-item mb-4"
              style={{ aspectRatio: `${aspectRatio}` }}
            >
              {/** biome-ignore lint/performance/noImgElement: NextImage does not support GIFs */}
              <img
                src={image.path}
                alt={image.altName}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          );
        }

        return (
          <div
            key={key}
            className="masonry-item mb-4"
            style={{ aspectRatio: `${aspectRatio}` }}
          >
            <Image
              src={image.path}
              alt={image.altName}
              width={image.width}
              height={image.height}
              loading={loading}
              priority={priority}
              placeholder="blur"
              blurDataURL={image.dataBlurURL}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
}
