import { AdminTopbar } from "@/components/admin/topbar";
import { VehicleForm } from "@/components/admin/forms/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div>
      <AdminTopbar title="New Vehicle" />
      <div className="p-6 max-w-3xl"><VehicleForm /></div>
    </div>
  );
}
