import type { IJobPost } from "@/lib/types/job-type";
import { Navbar } from "@/components/shared/navbar";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters, type FilterGroup } from "@/components/jobs/job-filters";
import { JobSearchBar } from "@/components/jobs/job-search-bar";
import { JobSort } from "@/components/jobs/job-sort";
import { getJobs } from "@/lib/api/jobs";

const JOB_TYPE_ORDER = ["Full-time", "Part-time", "Contract", "Internship"];

const countBy = (values: string[]) =>
  values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});

const buildFilterGroups = (jobs: IJobPost[]): FilterGroup[] => {
  const jobTypeCounts = countBy(jobs.map((job) => job.jobType));
  const categoryCounts = countBy(jobs.map((job) => job.category));

  const jobTypes = [
    ...JOB_TYPE_ORDER,
    ...Object.keys(jobTypeCounts).filter(
      (type) => !JOB_TYPE_ORDER.includes(type),
    ),
  ];

  return [
    {
      id: "jobType",
      title: "Job Type",
      options: jobTypes.map((value) => ({
        value,
        label: value,
        count: jobTypeCounts[value] ?? 0,
      })),
    },
    {
      id: "category",
      title: "Category",
      options: Object.entries(categoryCounts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([value, count]) => ({ value, label: value, count })),
    },
  ];
};

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(search)) {
    if (typeof value === "string") {
      query.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    }
  }

  const queryString = query.toString();

  const [jobs, allJobs] = await Promise.all([
    getJobs(queryString),
    queryString ? getJobs("") : Promise.resolve(null),
  ]);

  // Counts always come from all jobs, so filtering never hides other options.
  const filterGroups = buildFilterGroups(allJobs ?? jobs);

  return (
    <>
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <h1 className="sr-only">Browse jobs</h1>

        <JobSearchBar />

        <div className="mt-6 grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)]">
          <JobFilters groups={filterGroups} />

          <section aria-labelledby="job-results-heading" className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="job-results-heading" className="text-base font-semibold">
                Found {jobs.length.toLocaleString()}{" "}
                {jobs.length === 1 ? "job" : "jobs"}
              </h2>
              <JobSort />
            </div>

            {jobs.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
                No jobs match your search yet. Try different keywords or
                filters.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default BrowseJobs;
