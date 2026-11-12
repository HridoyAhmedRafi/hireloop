import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import type { IApplicationRecord } from "@/lib/types/application-type";
import { formatRelativeDate } from "@/lib/formate/application-format";
import { getCompanyInitials } from "@/lib/formate/job-format";
import { ApplicationStatusBadge } from "./application-status-badge";

type ApplicationRowProps = {
  application: IApplicationRecord;
};

export function ApplicationRow({ application }: ApplicationRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-muted text-xs font-semibold"
          >
            {getCompanyInitials(application.companyName)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium">{application.jobTitle}</p>
            <p className="text-xs text-muted-foreground">
              {application.jobType}
              <span aria-hidden="true" className="mx-1.5">
                •
              </span>
              {application.remote ? "Remote" : "On-site"}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden text-muted-foreground sm:table-cell">
        {application.companyName}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatRelativeDate(application.postedAt)}
      </TableCell>

      <TableCell>
        <ApplicationStatusBadge status={application.status} />
      </TableCell>

      <TableCell className="text-right">
        <Link
          href={`/browse-jobs/${application.jobId}`}
          className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Details
        </Link>
      </TableCell>
    </TableRow>
  );
}
