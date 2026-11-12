import {
  Briefcase,
  MapPin,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IJobDetails } from "@/lib/types/job-details-type";
import {
  formatCompensation,
  formatJobLocation,
} from "@/lib/formate/job-format";

type JobStatsProps = {
  job: IJobDetails;
};

type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function JobStats({ job }: JobStatsProps) {
  const stats: Stat[] = [
    {
      label: "Salary Range",
      value: formatCompensation(job),
      icon: Wallet,
    },
    {
      label: "Location",
      value: formatJobLocation(job),
      icon: MapPin,
    },
    {
      label: "Job Type",
      value: job.jobType,
      icon: Briefcase,
    },
    {
      label: "Experience",
      value: job.experience ?? "Not specified",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            <stat.icon aria-hidden="true" className="size-3.5" />
            {stat.label}
          </div>
          <p className="mt-2 truncate text-sm font-semibold" title={stat.value}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
