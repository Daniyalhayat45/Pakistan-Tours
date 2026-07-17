import Image from "next/image";
import { prisma } from "@/lib/db";

export const metadata = { title: "Gallery | Pakistan Tourism Gateway" };

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Visuals</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Gallery</h1>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img) => (
          <div key={img.id} className="relative w-full overflow-hidden rounded-lg break-inside-avoid">
            <Image src={img.imageUrl} alt={img.title || "Gallery image"} width={600} height={800} className="w-full object-cover" />
          </div>
        ))}
      </div>
      {images.length === 0 && <p className="text-center text-muted-foreground">No images yet.</p>}
    </div>
  );
}
