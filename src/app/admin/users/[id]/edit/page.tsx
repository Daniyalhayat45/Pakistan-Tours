import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { UserForm } from "@/components/admin/forms/user-form";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();
  return (
    <div>
      <AdminTopbar title="Edit User" />
      <div className="p-6 max-w-3xl"><UserForm user={user} /></div>
    </div>
  );
}
