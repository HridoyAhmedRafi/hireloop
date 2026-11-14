"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import type {
  ApplicationStatus,
  IApplicationRecord,
} from "@/lib/types/application-type";
import type { IJobPost } from "@/lib/types/job-type";
import { ApplicationsHeader } from "./applications-header";
import { ApplicationsTable } from "./applications-table";
import { STATUS_LABELS } from "./statuses";
import { updateApplication } from "@/lib/api/applications";

const FIGMA_THEME =
  "[--background:#131314] [--foreground:#f4f4f5] [--card:#151516] [--card-foreground:#f4f4f5] [--popover:#151516] [--popover-foreground:#f4f4f5] [--primary:#5c53fe] [--primary-foreground:#ffffff] [--secondary:#232327] [--secondary-foreground:#f4f4f5] [--muted:#232327] [--muted-foreground:#a0a0ab] [--accent:#232327] [--accent-foreground:#f4f4f5] [--border:#232327] [--input:#232327] [--ring:#5c53fe]";

type ApplicationsViewProps = {
  job: IJobPost;
  applications: IApplicationRecord[];
};

export function ApplicationsView({
  job,
  applications: initialApplications,
}: ApplicationsViewProps) {
  const [applications, setApplications] = useState(initialApplications);

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const application = applications.find((item) => item._id === id);

    const updateStatus = await updateApplication(id, { status });
    if (updateStatus.modifiedCount > 0) {
      setApplications((current) =>
        current.map((item) => (item._id === id ? { ...item, status } : item)),
      );
      toast.add({
        title: "Status updated",
        description: `${application?.email ?? "Applicant"} moved to ${STATUS_LABELS[status]}.`,
      });
    }
  };

  return (
    <div
      className={`flex w-full flex-1 flex-col gap-6 bg-background p-4 md:p-8 ${FIGMA_THEME}`}
    >
      <ApplicationsHeader job={job} applicantCount={applications.length} />

      <Card className="min-w-0 overflow-hidden rounded-2xl py-0">
        <ApplicationsTable
          applications={applications}
          onStatusChange={handleStatusChange}
        />
      </Card>
    </div>
  );
}
