"use client";

import Link from "next/link";
import {
  Briefcase,
  Bug,
  ChevronRight,
  Code2,
  Eye,
  Headphones,
  MapPin,
  Megaphone,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Server,
  Trash2,
  TrendingUp,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IJob } from "@/lib/job-type";

// Figma palette (Manage Job Posts / 83484:1158)
const FIGMA_THEME =
  "[--background:#131314] [--foreground:#f4f4f5] [--card:#151516] [--card-foreground:#f4f4f5] [--popover:#151516] [--popover-foreground:#f4f4f5] [--primary:#5c53fe] [--primary-foreground:#ffffff] [--secondary:#232327] [--secondary-foreground:#f4f4f5] [--muted:#232327] [--muted-foreground:#a0a0ab] [--accent:#232327] [--accent-foreground:#f4f4f5] [--border:#232327] [--input:#232327] [--ring:#5c53fe]";

type JobStatus = "Active" | "Expired";

// Fields the API will return on top of what the Add Job form submits.
type JobPost = IJob & {
  _id: string;
  status: JobStatus;
  applicants: number;
  postedAt: string;
};

type CategoryMeta = {
  icon: LucideIcon;
  iconColor: string;
  textColor: string;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  Engineering: { icon: Code2, iconColor: "#5c53fe", textColor: "#38bdf8" },
  "Engineering & Tech": {
    icon: Code2,
    iconColor: "#5c53fe",
    textColor: "#38bdf8",
  },
  Design: { icon: Palette, iconColor: "#f97316", textColor: "#f97316" },
  Infrastructure: {
    icon: Server,
    iconColor: "#38bdf8",
    textColor: "#38bdf8",
  },
  Marketing: { icon: Megaphone, iconColor: "#c3c0ff", textColor: "#c3c0ff" },
  Quality: { icon: Bug, iconColor: "#818cf8", textColor: "#c7d2fe" },
  Sales: { icon: TrendingUp, iconColor: "#4ade80", textColor: "#4ade80" },
  Finance: { icon: Wallet, iconColor: "#facc15", textColor: "#facc15" },
  Operations: { icon: Server, iconColor: "#38bdf8", textColor: "#38bdf8" },
  "Customer Support": {
    icon: Headphones,
    iconColor: "#818cf8",
    textColor: "#c7d2fe",
  },
  "Human Resources": {
    icon: Users,
    iconColor: "#c3c0ff",
    textColor: "#c3c0ff",
  },
  Other: { icon: Briefcase, iconColor: "#a0a0ab", textColor: "#a0a0ab" },
};

const getCategoryMeta = (category: string) =>
  CATEGORY_META[category] ?? CATEGORY_META.Other;

const FREQUENCY_LABEL: Record<string, string> = {
  "per hour": "/ hr",
  "per month": "/ mo",
  "per year": "/ yr",
};

const DAY = 86_400_000;

const daysAgo = (days: number) => {
  const now = new Date();
  const date = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - days),
  );

  return date.toISOString().slice(0, 10);
};

// TODO: replace with data from the API.
const dummyJobs: JobPost[] = [
  {
    _id: "job-1",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering",
    jobType: "Full-time",
    remote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: "25",
    maxSalary: "40",
    frequency: "per hour",
    responsibilities: "Build and maintain the candidate-facing interface.",
    requirements: "3+ years of React and TypeScript experience.",
    status: "Active",
    applicants: 34,
    postedAt: daysAgo(4),
  },
  {
    _id: "job-2",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design",
    jobType: "Full-time",
    remote: false,
    location: "London, UK",
    deadline: "2025-06-14",
    minSalary: "90000",
    maxSalary: "115000",
    frequency: "per year",
    responsibilities: "Own the end-to-end design of the hiring workflow.",
    requirements:
      "5+ years of product design experience with a strong portfolio.",
    status: "Active",
    applicants: 19,
    postedAt: daysAgo(7),
  },
  {
    _id: "job-3",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Infrastructure",
    jobType: "Full-time",
    remote: false,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    minSalary: "95000",
    maxSalary: "120000",
    frequency: "per year",
    responsibilities: "Maintain CI/CD pipelines and cloud infrastructure.",
    requirements: "Hands-on experience with AWS, Docker, and Kubernetes.",
    status: "Active",
    applicants: 12,
    postedAt: daysAgo(14),
  },
  {
    _id: "job-4",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    jobType: "Full-time",
    remote: true,
    location: "EU / US",
    deadline: "2025-07-15",
    minSalary: "80000",
    maxSalary: "105000",
    frequency: "per year",
    responsibilities: "Plan go-to-market campaigns for new product launches.",
    requirements: "Experience marketing B2B SaaS products.",
    status: "Active",
    applicants: 27,
    postedAt: daysAgo(5),
  },
  {
    _id: "job-5",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Quality",
    jobType: "Part-time",
    remote: false,
    location: "Dublin, Ireland",
    deadline: "2025-05-01",
    minSalary: "35",
    maxSalary: "50",
    frequency: "per hour",
    responsibilities: "Write and maintain automated end-to-end tests.",
    requirements: "Experience with Playwright or Cypress.",
    status: "Expired",
    applicants: 8,
    postedAt: daysAgo(40),
  },
];

const formatAmount = (amount: string) => {
  const value = Number(amount);

  if (!amount || Number.isNaN(value)) return "";

  return value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`;
};

const formatCompensation = (job: IJob) => {
  const min = formatAmount(job.minSalary);
  const max = formatAmount(job.maxSalary);
  const range = min && max ? `€${min} – €${max}` : `€${min || max}`;

  if (!min && !max) return "—";

  return `${range} ${FREQUENCY_LABEL[job.frequency] ?? ""}`.trim();
};

const formatDeadline = (deadline: string) => {
  if (!deadline) return "No deadline";

  const date = new Date(`${deadline}T00:00:00`);

  if (Number.isNaN(date.getTime())) return deadline;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatRelative = (date: string) => {
  const posted = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(posted.getTime())) return "";

  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const days = Math.max(0, Math.round((today - posted.getTime()) / DAY));

  if (days === 0) return "Posted today";
  if (days < 7) return `Posted ${days}d ago`;

  return `Posted ${Math.round(days / 7)}w ago`;
};

const ManageJobs = () => {
  const jobs = dummyJobs;

  // TODO: replace these placeholders with API calls.
  const handleAction = (action: string, job: JobPost) => {
    console.log(`${action}:`, job.title);
  };

  return (
    <div
      className={`flex w-full flex-1 flex-col gap-6 bg-background p-4 md:p-8 ${FIGMA_THEME}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Manage Jobs
            <ChevronRight className="size-3.5 text-[#5a5a60]" />
            <span className="text-[#c3c0ff]">Job Listings &amp; Postings</span>
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/add-job" />}
          size="lg"
          className="gap-2 sm:shrink-0"
        >
          <Plus />
          New Job Post
        </Button>
      </div>

      <Card className="min-w-0 overflow-hidden rounded-2xl py-0">
        <Table>
          <TableHeader className="bg-[#0b0b0c]">
            <TableRow className="border-[#232327] hover:bg-transparent">
              <TableHead className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] sm:px-4">
                Job Title &amp; Dept
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] lg:table-cell">
                Company &amp; Location
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] md:table-cell">
                Type
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] lg:table-cell">
                Compensation
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] lg:table-cell">
                Applicants
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] sm:table-cell">
                Status
              </TableHead>
              <TableHead className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#a0a0ab] sm:table-cell">
                Deadline
              </TableHead>
              <TableHead className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#a0a0ab] sm:px-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  No job posts yet.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const category = getCategoryMeta(job.category);
                const expired = job.status === "Expired";

                return (
                  <TableRow
                    key={job._id}
                    className="border-[#232327] hover:bg-[#1a1a1d]"
                  >
                    <TableCell className="px-3 py-4 sm:px-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327] sm:flex"
                          style={{ color: category.iconColor }}
                        >
                          <category.icon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-[#ffffff]">
                            {job.title}
                          </p>
                          <p
                            className="truncate text-xs"
                            style={{ color: category.textColor }}
                          >
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 lg:table-cell">
                      <p className="text-[#ffffff]">{job.company}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 text-[#a0a0ab]" />
                        {job.remote ? `Remote (${job.location})` : job.location}
                      </p>
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 md:table-cell">
                      <Badge
                        variant="outline"
                        className="border-[#232327] bg-[#1f1f1f] text-[#d4d4d8]"
                      >
                        {job.jobType}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 text-[#ffffff] lg:table-cell">
                      {formatCompensation(job)}
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 lg:table-cell">
                      <span className="flex items-center gap-1.5 text-[#c3c0ff]">
                        <UsersRound className="size-4 shrink-0" />
                        {job.applicants} Candidates
                      </span>
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 sm:table-cell">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          expired
                            ? "bg-[#1f1f1f] text-[#a0a0ab]"
                            : "bg-[#14532d]/40 text-[#4ade80]"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            expired ? "bg-[#5a5a60]" : "bg-[#4ade80]"
                          }`}
                        />
                        {job.status}
                      </span>
                    </TableCell>

                    <TableCell className="hidden px-4 py-4 sm:table-cell">
                      <p
                        className={
                          expired ? "text-[#a0a0ab]" : "text-[#ffffff]"
                        }
                      >
                        {formatDeadline(job.deadline)}
                      </p>
                      <p className="text-xs text-[#5a5a60]">
                        {expired ? "Closed" : formatRelative(job.postedAt)}
                      </p>
                    </TableCell>

                    <TableCell className="px-3 py-4 sm:px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          className="h-8 gap-1.5 bg-[#5c53fe]/20 text-[#c3c0ff] hover:bg-[#5c53fe]/30"
                          onClick={() => handleAction("Update", job)}
                        >
                          <Pencil />
                          <span className="hidden sm:inline">Update</span>
                          <span className="sr-only sm:hidden">Update</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${job.title}`}
                          className="size-8 bg-[#1f1f1f] text-[#a0a0ab] hover:bg-[#232327] hover:text-[#f4f4f5]"
                          onClick={() => handleAction("Delete", job)}
                        >
                          <Trash2 />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`More actions for ${job.title}`}
                                className="size-8 text-[#a1a4aa] hover:bg-[#232327] hover:text-[#f4f4f5]"
                              />
                            }
                          >
                            <MoreVertical />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleAction("View", job)}
                            >
                              <Eye />
                              View
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ManageJobs;
