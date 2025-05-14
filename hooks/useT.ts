import { useContext } from "react";
import { TranslationsContext, Translations } from "@/components/LocaleProvider";

export function useT(): Translations {
  return useContext(TranslationsContext);
}
