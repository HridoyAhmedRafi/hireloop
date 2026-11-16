"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // Log the error so it stays visible in the server/browser console.
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error
      ? (error as Error & { digest?: string }).digest
      : undefined;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <TriangleAlert className="size-10 text-destructive" />
        </div>

        <p className="mb-2 text-sm font-semibold tracking-widest text-destructive uppercase">
          Error 500
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>

        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred while loading this page. Try again, and
          if it keeps happening, head back home.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "cursor-pointer gap-2 px-5",
            )}
          >
            <RotateCcw className="size-4" />
            Try again
          </button>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 px-5",
            )}
          >
            <Home className="size-4" />
            Back to Home
          </Link>
        </div>

        {digest ? (
          <p className="mt-8 font-mono text-xs break-all text-muted-foreground">
            Error ID: {digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
