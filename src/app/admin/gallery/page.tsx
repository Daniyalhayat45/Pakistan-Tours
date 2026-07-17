import Image from "next/image";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { GalleryUploadForm } from "@/components/admin/forms/gallery-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteGalleryImage } from "@/app/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GalleryAdminPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminTopbar title="Gallery" />
      <div className="p-6 space-y-6">
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Add Image</CardTitle></CardHeader>
          <CardContent><GalleryUploadForm /></CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border">
              <div className="relative aspect-square">
                <Image src={img.imageUrl} alt={img.title ?? "Gallery"} fill className="object-cover" unoptimized />
              </div>
              <div className="flex items-center justify-between p-2 text-xs">
                <span className="truncate">{img.title || img.category}</span>
                <DeleteButton id={img.id} action={deleteGalleryImage} label="image" />
              </div>
            </div>
          ))}
          {images.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">No gallery images yet.</p>}
        </div>
      </div>
    </div>
  );
}
