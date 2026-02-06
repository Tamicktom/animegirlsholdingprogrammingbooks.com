
export type AnimeGirlImages = {
  path: string;
  name: string;
  language: string;
  width: number;
  height: number;
  size: number; // in bytes
};

export type LanguageFolders = {
  [key: string]: AnimeGirlImages[];
};