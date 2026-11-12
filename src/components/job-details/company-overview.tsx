import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IJobDetails } from "@/lib/types/job-details-type";
import {
  formatJobLocation,
  formatPostedDate,
  getCompanyInitials,
} from "@/lib/formate/job-format";

type CompanyOverviewProps = {
  job: IJobDetails;
};

function CompanyInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className=" flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
    </div>
  );
}

export function CompanyOverview({ job }: CompanyOverviewProps) {
  return (
    <aside className="self-start rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
      <h2 className="text-base font-semibold">Company Overview</h2>

      <div
        aria-hidden="true"
        className="mt-4 grid aspect-2/1 place-items-center rounded-lg border border-border bg-indigo-500/10 bg-cover bg-center"
        style={
          job.companyImage
            ? { backgroundImage: `url(${job.companyImage})` }
            : undefined
        }
      >
        {!job.companyImage && (
          <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
            {getCompanyInitials(job.company)}
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-3">
        <CompanyInfoRow label="Location" value={formatJobLocation(job)} />
        <CompanyInfoRow label="Posted" value={formatPostedDate(job.postedAt)} />

        {job.companySize && (
          <CompanyInfoRow label="Size" value={job.companySize} />
        )}
        {job.industry && (
          <CompanyInfoRow label="Industry" value={job.industry} />
        )}
      </dl>

      {job.website && (
        <Button
          variant="outline"
          className="mt-5 w-full cursor-pointer"
          render={
            <a href={job.website} target="_blank" rel="noreferrer noopener" />
          }
        >
          Visit Website
          <ExternalLink className="size-3.5" />
        </Button>
      )}
    </aside>
  );
}
