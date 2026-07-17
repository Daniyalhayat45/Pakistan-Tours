import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteInquiry } from "@/app/actions/admin";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { tour: true, hotel: true, vehicle: true },
  });
  return (
    <div>
      <AdminTopbar title="Inquiries" />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Related To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.email} &middot; {i.phone}</p>
                    {i.message && <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">{i.message}</p>}
                  </TableCell>
                  <TableCell><Badge variant="outline">{i.type}</Badge></TableCell>
                  <TableCell className="text-sm">{i.tour?.title || i.hotel?.name || i.vehicle?.name || "—"}</TableCell>
                  <TableCell className="text-sm">{formatDate(i.createdAt)}</TableCell>
                  <TableCell><InquiryStatusSelect id={i.id} status={i.status} /></TableCell>
                  <TableCell className="text-right"><DeleteButton id={i.id} action={deleteInquiry} label="inquiry" /></TableCell>
                </TableRow>
              ))}
              {inquiries.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No inquiries yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
