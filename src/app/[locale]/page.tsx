import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { MountainParallax } from "@/components/home/mountain-parallax";
import { WhyUsGrid } from "@/components/home/why-us-grid";
import { MapSection } from "@/components/home/map-section";
import { SectionHeading } from "@/components/home/section-heading";
import { CtaSection } from "@/components/home/cta-section";
import { DestinationCard } from "@/components/cards/destination-card";
import { TourCard } from "@/components/cards/tour-card";
import { BlogCard } from "@/components/cards/blog-card";

export default async function HomePage() {
  const t = await getTranslations("home");

  const [slides, destinations, tours, blogs] = await Promise.all([
    prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.destination.findMany({ where: { published: true, featured: true }, take: 6, orderBy: { createdAt: "desc" } }),
    prisma.tour.findMany({ where: { published: true, featured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.blog.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="py-24">
        <div className="container">
          <SectionHeading eyebrow="Where to go" title={t("featuredDestinations")} viewAllHref="/destinations" viewAllLabel="View All" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      </section>

      <MountainParallax />
      <WhyUsGrid />
      <MapSection />

      <section className="py-24">
        <div className="container">
          <SectionHeading eyebrow="Curated Itineraries" title={t("featuredTours")} viewAllHref="/tours" viewAllLabel="View All" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />

      {blogs.length > 0 && (
        <section className="py-24">
          <div className="container">
            <SectionHeading eyebrow="Stories & Guides" title={t("latestFromBlog")} viewAllHref="/blog" viewAllLabel="View All" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
