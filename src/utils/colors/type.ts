export type ColorPallet = {
  vibrant: string;
  muted: string;
  light: string;
  dark: string;
  contrast: string;
  background: string;
}

export type LanguageAndColor = {
  [slug: string]: {
    name: string;
    colors: ColorPallet;
  }
}