"use client";

import { useState } from "react";
import type { IApplicationRecord } from "@/lib/application-type";
import { ApplicationPagination } from "./application-pagination";
import { ApplicationStats } from "./application-stats";
import { ApplicationTable } from "./application-table";
import { ApplicationsHeader } from "./applications-header";
import {
  ApplicationsToolbar,
  type ApplicationsTab,
} from "./applications-toolbar";

const PAGE_SIZE = 5;

type ApplicationsViewProps = {
  applications: IApplicationRecord[];
};

export function ApplicationsView({ applications }: ApplicationsViewProps) {
  const [tab, setTab] = useState<ApplicationsTab>("active");
  const [page, setPage] = useState(1);

  const visible = applications.filter((application) =>
    tab === "archived" ? application.archived : !application.archived
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = visible.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleTabChange = (nextTab: ApplicationsTab) => {
    setTab(nextTab);
    setPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <ApplicationsHeader />
        <ApplicationsToolbar tab={tab} onTabChange={handleTabChange} />
      </div>

      <ApplicationStats applications={applications} />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ApplicationTable applications={rows} />
        <ApplicationPagination
          page={currentPage}
          pageCount={pageCount}
          total={visible.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
