/** Statuses an application can move through. */
export type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Offered";

/** Payload sent by the Apply Now button to `POST /applications`. */
export type IApplication = {
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  email: string;
  jobType: string;
  remote: boolean;
  location: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  archived: boolean;
};

/** Shape returned by MongoDB. The server adds `_id`, `status` and `postedAt`. */
export type IApplicationRecord = IApplication & {
  _id: string;
  status: ApplicationStatus;
  postedAt: string;
};
