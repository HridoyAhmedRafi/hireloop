"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { normalizeRole, ROLE_LABELS } from "@/lib/types/user-role-type";
import type {
  AdminUser,
  AdminUserRow,
  UserRole,
} from "@/lib/types/admin-user-type";
import { UsersHeader } from "./users-header";
import { UsersStats } from "./users-stats";
import { UsersTable } from "./users-table";
import { updateUserRole } from "@/lib/api/user";

const FIGMA_THEME =
  "[--background:#131314] [--foreground:#f4f4f5] [--card:#151516] [--card-foreground:#f4f4f5] [--popover:#151516] [--popover-foreground:#f4f4f5] [--primary:#5c53fe] [--primary-foreground:#ffffff] [--secondary:#232327] [--secondary-foreground:#f4f4f5] [--muted:#232327] [--muted-foreground:#a0a0ab] [--accent:#232327] [--accent-foreground:#f4f4f5] [--border:#232327] [--input:#232327] [--ring:#5c53fe]";

type UsersViewProps = {
  users: AdminUser[];
};

export function UsersView({ users }: UsersViewProps) {
  const [query, setQuery] = useState("");
  const [roleOverrides, setRoleOverrides] = useState<Record<string, UserRole>>(
    {},
  );

  const resolvedUsers: AdminUserRow[] = users.map((user) => ({
    ...user,
    role: roleOverrides[user.id] ?? normalizeRole(user.role),
  }));

  const search = query.trim().toLowerCase();
  const visibleUsers = search
    ? resolvedUsers.filter((user) => user.email.toLowerCase().includes(search))
    : resolvedUsers;

  const handleRoleChange = async (userId: string, role: UserRole) => {
    const user = resolvedUsers.find((item) => item.id === userId);
    if (!user || user.role === role) return;

    const previousRole = user.role;

    // Optimistic: update the toggle and stats right away.
    setRoleOverrides((current) => ({ ...current, [userId]: role }));
    try {
      await updateUserRole(userId, role);

      toast.add({
        title: "Role updated",
        description: `${user.email} is now ${ROLE_LABELS[role]}.`,
      });
    } catch {
      // Revert if the request failed.
      setRoleOverrides((current) => ({
        ...current,
        [userId]: previousRole,
      }));
      toast.add({
        title: "Update failed",
        description: "Could not update the role. Please try again.",
      });
    }
  };

  return (
    <div
      className={`flex w-full flex-1 flex-col gap-6 bg-background p-4 md:p-8 ${FIGMA_THEME}`}
    >
      <UsersHeader query={query} onQueryChange={setQuery} />

      <UsersStats users={resolvedUsers} />

      <Card className="min-w-0 overflow-hidden rounded-2xl py-0">
        <UsersTable users={visibleUsers} onRoleChange={handleRoleChange} />
      </Card>
    </div>
  );
}
