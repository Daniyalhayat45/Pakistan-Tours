"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales } from "@/i18n/config";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 p-1">
      {locales.map((l) => (
        <Button
          key={l}
          size="sm"
          variant={l === locale ? "default" : "ghost"}
          className={l === locale ? "h-7 px-3 text-xs" : "h-7 px-3 text-xs text-white/80 hover:text-white"}
          onClick={() => switchTo(l)}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
