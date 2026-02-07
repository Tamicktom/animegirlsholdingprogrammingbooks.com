"use client";
//* Libraries imports
import type { ReactNode } from "react";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

//* Utils imports
import { queryClient } from "@/utils/query-client";

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider(props: QueryProviderProps) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {props.children}
    </TanstackQueryClientProvider>
  );
}
