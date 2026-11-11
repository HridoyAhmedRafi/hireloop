import { BadgeCheck } from "lucide-react";
import type { IJobDetails } from "@/lib/job-details-type";
import { getCompanyInitials } from "@/lib/job-format";
import { JobDetailsActions } from "./job-details-actions";

type JobDetailsHeaderProps = {
  job: IJobDetails;
};

export function JobDetailsHeader({ job }: JobDetailsHeaderProps) {
  return (
    <header className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-xl border border-border bg-indigo-500/10 bg-cover bg-center text-base font-semibold text-indigo-600 dark:text-indigo-300"
            style={
              job.companyLogo
                ? { backgroundImage: `url(${job.companyLogo})` }
                : undefined
            }
          >
            {!job.companyLogo && getCompanyInitials(job.company)}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl leading-7 font-semibold sm:text-2xl">
              {job.title}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{job.company}</span>
              {job.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span aria-hidden="true">•</span>
                  <BadgeCheck className="size-3.5" />
                  Verified Employer
                </span>
              )}
            </div>
          </div>
        </div>

        <JobDetailsActions jobTitle={job.title} />
      </div>
    </header>
  );
}
