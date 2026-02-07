"use client";

//* Libraries imports
import { useEffect, useRef } from "react";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";

//* Components imports
import { GalleryItem } from "./gallery-item";

//* Hooks imports
import { useColumnCount } from "@/hooks/use-column-count";
import { useImages } from "@/hooks/use-images";

//* Utils imports
import { distributeByColumns } from "./utils";

type GalleryProps = {
  initialData: ImagesResponse;
  language?: string;
  limit?: number;
};

export function Gallery(props: GalleryProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const images = useImages({
    limit: props.limit ?? 10,
    language: props.language,
    initialData: props.initialData,
  });
  const columnCount = useColumnCount();
  const data = images.data?.pages.flatMap((page) => page.data) ?? [];
  const columns = distributeByColumns({ items: data, columnCount });
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
