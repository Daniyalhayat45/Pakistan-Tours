"use client";
import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "onError"> & { fallbackClassName?: string };

export function SafeImage({ fallbackClassName, className, alt, ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-onyx to-onyx/70",
          className,
          fallbackClassName
        )}
      >
        <Mountain className="h-8 w-8 text-gold/40" />
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setErrored(true)} unoptimized />;
}
