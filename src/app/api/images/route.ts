
//* Locals imports
import { animeGirlsImages } from "@/utils/images";
import type { AnimeGirlImages } from "@/schemas/anime-girls-images";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const language = searchParams.get("language");

  const pageNumber = Number.parseInt(page, 10);
  const limitNumber = Number.parseInt(limit, 10);

  if (Number.isNaN(pageNumber) || Number.isNaN(limitNumber)) {
    return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
  }

  let filteredImages: AnimeGirlImages[] = [];

  if (language) {
    filteredImages = animeGirlsImages[language as keyof typeof animeGirlsImages] || [];
  } else {
    filteredImages = Object.values(animeGirlsImages).flat();
  }

  if (pageNumber && limitNumber) {
    filteredImages = filteredImages.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);
  }

  return NextResponse.json(filteredImages);
}