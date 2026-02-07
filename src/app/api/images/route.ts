//* Libraries imports
import { NextResponse } from "next/server";

//* Locals imports
import type { ImagesResponse } from "@/services/image-service";
import { getImages } from "@/services/image-service";


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

  const response: ImagesResponse = await getImages({ page: pageNumber, limit: limitNumber, language });

  return NextResponse.json(response, { status: 200 });
}