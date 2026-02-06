/**
 * Codegen to generate the images object from the public/images folder
 * and save it to the src/utils/images.ts file.
 */

//* Libraries imports
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

//* Constants imports
import { IMAGES_FOLDER, IMAGES_OBJECT_FILE } from "./constants";

console.log("Generating images object...");

//* Check if the IMAGES_OBJECT_FILE file exists, if it does, delete it
const imagesObjectFileExists = await fs.access(IMAGES_OBJECT_FILE).then(() => true, () => false);
console.log(`Images object file exists: ${imagesObjectFileExists}`);
if (imagesObjectFileExists) {
  await fs.rm(IMAGES_OBJECT_FILE);
  console.log(`Deleted images object file`);
}

console.log("Reading folders...");
const folders = await fs.readdir(IMAGES_FOLDER);
console.log(`Folders read: ${folders.length} folders`);

//* Generate the images object
let imagesTsCode = "import type { LanguageFolders } from \"@/schemas/anime-girls-images\";\n";
imagesTsCode += "\n";
imagesTsCode += "export const animeGirlsImages: LanguageFolders = {\n";

// each folder is a language, inside each folder are the images
for (const folder of folders) {
  const images = await fs.readdir(path.join(IMAGES_FOLDER, folder));
  imagesTsCode += `  "${folder}": [\n`;
  // for each image, create an object with the path, name and language
  // and add it to the language folders
  for (const image of images) {
    const imagePath = path.join(IMAGES_FOLDER, folder, image);
    const imageUrl = imagePath.replace("public/", "/");
    const imageName = image.split(".")[0];
    const imageLanguage = folder;
    const imageMetadata = await sharp(imagePath).metadata();
    const width = imageMetadata.width;
    const height = imageMetadata.height;
    const size = await fs.stat(imagePath).then(stats => stats.size);
    const extension = image.split(".")[1];
    const altName = imageName.replace("_", " ");
    const dataBlurURL = await sharp(imagePath)
      .resize(16, 16)
      .toBuffer()
      .then(buffer => `data:image/${extension};base64,${buffer.toString("base64")}`);

    imagesTsCode += `    { path: "${imageUrl}", name: "${imageName}", altName: "${altName}", language: "${imageLanguage}", width: ${width}, height: ${height}, size: ${size}, extension: "${extension}", dataBlurURL: "${dataBlurURL}" },\n`;
  }
  imagesTsCode += `  ],\n`;
}

imagesTsCode += "};\n";

imagesTsCode += "export const animeGirlsLanguages: string[] = Object.keys(animeGirlsImages);\n";

//* Save the images object to the IMAGES_OBJECT_FILE file
await fs.writeFile(IMAGES_OBJECT_FILE, imagesTsCode);
console.log("Images object generated successfully");
console.log(`Images object saved to ${IMAGES_OBJECT_FILE}`);