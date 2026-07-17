import { AdminTopbar } from "@/components/admin/topbar";
import { HeroSlideForm } from "@/components/admin/forms/hero-slide-form";

export default function NewHeroSlidePage() {
  return (
    <div>
      <AdminTopbar title="New Hero Slide" />
      <div className="p-6 max-w-3xl"><HeroSlideForm /></div>
    </div>
  );
}
