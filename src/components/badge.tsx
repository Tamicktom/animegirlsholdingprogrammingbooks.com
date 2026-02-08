//* Libraries imports
import { useMemo } from "react";

//* Utils imports
import { getPalletFromLanguage } from "@/utils/colors/languages-and-colors";

type BadgeProps = {
  language: string;
};

export function Badge(props: BadgeProps) {
  const values = useMemo(() => {
    const pallet = getPalletFromLanguage(props.language);
    return {
      name: pallet.name,
      colors: pallet.colors,
    };
  }, [props.language]);

  return (
    <span
      className="py-0.5 px-2 rounded-md text-xs font-semibold"
      style={{
        backgroundColor: values.colors.background,
        color: values.colors.vibrant,
        border: `1px solid ${values.colors.muted}`,
      }}
    >
      {values.name}
    </span>
  );
}
