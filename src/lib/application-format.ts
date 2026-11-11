import { formatPostedDate } from "./job-format";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const ago = (amount: number, unit: string) =>
  `${amount} ${unit}${amount === 1 ? "" : "s"} ago`;

/** "2026-11-11T08:00:00.000Z" -> "2 hours ago". */
export const formatRelativeDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const diff = Date.now() - date.getTime();

  if (diff < MINUTE) return "Just now";
  if (diff < HOUR) return ago(Math.floor(diff / MINUTE), "min");
  if (diff < DAY) return ago(Math.floor(diff / HOUR), "hour");
  if (diff < WEEK) return ago(Math.floor(diff / DAY), "day");
  if (diff < 4 * WEEK) return ago(Math.floor(diff / WEEK), "week");

  return formatPostedDate(value);
};
