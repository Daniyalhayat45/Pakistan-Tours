import { AdminTopbar } from "@/components/admin/topbar";
import { DestinationForm } from "@/components/admin/forms/destination-form";

export default function NewDestinationPage() {
  return (
    <div>
      <AdminTopbar title="New Destination" />
      <div className="p-6 max-w-3xl">
        <DestinationForm />
      </div>
    </div>
  );
}
