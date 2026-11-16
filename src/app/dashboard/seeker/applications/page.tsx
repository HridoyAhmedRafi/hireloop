import { ApplicationsView } from "@/components/seeker-application/applications-view";
import { getApplications } from "@/lib/api/applications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const id = session?.user?.id;
  const applications = await getApplications(`applicantId=${id}`);

  return <ApplicationsView applications={applications} />;
};

export default ApplicationsPage;
