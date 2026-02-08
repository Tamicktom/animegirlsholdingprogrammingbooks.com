"use client";

//* Libraries imports
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";

//* Locals imports
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";

//* Components imports
import { Button } from "@base-ui/react/button";

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

  const downloadFilename =
    image.path.split("/").pop() ?? `${image.name}.${image.extension}`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.path;
    link.download = downloadFilename;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer border-2 border-transparent hover:border-pink-200 dark:hover:border-pink-600 rounded-lg">
        {image.extension === "gif" ? (
          <UnoptimizedImage image={image} globalIndex={globalIndex} />
        ) : (
          <OptimizedImage image={image} globalIndex={globalIndex} />
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop fixed inset-0 min-h-dvh bg-black opacity-20 transition-opacity duration-150 ease-out dark:opacity-70 data-starting-style:opacity-0 data-ending-style:opacity-0 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-3xl h-[calc(100dvh-3rem)] max-h-[calc(100dvh-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-90 data-ending-style:opacity-0 data-ending-style:scale-90 overflow-hidden bg-neutral-100 dark:bg-neutral-900 p-4 flex flex-col">
          <Dialog.Close className="absolute top-2 right-2 z-10">
            <XIcon />
          </Dialog.Close>
          <div className="flex min-h-0 flex-1 shrink items-center justify-center overflow-hidden max-h-[calc(100dvh-12rem)] w-full mx-auto">
            {/** biome-ignore lint/performance/noImgElement: <render original image> */}
            <img
              src={image.path}
              alt={formatAltName(image.altName)}
              width={image.width}
              height={image.height}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 pt-8 w-full max-w-3xl">
            <Dialog.Title className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {formatName(image.name)}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-neutral-600 dark:text-neutral-400 sr-only">
              Original image
            </Dialog.Description>{" "}
            <Button
              id={`download-image-${globalIndex}`}
              type="button"
              onClick={handleDownload}
              className="bg-pink-600 text-white hover:bg-pink-700 w-full px-4 py-2 cursor-pointer rounded-lg"
            >
              Download
            </Button>
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
        alt={formatAltName(props.image.altName)}
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
        alt={formatAltName(props.image.altName)}
        width={COLUMN_WIDTH}
        height={COLUMN_WIDTH * (props.image.height / props.image.width)}
        className="size-full object-cover rounded-lg"
      />
    </div>
  );
}
