import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/lib/types/application-type";

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  Applied: "Applied",
  "In Review": "Review",
  Shortlisted: "Shortlisted",
  Interview: "Interview",
  Rejected: "Rejected",
  Offered: "Offered",
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "border-border bg-muted/60 text-muted-foreground",
  "In Review":
    "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Shortlisted:
    "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Interview: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  Offered:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

type ApplicationStatusBadgeProps = {
  status: ApplicationStatus;
};

export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  return (
    <Badge className={cn("border", STATUS_STYLES[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
