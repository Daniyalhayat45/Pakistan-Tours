import Link from "next/link";
import { Mountain, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Mountain className="h-14 w-14 text-gold" />
      <h1 className="mt-6 font-display text-5xl font-bold">404</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Looks like this trail doesn&apos;t exist. The page you&apos;re looking for may have been moved or removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-onyx px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold hover:text-onyx"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
