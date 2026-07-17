import { AdminTopbar } from "@/components/admin/topbar";
import { UserForm } from "@/components/admin/forms/user-form";

export default function NewUserPage() {
  return (
    <div>
      <AdminTopbar title="New User" />
      <div className="p-6 max-w-3xl"><UserForm /></div>
    </div>
  );
}
