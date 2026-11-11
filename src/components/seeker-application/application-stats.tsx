import { cn } from "cn";
import type { IApplicationRecord } from "@/lib/application-type";

type ApplicationStatsProps = {
  applications: IApplicationRecord[];
};

export function ApplicationStats({ applications }: ApplicationStatsProps) {
  const total = applications.length;
  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;
  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;
  const offered = applications.filter(
    (application) => application.status === "Offered"
  ).length;
  const successRate = total === 0 ? 0 : Math.round((offered / total) * 100);

  const stats = [
    { label: "Total Applied", value: `${total}` },
    { label: "Shortlisted", value: `${shortlisted}` },
    { label: "Interviews", value: `${interviews}` },
    { label: "Success Rate", value: `${successRate}%`, highlight: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {stat.label}
          </p>
          <p
            className={cn(
              "mt-2 text-2xl font-semibold",
              stat.highlight && "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
