"use client";

//* Libraries imports
import Image from "next/image";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";

//* Styles imports
import "./gallery.css";

//* Hooks imports
import { useColumnCount } from "@/hooks/use-column-count";
import { useImages } from "@/hooks/use-images";

const MAX_IMAGES_TO_LOAD = 16;

type GalleryProps = {
  initialData: ImagesResponse;
};

function distributeByColumns<T>(
  items: T[],
  columnCount: number,
): { item: T; globalIndex: number }[][] {
  const columns: { item: T; globalIndex: number }[][] = Array.from(
    { length: columnCount },
    () => [],
  );
  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push({ item, globalIndex: index });
  });
  return columns;
}

type GalleryItemProps = {
  image: AnimeGirlImages;
  globalIndex: number;
};

function GalleryItem(props: GalleryItemProps) {
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
      className="gallery-item"
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
}

export function Gallery(props: GalleryProps) {
  const images = useImages({
    page: 1,
    limit: 10,
    initialData: props.initialData,
  });
  const columnCount = useColumnCount();
  const data = images.data?.data ?? [];
  const columns = distributeByColumns(data, columnCount);

  return (
    <div
      className="gallery-grid gallery p-4 w-full min-h-svh bg-black"
      style={{ "--gallery-columns": columnCount } as React.CSSProperties}
    >
      {columns.map((column, columnIndex) => {
        const columnKey = column[0]
          ? `${column[0].item.language}-${column[0].globalIndex}`
          : `column-placeholder-${columnIndex}`;
        return (
          <div key={columnKey} className="gallery-column">
            {column.map(({ item, globalIndex }) => (
              <GalleryItem
                key={`${item.language}-${item.name}-${globalIndex}`}
                image={item}
                globalIndex={globalIndex}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
