"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInquiryStatus } from "@/app/actions/admin";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const statuses = ["NEW", "CONTACTED", "CONFIRMED", "CLOSED"] as const;

export function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      disabled={isPending}
      onValueChange={(val) => {
        startTransition(async () => {
          const res = await updateInquiryStatus(id, val as any);
          if (res.success) {
            toast.success("Status updated");
            router.refresh();
          } else {
            toast.error(res.error || "Failed to update");
          }
        });
      }}
    >
      <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>{s}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
