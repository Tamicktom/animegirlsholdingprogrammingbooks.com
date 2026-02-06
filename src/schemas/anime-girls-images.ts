
export type AnimeGirlImages = {
  path: string;
  name: string;
  altName: string;
  extension: string; // e.g. "png", "jpg", "jpeg", "gif", "webp", etc.
  language: string;
  width: number;
  height: number;
  size: number; // in bytes
};

export type LanguageFolders = {
  [key: string]: AnimeGirlImages[];
};