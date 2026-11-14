export type JobStatus = "Active" | "Expired";

export type IJobPost = IJob & {
  _id: string;
  status: JobStatus;
  applicants: number;
  postedAt: string;
};

export type IJob = {
  recruiterId: string;
  recruiterEmail: string;
  title: string;
  company: string;
  category: string;
  jobType: string;
  remote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};
