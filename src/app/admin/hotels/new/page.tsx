import { AdminTopbar } from "@/components/admin/topbar";
import { HotelForm } from "@/components/admin/forms/hotel-form";

export default function NewHotelPage() {
  return (
    <div>
      <AdminTopbar title="New Hotel" />
      <div className="p-6 max-w-3xl"><HotelForm /></div>
    </div>
  );
}
