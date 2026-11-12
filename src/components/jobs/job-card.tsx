"use client";
import { Sparkles, Wallet, Zap } from "lucide-react";
import type { IJobPost } from "@/lib/types/job-type";
import {
  formatCompensation,
  formatJobLocation,
  getCompanyInitials,
  isNewJob,
} from "@/lib/formate/job-format";
import { BookmarkButton } from "./bookmark-button";
import { useRouter } from "next/navigation";

type JobCardProps = {
  job: IJobPost;
};

const PILL =
  "inline-flex h-6 w-fit items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 text-xs font-medium text-muted-foreground";

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const handleViewDetails = (id: string) => {
    router.push(`/browse-jobs/${id}`);
  };
  return (
    <article
      onClick={() => handleViewDetails(job._id)}
      className="cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/80 hover:bg-card/60"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-indigo-500/10 text-sm font-semibold text-indigo-600 dark:text-indigo-300"
        >
          {getCompanyInitials(job.company)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-[17px] leading-6 font-semibold">
                {job.title}
              </h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {job.company}
                <span aria-hidden="true" className="mx-1.5">
                  •
                </span>
                {formatJobLocation(job)}
              </p>
            </div>

            <BookmarkButton jobTitle={job.title} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={PILL}>
              <Wallet className="size-3.5" />
              {formatCompensation(job)}
            </span>

            <span className={PILL}>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-current"
              />
              {job.jobType}
            </span>

            {job.status === "Active" && (
              <span
                className={`${PILL} border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`}
              >
                <Zap className="size-3.5" />
                Easy Apply
              </span>
            )}

            {isNewJob(job.postedAt) && (
              <span
                className={`${PILL} border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400`}
              >
                <Sparkles className="size-3.5" />
                New Job
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
