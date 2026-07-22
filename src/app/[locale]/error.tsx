"use client";
import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="h-14 w-14 text-gold" />
      <h1 className="mt-6 font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We hit an unexpected error loading this page. Please try again — if it keeps happening, let us know.
      </p>
      <Button className="mt-8" onClick={() => reset()}>
        <RotateCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
