//* Locals imports
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";

type DistributeByColumnsProps = {
  items: AnimeGirlImages[];
  columnCount: number;
};

/**
 * Distributes items across columns so that each column's total "height" is balanced.
 * Uses height/width ratio as weight (in a fixed-width column, rendered height is proportional to it).
 */
export function distributeByColumns(props: DistributeByColumnsProps): { item: AnimeGirlImages; globalIndex: number }[][] {
  const columns: { item: AnimeGirlImages; globalIndex: number }[][] =
    Array.from({ length: props.columnCount }, () => []);
  const columnHeights: number[] = Array.from({ length: props.columnCount }, () => 0);

  props.items.forEach((item, index) => {
    const heightWeight = item.height / item.width;
    const shortestColumnIndex = columnHeights.indexOf(
      Math.min(...columnHeights),
    );
    columns[shortestColumnIndex].push({ item, globalIndex: index });
    columnHeights[shortestColumnIndex] += heightWeight;
  });

  return columns;
}
