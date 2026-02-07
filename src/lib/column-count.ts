const BREAKPOINTS = [
  { minWidth: 2_560, columns: 11 },
  { minWidth: 2_304, columns: 10 },
  { minWidth: 2_048, columns: 9 },
  { minWidth: 1_792, columns: 8 },
  { minWidth: 1_536, columns: 7 },
  { minWidth: 1_280, columns: 6 },
  { minWidth: 1_024, columns: 5 },
  { minWidth: 768, columns: 4 },
  { minWidth: 512, columns: 3 },
  { minWidth: 256, columns: 2 },
  { minWidth: 0, columns: 1 },
] as const;

export const DEFAULT_SERVER_WIDTH = 1_280; // 6 columns - reasonable desktop default

export const VIEWPORT_WIDTH_COOKIE_NAME = "viewport-width";
const VIEWPORT_WIDTH_COOKIE_MAX_AGE = 31536000; // 1 year in seconds

export function getColumnCount(width: number): number {
  const match = BREAKPOINTS.find((bp) => width >= bp.minWidth);
  return match?.columns ?? 1;
}

export function setViewportWidthCookie(width: number): void {
  if (typeof document === "undefined") return;
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support; document.cookie is the standard approach
  document.cookie = `${VIEWPORT_WIDTH_COOKIE_NAME}=${width}; path=/; max-age=${VIEWPORT_WIDTH_COOKIE_MAX_AGE}`;
}
