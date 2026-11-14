import type { ApplicationStatus } from "@/lib/types/application-type";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Applied",
  "In Review",
  "Interview",
  "Shortlisted",
  "Rejected",
  "Offered",
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  Applied: "Applied",
  "In Review": "Review",
  Shortlisted: "Shortlisted",
  Interview: "Interview",
  Rejected: "Rejected",
  Offered: "Offered",
};
