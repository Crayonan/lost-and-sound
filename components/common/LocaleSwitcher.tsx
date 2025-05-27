"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const switchLocale = () => {
    const newLocale = locale === "en" ? "de" : "en";
    const newPath = pathname.replace(/^\/(en|de)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1 text-white hover:text-purple-400 text-sm transition-colors"
    >
      <Globe className="h-4 w-4" />
      {locale === "en" ? "DE" : "EN"}
    </button>
  );
}
