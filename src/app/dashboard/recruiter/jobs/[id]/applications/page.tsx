import { notFound } from "next/navigation";

import { ApplicationsView } from "@/components/recruiter-dashboard/applications-view";
import { getApplications } from "@/lib/api/applications";
import { getJobs } from "@/lib/api/jobs";

const ApplicationsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const jobs = await getJobs();
  const job = jobs.find((item) => item._id === id);
  if (!job) notFound();

  const applications = await getApplications(`jobId=${id}`);

  // const jobApplications = applications.filter(
  //   (application) => application.jobId === id,
  // );

  return <ApplicationsView job={job} applications={applications} />;
};

export default ApplicationsPage;
