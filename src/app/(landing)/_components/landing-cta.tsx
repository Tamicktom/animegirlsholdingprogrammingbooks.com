"use server";
//* Libraries imports
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

const GITHUB_REPO_URL =
  "https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books";

export async function LandingCTA() {
  return (
    <section
      className="flex flex-col items-center gap-4 px-4 pt-8 pb-6 bg-neutral-100 dark:bg-neutral-900 text-center"
      aria-label="About this gallery"
    >
      <div className="flex flex-col gap-2 max-w-xl">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
          Anime Girls Holding Programming Books
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          This gallery is a front-end for the beloved{" "}
          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-view-on-github"
            className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            community repository
          </Link>{" "}
          on GitHub. Star the repo, contribute art, or just browse below.
        </p>
      </div>
    </section>
  );
}
