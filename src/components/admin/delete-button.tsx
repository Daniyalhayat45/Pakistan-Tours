"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  id,
  action,
  label = "item",
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; error?: string }>;
  label?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await action(id);
      if (res.success) {
        toast.success("Deleted");
        router.refresh();
      } else {
        toast.error(res.error || "Delete failed");
      }
    });
  }

  return (
    <Button type="button" variant="ghost" size="icon" disabled={isPending} onClick={handleDelete}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
