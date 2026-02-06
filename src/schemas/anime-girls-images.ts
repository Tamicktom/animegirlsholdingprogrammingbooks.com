
export type AnimeGirlImages = {
  path: string;
  name: string;
  altName: string;
  extension: string; // e.g. "png", "jpg", "jpeg", "gif", "webp", etc.
  language: string;
  width: number;
  height: number;
  size: number; // in bytes
  dataBlurURL: string; // base64 encoded super small image of the original image
};

export type LanguageFolders = {
  [key: string]: AnimeGirlImages[];
};