import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { cn } from "cn";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
            <SearchX className="size-10 text-muted-foreground" />
          </div>

          <p className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Error 404
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Page not found
          </h1>

          <p className="mb-8 text-muted-foreground">
            The page you are looking for does not exist or may have been
            removed. Check the URL, or head back to safety.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 px-5")}
            >
              <Home className="size-4" />
              Back to Home
            </Link>

            <Link
              href="/browse-jobs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 px-5",
              )}
            >
              <Compass className="size-4" />
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
