import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteHeroSlide } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function HeroSlidesAdminPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminTopbar title="Hero Slides" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/hero-slides/new"><Plus className="h-4 w-4" /> New Slide</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Preview</TableHead><TableHead>Title</TableHead><TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {slides.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><div className="relative h-10 w-16 overflow-hidden rounded"><Image src={s.image} alt={s.title} fill className="object-cover" unoptimized /></div></TableCell>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell>{s.order}</TableCell>
                  <TableCell><Badge variant={s.active ? "default" : "secondary"}>{s.active ? "Active" : "Inactive"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/hero-slides/${s.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={s.id} action={deleteHeroSlide} label="slide" />
                  </TableCell>
                </TableRow>
              ))}
              {slides.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No hero slides yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
