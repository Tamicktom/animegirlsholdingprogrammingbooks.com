"use client";

//* Libraries imports
import { useEffect, useState } from "react";

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

function getColumnCount(): number {
  if (typeof window === "undefined") return 1;
  const width = window.innerWidth;
  const match = BREAKPOINTS.find((bp) => width >= bp.minWidth);
  return match?.columns ?? 1;
}

export function useColumnCount(): number {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    setColumnCount(getColumnCount());
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return columnCount;
}
