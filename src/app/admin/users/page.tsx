import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteUser } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminTopbar title="Users" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/users/new"><Plus className="h-4 w-4" /> New User</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                  <TableCell><Badge variant={u.active ? "default" : "secondary"}>{u.active ? "Active" : "Disabled"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/users/${u.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={u.id} action={deleteUser} label="user" />
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
