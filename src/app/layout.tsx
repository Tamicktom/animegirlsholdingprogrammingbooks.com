"use server";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

//* Components imports
import { QueryProvider } from "@/components/query-provider";

//* Styles imports
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Girls Holding Programming Books",
  description:
    "Anime Girls Holding Programming Books is a collection of anime girls holding programming books.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{props.children}</QueryProvider>
      </body>
    </html>
  );
}
