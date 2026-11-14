import { TableCell, TableRow } from "@/components/ui/table";
import { ApplicationStatusBadge } from "@/components/seeker-application/application-status-badge";
import { formatRelativeDate } from "@/lib/formate/application-format";
import type {
  ApplicationStatus,
  IApplicationRecord,
} from "@/lib/types/application-type";
import { StatusSelect } from "./status-select";

type ApplicationRowProps = {
  application: IApplicationRecord;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
};

export function ApplicationRow({
  application,
  onStatusChange,
}: ApplicationRowProps) {
  const status = application.status ?? "Applied";
  const initial = application.email?.[0]?.toUpperCase() ?? "?";

  return (
    <TableRow className="border-[#232327] hover:bg-[#1a1a1d]">
      <TableCell className="px-3 py-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#232327] text-xs font-semibold text-[#c3c0ff]"
          >
            {initial}
          </span>
          <p className="truncate text-sm font-medium text-white">
            {application.email}
          </p>
        </div>
      </TableCell>

      <TableCell className="px-3 py-4 text-sm whitespace-nowrap text-[#d4d4d8] sm:px-4">
        {formatRelativeDate(application.postedAt)}
      </TableCell>

      <TableCell className="px-3 py-4 sm:px-4">
        <ApplicationStatusBadge status={status} />
      </TableCell>

      <TableCell className="px-3 py-4 sm:px-4">
        <StatusSelect
          value={status}
          onChange={(nextStatus) =>
            onStatusChange(application._id, nextStatus)
          }
        />
      </TableCell>
    </TableRow>
  );
}
