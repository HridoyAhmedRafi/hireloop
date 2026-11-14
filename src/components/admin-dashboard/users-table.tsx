import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminUserRow, UserRole } from "@/lib/types/admin-user-type";
import { UserRow } from "./user-row";

type UsersTableProps = {
  users: AdminUserRow[];
  onRoleChange: (userId: string, role: UserRole) => void;
};

const headClass =
  "px-3 py-3 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase sm:px-4";

export function UsersTable({ users, onRoleChange }: UsersTableProps) {
  return (
    <Table>
      <TableHeader className="bg-[#0b0b0c]">
        <TableRow className="border-[#232327] hover:bg-transparent">
          <TableHead className={headClass}>User</TableHead>
          <TableHead className={headClass}>Role</TableHead>
          <TableHead className={`hidden sm:table-cell ${headClass}`}>
            Status
          </TableHead>
          <TableHead className={`hidden md:table-cell ${headClass}`}>
            Joined
          </TableHead>
          <TableHead className={headClass}>Change Role</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="px-4 py-16 text-center text-sm text-muted-foreground"
            >
              No users match your search.
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onRoleChange={(role) => onRoleChange(user.id, role)}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
