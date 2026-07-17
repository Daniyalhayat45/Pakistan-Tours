import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteVehicle } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function VehiclesAdminPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminTopbar title="Vehicles" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/vehicles/new"><Plus className="h-4 w-4" /> New Vehicle</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Capacity</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>{v.capacity} seats</TableCell>
                  <TableCell><Badge variant={v.published ? "default" : "secondary"}>{v.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/vehicles/${v.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={v.id} action={deleteVehicle} label="vehicle" />
                  </TableCell>
                </TableRow>
              ))}
              {vehicles.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No vehicles yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
