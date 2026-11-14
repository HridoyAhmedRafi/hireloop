import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  ApplicationStatus,
  IApplicationRecord,
} from "@/lib/types/application-type";
import { ApplicationRow } from "./application-row";

type ApplicationsTableProps = {
  applications: IApplicationRecord[];
  onStatusChange: (id: string, status: ApplicationStatus) => void;
};

const headClass =
  "px-3 py-3 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase sm:px-4";

export function ApplicationsTable({
  applications,
  onStatusChange,
}: ApplicationsTableProps) {
  return (
    <Table>
      <TableHeader className="bg-[#0b0b0c]">
        <TableRow className="border-[#232327] hover:bg-transparent">
          <TableHead className={headClass}>Applicant</TableHead>
          <TableHead className={headClass}>Applied</TableHead>
          <TableHead className={headClass}>Status</TableHead>
          <TableHead className={headClass}>Update Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="px-4 py-16 text-center text-sm text-muted-foreground"
            >
              No applications for this job yet.
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application) => (
            <ApplicationRow
              key={application._id}
              application={application}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
