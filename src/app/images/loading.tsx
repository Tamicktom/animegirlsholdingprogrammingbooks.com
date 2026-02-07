//* Styles imports
import "./loading.css";

const SKELETON_SHAPES = [
  "gallery-loading__skeleton--tall",
  "gallery-loading__skeleton--square",
  "gallery-loading__skeleton--wide",
  "gallery-loading__skeleton--portrait",
  "gallery-loading__skeleton--short",
] as const;

const SKELETON_COUNT = 15;

export default function ImagesLoading() {
  return (
    <section className="gallery-loading" aria-busy="true" aria-label="Loading images">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <div
          key={`skeleton-${SKELETON_SHAPES[i % SKELETON_SHAPES.length]}-${i}`}
          className={`gallery-loading__skeleton ${SKELETON_SHAPES[i % SKELETON_SHAPES.length]}`}
        />
      ))}
    </section>
  );
}
