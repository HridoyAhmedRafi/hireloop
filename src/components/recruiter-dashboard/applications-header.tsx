import Link from "next/link";
import { ArrowLeft, ChevronRight, MapPin, UsersRound } from "lucide-react";

import type { IJobPost } from "@/lib/types/job-type";

type ApplicationsHeaderProps = {
  job: IJobPost;
  applicantCount: number;
};

export function ApplicationsHeader({
  job,
  applicantCount,
}: ApplicationsHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/dashboard/recruiter/jobs"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Manage Jobs
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Manage Jobs
            <ChevronRight className="size-3.5 text-[#5a5a60]" />
            <span className="text-[#c3c0ff]">Applications</span>
          </p>

          <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight">
            {job.title}
          </h1>

          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>{job.company}</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5 shrink-0 text-[#a0a0ab]" />
              {job.remote ? `Remote (${job.location})` : job.location}
            </span>
            <span aria-hidden="true">•</span>
            <span>{job.jobType}</span>
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#232327] bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium text-[#c3c0ff] sm:shrink-0">
          <UsersRound className="size-4" />
          {applicantCount} {applicantCount === 1 ? "Applicant" : "Applicants"}
        </span>
      </div>
    </div>
  );
}
