"use client";

//* Libraries imports
import Image from "next/image";
import { useEffect, useRef } from "react";

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
  language?: string;
  limit?: number;
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
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const images = useImages({
    limit: props.limit ?? 10,
    language: props.language,
    initialData: props.initialData,
  });
  const columnCount = useColumnCount();
  const data =
    images.data?.pages.flatMap((page) => page.data) ?? [];
  const columns = distributeByColumns(data, columnCount);
  const hasNextPage = images.hasNextPage ?? false;
  const isFetchingNextPage = images.isFetchingNextPage;

  const fetchNextPage = images.fetchNextPage;

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px", threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="gallery-load-more-sentinel"
          style={{ gridColumn: `1 / -1` }}
          aria-hidden
        >
          {isFetchingNextPage && (
            <span className="gallery-load-more-label">Loading more…</span>
          )}
        </div>
      )}
    </div>
  );
}
