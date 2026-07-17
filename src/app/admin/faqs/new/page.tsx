import { AdminTopbar } from "@/components/admin/topbar";
import { FaqForm } from "@/components/admin/forms/faq-form";

export default function NewFaqPage() {
  return (
    <div>
      <AdminTopbar title="New FAQ" />
      <div className="p-6 max-w-3xl"><FaqForm /></div>
    </div>
  );
}
