import { CompanyOverview } from "@/components/job-details/company-overview";
import { JobDetailsContent } from "@/components/job-details/job-details-content";
import { JobDetailsHeader } from "@/components/job-details/job-details-header";
import { JobStats } from "@/components/job-details/job-stats";
import { Navbar } from "@/components/shared/navbar";
import { DUMMY_JOB_DETAILS } from "@/lib/dummy-job-details";
import type { IJobDetails } from "@/lib/job-details-type";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // TODO: replace with `const job = await getSingleJob(id)` once the API
  // returns the job details fields.
  const job: IJobDetails = { ...DUMMY_JOB_DETAILS, _id: id };

  return (
    <>
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <JobDetailsHeader job={job} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-6">
            <JobStats job={job} />
            <JobDetailsContent job={job} />
          </div>

          <CompanyOverview job={job} />
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
