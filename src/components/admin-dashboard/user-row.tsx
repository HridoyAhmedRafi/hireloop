import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { RoleBadge } from "./role-badge";
import type { AdminUserRow, UserRole } from "@/lib/types/admin-user-type";
import { UserRoleToggle } from "./user-role-toggle";

type UserRowProps = {
  user: AdminUserRow;
  onRoleChange: (role: UserRole) => void;
};

const formatJoined = (value: string | Date) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export function UserRow({ user, onRoleChange }: UserRowProps) {
  const suspended = user.banned === true;
  const initial =
    user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <TableRow className="border-[#232327] hover:bg-[#1a1a1d]">
      <TableCell className="px-3 py-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg" className="border border-[#232327]">
            {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
            <AvatarFallback className="bg-[#232327] text-xs font-semibold text-[#c3c0ff]">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 max-w-[240px]">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium text-white">
                {user.name || "Unnamed user"}
              </p>
              {user.premium ? (
                <span className="rounded-full border border-[#5c53fe]/30 bg-[#5c53fe]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#c3c0ff]">
                  Pro
                </span>
              ) : null}
            </div>
            <p className="truncate text-xs text-[#a0a0ab]">{user.email}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-3 py-4 sm:px-4">
        <RoleBadge role={user.role} />
      </TableCell>

      <TableCell className="hidden px-3 py-4 sm:table-cell sm:px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              suspended ? "bg-red-400" : "bg-[#4ade80]",
            )}
          />
          <span className={suspended ? "text-red-400" : "text-[#4ade80]"}>
            {suspended ? "Suspended" : "Active"}
          </span>
        </span>
      </TableCell>

      <TableCell className="hidden px-3 py-4 text-sm whitespace-nowrap text-[#d4d4d8] md:table-cell md:px-4">
        {formatJoined(user.createdAt)}
      </TableCell>

      <TableCell className="px-3 py-4 sm:px-4">
        <UserRoleToggle value={user.role} onChange={onRoleChange} />
      </TableCell>
    </TableRow>
  );
}
