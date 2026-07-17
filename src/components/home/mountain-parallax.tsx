"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function MountainParallax() {
  const t = useTranslations("home");
  const sectionRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(backRef.current, { yPercent: 15, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(midRef.current, { yPercent: 30, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(frontRef.current, { yPercent: 50, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[70vh] overflow-hidden bg-onyx">
      <div ref={backRef} className="absolute inset-x-0 bottom-0 h-2/3 opacity-30">
        <svg viewBox="0 0 1440 400" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0,300 L200,120 L420,260 L680,60 L900,240 L1160,100 L1440,280 L1440,400 L0,400 Z" fill="#3a3a3a" />
        </svg>
      </div>
      <div ref={midRef} className="absolute inset-x-0 bottom-0 h-3/4 opacity-55">
        <svg viewBox="0 0 1440 400" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0,340 L180,180 L360,300 L620,110 L860,290 L1100,150 L1440,320 L1440,400 L0,400 Z" fill="#232323" />
        </svg>
      </div>
      <div ref={frontRef} className="absolute inset-x-0 bottom-0 h-full">
        <svg viewBox="0 0 1440 400" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0,380 L240,220 L480,340 L760,160 L1000,330 L1260,200 L1440,360 L1440,400 L0,400 Z" fill="#111111" />
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{t("whyUs")}</h2>
        <p className="mt-4 max-w-xl text-white/60">
          From the Karakoram to the Hindukush — every layer of Pakistan's landscape, curated for you.
        </p>
      </div>
    </section>
  );
}
