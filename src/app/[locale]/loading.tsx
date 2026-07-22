import { Mountain } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Mountain className="h-10 w-10 animate-pulse text-gold" />
        <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-gold" />
        </div>
      </div>
    </div>
  );
}
