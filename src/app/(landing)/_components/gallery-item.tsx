"use client";

//* Libraries imports
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";

//* Locals imports
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";

//* Utils imports
import { formatName, formatAltName } from "./utils";

const MAX_IMAGES_TO_LOAD = 32;
const COLUMN_WIDTH = 256; // 256px is the maximum width of a column

type GalleryItemProps = {
  image: AnimeGirlImages;
  globalIndex: number;
};

export function GalleryItem(props: GalleryItemProps) {
  const image = props.image;
  const globalIndex = props.globalIndex;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer">
        {image.extension === "gif" ? (
          <UnoptimizedImage image={image} globalIndex={globalIndex} />
        ) : (
          <OptimizedImage image={image} globalIndex={globalIndex} />
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop fixed inset-0 min-h-dvh bg-black opacity-20 transition-opacity duration-150 ease-out dark:opacity-70 data-starting-style:opacity-0 data-ending-style:opacity-0 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-90 data-ending-style:opacity-0 data-ending-style:scale-90 h-full max-h-[calc(100vh-3rem)] overflow-y-auto">
          <Dialog.Title className="text-lg font-medium sr-only">
            {formatName(image.name)}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 sr-only">
            Here you can see the original image.
          </Dialog.Description>{" "}
          <Dialog.Close className="absolute top-2 right-2">
            <XIcon />
          </Dialog.Close>
          <div className="flex flex-col w-full h-auto">
            {/** biome-ignore lint/performance/noImgElement: <render original image> */}
            <img
              src={image.path}
              alt={image.altName}
              width={image.width}
              height={image.height}
              className="size-full object-cover rounded-lg"
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type ImageComponentProps = {
  image: AnimeGirlImages;
  globalIndex: number;
};

function OptimizedImage(props: ImageComponentProps) {
  const loading = props.globalIndex < MAX_IMAGES_TO_LOAD ? "eager" : "lazy";
  const priority = props.globalIndex < MAX_IMAGES_TO_LOAD;
  const aspectRatio = props.image.width / props.image.height;
  return (
    <div className="gallery-item" style={{ aspectRatio: `${aspectRatio}` }}>
      <Image
        src={props.image.path}
        alt={props.image.altName}
        width={COLUMN_WIDTH}
        height={COLUMN_WIDTH * (props.image.height / props.image.width)}
        loading={loading}
        priority={priority}
        placeholder="blur"
        blurDataURL={props.image.dataBlurURL}
        className="size-full object-cover rounded-lg"
      />
    </div>
  );
}

function UnoptimizedImage(props: ImageComponentProps) {
  const aspectRatio = props.image.width / props.image.height;
  return (
    <div className="gallery-item" style={{ aspectRatio: `${aspectRatio}` }}>
      {/* biome-ignore lint/performance/noImgElement: NextImage does not support GIFs */}
      <img
        src={props.image.path}
        alt={props.image.altName}
        width={COLUMN_WIDTH}
        height={COLUMN_WIDTH * (props.image.height / props.image.width)}
        className="size-full object-cover rounded-lg"
      />
    </div>
  );
}
