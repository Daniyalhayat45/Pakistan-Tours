import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { SettingsForm } from "@/components/admin/forms/settings-form";

export default async function SettingsAdminPage() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: { id: "singleton" } });
  }
  return (
    <div>
      <AdminTopbar title="Site Settings" />
      <div className="p-6 max-w-3xl">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
