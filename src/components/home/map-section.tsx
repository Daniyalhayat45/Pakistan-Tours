"use client";
import { useLocale } from "next-intl";
import Link from "next/link";

type Point = { slug: string; name: string; x: number; y: number };

const POINTS: Point[] = [
  { slug: "hunza-valley", name: "Hunza Valley", x: 58, y: 12 },
  { slug: "hunza-fairy-meadows", name: "Fairy Meadows", x: 52, y: 20 },
  { slug: "skardu", name: "Skardu", x: 68, y: 22 },
  { slug: "naran-kaghan", name: "Naran Kaghan", x: 48, y: 30 },
  { slug: "swat-valley", name: "Swat Valley", x: 38, y: 26 },
  { slug: "lahore", name: "Lahore", x: 52, y: 62 },
];

export function MapSection() {
  const locale = useLocale();
  return (
    <section className="bg-charcoal py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Explore Pakistan Interactively</h2>
          <p className="mt-3 text-white/60">Hover a marker to discover a destination</p>
        </div>
        <div className="relative mx-auto aspect-[4/5] max-w-md rounded-lg border border-white/10 bg-onyx/50 md:max-w-lg">
          <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full opacity-20">
            <path d="M20,10 L80,5 L90,40 L70,60 L75,90 L55,120 L30,115 L15,80 L25,55 L10,35 Z" fill="none" stroke="#f5a623" strokeWidth="0.5" />
          </svg>
          {POINTS.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/destinations/${p.slug}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="block h-3 w-3 animate-pulse rounded-full bg-gold ring-4 ring-gold/20" />
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-onyx px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {p.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
