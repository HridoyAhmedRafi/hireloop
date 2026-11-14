import { Briefcase, ShieldCheck, UserRound, UsersRound } from "lucide-react";

import type { AdminUserRow } from "@/lib/types/admin-user-type";

type UsersStatsProps = {
  users: AdminUserRow[];
};

export function UsersStats({ users }: UsersStatsProps) {
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: UsersRound,
      iconColor: "#c3c0ff",
    },
    {
      label: "Admins",
      value: users.filter((user) => user.role === "admin").length,
      icon: ShieldCheck,
      iconColor: "#5c53fe",
    },
    {
      label: "Recruiters",
      value: users.filter((user) => user.role === "recruiter").length,
      icon: Briefcase,
      iconColor: "#38bdf8",
    },
    {
      label: "Seekers",
      value: users.filter((user) => user.role === "seeker").length,
      icon: UserRound,
      iconColor: "#4ade80",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-[#232327] bg-[#151516] p-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="grid size-7 place-items-center rounded-lg bg-[#232327]"
              style={{ color: stat.iconColor }}
            >
              <stat.icon className="size-3.5" />
            </span>
            <p className="text-[11px] font-medium tracking-wide text-[#a0a0ab] uppercase">
              {stat.label}
            </p>
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
