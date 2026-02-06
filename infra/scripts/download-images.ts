/**
 * This script downloads the Anime Girls Holding Programming Books repository and saves the images in the public/images folder.
 * It then deletes any file that is not in the ACCEPTED_IMAGE_EXTENSIONS array and is not a folder.
 * It also deletes any folder that is one of the KNOW_FOLDERS_TO_DELETE array.
 * 
 * Because of Bun docs (https://bun.com/docs/runtime/file-io#directories), we need to use Node's fs/promises module.
 */

//* Libraries imports
import simpleGit from "simple-git";
import fs from "node:fs/promises";
import path from "node:path";

//* Constants imports
import { ANIME_GIRLS_HOLDING_PROGRAMMING_BOOKS_REPO_URL, ACCEPTED_IMAGE_EXTENSIONS, IMAGES_FOLDER, KNOW_FOLDERS_TO_DELETE } from "./constants";

// If the IMAGES_FOLDER folder exists, delete it
const imagesFolderExists = await fs.access(IMAGES_FOLDER).then(() => true, () => false);
if (imagesFolderExists) {
  await fs.rm(IMAGES_FOLDER, { recursive: true });
}

// Download the repository and save on the IMAGES_FOLDER folder
console.log("Downloading the repository...");
const git = simpleGit();
await git.clone(ANIME_GIRLS_HOLDING_PROGRAMMING_BOOKS_REPO_URL, IMAGES_FOLDER);
console.log("Repository downloaded successfully");

// delete any file that is not in the ACCEPTED_IMAGE_EXTENSIONS array and is not a folder
// in the IMAGES_FOLDER folder
const files = await fs.readdir(IMAGES_FOLDER);
for (const file of files) {
  const isFolder = await fs.stat(path.join(IMAGES_FOLDER, file)).then(stat => stat.isDirectory());

  // if is a folder,
  if (isFolder) {
    // if is one of the folders to delete, delete it
    if (KNOW_FOLDERS_TO_DELETE.includes(file)) {
      await fs.rm(path.join(IMAGES_FOLDER, file), { recursive: true });
      console.log(`Deleted folder: ${file}`);
      continue;
    }
    // if is not one of the folders to delete, delete all files that are not in the ACCEPTED_IMAGE_EXTENSIONS array
    const subFolderFiles = await fs.readdir(path.join(IMAGES_FOLDER, file));
    for (const subFolderFile of subFolderFiles) {
      // if is not in the ACCEPTED_IMAGE_EXTENSIONS array, delete it
      if (!ACCEPTED_IMAGE_EXTENSIONS.some(extension => subFolderFile.endsWith(extension))) {
        await fs.rm(path.join(IMAGES_FOLDER, file, subFolderFile));
      }
    }
  }
  // if is not a folder, delete it if it is not in the ACCEPTED_IMAGE_EXTENSIONS array
  else if (!ACCEPTED_IMAGE_EXTENSIONS.some(extension => file.endsWith(extension))) {
    await fs.rm(path.join(IMAGES_FOLDER, file));
    console.log(`Deleted file: ${file}`);
  }
}

console.log("Files deleted successfully");