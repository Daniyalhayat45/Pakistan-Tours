"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  id: string;
  title: string;
  titleUr: string | null;
  subtitle: string | null;
  subtitleUr: string | null;
  image: string;
  ctaLabel: string | null;
  ctaHref: string | null;
};

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section className="relative flex h-screen items-center justify-center bg-onyx">
        <div className="text-center text-white">
          <h1 className="font-display text-4xl md:text-6xl">{t("heroFallbackTitle")}</h1>
          <p className="mt-4 text-white/70">{t("heroFallbackSubtitle")}</p>
        </div>
      </section>
    );
  }

  const slide = slides[index];
  const title = locale === "ur" && slide.titleUr ? slide.titleUr : slide.title;
  const subtitle = locale === "ur" && slide.subtitleUr ? slide.subtitleUr : slide.subtitle;

  return (
    <section className="relative h-screen overflow-hidden bg-onyx">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={slide.image} alt={title} fill priority className="object-cover opacity-60" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-onyx/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-xs uppercase tracking-[0.3em] text-gold"
        >
          Pakistan Tourism Gateway
        </motion.span>
        <motion.h1
          key={slide.id + "-title"}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-white/80"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8">
          <Button asChild size="lg">
            <Link href={slide.ctaHref ? `/${locale}${slide.ctaHref}` : `/${locale}/tours`}>
              {slide.ctaLabel || t("exploreTours")}
            </Link>
          </Button>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-1.5 bg-white/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white hover:border-gold hover:text-gold"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setIndex((index + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white hover:border-gold hover:text-gold"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </section>
  );
}
