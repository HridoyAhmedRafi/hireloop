import type { IJob } from "./job-type";

const FREQUENCY_LABEL: Record<string, string> = {
  "per hour": "/ hr",
  "per month": "/ mo",
  "per year": "/ yr",
};

const DAY = 86_400_000;
const NEW_JOB_WINDOW = 7 * DAY;

const formatAmount = (amount: string) => {
  const value = Number(amount);
  if (!amount || Number.isNaN(value)) return "";
  return value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`;
};

/** "$140k – $180k / yr", or a fallback when the salary is missing. */
export const formatCompensation = (job: IJob) => {
  const min = formatAmount(job.minSalary);
  const max = formatAmount(job.maxSalary);
  if (!min && !max) return "Salary not disclosed";

  const range = min && max ? `$${min} – $${max}` : `$${min || max}`;
  const frequency = FREQUENCY_LABEL[job.frequency] ?? "";
  return `${range} ${frequency}`.trim();
};

const parseDate = (value: string) => {
  if (!value) return null;

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date;

  const fallback = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
};

/** True when the job was posted within the last 7 days. */
export const isNewJob = (postedAt: string) => {
  const date = parseDate(postedAt);
  if (!date) return false;

  const age = Date.now() - date.getTime();
  return age >= 0 && age <= NEW_JOB_WINDOW;
};

/** "TechFlow Systems" -> "TS", used for the logo placeholder. */
export const getCompanyInitials = (company: string) =>
  company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "?";
