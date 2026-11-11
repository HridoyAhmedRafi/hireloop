import { ApplicationsView } from "@/components/seeker-application/applications-view";
import type { IApplicationRecord } from "@/lib/application-type";
import { DUMMY_APPLICATIONS } from "@/lib/dummy-applications";

const ApplicationsPage = () => {
  // TODO: replace with the fetched applications once the API exposes GET /applications.
  const applications: IApplicationRecord[] = DUMMY_APPLICATIONS;
  return <ApplicationsView applications={applications} />;
};

export default ApplicationsPage;
