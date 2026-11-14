import { cn } from "cn";
import { ROLE_BADGE_STYLES, ROLE_LABELS } from "@/lib/types/user-role-type";
import type { UserRole } from "@/lib/types/admin-user-type";

type RoleBadgeProps = {
  role: UserRole;
};

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        ROLE_BADGE_STYLES[role],
      )}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}
