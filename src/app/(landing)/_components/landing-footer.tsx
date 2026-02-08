//* Libraries imports
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

const ORIGINAL_REPO_URL =
  "https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books";
const FRONTEND_REPO_URL =
  "https://github.com/Tamicktom/animegirlsholdingprogrammingbooks.com";

export async function LandingFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 px-4 py-8 bg-neutral-100 dark:bg-neutral-900 text-center text-sm text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
      <p>
        All images from the{" "}
        <a
          href={ORIGINAL_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="footer-original-repo"
          className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline"
        >
          Anime-Girls-Holding-Programming-Books
        </a>{" "}
        repository by{" "}
        <a
          href="https://github.com/cat-milk"
          target="_blank"
          rel="noopener noreferrer"
          id="footer-cat-milk"
          className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline"
        >
          cat-milk
        </a>
        .
      </p>
      <a
        href={FRONTEND_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="footer-frontend-repo"
        className="inline-flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-200 hover:underline"
      >
        <GithubLogoIcon size={18} weight="bold" aria-hidden />
        This front-end on GitHub
      </a>
    </footer>
  );
}
