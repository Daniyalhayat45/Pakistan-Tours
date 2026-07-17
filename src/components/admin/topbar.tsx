"use client";
import { Menu } from "lucide-react";

export function AdminTopbar({ title, user }: { title: string; user?: { name?: string | null; role?: string } }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      {user && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{user.name}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{user.role}</span>
        </div>
      )}
    </header>
  );
}
