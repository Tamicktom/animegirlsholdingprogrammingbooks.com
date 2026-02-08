//* Types imports
import type { LanguageAndColor, ColorPallet } from './type';
import { languages } from './languages'
import { frameworks } from './frameworks'
import { toolsLibs } from './tools-libs'

export const programmingLanguagesAndColors: LanguageAndColor = {
  ...languages,
  ...frameworks,
  ...toolsLibs
}

const defaultColorPallet: ColorPallet = {
  vibrant: "#000000",
  muted: "#000000",
  light: "#000000",
  dark: "#000000",
  contrast: "#000000",
  background: "#FFFFFF"
}

export function getPalletFromLanguage(language: string): {
  name: string;
  colors: ColorPallet;
} {
  //check if the language is in the programmingLanguagesAndColors object
  if (programmingLanguagesAndColors[language]) {
    return {
      name: programmingLanguagesAndColors[language].name,
      colors: programmingLanguagesAndColors[language].colors
    }
  }

  console.warn(`Language ${language} not found in programmingLanguagesAndColors`);

  return {
    name: language,
    colors: defaultColorPallet
  }
}