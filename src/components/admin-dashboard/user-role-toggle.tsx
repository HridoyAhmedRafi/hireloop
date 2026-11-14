"use client";

import { cn } from "cn";
import { ROLE_LABELS, USER_ROLES } from "@/lib/types/user-role-type";
import type { UserRole } from "@/lib/types/admin-user-type";

type UserRoleToggleProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export function UserRoleToggle({ value, onChange }: UserRoleToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-[#232327] bg-[#1f1f1f] p-1">
      {USER_ROLES.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          aria-pressed={value === role}
          className={cn(
            "h-7 cursor-pointer rounded-md px-2.5 text-[11px] font-medium transition-colors",
            value === role
              ? "bg-[#5c53fe] text-white"
              : "text-[#a0a0ab] hover:text-white",
          )}
        >
          {ROLE_LABELS[role]}
        </button>
      ))}
    </div>
  );
}
