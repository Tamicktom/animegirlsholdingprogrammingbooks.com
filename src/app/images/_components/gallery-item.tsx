"use client";

//* Libraries imports
import Image from "next/image";

//* Locals imports
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";

const MAX_IMAGES_TO_LOAD = 32;
const COLUMN_WIDTH = 256; // 256px is the maximum width of a column

type GalleryItemProps = {
  image: AnimeGirlImages;
  globalIndex: number;
};

export function GalleryItem(props: GalleryItemProps) {
  const image = props.image;
  const globalIndex = props.globalIndex;
  const key = `${image.language}-${image.name}-${globalIndex}`;
  const aspectRatio = image.width / image.height;
  const loading = globalIndex < MAX_IMAGES_TO_LOAD ? "eager" : "lazy";
  const priority = globalIndex < MAX_IMAGES_TO_LOAD;

  if (image.extension === "gif") {
    return (
      <div
        key={key}
        className="gallery-item"
        style={{ aspectRatio: `${aspectRatio}` }}
      >
        {/* biome-ignore lint/performance/noImgElement: NextImage does not support GIFs */}
        <img
          src={image.path}
          alt={image.altName}
          width={COLUMN_WIDTH}
          height={COLUMN_WIDTH * (image.height / image.width)}
          className="size-full object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div
      key={key}
      className="gallery-item"
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <Image
        src={image.path}
        alt={image.altName}
        width={COLUMN_WIDTH}
        height={COLUMN_WIDTH * (image.height / image.width)}
        loading={loading}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.dataBlurURL}
        className="size-full object-cover rounded-lg"
      />
    </div>
  );
}
