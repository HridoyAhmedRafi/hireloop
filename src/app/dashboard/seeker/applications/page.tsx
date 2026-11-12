import { ApplicationsView } from "@/components/seeker-application/applications-view";
import { getApplications } from "@/lib/api/applications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const id = session?.user?.id;
  // TODO: replace with the fetched applications once the API exposes GET /applications.
  const applications = await getApplications(`applicantId=${id}`);

  // const applications: IApplicationRecord[] = DUMMY_APPLICATIONS;
  return <ApplicationsView applications={applications} />;
};

export default ApplicationsPage;
