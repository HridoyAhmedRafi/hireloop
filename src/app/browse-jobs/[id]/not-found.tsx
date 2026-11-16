import Link from "next/link";
import { ArrowLeft, Briefcase, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { cn } from "cn";

export default function JobNotFound() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
            <Briefcase className="size-10 text-muted-foreground" />
          </div>

          <p className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Error 404
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            This job is no longer available
          </h1>

          <p className="mb-8 text-muted-foreground">
            The recruiter has removed this listing. Your application and its
            status are still saved in your dashboard.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/browse-jobs"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 px-5")}
            >
              <ArrowLeft className="size-4" />
              Browse jobs
            </Link>

            <Link
              href="/dashboard/seeker/applications"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 px-5",
              )}
            >
              <FileText className="size-4" />
              My applications
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
