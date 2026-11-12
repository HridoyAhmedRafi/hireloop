import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IApplicationRecord } from "@/lib/types/application-type";
import { ApplicationRow } from "./application-row";

type ApplicationTableProps = {
  applications: IApplicationRecord[];
};

export function ApplicationTable({ applications }: ApplicationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-5">Job Title</TableHead>
          <TableHead className="hidden sm:table-cell">Company</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="pr-5 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="py-10 text-center text-sm text-muted-foreground"
            >
              No applications found.
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application) => (
            <ApplicationRow key={application._id} application={application} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
