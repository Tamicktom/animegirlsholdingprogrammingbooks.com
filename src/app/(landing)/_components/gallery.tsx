"use client";

//* Libraries imports
import { useEffect, useRef, useState } from "react";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";

//* Components imports
import { GalleryItem } from "./gallery-item";

//* Hooks imports
import { useColumnCount } from "@/hooks/use-column-count";
import { useImages } from "@/hooks/use-images";

//* Utils imports
import { distributeByColumns } from "./utils";

const MAX_IMAGES_TO_LOAD = 32;
const ROOT_MARGIN = "512px"; // the distance from the sentinel to the bottom of the viewport

type GalleryProps = {
  initialData: ImagesResponse;
  initialColumnCount?: number;
  language?: string;
  limit?: number;
};

export function Gallery(props: GalleryProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const isFirstVisit = props.initialColumnCount === undefined;
  const isColumnCountReady = !isFirstVisit || hasMounted;

  const images = useImages({
    limit: props.limit ?? MAX_IMAGES_TO_LOAD,
    language: props.language,
    initialData: props.initialData,
  });
  const columnCount = useColumnCount({
    serverSnapshot: props.initialColumnCount,
  });
  const data = images.data?.pages.flatMap((page) => page.data) ?? [];
  const columns = distributeByColumns({ items: data, columnCount });
  const hasNextPage = images.hasNextPage ?? false;
  const isFetchingNextPage = images.isFetchingNextPage;

  const fetchNextPage = images.fetchNextPage;

  // biome-ignore lint/correctness/useExhaustiveDependencies: isColumnCountReady is required so the effect re-runs when the sentinel mounts (first visit)
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
      { rootMargin: ROOT_MARGIN, threshold: 0.1 }, // 10% of the sentinel's height
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isColumnCountReady]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!isColumnCountReady) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-900">
        <span className="gallery-load-more-label">Loading…</span>
      </div>
    );
  }

  return (
    <div
      className="gallery-grid gallery p-4 w-full min-h-svh bg-neutral-100 dark:bg-neutral-900"
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
          className="min-h-1 p-4 h-32 flex items-center justify-center"
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
