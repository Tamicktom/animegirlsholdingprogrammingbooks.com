"use client";

//* Libraries imports
import { useEffect } from "react";
import { useSyncExternalStore } from "react";

//* Locals imports
import {
  DEFAULT_SERVER_WIDTH,
  getColumnCount,
  setViewportWidthCookie,
} from "@/lib/column-count";

function getClientSnapshot(): number {
  if (typeof window === "undefined") {
    return getColumnCount(DEFAULT_SERVER_WIDTH);
  }
  return getColumnCount(window.innerWidth);
}

function subscribe(callback: () => void): () => void {
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setViewportWidthCookie(window.innerWidth);
    }
    callback();
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}

type UseColumnCountProps = {
  serverSnapshot?: number;
};

export function useColumnCount(props?: UseColumnCountProps): number {
  const columnCount = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    () => props?.serverSnapshot ?? getColumnCount(DEFAULT_SERVER_WIDTH),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setViewportWidthCookie(window.innerWidth);
  }, []);

  return columnCount;
}
