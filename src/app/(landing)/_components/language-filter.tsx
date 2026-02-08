"use client";

//* Libraries imports
import { Select } from "@base-ui/react/select";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

//* Utils imports
import { getPalletFromLanguage } from "@/utils/colors/languages-and-colors";
import { animeGirlsLanguages } from "@/utils/images";

type LanguageItem = {
  value: string | null;
  label: string;
};

const ALL_LANGUAGES_ITEM: LanguageItem = {
  value: null,
  label: "All languages",
};

export function LanguageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("language") ?? null;

  const items = useMemo<LanguageItem[]>(() => {
    const languageItems: LanguageItem[] = animeGirlsLanguages.map((lang) => ({
      value: lang,
      label: getPalletFromLanguage(lang).name,
    }));
    languageItems.sort((a, b) => a.label.localeCompare(b.label, "en"));
    return [ALL_LANGUAGES_ITEM, ...languageItems];
  }, []);

  const handleValueChange = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("language", value);
      } else {
        params.delete("language");
      }
      params.delete("page");
      const queryString = params.toString();
      const url = queryString ? `/?${queryString}` : "/";
      router.push(url);
    },
    [router, searchParams],
  );

  return (
    <section
      className="flex flex-col items-center gap-2 px-4 py-4 bg-neutral-100 dark:bg-neutral-900"
      aria-label="Filter by language"
    >
      <Select.Root
        id="language-filter-select"
        value={currentLanguage}
        onValueChange={handleValueChange}
        items={items}
      >
        <Select.Trigger
          id="language-filter-trigger"
          type="button"
          className="flex min-w-48 items-center justify-between gap-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 shadow-sm transition-colors duration-200 ease-out hover:bg-neutral-50 dark:hover:bg-neutral-700 data-popup-open:border-pink-500 dark:data-popup-open:border-pink-500"
        >
          <Select.Value
            placeholder="Select language"
            className="flex-1 text-left"
          />
          <Select.Icon>
            <CaretDownIcon
              className="shrink-0 opacity-60"
              size={12}
              weight="bold"
              aria-hidden
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={8} alignItemWithTrigger={false}>
            <Select.Popup className="max-h-64 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-lg">
              <Select.List className="flex flex-col py-1">
                {items.map((item) => (
                  <Select.Item
                    key={item.value ?? "all"}
                    value={item.value}
                    className="cursor-pointer px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 transition-colors duration-200 ease-out data-highlighted:bg-pink-100 dark:data-highlighted:bg-pink-900/30 data-selected:bg-pink-50 dark:data-selected:bg-pink-900/20"
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </section>
  );
}
